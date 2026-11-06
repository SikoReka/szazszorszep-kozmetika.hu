// src/components/SalonAdmin.tsx
// Borbás Webdesign - Szalon Csippantó & Admin Felület Rékának
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle2, AlertCircle, Gift, Sparkles, KeyRound, Database, ArrowLeft, Phone, Search, Copy, Check, UserPlus } from 'lucide-react';
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
  phone?: string;
  email?: string;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [clientPinView, setClientPinView] = useState<string | null>(null);
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestPhone, setNewGuestPhone] = useState('');
  const [newGuestPin, setNewGuestPin] = useState('1234');

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
    setScannedUser(null);
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
              stopScanner();
              fetchUserByToken(decodedText);
            },
            () => {}
          )
          .catch((err: any) => {
            console.error('Kamera indítási hiba:', err);
            setStatusMessage({
              type: 'error',
              text: 'Nem sikerült elindítani a kamerát. Kérlek engedélyezd a hozzáférést a böngészőben, vagy keresd meg a vendéget telefonszám alapján!',
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
        })
        .catch(() => {});
    }
    setScanning(false);
  };

  // Vendég adatainak lekérése QR token vagy telefonszám alapján
  const fetchUserByToken = async (query: string) => {
    if (!query.trim()) return;
    setProcessing(true);
    setStatusMessage(null);
    setClientPinView(null);

    try {
      const res = await fetch(`/api/card?token=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'A vendég nem található.');
      }

      setScannedUser(data.user);
      setStatusMessage({
        type: 'success',
        text: `Vendég megtalálva: ${data.user.name} (${data.user.stamps}/10 pecsét)`,
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message });
      setScannedUser(null);
    } finally {
      setProcessing(false);
    }
  };

  // +1 Pecsét hozzáadása a beolvasott vendéghez
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
        throw new Error(data.error || 'Hiba történt a pecsét mentésekor.');
      }

      setScannedUser((prev) => (prev ? { ...prev, ...data.user } : null));
      setStatusMessage({ type: 'success', text: data.message });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setProcessing(false);
    }
  };

  // 10 Pecsét beváltása (visszaállítás 0-ra)
  const handleRedeemReward = async () => {
    if (!scannedUser) return;
    if (!confirm(`Biztosan beváltod ${scannedUser.name} ajándékát? A pecsétek száma 0-ra áll vissza!`)) {
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

  // Vendég kártya link másolása WhatsApphoz
  const handleCopyLink = () => {
    if (!scannedUser) return;
    const origin = window.location.origin;
    const link = `${origin}/kartya?token=${encodeURIComponent(scannedUser.qr_token)}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    });
  };

  // Vendég PIN megtekintése / kezelése
  const handleViewClientPin = async () => {
    if (!scannedUser) return;
    try {
      const res = await fetch('/api/admin/client-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pin,
        },
        body: JSON.stringify({ user_id: scannedUser.id }),
      });
      const data = await res.json();
      if (data.success) {
        setClientPinView(data.current_pin);
      } else {
        alert(data.error || 'Hiba történt a PIN lekérésekor.');
      }
    } catch (e: any) {
      alert('Hiba: ' + e.message);
    }
  };

  // Új vendég rögzítése a szalonban Réka által
  const handleCreateGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim() || !newGuestPhone.trim()) {
      alert('Kérlek add meg a vendég nevét és telefonszámát!');
      return;
    }

    setProcessing(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/auth/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          name: newGuestName.trim(),
          phone: newGuestPhone.trim(),
          pin: newGuestPin.trim() || '1234',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Nem sikerült létrehozni a vendégkártyát.');
      }

      setScannedUser(data.user);
      setStatusMessage({
        type: 'success',
        text: `Új VIP vendég rögzítve: ${data.user.name}! Most már adhatsz neki pecsétet.`,
      });
      setShowAddGuest(false);
      setNewGuestName('');
      setNewGuestPhone('');
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setProcessing(false);
    }
  };

  // D1 Adatbázis inicializáló / migrációs gomb
  const handleSetupDb = async () => {
    if (!confirm('Lefuttatod a Cloudflare D1 adatbázis ellenőrzését és frissítéseit?')) return;
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
            <span>Főoldal</span>
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
            <p>Add meg az admin PIN kódot a kezdéshez:</p>

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
              <div className="header-actions">
                <button 
                  onClick={() => setShowAddGuest(!showAddGuest)} 
                  className="quick-add-guest-btn"
                  title="Új vendég felvétele"
                >
                  <UserPlus size={15} />
                  <span>{showAddGuest ? 'Bezárás' : 'Új Vendég'}</span>
                </button>
                <button onClick={handleSetupDb} className="db-init-btn" title="D1 Táblák inicializálása">
                  <Database size={15} />
                </button>
              </div>
            </div>

            {/* ÚJ VENDÉG RÖGZÍTÉSE ŰRLAP (HA LENYITVA) */}
            {showAddGuest && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="add-guest-box glass"
              >
                <h3>Új VIP Vendég Felvétele a Szalonban</h3>
                <form onSubmit={handleCreateGuest} className="add-guest-form">
                  <input
                    type="text"
                    required
                    placeholder="Vendég teljes neve (pl. Kovács Anna)"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    className="add-guest-input"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Telefonszám (pl. 06 30 123 4567)"
                    value={newGuestPhone}
                    onChange={(e) => setNewGuestPhone(e.target.value)}
                    className="add-guest-input"
                  />
                  <div className="add-guest-row">
                    <span className="pin-hint-label">Alapértelmezett PIN:</span>
                    <input
                      type="text"
                      maxLength={4}
                      value={newGuestPin}
                      onChange={(e) => setNewGuestPin(e.target.value)}
                      className="add-guest-input-pin"
                    />
                    <button type="submit" disabled={processing} className="btn-save-guest">
                      Létrehozás
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

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

            {/* Kézi keresés Telefonszám, Név vagy QR kód alapján */}
            <div className="manual-token-box">
              <span className="manual-label">Vagy keress vendéget telefonszám vagy név alapján:</span>
              <div className="manual-row">
                <input
                  type="text"
                  placeholder="pl. 06 30 123 4567 vagy kód"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="manual-input"
                  onKeyDown={(e) => e.key === 'Enter' && fetchUserByToken(searchQuery)}
                />
                <button
                  onClick={() => fetchUserByToken(searchQuery)}
                  disabled={!searchQuery.trim() || processing}
                  className="manual-btn"
                >
                  <Search size={16} />
                  <span>Keresés</span>
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

            {/* BEOLVASOTT / MEGTALÁLT VENDÉG KÁRTYÁJA ÉS AKCIÓGOMBOK */}
            {scannedUser && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="scanned-user-card"
              >
                <div className="user-info-row">
                  <div className="user-thumb-fallback">{scannedUser.name.charAt(0).toUpperCase()}</div>
                  <div className="user-text-info">
                    <h3 className="user-card-name">{scannedUser.name}</h3>
                    {scannedUser.phone && (
                      <span className="user-card-phone">
                        <Phone size={13} /> {scannedUser.phone}
                      </span>
                    )}
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
                    Összes eddigi látogatás: <strong>{scannedUser.total_stamps}</strong>
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
                      <span>🎁 10 Pecsét Beváltása (0-ra állítás)</span>
                    </button>
                  )}

                  {/* Kényelmi funkciók Rékának */}
                  <div className="salon-helper-actions">
                    <button onClick={handleCopyLink} className="helper-link-btn" title="Kártya link másolása">
                      {copiedLink ? <Check size={16} color="#27ae60" /> : <Copy size={16} />}
                      <span>{copiedLink ? 'Link kimásolva!' : 'Kártya link másolása (WhatsApp)'}</span>
                    </button>

                    <button onClick={handleViewClientPin} className="helper-link-btn" title="Vendég PIN kódja">
                      <KeyRound size={16} />
                      <span>{clientPinView ? `PIN: ${clientPinView}` : 'Vendég PIN megtekintése'}</span>
                    </button>
                  </div>
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
