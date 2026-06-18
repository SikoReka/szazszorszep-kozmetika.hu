import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoFektetett from '../assets/logo_fektetett.svg';
import './Navbar.css';

interface NavbarProps {
  onOpenBooking: () => void;
}

const Navbar = ({ onOpenBooking }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Kezdőlap', href: '#home' },
    { name: 'Szolgáltatások', href: '#services' },
    { name: 'Filozófiám', href: '#about' },
    { name: 'Kalkulátor', href: '#calculator' },
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
