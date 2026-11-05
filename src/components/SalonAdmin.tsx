import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle2, AlertCircle, Gift, Sparkles, KeyRound, Database, ArrowLeft } from 'lucide-react';
import { InstallAppModal } from './InstallAppModal';
import './SalonAdmin.css';

declare global {
  interface Window {
    Html5QrcodeScanner?: any;
    Html5Qrcode?: any;
  }
}

interface ScannedUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
  stamps: number;
  total_stamps: number;
  rewards_redeemed: number;
  qr_token: string;
}

export const SalonAdmin: React.FC = () => {
  const [pin, setPin] = useState(() => localStorage.getItem('szaszszorszep_admin_pin') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const adminName = 'Réka';

  // Scanner & Állapotok
  const [scanning, setScanning] = useState(false);
  const [scannedUser, setScannedUser] = useState<ScannedUser | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [manualToken, setManualToken] = useState('');
  const scannerRef = useRef<any>(null);

  // Belépés ellenőrzése
  useEffect(() => {
    if (pin === '2026') {
      setIsAuthenticated(true);
    }
  }, [pin]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '2026') {
      setPin(pinInput);
      localStorage.setItem('szaszszorszep_admin_pin', pinInput);
      setIsAuthenticated(true);
    } else {
      alert('Hibás PIN kód! Alapértelmezett PIN a teszteléshez: 2026');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('szaszszorszep_admin_pin');
    setPin('');
    setIsAuthenticated(false);
  };

  // Kamera QR-kód olvasó indítása
  const startScanner = () => {
    setStatusMessage(null);
    setScannedUser(null);
    setScanning(true);

    setTimeout(() => {
      if (window.Html5Qrcode) {
        const html5QrCode = new window.Html5Qrcode('qr-reader');
        scannerRef.current = html5QrCode;

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        html5QrCode
          .start(
            { facingMode: 'environment' },
            config,
            (decodedText: string) => {
              // Sikeres beolvasás
              stopScanner();
              fetchUserByToken(decodedText);
            },
            () => {
              // Képkocka keresés alatt
            }
          )
          .catch((err: any) => {
            console.error('Kamera indítási hiba:', err);
            setStatusMessage({
              type: 'error',
              text: 'Nem sikerült elindítani a kamerát. Kérlek engedélyezd a hozzáférést a böngészőben!',
            });
            setScanning(false);
          });
      }
    }, 300);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current.clear();
          scannerRef.current = null;
          setScanning(false);
        })
        .catch(() => {
          setScanning(false);
        });
    } else {
      setScanning(false);
    }
  };

  // Vendég adatainak lekérése QR Token alapján
  const fetchUserByToken = async (token: string) => {
    setProcessing(true);
    setStatusMessage(null);

    try {
      const res = await fetch(`/api/card?token=${encodeURIComponent(token)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'A QR kódhoz nem tartozik regisztrált vendég!');
      }

      setScannedUser(data.user);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setProcessing(false);
    }
  };

  // +1 Pecsét Jóváírása
  const handleAddStamp = async () => {
    if (!scannedUser) return;
    setProcessing(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pin,
        },
        body: JSON.stringify({
          qr_token: scannedUser.qr_token,
          admin_name: adminName,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Hiba történt a pont jóváírásakor.');
      }

      setScannedUser((prev) => (prev ? { ...prev, ...data.user } : null));
      setStatusMessage({ type: 'success', text: data.message });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setProcessing(false);
    }
  };

  // Ajándék beváltása (10 pecsét után)
  const handleRedeemReward = async () => {
    if (!scannedUser) return;
    if (!confirm(`Biztosan beváltod ${scannedUser.name} ajándékát? A pecsétek nullázódnak az új körhöz!`)) {
      return;
    }

    setProcessing(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pin,
        },
        body: JSON.stringify({
          qr_token: scannedUser.qr_token,
          admin_name: adminName,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Hiba történt az ajándék beváltásakor.');
      }

      setScannedUser((prev) => (prev ? { ...prev, ...data.user } : null));
      setStatusMessage({ type: 'success', text: data.message });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setProcessing(false);
    }
  };

  // D1 Adatbázis inicializáló gomb
  const handleSetupDb = async () => {
    if (!confirm('Létrehozod / ellenőrzöd a Cloudflare D1 adatbázis tábláit?')) return;
    setProcessing(true);
    try {
      const res = await fetch('/api/admin/setup-db', {
        method: 'POST',
        headers: { 'x-admin-pin': pin },
      });
      const data = await res.json();
      alert(data.message || 'Kész!');
    } catch (err: any) {
      alert('Hiba: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="admin-page-wrapper">
      <div className="admin-container">
        {/* Navigáció */}
        <div className="admin-nav-bar">
          <a href="/" className="back-link">
            <ArrowLeft size={16} />
            <span>Weboldal</span>
          </a>
          {isAuthenticated && (
            <button onClick={handleLogout} className="admin-logout-btn">
              Kijelentkezés
            </button>
          )}
        </div>

        {/* PIN KÓDOS BELÉPŐ KÉPERNYŐ */}
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pin-card glass"
          >
            <div className="shield-icon-badge">
              <KeyRound size={28} />
            </div>
            <h2>Szalon Csippantó Admin</h2>
            <p>Add meg a 4 jegyű admin PIN kódot a kezdéshez:</p>

            <form onSubmit={handlePinSubmit} className="pin-form">
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="PIN kód (2026)"
                className="pin-input-field"
                autoFocus
              />
              <button type="submit" className="pin-submit-btn">
                Belépés
              </button>
            </form>
          </motion.div>
        ) : (
          /* SZALON KEZELŐPULT */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="admin-dashboard-view"
          >
            {/* Fejléc */}
            <div className="admin-header-card">
              <div className="header-info">
                <h1>Százszorszép Admin</h1>
                <span className="operator-tag">Kezelő: <strong>{adminName}</strong></span>
              </div>
              <button onClick={handleSetupDb} className="db-init-btn" title="D1 Táblák inicializálása">
                <Database size={16} />
                <span>DB ellenőrzés</span>
              </button>
            </div>

            {/* PWA Kezdőképernyő Gomb */}
            <InstallAppModal appName="Százszorszép Admin" />

            {/* Szkenner Vezérlő */}
            <div className="scanner-control-box">
              {!scanning ? (
                <button onClick={startScanner} className="big-scan-btn">
                  <Camera size={26} />
                  <span>Vendég QR Kód Beolvasása</span>
                </button>
              ) : (
                <div className="camera-active-container">
                  <div id="qr-reader" className="qr-camera-viewport"></div>
                  <button onClick={stopScanner} className="cancel-scan-btn">
                    Mégse / Kamera Bezárása
                  </button>
                </div>
              )}
            </div>

            {/* Kézi token beírási lehetőség (ha nem megy a kamera) */}
            <div className="manual-token-box">
              <span className="manual-label">Vagy írd be a kódot kézzel:</span>
              <div className="manual-row">
                <input
                  type="text"
                  placeholder="szsz_xxxxxxxx"
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  className="manual-input"
                />
                <button
                  onClick={() => fetchUserByToken(manualToken)}
                  disabled={!manualToken}
                  className="manual-btn"
                >
                  Keresés
                </button>
              </div>
            </div>

            {/* Állapotüzenetek */}
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`status-alert-box ${statusMessage.type}`}
              >
                {statusMessage.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <span>{statusMessage.text}</span>
              </motion.div>
            )}

            {/* BEOLVASOTT VENDÉG KÁRTYÁJA ÉS AKCIÓGOMBOK */}
            {scannedUser && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="scanned-user-card"
              >
                <div className="user-info-row">
                  {scannedUser.picture ? (
                    <img src={scannedUser.picture} alt="" className="user-thumb" />
                  ) : (
                    <div className="user-thumb-fallback">{scannedUser.name.charAt(0)}</div>
                  )}
                  <div>
                    <h3 className="user-card-name">{scannedUser.name}</h3>
                    <span className="user-card-email">{scannedUser.email}</span>
                  </div>
                </div>

                {/* Pecsétek számláló */}
                <div className="stamps-counter-box">
                  <span className="counter-label">Aktuális pecsétek:</span>
                  <div className="counter-value-row">
                    <span className="big-stamp-count">{scannedUser.stamps}</span>
                    <span className="max-stamp-count">/ 10</span>
                  </div>
                  <span className="total-visits-tag">
                    Összes eddigi kezelés: <strong>{scannedUser.total_stamps}</strong>
                  </span>
                </div>

                {/* Akciógombok */}
                <div className="admin-actions-col">
                  <button
                    onClick={handleAddStamp}
                    disabled={processing}
                    className="action-btn add-stamp-btn"
                  >
                    <Sparkles size={20} />
                    <span>+1 Pecsét Jóváírása</span>
                  </button>

                  {scannedUser.stamps >= 10 && (
                    <button
                      onClick={handleRedeemReward}
                      disabled={processing}
                      className="action-btn redeem-reward-btn"
                    >
                      <Gift size={20} />
                      <span>🎁 Ajándék / Kedvezmény Beváltása</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SalonAdmin;
