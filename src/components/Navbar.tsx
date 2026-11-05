import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ShieldCheck } from 'lucide-react';
import logoFektetett from '../assets/logo_fektetett.svg';
import './Navbar.css';

interface NavbarProps {
  onOpenBooking: () => void;
}

const Navbar = ({ onOpenBooking }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('szaszszorszep_loyalty_user');
      if (saved) {
        setLoggedInUser(JSON.parse(saved));
      }
    } catch (e) {
      // Ignored
    }
  }, []);

  const navLinks = [
    { name: 'Kezdőlap', href: '#home' },
    { name: 'Munkatársaink', href: '#about' },
    { name: 'Márkáink', href: '#brands' },
    { name: 'Kezelések', href: '#treatments' },
    { name: 'Hűségprogram', href: '#loyalty' },
    { name: 'Galéria', href: '#gallery' },
    { name: 'Kapcsolat', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="nav-logo">
          <img src={logoFektetett} alt="Százszorszép Kozmetika" className="logo-img-fektetett" />
        </a>

        {/* Desktop Menu */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="nav-link"
            >
              {link.name}
            </a>
          ))}
          <a href="/kartya" className="nav-loyalty-link" title="Digitális Hűségkártya és Belépés">
            <Sparkles size={14} className="gold-sparkle-icon" />
            <span>{loggedInUser ? `Kártyám (${loggedInUser.stamps} pecsét)` : 'Hűségkártya (App)'}</span>
          </a>
          <button onClick={onOpenBooking} className="btn btn-nav">
            IDŐPONTFOGLALÁS
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Menü megnyitása">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        ))}

        <div className="mobile-menu-loyalty-box">
          <a 
            href="/kartya" 
            className="mobile-loyalty-btn"
            onClick={() => setIsOpen(false)}
          >
            <Sparkles size={16} />
            <span>{loggedInUser ? `Hűségkártyám (${loggedInUser.stamps} pecsét)` : 'Digitális Hűségkártya (App / Belépés)'}</span>
          </a>
          <a 
            href="/szalon-admin" 
            className="mobile-admin-link"
            onClick={() => setIsOpen(false)}
          >
            <ShieldCheck size={14} />
            <span>Munkatársi Belépés 🔒</span>
          </a>
        </div>

        <button 
          className="btn btn-primary btn-mobile-nav" 
          onClick={() => {
            setIsOpen(false);
            onOpenBooking();
          }}
        >
          IDŐPONTFOGLALÁS
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
