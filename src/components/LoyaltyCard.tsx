// src/components/LoyaltyCard.tsx
// Borbás Webdesign Luxury Standard - Százszorszép Digitális Hűségkártya
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, RefreshCw, LogOut, ArrowLeft, ShieldCheck, KeyRound, Phone, User as UserIcon } from 'lucide-react';
import { QRCodeDisplay } from './QRCodeDisplay';
import './LoyaltyCard.css';

interface UserData {
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

const MAX_STAMPS = 10;

export const LoyaltyCard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('szaszszorszep_loyalty_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Belépési űrlap állapotok
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Automatikus betöltés URL token alapján (pl. WhatsApp link: ?token=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token') || params.get('t');

    if (tokenParam) {
      setLoading(true);
      fetch(`/api/card?token=${encodeURIComponent(tokenParam)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setUser(data.user);
            localStorage.setItem('szaszszorszep_loyalty_user', JSON.stringify(data.user));
          }
        })
        .catch((err) => console.error('Token kártya betöltési hiba:', err))
        .finally(() => setLoading(false));
    }
  }, []);

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
          if (data.user.stamps !== user.stamps || data.user.total_stamps !== user.total_stamps) {
            setUser(data.user);
            localStorage.setItem('szaszszorszep_loyalty_user', JSON.stringify(data.user));
            if (navigator.vibrate) {
              navigator.vibrate([100, 50, 100]);
            }
          }
        }
      } catch (err) {
        // Csendes háttér-hiba
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [user]);

  // Telefonszámos + 4 jegyű PIN-es belépés / regisztráció
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: authMode,
          phone: phoneInput,
          pin: pinInput,
          name: authMode === 'register' ? nameInput : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'A művelet sikertelen volt.');
      }

      setUser(data.user);
      localStorage.setItem('szaszszorszep_loyalty_user', JSON.stringify(data.user));
    } catch (err: any) {
      setError(err.message || 'Hiba történt a belépés során.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Biztosan kijelentkezel a kártyádból?')) {
      localStorage.removeItem('szaszszorszep_loyalty_user');
      setUser(null);
      setPinInput('');
    }
  };

  const isRewardReady = user ? user.stamps >= MAX_STAMPS : false;
  const stampsLeft = user ? MAX_STAMPS - user.stamps : MAX_STAMPS;

  return (
    <div className="loyalty-page-wrapper">
      <div className="loyalty-container">
        {/* Felső navigációs sáv */}
        <div className="loyalty-nav-bar">
          <a href="/" className="back-to-home-btn" title="Vissza a Százszorszép Kozmetika főoldalára">
            <ArrowLeft size={16} />
            <span>Főoldal</span>
          </a>

          {user && (
            <button onClick={handleLogout} className="logout-btn" title="Kijelentkezés a kártyából">
              <LogOut size={16} />
              <span>Kijelentkezés</span>
            </button>
          )}
        </div>

        {/* 1. NEM BELÉPETT NÉZET: NÉV + TELEFONSZÁM + 4 JEGYŰ PIN */}
        {!user ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="loyalty-welcome-card glass"
          >
            <div className="luxury-badge">
              <Sparkles size={14} />
              <span>Százszorszép Klub</span>
            </div>

            <h1 className="welcome-title">Digitális Hűségkártya</h1>
            <p className="welcome-desc">
              Gyűjts pecséteket minden látogatás alkalmával, és élvezd az exkluzív kezeléseket és ajándékokat!
            </p>

            {/* Jutalmak előnézete */}
            <div className="rewards-preview-box">
              <div className="reward-item">
                <Gift className="reward-icon" size={24} />
                <div>
                  <strong>10 Pecsét = Ajándék Kezelés</strong>
                  <p>15% azonnali kedvezmény a kezelésedből vagy választható kényeztető arcmasszázs!</p>
                </div>
              </div>
            </div>

            {/* Űrlap Fülválasztó (Belépés / Új kártya) */}
            <div className="auth-tabs">
              <button
                type="button"
                className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => { setAuthMode('login'); setError(null); }}
              >
                Már van kártyám (Belépés)
              </button>
              <button
                type="button"
                className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
                onClick={() => { setAuthMode('register'); setError(null); }}
              >
                Új kártyát kérek
              </button>
            </div>

            {/* Belépő / Regisztrációs űrlap */}
            <form onSubmit={handleAuthSubmit} className="client-auth-form">
              {authMode === 'register' && (
                <div className="form-group">
                  <label htmlFor="client-name">Teljes neved:</label>
                  <div className="input-with-icon">
                    <UserIcon size={18} className="field-icon" />
                    <input
                      id="client-name"
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="pl. Kovács Anna"
                      className="auth-input-field"
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="client-phone">Telefonszámod:</label>
                <div className="input-with-icon">
                  <Phone size={18} className="field-icon" />
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="pl. 06 30 123 4567"
                    className="auth-input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="client-pin">
                  {authMode === 'login' ? '4 jegyű PIN kódod:' : 'Válassz egy 4 jegyű PIN kódot (pl. születési éved):'}
                </label>
                <div className="input-with-icon">
                  <KeyRound size={18} className="field-icon" />
                  <input
                    id="client-pin"
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="••••"
                    className="auth-input-field pin-field"
                  />
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" disabled={loading} className="btn-client-submit">
                {loading ? 'Kérlek várj...' : authMode === 'login' ? 'Kártyám Megnyitása' : 'Kártyám Létrehozása'}
              </button>
            </form>

            <div className="trust-footer-note">
              <ShieldCheck size={16} />
              <span>A telefonod automatikusan megjegyzi • 0 Ft havidíj • Bármikor elérhető</span>
            </div>
          </motion.div>
        ) : (
          /* 2. BELÉPETT NÉZET: A PRÉMIUM DIGITÁLIS VIP KÁRTYA */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
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
                <div className="member-avatar-fallback">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="member-names">
                  <h2 className="member-name">{user.name}</h2>
                  <span className="member-tier">
                    <Sparkles size={13} /> VIP Törzsvendég
                  </span>
                  {user.phone && <span className="member-phone-sub">{user.phone}</span>}
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
                <span className="qr-token-hint">Azonosító: {user.qr_token.slice(0, 16)}</span>
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyCard;
