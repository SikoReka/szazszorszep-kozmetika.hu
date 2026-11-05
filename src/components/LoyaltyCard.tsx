import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, RefreshCw, LogOut, ArrowLeft, Heart, ShieldCheck } from 'lucide-react';
import { QRCodeDisplay } from './QRCodeDisplay';
import { InstallAppModal } from './InstallAppModal';
import './LoyaltyCard.css';

declare global {
  interface Window {
    google?: any;
  }
}

interface UserData {
  id: string;
  name: string;
  email: string;
  picture?: string;
  stamps: number;
  total_stamps: number;
  rewards_redeemed: number;
  qr_token: string;
}

const GOOGLE_CLIENT_ID = '771149132933-2pe730n98tehpmk2ijolqr929balgp81.apps.googleusercontent.com';
const MAX_STAMPS = 10;

export const LoyaltyCard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('szaszszorszep_loyalty_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Google GSI Inicializálása
  useEffect(() => {
    const initGoogle = () => {
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          // Csak akkor rendereljük a gombot, ha még nincs belépve
          if (!user) {
            const btnParent = document.getElementById('google-btn-container');
            if (btnParent) {
              btnParent.innerHTML = '';
              window.google.accounts.id.renderButton(btnParent, {
                theme: 'outline',
                size: 'large',
                type: 'standard',
                shape: 'pill',
                text: 'continue_with',
                logo_alignment: 'left',
                width: 280,
              });
            }
          }
        } catch (err) {
          console.error('Google Auth Init Error:', err);
        }
      }
    };

    // Ha még töltődik a script, várunk rá
    const interval = setInterval(() => {
      if (window.google?.accounts?.id) {
        initGoogle();
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [user]);

  // Google válasz kezelése
  const handleGoogleResponse = async (response: any) => {
    if (!response?.credential) {
      setError('Nem érkezett érvényes azonosító a Google-től.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'A bejelentkezés sikertelen volt.');
      }

      setUser(data.user);
      localStorage.setItem('szaszszorszep_loyalty_user', JSON.stringify(data.user));
    } catch (err: any) {
      setError(err.message || 'Hiba történt a bejelentkezés során.');
    } finally {
      setLoading(false);
    }
  };

  // Kártya és pecsétek frissítése a szerverről
  const refreshCard = async () => {
    if (!user) return;
    setRefreshing(true);
    try {
      const res = await fetch(`/api/card?userId=${encodeURIComponent(user.id)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        localStorage.setItem('szaszszorszep_loyalty_user', JSON.stringify(data.user));
      }
    } catch (err) {
      console.error('Frissítési hiba:', err);
    } finally {
      setRefreshing(false);
    }
  };

  // Automatikus háttér-frissítés (polling 3 másodpercenként)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/card?userId=${encodeURIComponent(user.id)}`);
        const data = await res.json();
        if (res.ok && data.success) {
          // Csak akkor frissítünk ha változott a pecsétek száma
          if (data.user.stamps !== user.stamps || data.user.total_stamps !== user.total_stamps) {
            setUser(data.user);
            localStorage.setItem('szaszszorszep_loyalty_user', JSON.stringify(data.user));
            // Haptic visszajelzés mobilon ha támogatott
            if (navigator.vibrate) {
              navigator.vibrate([100, 50, 100]);
            }
          }
        }
      } catch (err) {
        // Csendes hiba háttérben
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('szaszszorszep_loyalty_user');
    setUser(null);
  };

  const stampsLeft = user ? Math.max(0, MAX_STAMPS - user.stamps) : MAX_STAMPS;
  const isRewardReady = user && user.stamps >= MAX_STAMPS;

  return (
    <div className="loyalty-page-wrapper">
      <div className="loyalty-container">
        {/* Vissza a főoldalra */}
        <div className="loyalty-nav-bar">
          <a href="/" className="back-to-home-btn">
            <ArrowLeft size={18} />
            <span>Vissza a főoldalra</span>
          </a>
          {user && (
            <button onClick={handleLogout} className="logout-btn" title="Kijelentkezés">
              <LogOut size={16} />
              <span>Kilépés</span>
            </button>
          )}
        </div>

        {/* Nem belépett nézet */}
        {!user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="loyalty-welcome-card glass"
          >
            <div className="luxury-badge">
              <Sparkles size={14} />
              <span>Exkluzív Törzsvendég Program</span>
            </div>

            <h1 className="welcome-title">Százszorszép Hűségkártya</h1>
            <p className="welcome-desc">
              Csatlakozz prémium klubunkhoz egyetlen kattintással! Minden kezelés után pecsétet kapsz, 
              amelyekkel értékes kedvezményeket és kényeztető ajándékokat válthatsz be.
            </p>

            <div className="rewards-preview-box">
              <div className="reward-item">
                <Gift className="reward-icon" size={24} />
                <div>
                  <strong>10 Pecsét gyűjtése után</strong>
                  <p>15% azonnali kedvezmény a következő arckezelésedből vagy ajándék kényeztető masszázs!</p>
                </div>
              </div>
            </div>

            <div className="login-action-box">
              <span className="login-prompt">Jelentkezz be kártyád eléréséhez:</span>
              <div id="google-btn-container" className="google-btn-wrapper"></div>
              {loading && <p className="loading-text">Kártya betöltése...</p>}
              {error && <p className="error-message">{error}</p>}
            </div>

            <div className="trust-footer-note">
              <ShieldCheck size={16} />
              <span>Biztonságos Google bejelentkezés • 0 Ft havidíj • Bármikor elérhető</span>
            </div>
          </motion.div>
        ) : (
          /* Belépett nézet: A Prémium Digitális Kártya */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="loyalty-member-view"
          >
            {/* Fő Kártya */}
            <div className={`digital-pass-card ${isRewardReady ? 'reward-active-glow' : ''}`}>
              <div className="card-top-header">
                <div className="brand-logo-text">
                  <span className="brand-title">SZÁZSZORSZÉP</span>
                  <span className="brand-subtitle">KOZMETIKA • MÓRAHALOM</span>
                </div>
                <button
                  onClick={refreshCard}
                  className={`card-refresh-btn ${refreshing ? 'spinning' : ''}`}
                  title="Pecsétek frissítése"
                >
                  <RefreshCw size={18} />
                </button>
              </div>

              {/* Vendég infó */}
              <div className="member-profile-row">
                {user.picture ? (
                  <img src={user.picture} alt={user.name} className="member-avatar" />
                ) : (
                  <div className="member-avatar-fallback">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="member-names">
                  <h2 className="member-name">{user.name}</h2>
                  <span className="member-tier">
                    <Sparkles size={13} /> VIP Törzsvendég
                  </span>
                </div>
              </div>

              {/* Pecsétgyűjtő rács (1 - 10) */}
              <div className="stamps-grid-container">
                <div className="stamps-grid">
                  {[...Array(MAX_STAMPS)].map((_, idx) => {
                    const isEarned = idx < user.stamps;
                    return (
                      <motion.div
                        key={idx}
                        className={`stamp-slot ${isEarned ? 'earned' : 'empty'} ${
                          idx === MAX_STAMPS - 1 ? 'final-reward-slot' : ''
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {isEarned ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="stamp-earned-icon"
                          >
                            <Sparkles size={20} />
                          </motion.div>
                        ) : idx === MAX_STAMPS - 1 ? (
                          <Gift size={20} className="gift-placeholder-icon" />
                        ) : (
                          <span className="stamp-number">{idx + 1}</span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Státusz üzenet */}
                <div className="stamp-status-banner">
                  {isRewardReady ? (
                    <div className="reward-unlocked-banner">
                      <Gift size={22} />
                      <div>
                        <strong>GRATULÁLUNK! JUTALMAD KÉSZEN ÁLL!</strong>
                        <span>Mutasd fel a kártyádat Rékának a beváltáshoz!</span>
                      </div>
                    </div>
                  ) : (
                    <div className="reward-progress-banner">
                      <span>Még <strong>{stampsLeft} pecsét</strong> hiányzik az ajándékodig!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* QR-Kód Szekció a szalonban való csippantáshoz */}
              <div className="card-qr-section">
                <span className="qr-guide-text">
                  Mutasd fel a kezelés végén a csippantáshoz:
                </span>
                <div className="qr-wrapper">
                  <QRCodeDisplay value={user.qr_token} size={180} />
                </div>
                <span className="qr-token-hint">Azonosító: {user.qr_token.slice(0, 14)}...</span>
              </div>

              {/* Kártya alsó statisztika */}
              <div className="card-bottom-stats">
                <div className="stat-col">
                  <span className="stat-val">{user.total_stamps}</span>
                  <span className="stat-lbl">Összes pecsét</span>
                </div>
                <div className="stat-col">
                  <span className="stat-val">{user.rewards_redeemed}</span>
                  <span className="stat-lbl">Beváltott ajándék</span>
                </div>
              </div>
            </div>

            {/* PWA / Kezdőképernyőre tevés gomb & tipp */}
            <div className="pwa-install-tip glass">
              <Heart size={20} className="tip-icon" />
              <div style={{ flex: 1 }}>
                <strong>Tedd ki a telefonod kezdőképernyőjére!</strong>
                <p style={{ marginBottom: '10px' }}>
                  Így egyetlen érintéssel elérheted a kártyádat bármikor a telefonodon, mint egy natív appot!
                </p>
                <InstallAppModal appName="Százszorszép Hűségkártya" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyCard;
