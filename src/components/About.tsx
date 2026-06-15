import { motion } from 'framer-motion';
import beauticianImg from '../assets/about_beautician.png';
import './About.css';

const About = () => {
  const values = [
    {
      title: 'Bőrdiagnózis',
      desc: 'Minden kezelést alapos bőrállapot-felméréssel indítunk, hogy pontosan a bőre igényeinek megfelelő hatóanyagokat válasszuk ki.'
    },
    {
      title: 'Prémium Anyagok',
      desc: 'Kizárólag magas minőségű, klinikailag igazolt hatású, tiszta professzionális termékekkel és eljárásokkal dolgozom.'
    },
    {
      title: 'Szakértelem',
      desc: 'Folyamatosan képzem magam az új technológiák és trendek terén, hogy a legmodernebb esztétikai megoldásokat nyújthassam.'
    },
    {
      title: 'Csend és Nyugalom',
      desc: 'A szalonban töltött idő nemcsak a bőr szépüléséről, hanem a lélek teljes ellazulásáról és a mindennapi stressz elengedéséről szól.'
    }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          
          {/* Image Column */}
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <img src={beauticianImg} alt="Sikó Réka kozmetikus" className="about-img" />
            <div className="about-img-border"></div>
          </motion.div>

          {/* Text Column */}
          <div className="about-content">
            <span className="section-subtitle">Bemutatkozás</span>
            <h2 className="about-title">A Filozófiám</h2>
            
            <p className="about-lead-text">
              Az egészséges, üde és ragyogó arcbőr mindenkinek jár, ezért a legfőbb misszióm, hogy a vendégeim ezt egytől egyig saját bőrükön tapasztalják.
            </p>
            
            <p className="about-desc">
              A bőrtípus, a pillanatnyi bőrállapot és a mögöttes információk alapján felépíteni egy diagnózist, majd a megfelelő hatóanyag- és termékismeret, valamint az egyéni adottságok és igények mentén megoldást találni az adott problémára a munkám legfontosabb célja. Várom szeretettel mórahalmi szalonomba!
            </p>

            <div className="about-values-grid">
              {values.map((val, index) => (
                <motion.div 
                  key={val.title}
                  className="value-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h4 className="value-title">{val.title}</h4>
                  <p className="value-desc">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
