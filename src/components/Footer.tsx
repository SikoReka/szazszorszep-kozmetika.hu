import logo from '../assets/logo.svg';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="Százszorszép Kozmetika" className="logo-img-square" />
          </div>
          <p className="footer-desc">
            Személyre szabott, szépítő és bőrfiatalító kezelések Mórahalmon.
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div className="footer-links-group">
          <div className="footer-links-col">
            <h4 className="footer-title">Navigáció</h4>
            <ul>
              <li><a href="#home">Kezdőlap</a></li>
              <li><a href="#services">Szolgáltatások</a></li>
              <li><a href="#about">Filozófiám</a></li>
            </ul>
          </div>
          
          <div className="footer-links-col">
            <h4 className="footer-title">Kezelések</h4>
            <ul>
              <li><a href="#services">Arckezelések</a></li>
              <li><a href="#services">Szem & Szemöldök</a></li>
              <li><a href="#services">IPL Szőrtelenítés</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>&copy; {currentYear} Százszorszép Kozmetika – Minden jog fenntartva.</p>
          <p className="footer-powered">Készítette: Antigravity</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
