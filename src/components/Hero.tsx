import { motion } from 'framer-motion';
import heroBg from '../assets/hero_bg.png';
import './Hero.css';

const Hero = () => {
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
          <span className="hero-tagline">Üdvözöllek a Százszorszép Kozmetikában</span>
          <h1 className="hero-title">
            Hosszútávú <br />
            <span>Szépségmegőrzés</span>
          </h1>
          <p className="hero-desc">
            Az egészséges, üde és ragyogó arcbőr mindenkinek jár. Legfőbb misszióm, hogy vendégeim ezt saját bőrükön tapasztalják meg, prémium kezelések és személyre szabott gondoskodás mellett.
          </p>
          <div className="hero-actions">
            <a href="#calculator" className="btn btn-primary">Kezelés-kalkulátor</a>
            <a href="#services" className="btn btn-outline">Szolgáltatások</a>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
