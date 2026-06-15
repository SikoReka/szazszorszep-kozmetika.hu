import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Services.css';

export interface ServiceItem {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number; // in HUF
  desc: string;
  category: string;
}

export const servicesData: ServiceItem[] = [
  // Arckezelések
  {
    id: 'szazszorszep-ritual',
    name: 'Százszorszép Rituálé',
    duration: 90,
    price: 19900,
    desc: 'Test- és lélekfiatalító, teljesen személyre szabott arckezelés mélytisztítással, relaxáló masszázzsal és prémium hatóanyagokkal.',
    category: 'arckezeles'
  },
  {
    id: 'thesera-lifting',
    name: 'Thesera Fájdalommentes Arclifting',
    duration: 75,
    price: 28000,
    desc: 'Bőrfiatalító, lifting hatású kezelés speciális felszívódó kollagén szálakkal a megereszkedett arckontúrok látványos megemelésére.',
    category: 'arckezeles'
  },
  {
    id: 'mezopen-therapy',
    name: 'Mezopen Mikrotűs Terápia',
    duration: 60,
    price: 22000,
    desc: 'Kollagénindukciós bőrfiatalító és bőrregeneráló kezelés, mely finomítja a ráncokat, hegeket és feszesíti a bőrfelszínt.',
    category: 'arckezeles'
  },
  {
    id: 'microdermabrasion',
    name: 'Mikrodermabráziós Bőrmegújítás',
    duration: 45,
    price: 12000,
    desc: 'Kíméletes gyémántfejes csiszolás a felhalmozódott elhalt hámsejtek eltávolítására, a pórusok tisztítására és a bőr ragyogásáért.',
    category: 'arckezeles'
  },
  
  // Szem & Szemöldök
  {
    id: 'nctf-eye',
    name: 'NCTF 135HA Nanosoft™ Szemkörnyékápolás',
    duration: 45,
    price: 18500,
    desc: 'Speciális nanotűs bőrfiatalító rituálé a szem alatti sötét karikák, fáradtság jelei és az apró szarkalábak látványos csökkentésére.',
    category: 'szem'
  },
  {
    id: 'lash-lift',
    name: 'Szempilla Lifting & Tartós Festés',
    duration: 60,
    price: 9500,
    desc: 'A saját szempillák tőtől való megemelése és ívesítése, mely hetekig tartó igéző és nyitott tekintetet biztosít sminkelés nélkül.',
    category: 'szem'
  },
  {
    id: 'brow-lamination',
    name: 'Szemöldök Laminálás & Formázás',
    duration: 45,
    price: 8500,
    desc: 'A szemöldökszálak tartós formába igazítása és fixálása, ami dúsabb, szimmetrikusabb és rendezettebb megjelenést kölcsönöz.',
    category: 'szem'
  },
  
  // IPL & Szőrtelenítés
  {
    id: 'ipl-rejuvenation',
    name: 'IPL Fotorejuvenáció (Arc)',
    duration: 50,
    price: 15000,
    desc: 'Intenzív pulzáló fénnyel (IPL) végzett kezelés a pigmentfoltok, tágult erek és napfény okozta öregedési jelek eltüntetésére.',
    category: 'ipl'
  },
  {
    id: 'ipl-hair-face',
    name: 'IPL Tartós Szőrtelenítés (Arc)',
    duration: 20,
    price: 7000,
    desc: 'Biztonságos és tartós szőrtelenítés az áll, bajusz vagy pajesz területein villanófényes technológiával.',
    category: 'ipl'
  },
  {
    id: 'ipl-hair-underarm',
    name: 'IPL Tartós Szőrtelenítés (Hónalj)',
    duration: 15,
    price: 8500,
    desc: 'Sima és gondtalan hónalj tartós villanófényes szőrtelenítéssel. Gyors, higiénikus és rendkívül eredményes.',
    category: 'ipl'
  }
];

const categories = [
  { id: 'all', name: 'Összes kezelés' },
  { id: 'arckezeles', name: 'Arckezelések' },
  { id: 'szem', name: 'Szem & Szemöldök' },
  { id: 'ipl', name: 'IPL & Szőrtelenítés' }
];

const Services = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredServices = activeTab === 'all' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeTab);

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <span className="section-subtitle">Szolgáltatások</span>
        <h2 className="section-title">Kényeztetés & Esztétika</h2>
        
        {/* Category Tabs */}
        <div className="services-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid / List */}
        <div className="services-list-wrapper">
          <motion.div 
            className="services-list"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div 
                  key={service.id}
                  className="service-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div className="service-header">
                    <h3 className="service-name">{service.name}</h3>
                    <div className="service-leader-dots"></div>
                    <span className="service-price">
                      {service.price.toLocaleString('hu-HU')} Ft
                    </span>
                  </div>
                  <div className="service-meta">
                    <span className="service-duration">{service.duration} perc</span>
                  </div>
                  <p className="service-desc">{service.desc}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="services-cta">
          <p>Nem biztos benne, melyik kezelés a legmegfelelőbb Önnek?</p>
          <a href="#calculator" className="btn btn-outline">Tervezze meg kezelését</a>
        </div>
      </div>
    </section>
  );
};

export default Services;
