import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, Smartphone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { InstallAppModal } from './InstallAppModal';
import './LoyaltySection.css';

export const LoyaltySection: React.FC = () => {
  return (
    <section id="loyalty" className="section loyalty-section">
      <div className="container">
        
        {/* Fejléc */}
        <div className="loyalty-header-block text-center">
          <div className="luxury-pill">
            <Sparkles size={14} />
            <span>Exkluzív Törzsvendég Program</span>
          </div>
          <h2 className="section-title">Százszorszép Hűségkártya</h2>
          <p className="section-description">
            Értékeljük a hűségedet! Csatlakozz prémium klubunkhoz ingyenesen, gyűjts digitális 
            pecséteket kezeléseid után, és élvezd az exkluzív kedvezményeket és ajándékokat.
          </p>
        </div>

        {/* 3 Lépéses folyamat */}
        <div className="loyalty-steps-grid">
          
          <motion.div 
            whileHover={{ y: -6 }}
            className="loyalty-step-card glass"
          >
            <div className="step-number-badge">1</div>
            <div className="step-icon-circle">
              <Smartphone size={28} />
            </div>
            <h3 className="step-title">1 Kattintásos Csatlakozás</h3>
            <p className="step-desc">
              Nem kell plasztikkártyát cipelned. Jelentkezz be biztonságosan Google fiókoddal, 
              és azonnal a telefonodon lesz a személyre szabott kártyád.
            </p>
            <span className="step-sub-note">0 Ft havidíj • Bármikor elérhető</span>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6 }}
            className="loyalty-step-card glass highlighted-step"
          >
            <div className="step-number-badge">2</div>
            <div className="step-icon-circle">
              <Sparkles size={28} />
            </div>
            <h3 className="step-title">Pecsétgyűjtés a Szalonban</h3>
            <p className="step-desc">
              Minden kezelés alkalmával mutasd fel a digitális kártyádon lévő egyedi QR-kódot. 
              Kozmetikusod lecsippantja, és azonnal jóváírja az új pecsétedet.
            </p>
            <span className="step-sub-note">Valós idejű szinkronizáció</span>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6 }}
            className="loyalty-step-card glass"
          >
            <div className="step-number-badge">3</div>
            <div className="step-icon-circle">
              <Gift size={28} />
            </div>
            <h3 className="step-title">Kényeztető Ajándékok</h3>
            <p className="step-desc">
              10 pecsét összegyűjtése után azonnali 15% kedvezményt kapsz a következő 
              kezelésedből, vagy prémium ajándék masszázst választhatsz!
            </p>
            <span className="step-sub-note">Folyamatosan megújuló jutalmak</span>
          </motion.div>

        </div>

        {/* Cselekvésre ösztönző CTA Doboz */}
        <div className="loyalty-cta-banner glass">
          <div className="cta-content">
            <div className="cta-text-group">
              <span className="cta-badge">Azonnali Hozzáférés</span>
              <h3 className="cta-heading">Kérd el a digitális kártyádat még ma!</h3>
              <p className="cta-sub">
                Tedd ki a telefonod kezdőképernyőjére, és kövesd nyomon aktuális pecsétjeidet egyetlen érintéssel.
              </p>
            </div>
            <div className="cta-btn-group">
              <a href="/kartya" className="open-card-btn">
                <span>Hűségkártyám Megnyitása</span>
                <ArrowRight size={18} className="btn-arrow-icon" />
              </a>
              <div className="cta-install-sub">
                <InstallAppModal appName="Százszorszép Hűségkártya" />
              </div>
            </div>
          </div>
          
          <div className="cta-trust-row">
            <div className="trust-item">
              <CheckCircle2 size={16} />
              <span>Nem foglal helyet a táskádban</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={16} />
              <span>Biztonságos és kényelmes</span>
            </div>
            <div className="trust-item">
              <Gift size={16} />
              <span>Garantált meglepetések</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LoyaltySection;
