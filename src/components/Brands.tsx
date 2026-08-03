import { motion } from 'framer-motion';
import nanomatrixLogo from '../assets/nanomatrix_logo.png';
import mesoticaLogo from '../assets/mesotica_logo.webp';
import theseraLogo from '../assets/thesera_logo.webp';
import './Brands.css';

const Brands = () => {
  const brandList = [
    {
      name: 'Nanomatrix',
      logo: nanomatrixLogo,
      tagline: 'Hyaluron Plasztika és Nanoszálas Technológia',
      desc: 'A Százszorszép Kozmetika legújabb, innovatív termékcsaládja. Nanoszálas technológiája révén rendkívül magas koncentrációban juttatja be az aktív hatóanyagokat a bőr mélyebb rétegeibe.',
      stats: [
        { label: 'Hialuronsav koncentráció', value: '40x' },
        { label: 'Peptid sűrűség', value: '16x' },
        { label: 'Ráncmélység csökkenés', value: '-35%' },
        { label: 'Bőrhidratáltság növekedés', value: '+30%' }
      ],
      bullets: [
        'Azonnali és látványos arcemelés (lifting)',
        'Egységesebb arckontúr, mély és hosszantartó hidratálás',
        'Finom vonalak és ráncok jelentős csökkenése',
        'Erőteljes sejtregeneráló és kollagén stimuláló hatás'
      ]
    },
    {
      name: 'Mesotica',
      logo: mesoticaLogo,
      tagline: 'Intelligens Peptid Koncepció',
      desc: 'Az elsődleges szakmai márkánk, amellyel immár 10 éve szépítjük vendégeinket. Kiválóan kombinálható, személyre szabott peptid-technológia.',
      details: 'A termékek teljesen parabénmentesek, bőrbarát összetételűek és innovatív hatóanyagokkal rendelkeznek. Különlegessége, hogy a magas minőségű peptidek megfelelő kombinációjával minden bőrprobléma eredményesen és tartósan kezelhető.',
      bullets: [
        '100% parabénmentes és bőrbarát formulák',
        'Személyre szabottan kombinálható hatóanyagok',
        'Célzott megoldás minden bőrproblémára',
        'Garantáltan tartós és látványos eredmények'
      ]
    },
    {
      name: 'Thesera',
      logo: theseraLogo,
      tagline: 'Koreai Csúcstechnológia és TDN Rendszer',
      desc: 'Különleges és innovatív koreai professzionális termékcsalád, amely a modern orvostudomány kutatásait ötvözi a kozmetikai kezelésekkel.',
      details: 'A Thesera kezeléseinek titka a szabadalmaztatott, egyedülálló TDN vivőrendszer. Ennek segítségével a hatóanyagok teljesen fájdalommentesen jutnak el a bőr mélyebb rétegeibe, így a kezelések során elért tökéletes bőrstruktúra sokkal hosszabb ideig tartható fenn.',
      bullets: [
        'Szabadalmaztatott TDN vivőrendszer',
        'Fájdalommentes és tű nélküli mélyrehatás',
        'Orvostudományi kutatásokon alapuló technológia',
        'Hosszan tartó tökéletes bőrstruktúra'
      ]
    }
  ];

  return (
    <section id="brands" className="section brands-section">
      <div className="container">
        <h2 className="section-title">Professzionális Márkáink</h2>
        
        <p className="brands-intro-text">
          Kezeléseink során kizárólag a legmagasabb minőségű, klinikailag igazolt hatású professzionális termékeket alkalmazzuk, hogy bőröd a legkorszerűbb és legbiztonságosabb gondoskodást kapja.
        </p>

        <div className="brands-grid">
          {brandList.map((brand, index) => (
            <motion.div 
              key={brand.name}
              className="brand-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="brand-header">
                {brand.logo ? (
                  <div className="brand-logo-container">
                    <img src={brand.logo} alt={brand.name} className="brand-logo-img" />
                  </div>
                ) : (
                  <h3 className="brand-name">{brand.name}</h3>
                )}
                <span className="brand-tagline">{brand.tagline}</span>
              </div>
              
              <div className="brand-body">
                <p className="brand-desc-text">{brand.desc}</p>
                
                {brand.stats && (
                  <div className="brand-stats-grid">
                    {brand.stats.map((stat) => (
                      <div key={stat.label} className="brand-stat-item">
                        <span className="brand-stat-value">{stat.value}</span>
                        <span className="brand-stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {brand.details && (
                  <p className="brand-details-text">{brand.details}</p>
                )}

                <ul className="brand-bullets">
                  {brand.bullets.map((bullet, idx) => (
                    <li key={idx} className="brand-bullet-item">
                      <span className="bullet-dot"></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
