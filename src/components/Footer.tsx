import logo from '../assets/logo.svg';
import { ShieldCheck, FileText, GraduationCap, MapPin, Phone, Mail, Building } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        
        {/* 1. Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="Százszorszép Kozmetika" className="logo-img-square" />
          </div>
          <p className="footer-desc">
            Személyre szabott, szépítő és bőrfiatalító kezelések, professzionális kozmetikai oktatások Mórahalmon.
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/profile.php?id=61564743670564" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/kozmetikaszazszorszep/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        {/* 2. Navigáció Column */}
        <div className="footer-links-col">
          <h4 className="footer-title">Navigáció</h4>
          <ul>
            <li><a href="/#home">Kezdőlap</a></li>
            <li><a href="/#about">Munkatársaink</a></li>
            <li><a href="/#brands">Márkáink</a></li>
            <li><a href="/#treatments">Kezelések</a></li>
            <li><a href="/#loyalty">Hűségprogram</a></li>
            <li><a href="/#contact">Kapcsolat</a></li>
          </ul>
        </div>

        {/* 3. Szabályzatok & Kártya Column */}
        <div className="footer-links-col">
          <h4 className="footer-title">Szabályzatok</h4>
          <ul>
            <li>
              <a href="/adatkezeles" className="footer-legal-link">
                <FileText size={14} className="legal-icon" />
                <span>Adatkezelési Tájékoztató</span>
              </a>
            </li>
            <li>
              <a href="/hazirend" className="footer-legal-link">
                <ShieldCheck size={14} className="legal-icon" />
                <span>Házirend & Foglalási Szabályzat</span>
              </a>
            </li>
            <li>
              <a href="/kartya" className="footer-legal-link highlight-gold">
                <span>Digitális Hűségkártya</span>
              </a>
            </li>
            <li>
              <a href="/szalon-admin" className="staff-login-link">
                <span>Munkatársi Belépés 🔒</span>
              </a>
            </li>
          </ul>
        </div>

        {/* 4. Impresszum & EV Adatok Column */}
        <div className="footer-impresszum-col">
          <h4 className="footer-title">Impresszum</h4>
          <div className="impresszum-card">
            <div className="impresszum-row">
              <Building size={14} className="imp-icon" />
              <span><strong>Üzemeltető:</strong> Sikó Réka E.V.</span>
            </div>
            <div className="impresszum-row">
              <MapPin size={14} className="imp-icon" />
              <span><strong>Cím:</strong> 6782 Mórahalom, Kisvasút u. 9.</span>
            </div>
            <div className="impresszum-row">
              <span><strong>Adószám:</strong> 67389614-1-26</span>
            </div>
            <div className="impresszum-row">
              <span><strong>Nyilvántartási szám:</strong> 50160594</span>
            </div>
            <div className="impresszum-row edu-badge">
              <GraduationCap size={15} className="imp-icon gold" />
              <span><strong>Felnőttképzési ny.sz.:</strong> B/2026/001078</span>
            </div>
            <div className="impresszum-row">
              <Phone size={14} className="imp-icon" />
              <a href="tel:+36203912199">+36 20 391 2199</a>
            </div>
            <div className="impresszum-row">
              <Mail size={14} className="imp-icon" />
              <a href="mailto:reka@szazszorszep-kozmetika.hu">reka@szazszorszep-kozmetika.hu</a>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>
            &copy; {currentYear} Százszorszép Kozmetika – Minden jog fenntartva.
          </p>
          <p className="borbas-credit">
            Webdesign & Fejlesztés: <strong>Borbás Webdesign</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
