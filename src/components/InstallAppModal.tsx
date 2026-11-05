import React, { useState, useEffect } from 'react';
import { Smartphone, Share, PlusSquare, X } from 'lucide-react';
import './InstallAppModal.css';

interface InstallAppModalProps {
  appName: string;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ appName }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Ellenőrizzük, hogy már teljes képernyős módban (appként) fut-e
    const isApp = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(!!isApp);

    // iOS felismerése
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iOS);

    // Android / Chrome telepítési esemény figyelése
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Android / Desktop natív telepítő indítása
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      // iOS esetén illusztrált segédablak
      setShowIOSGuide(true);
    } else {
      // Egyéb esetben útmutató
      alert('A kezdőképernyőhöz adáshoz nyiss rá a böngésződ menüjére (3 pont) és válaszd a „Hozzáadás a kezdőképernyőhöz” vagy „Telepítés” opciót!');
    }
  };

  // Ha már telepített appként fut, nem kell a gomb
  if (isStandalone) return null;

  return (
    <>
      <button onClick={handleInstallClick} className="install-pwa-badge-btn">
        <Smartphone size={16} />
        <span>📲 Tedd ki a telefonodra (App ikon)</span>
      </button>

      {/* iOS Telepítési Útmutató Modal */}
      {showIOSGuide && (
        <div className="ios-guide-overlay" onClick={() => setShowIOSGuide(false)}>
          <div className="ios-guide-modal glass" onClick={(e) => e.stopPropagation()}>
            <div className="guide-header">
              <h3>Telepítés iPhone-ra</h3>
              <button onClick={() => setShowIOSGuide(false)} className="close-guide-btn">
                <X size={20} />
              </button>
            </div>

            <p className="guide-intro">
              Tedd ki a <strong>{appName}</strong> ikont a kezdőképernyődre 2 gyors lépésben:
            </p>

            <div className="guide-steps">
              <div className="guide-step">
                <div className="step-icon">
                  <Share size={20} />
                </div>
                <div>
                  <strong>1. Lépés:</strong>
                  <p>Koppints a böngésző alján lévő <strong>Megosztás</strong> gombra (négyzetből felfelé mutató nyíl).</p>
                </div>
              </div>

              <div className="guide-step">
                <div className="step-icon">
                  <PlusSquare size={20} />
                </div>
                <div>
                  <strong>2. Lépés:</strong>
                  <p>Görgess le a menüben, és válaszd a <strong>„Főképernyőhöz adás”</strong> (*Add to Home Screen*) opciót!</p>
                </div>
              </div>
            </div>

            <button onClick={() => setShowIOSGuide(false)} className="guide-done-btn">
              Értem, megcsinálom!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
