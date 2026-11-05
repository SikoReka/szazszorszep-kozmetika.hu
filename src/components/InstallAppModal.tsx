import React, { useState, useEffect } from 'react';
import { Smartphone, Share, PlusSquare, X, Download, CheckCircle2, MoreVertical } from 'lucide-react';
import './InstallAppModal.css';

interface InstallAppModalProps {
  appName: string;
  variant?: 'pill' | 'banner' | 'compact';
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ appName, variant = 'pill' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('android');
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Ellenőrizzük, hogy önálló appként fut-e
    const isApp = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(!!isApp);

    // Készülék felismerése
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isApple = /iphone|ipad|ipod/.test(userAgent);
    if (isApple) {
      setActiveTab('ios');
    } else {
      setActiveTab('android');
    }

    // Android / Chrome előugró telepítő figyelése
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setDeferredPrompt(null);
          return;
        }
      } catch (e) {
        console.error('Install prompt error', e);
      }
    }
    // Ha nem elérhető a böngésző natív promptja (pl. iOS vagy már megnyitott), megnyitjuk a vizuális útmutatót
    setShowGuide(true);
  };

  return (
    <div className={`install-pwa-wrapper variant-${variant}`}>
      <button 
        type="button"
        onClick={handleInstallClick} 
        className={`install-pwa-badge-btn btn-${variant}`}
        title="Alkalmazás hozzáadása a kezdőképernyőhöz"
      >
        <Smartphone size={16} className="pwa-phone-icon" />
        <span>{isStandalone ? '📲 App aktív • Újratelepítés / Ikon' : `📲 ${appName} letöltése (App ikon)`}</span>
      </button>

      {/* Telepítési Útmutató Modal (iOS + Android) */}
      {showGuide && (
        <div className="ios-guide-overlay" onClick={() => setShowGuide(false)}>
          <div className="ios-guide-modal glass" onClick={(e) => e.stopPropagation()}>
            <div className="guide-header">
              <div className="guide-header-title">
                <Download size={20} className="gold-icon" />
                <h3>Alkalmazás telepítése</h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowGuide(false)} 
                className="close-guide-btn" 
                aria-label="Bezárás"
              >
                <X size={20} />
              </button>
            </div>

            <p className="guide-intro">
              Tedd ki a(z) <strong>{appName}</strong> ikont a telefonod kezdőképernyőjére, és használd úgy, mint egy letöltött appot:
            </p>

            {/* Platform választó fülek */}
            <div className="guide-platform-tabs">
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'android' ? 'active' : ''}`}
                onClick={() => setActiveTab('android')}
              >
                Android / Chrome
              </button>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'ios' ? 'active' : ''}`}
                onClick={() => setActiveTab('ios')}
              >
                iPhone (Safari)
              </button>
            </div>

            {/* Android Lépések */}
            {activeTab === 'android' && (
              <div className="guide-steps">
                <div className="guide-step">
                  <div className="step-icon">
                    <MoreVertical size={20} />
                  </div>
                  <div>
                    <strong>1. Lépés: Nyisd meg a böngésző menüt</strong>
                    <p>Koppints a böngésző (Chrome / Samsung) jobb felső sarkában lévő <strong>három pont (⋮)</strong> gombra!</p>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="step-icon">
                    <Download size={20} />
                  </div>
                  <div>
                    <strong>2. Lépés: Telepítés a telefonra</strong>
                    <p>Válaszd a menüben az <strong>„Alkalmazás telepítése”</strong> vagy <strong>„Hozzáadás a kezdőképernyőhöz”</strong> opciót!</p>
                  </div>
                </div>
              </div>
            )}

            {/* iOS Lépések */}
            {activeTab === 'ios' && (
              <div className="guide-steps">
                <div className="guide-step">
                  <div className="step-icon">
                    <Share size={20} />
                  </div>
                  <div>
                    <strong>1. Lépés: Koppints a Megosztás gombra</strong>
                    <p>A Safari böngésző alsó sávjában koppints a <strong>Megosztás</strong> ikonra (négyzetből felfelé mutató nyíl).</p>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="step-icon">
                    <PlusSquare size={20} />
                  </div>
                  <div>
                    <strong>2. Lépés: Hozzáadás a Főképernyőhöz</strong>
                    <p>Görgess lejjebb a megjelenő listában, és válaszd a <strong>„Főképernyőhöz adás”</strong> (*Add to Home Screen*) lehetőséget!</p>
                  </div>
                </div>
              </div>
            )}

            <div className="guide-trust-badge">
              <CheckCircle2 size={16} />
              <span>Nem foglal tárhelyet • Nem kell App Store / Play Áruház fiók</span>
            </div>

            <button 
              type="button"
              onClick={() => setShowGuide(false)} 
              className="guide-done-btn"
            >
              Értem, köszönöm!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
