import { motion as motionClient } from 'framer-motion';
import rekaImg from '../assets/about_reka.webp';
import csillaImg from '../assets/about_csilla.webp';
import orsiImg from '../assets/about_orsi.webp';
import './About.css';

const About = () => {
  const members = [
    {
      id: 'reka',
      name: 'Sikó Réka',
      role: 'Kozmetikus mester, a Százszorszép Kozmetika alapítója',
      lead: 'Közel két évtizede, immár 18 éve dolgozom kozmetikusként. Számomra ez a hivatás sokkal több, mint egy szakma – a szenvedélyem, amelyet minden egyes nap egyre nagyobb örömmel és elkötelezettséggel végzek.',
      desc: 'Hiszem, hogy minden bőr egyedi, minden vendég különleges, és minden kezelés egy új lehetőség arra, hogy valaki magabiztosabban, szebben és feltöltődve távozzon. Számomra a legnagyobb siker nem csupán a látványos eredmény, hanem az a mosoly, amellyel a vendégeim kilépnek az ajtón – könnyedebben, nyugodtabban és elégedetten.\n\n2018-ban kozmetikus mester lettem, így a vendégek szépítése mellett a tudás átadása is életem meghatározó részévé vált. Hiszem, hogy a folyamatos fejlődés és a szakmai alázat elengedhetetlen ahhoz, hogy mindig a legjobbat adhassam. Éppen ezért folyamatosan képzem magam, figyelemmel kísérem a legújabb technológiákat, innovatív kezeléseket és professzionális hatóanyagokat, hogy vendégeim mindig a legkorszerűbb, leghatékonyabb és legbiztonságosabb megoldásokban részesüljenek.',
      img: rekaImg,
      showValues: true
    },
    {
      id: 'csilla',
      name: 'Dr. Dézsi Csilla',
      role: 'Esztétikai orvoslás szakértő',
      lead: 'Orvosként végeztem, emellett megszereztem a walesi USW MSc Cosmetic Medicine és az American Academy of Aesthetic Medicine szakvizsgát. Fontosnak tartom, hogy a szépészeti beavatkozásokat tudományos alapossággal, biztonságosan végezzem.',
      desc: 'Saját rendelőimben, a dobozi Boxmedicalban és a szegedi International Aesthetics-ben nap mint nap azon dolgozom, hogy a pácienseim magabiztosabbak legyenek, amikor tükörbe néznek.\n\nSzakterületem a botox, azon belül is a prémium Dysporttal dolgozom. Imádom, mert elképesztően hálás anyag értő kezekben: pár nap alatt kisimítja a mérges ráncokat vagy a szarkalábakat, de közben megmarad a saját arcjáték is. Nem megváltoztatni akarlak benneteket, csak visszavezetni a korábbi, gondtalanabb énetekhez.\n\nBár a botox a szívem csücske, hoztam magammal a teljes eszköztáramat: hialuronsav volumennöveléshez és hidratáláshoz, CO2 lézer a bőrszerkezet javításához, microneedling, PRP vámpír lifting, toka- és orca-lógás kezelése, valamint a makacs zsírpárnák elleni Morpheus 8 technológia.',
      img: csillaImg,
      showValues: false
    },
    {
      id: 'orsolya',
      name: 'Kovács-Diószegi Orsolya',
      role: 'Kozmetikus és sminkes',
      lead: 'Már tanulóéveim alatt elköteleződtem a sminkelés világa iránt, így már akkor elvégeztem az első sminkes tanfolyamomat. Hamar világossá vált számomra, hogy ez a terület számomra nem csupán egy szakma, hanem valódi szenvedély és hivatás.',
      desc: 'Tudásomat folyamatosan fejlesztem: vezető sminkeseknél vettem részt szakmai képzéseken, versenyeken mérettettem meg magam, valamint elvégeztem a sminkes mesterképzést is. A Százszorszép Kozmetikában önsminkelő tanfolyamokat és szakmai képzéseket tartok mindazoknak, akik szeretnék elmélyíteni tudásukat, vagy magabiztosabban szeretnének eligazodni a sminkelés világában.',
      img: orsiImg,
      showValues: false
    }
  ];

  const values = [
    {
      title: 'Személyre szabott bőrdiagnosztika',
      desc: 'Minden kezelést részletes bőrdiagnosztikával kezdek, hiszen csak így tudom pontosan meghatározni, mire van szüksége a bőrödnek az adott pillanatban.'
    },
    {
      title: 'Prémium minőségű termékek',
      desc: 'Kizárólag magas minőségű, klinikailag igazolt, professzionális kozmetikumokkal dolgozom, amelyek biztonságosan és hatékonyan támogatják bőröd egészségét.'
    },
    {
      title: 'Naprakész szakértelem',
      desc: 'A folyamatos továbbképzéseknek köszönhetően mindig a legújabb technológiákat és kezelési eljárásokat alkalmazom.'
    },
    {
      title: 'Több mint egy kezelés',
      desc: 'A Százszorszépben eltöltött idő a bőröd mellett a lelkedről is szól. Fontos számomra, hogy kiszakadj a rohanásból, ellazulj, feltöltődj, és egy olyan helyről távozz, ahol valóban figyeltek rád.'
    }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <span className="section-subtitle" style={{ display: 'block', textAlign: 'center', marginBottom: '15px' }}>Bemutatkozás</span>
        <h2 className="about-main-title" style={{ textAlign: 'center', marginBottom: '80px', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '2.8rem', color: 'var(--clr-primary)', fontWeight: '400' }}>Munkatársaink</h2>

        <div className="about-members-list">
          {members.map((member, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={member.id} className={`about-member-row ${isEven ? '' : 'reverse'}`}>
                
                {/* Image Column */}
                <motionClient.div 
                  className="about-image-wrapper"
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="about-image-container">
                    <img src={member.img} alt={member.name} className="about-img" />
                  </div>
                  <div className="about-img-border"></div>
                </motionClient.div>

                {/* Text Column */}
                <motionClient.div 
                  className="about-content"
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="about-bio-name">{member.name}</h3>
                  <span className="about-bio-role">{member.role}</span>
                  
                  <p className="about-lead-text">
                    {member.lead}
                  </p>
                  
                  <div className="about-desc">
                    {member.desc.split('\n\n').map((para, i) => (
                      <p key={i} style={{ marginBottom: i < 1 ? '15px' : '0' }}>{para}</p>
                    ))}
                  </div>

                  {/* Value items - render only for Reka */}
                  {member.showValues && (
                    <div className="about-values-grid">
                      {values.map((val, idx) => (
                        <motionClient.div 
                          key={val.title}
                          className="value-item"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                          <h4 className="value-title">{val.title}</h4>
                          <p className="value-desc">{val.desc}</p>
                        </motionClient.div>
                      ))}
                    </div>
                  )}
                </motionClient.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
