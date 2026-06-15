import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import treatment1 from '../assets/treatment_1.png';
import treatment2 from '../assets/treatment_2.png';
import salonBg from '../assets/hero_bg.png';
import beautician from '../assets/about_beautician.png';
import { X, ZoomIn } from 'lucide-react';
import './Gallery.css';

const galleryItems = [
  {
    id: 'g1',
    img: treatment1,
    title: 'Szépítő arckezelések',
    category: 'Kezelés'
  },
  {
    id: 'g2',
    img: treatment2,
    title: 'Szempilla & Szemöldök lifting',
    category: 'Tekintet'
  },
  {
    id: 'g3',
    img: salonBg,
    title: 'Prémium környezet',
    category: 'Szalon'
  },
  {
    id: 'g4',
    img: beautician,
    title: 'Személyre szabott diagnózis',
    category: 'Konzultáció'
  }
];

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const handleOpen = (img: string, title: string) => {
    setSelectedImg(img);
    setSelectedTitle(title);
  };

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <span className="section-subtitle">Galéria</span>
        <h2 className="section-title">A szalon pillanatai</h2>
        
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <motion.div 
              key={item.id}
              className="gallery-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleOpen(item.img, item.title)}
            >
              <div className="gallery-img-container">
                <img src={item.img} alt={item.title} className="gallery-img" />
                <div className="gallery-overlay">
                  <ZoomIn size={24} className="gallery-zoom-icon" />
                  <span className="gallery-cat-label">{item.category}</span>
                  <h4 className="gallery-card-title">{item.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImg && (
            <motion.div 
              className="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
            >
              <button className="lightbox-close" onClick={() => setSelectedImg(null)}>
                <X size={28} />
              </button>
              
              <motion.div 
                className="lightbox-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={selectedImg} alt={selectedTitle || ''} className="lightbox-img" />
                {selectedTitle && <div className="lightbox-caption">{selectedTitle}</div>}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
