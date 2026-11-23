import React from 'react';
import { Sparkles, Gift, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
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

        {/* Cselekvésre ösztönző CTA Doboz */}
        <div className="loyalty-cta-banner glass">
          <div className="cta-content">
            <div className="cta-text-group">
              <span className="cta-badge">Azonnali Hozzáférés</span>
              <h3 className="cta-heading">Kérd el a digitális kártyádat még ma!</h3>
              <p className="cta-sub">
                Nyisd meg a kártyádat a mobilodban, és kövesd nyomon aktuális pecsétjeidet és ajándékaidat egyetlen érintéssel.
              </p>
            </div>
            <div className="cta-btn-group">
              <a href="/kartya" className="open-card-btn">
                <span>Hűségkártyám Megnyitása</span>
                <ArrowRight size={18} className="btn-arrow-icon" />
              </a>
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
