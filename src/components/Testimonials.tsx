import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import './Testimonials.css';

interface TestimonialItem {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  avatarLetter: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: '1',
    name: 'Nóra Kálai',
    treatment: 'Személyre szabott ápolás',
    rating: 5,
    date: 'Setmore Értékelés',
    text: 'Igényes csodaszép környezet, személyre szabott szolgáltatásokkal és egy szuper kedves szakemberrel.',
    verified: true,
    avatarLetter: 'N'
  },
  {
    id: '2',
    name: 'Berényi-Ormándlaky Csenge',
    treatment: 'Kíméletes Gyantázás',
    rating: 5,
    date: 'Setmore Értékelés',
    text: 'Ha lehetne 10 csillagot adni, én annyit adnék! Gyantáztatni járok Rékához, és komolyan mondom, sokszor fel sem tűnik, hogy közben egyáltalán gyantáznak annyira jókat beszélgetünk, hogy mire észbe kapok, már kész is vagyunk. Réka kedves, közvetlen, és mindig jó hangulatot teremt. Szívből ajánlom mindenkinek!',
    verified: true,
    avatarLetter: 'B'
  },
  {
    id: '3',
    name: 'Tanácsné Polyák Annamária',
    treatment: 'Prémium Szalon Ápolás',
    rating: 5,
    date: 'Setmore Értékelés',
    text: 'A legcsodálatosabb ember, kozmetikus Réka🥰 és csodálatos a szalon, fantasztikus szaktudás!!! Mindenkinek ilyen kozmetikust kívánok!🥰',
    verified: true,
    avatarLetter: 'T'
  },
  {
    id: '4',
    name: 'Kristó Judit',
    treatment: 'Arcápolási Kezelések',
    rating: 5,
    date: 'Setmore Értékelés',
    text: 'Rendszeresen járok Rékához arcápolási kezelésre. Mindig feltöltődöm, ellazulok és kisimulok. Szeretem ahogy Réka dolgozik. Precíz, alapos, nyugodt. Réka kozmetikája az a hely, ahová visszavágyik az ember!',
    verified: true,
    avatarLetter: 'K'
  },
  {
    id: '5',
    name: 'Horváth Eszter',
    treatment: 'Szempilla Lifting',
    rating: 5,
    date: 'Setmore Értékelés',
    text: 'Nagyon elégedett vagyok a szempilla lifting eredményével! A saját szempilláim látványosan íveltebbek és hosszabbnak tűnnek, mégis teljesen természetes hatást kaptam. A kezelés kényelmes volt. Mindenkinek ajánlom! 😊',
    verified: true,
    avatarLetter: 'H'
  },
  {
    id: '6',
    name: 'Tari Zsuzsanna',
    treatment: 'Arckontúr & Bőrápolás',
    rating: 5,
    date: 'Setmore Értékelés',
    text: 'Mindenkinek ajánlom, 10 csillag tőlem. 😊 Réka kedvessége, szakértelme és a szalon csodálatos hangulata egyszerűen páratlan.',
    verified: true,
    avatarLetter: 'T'
  },
  {
    id: '7',
    name: 'Túri Ramóna',
    treatment: 'Kozmetikai Kezelés',
    rating: 5,
    date: 'Setmore Értékelés',
    text: 'Egyszerűen tökéletes 😌 szívből ajánlom mindenkinek! 🫶❤️',
    verified: true,
    avatarLetter: 'T'
  },
  {
    id: '8',
    name: 'Erika Cs.Szabó',
    treatment: 'Relaxáló Arckezelés',
    rating: 5,
    date: 'Setmore Értékelés',
    text: 'Jól esett ellazulni Rékánál. Nagyon finom, gondos ápolásban volt részem.',
    verified: true,
    avatarLetter: 'E'
  },
  {
    id: '9',
    name: 'Bagi Erika',
    treatment: 'Kozmetikai Szolgáltatás',
    rating: 5,
    date: 'Setmore Értékelés',
    text: 'Maximálisan elégedett vagyok mind a kezeléssel, mind a szalon környezetével!',
    verified: true,
    avatarLetter: 'B'
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = info.offset.x;
    if (swipe < -40 || info.velocity.x < -200) {
      handleNext();
    } else if (swipe > 40 || info.velocity.x > 200) {
      handlePrev();
    }
  };

  const visibleItems = [0, 1, 2].map(
    (offset) => testimonialsData[(currentIndex + offset) % testimonialsData.length]
  );

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        
        {/* Header Badges */}
        <div className="testimonials-header-block">
          <span className="section-subtitle">Vélemények</span>
          <h2 className="section-title">Vendégeink mondták rólunk</h2>
          
          <div className="trust-rating-badge glass">
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="var(--clr-accent)" color="var(--clr-accent)" />
              ))}
            </div>
            <span className="trust-score">5.0 / 5.0</span>
            <span className="trust-label">• 9 Hivatalos Setmore® Vendégértékelés alapján</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="testimonials-carousel-wrapper">
          <button onClick={handlePrev} className="carousel-nav-btn prev" aria-label="Előző vélemény">
            <ChevronLeft size={22} />
          </button>

          <div className="testimonials-cards-grid">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                className="testimonials-row"
              >
                {visibleItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`testimonial-card glass ${idx === 1 ? 'card-second' : ''} ${idx === 2 ? 'card-third' : ''}`}
                  >
                    <Quote size={32} className="quote-icon" />

                    <div className="testimonial-stars">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="var(--clr-accent)" color="var(--clr-accent)" />
                      ))}
                    </div>

                    <p className="testimonial-text">
                      "{item.text}"
                    </p>

                    <div className="testimonial-footer">
                      <div className="author-avatar">
                        {item.avatarLetter}
                      </div>
                      
                      <div className="author-info">
                        <h4 className="author-name">
                          {item.name}
                          {item.verified && (
                            <CheckCircle2 size={14} className="verified-icon" />
                          )}
                        </h4>
                        <span className="treatment-tag">{item.treatment}</span>
                      </div>
                      
                      <span className="source-tag">{item.date}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={handleNext} className="carousel-nav-btn next" aria-label="Következő vélemény">
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="carousel-dots">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Vélemény ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
