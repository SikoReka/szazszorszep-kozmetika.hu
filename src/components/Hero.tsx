import { motion } from 'framer-motion';
import heroBg from '../assets/hero_bg.webp';
import './Hero.css';

interface HeroProps {
  onOpenBooking: () => void;
}

const Hero = ({ onOpenBooking }: HeroProps) => {
  return (
    <header id="home" className="hero-section">
      <div className="hero-bg-wrapper">
        <img src={heroBg} alt="Szalon háttér" className="hero-bg-img" />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="hero-tagline">ÜDVÖZÖLLEK A SZÁZSZORSZÉP KOZMETIKÁBAN</span>
          <h1 className="hero-title">
            HOSSZÚTÁVÚ <br />
            <span>Szépségmegőrzés</span>
          </h1>
          <p className="hero-desc">
            Az egészséges, üde és ragyogó arcbőr mindenkinek jár. Legfőbb misszióm, hogy vendégeim ezt saját bőrükön tapasztalják meg, prémium kezelések és személyre szabott gondoskodás mellett.
          </p>
          <div className="hero-actions">
            <button onClick={onOpenBooking} className="btn btn-accent">ONLINE</button>
            <a href="#calculator" className="btn btn-outline">KEZELÉS-KALKULÁTOR</a>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
