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
    name: 'Kovács Viktória',
    treatment: 'Százszorszép Rituálé',
    rating: 5,
    date: 'Google Értékelés',
    text: 'Rékánál járni mindig igazi testi-lelki feltöltődés! A Százszorszép rituálé után a bőröm csodálatosan puha és ragyogó lett, az arc- és dekoltázsmasszázs pedig valami mennyei. Csak ajánlani tudom mindenkinek!',
    verified: true,
    avatarLetter: 'K'
  },
  {
    id: '2',
    name: 'Nagy-Horváth Eszter',
    treatment: 'Hollywood Thermage 3D',
    rating: 5,
    date: 'Google Értékelés',
    text: 'A Thermage kezelés hatása már az első alkalom után szembetűnő volt. A finom ráncaim kisimultak, a kontúrjaim sokkal feszesebbek lettek. Nagyon professzionális a környezet és a szakértelem!',
    verified: true,
    avatarLetter: 'N'
  },
  {
    id: '3',
    name: 'Dr. Molnár Beatrix',
    treatment: 'EMSella Medencefenék-Rehabilitáció',
    rating: 5,
    date: 'Facebook Értékelés',
    text: 'Hihetetlenül hálás vagyok az EMSella kezelésért! Diszkrét, kényelmes és ami a legfontosabb: valóban működik. Már a kúra felénél éreztem a látványos változást. Minden nőnek szívből ajánlom!',
    verified: true,
    avatarLetter: 'M'
  },
  {
    id: '4',
    name: 'Szabó-Tóth Andrea',
    treatment: 'Prémium Botox & Ajaktöltés',
    rating: 5,
    date: 'Google Értékelés',
    text: 'Dr. Dézsi Csillánál voltam botox és ajaktöltés kezelésen. Nagyon izgultam, de az eredmény annyira természetes és elegáns lett, hogy azóta mindenki azt kérdezi, hol kipihentem ki magam ennyire!',
    verified: true,
    avatarLetter: 'S'
  },
  {
    id: '5',
    name: 'Balogh Dóra',
    treatment: 'Elysion Pro Lézeres Szőrtelenítés',
    rating: 5,
    date: 'Facebook Értékelés',
    text: 'Fájdalommentes és elképesztően hatékony! Már az első 2-3 alkalom után alig nőtt vissza szőrszál. Réka kedvessége, figyelmessége és a szalon tisztasága, eleganciája 10/10.',
    verified: true,
    avatarLetter: 'B'
  },
  {
    id: '6',
    name: 'Varga Klára',
    treatment: 'Thesera Arclifting & Nanosoft',
    rating: 5,
    date: 'Google Értékelés',
    text: 'Fájdalommentes bőrmegújítás, ami tényleg látványos! A bőröm rugalmas és kisimult lett, a szalon hangulata pedig végtelenül megnyugtató. Biztosan törzsvendég maradok.',
    verified: true,
    avatarLetter: 'V'
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
            <span className="trust-label">• Google & Facebook Értékelések alapján</span>
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
