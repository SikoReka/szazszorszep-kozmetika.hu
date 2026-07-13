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
          <span className="hero-tagline">Örülök, hogy itt vagy.</span>
          <h1 className="hero-title">
            Üdvözöllek a <br />
            <span>Százszorszép Kozmetikában</span>
          </h1>
          <p className="hero-desc">
            Hiszem, hogy a szépség a gondoskodással kezdődik. A Százszorszép Kozmetikában minden Rólad szól: a személyre szabott figyelemről, a professzionális szakértelemről és arról a nyugalomról, amelyre a rohanó hétköznapokban mindannyiunknak szüksége van. A célom, hogy a nálunk töltött idő ne csupán egy kozmetikai kezelés legyen, hanem egy feltöltő élmény, ahol bőröd megkapja a számára legmegfelelőbb ápolást, Te pedig kipihenve, mosolyogva és magabiztosabban térsz haza. Várlak szeretettel!
          </p>
          <div className="hero-actions">
            <button onClick={onOpenBooking} className="btn btn-accent">ONLINE</button>
            <a href="#treatments" className="btn btn-outline">KEZELÉSEK</a>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
