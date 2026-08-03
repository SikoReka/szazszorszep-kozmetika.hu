import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

// Import all gallery images dynamically
const imageModules = import.meta.glob('../assets/gallery/*.webp', { eager: true, as: 'url' });
const galleryImages = Object.values(imageModules).map((mod: any) => mod.default || mod);
// Load workshop pictures
const pictureModules = import.meta.glob('../assets/pictures/*.{png,jpg,webp}', { eager: true, as: 'url' });
const pictureImages = Object.values(pictureModules).map((mod: any) => mod.default || mod);

const Gallery = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'salon' | 'treatment' | 'workshop'>('all');
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = [
    { id: 'all', name: 'Összes' },
    { id: 'salon', name: 'Szalon' },
    { id: 'treatment', name: 'Kezelések' },
    { id: 'workshop', name: 'Workshopok' }
  ];

  // Map the raw image URLs into structured gallery items
  const galleryItems = [];
  // Salon & treatment images (default to salon category)
  galleryImages.forEach((img, index) => {
    let title = 'Prémium szalon belső';
    if (index === 0) title = 'Elegáns kezelősarok';
    else if (index === 1) title = 'Professzionális hatóanyagok';
    else if (index === 2) title = 'Nyugtató környezet';
    else if (index === 3) title = 'Személyre szabott kezelés';
    else if (index === 4) title = 'Modern berendezés';
    else if (index === 5) title = 'Nanomatrix technológia';
    else if (index === 6) title = 'Szépítő részletek';
    else if (index === 7) title = 'Mesotica bőrápolás';
    else if (index === 8) title = 'Tiszta és harmonikus terek';
    else if (index === 9) title = 'Thesera arckontúrozás';
    else if (index === 10) title = 'Exkluzív szépítő sarok';
    else if (index === 11) title = 'Klinikailag igazolt bőrápolás';
    else if (index === 12) title = 'Kényelem és relaxáció';

    galleryItems.push({
      id: `g-${index}`,
      img,
      category: 'salon',
      categoryLabel: 'Szalon',
      title,
    });
  });
  // Workshop pictures
  pictureImages.forEach((img, idx) => {
    const wIdx = galleryItems.length + idx;
    galleryItems.push({
      id: `w-${idx}`,
      img,
      category: 'workshop',
      categoryLabel: 'Workshop',
      title: 'Workshop kép',
    });
  });

  const filteredItems = galleryItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = filteredItems.length > visibleCount;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIdx(prev => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIdx(prev => (prev !== null ? (prev + 1) % filteredItems.length : null));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setSelectedIdx(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, filteredItems]);

  const handleOpen = (imgUrl: string) => {
    const idx = filteredItems.findIndex(item => item.img === imgUrl);
    if (idx !== -1) {
      setSelectedIdx(idx);
    }
  };

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <span className="section-subtitle" style={{ display: 'block', textAlign: 'center', marginBottom: '15px' }}>Galéria</span>
        <h2 className="section-title">A szalon pillanatai</h2>
        
        {/* Category Filters */}
        <div className="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(cat.id as any);
                setVisibleCount(8); // Reset count on filter change
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item) => (
              <motion.div 
                layout
                key={item.id}
                className="gallery-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleOpen(item.img)}
              >
                <div className="gallery-img-container">
                  <img src={item.img} alt={item.title} className="gallery-img" loading="lazy" />
                  <div className="gallery-overlay">
                    <ZoomIn size={28} className="gallery-zoom-icon" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More Button */}
        {hasMore && (
          <div className="gallery-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <button onClick={handleShowMore} className="btn btn-outline show-more-btn">
              <span>További képek</span>
              <ChevronDown size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
          >
            <button className="lightbox-close" onClick={() => setSelectedIdx(null)} aria-label="Bezárás">
              <X size={28} />
            </button>
            
            <button className="lightbox-nav-btn prev" onClick={handlePrev} aria-label="Előző kép">
              <ChevronLeft size={36} />
            </button>
            
            <motion.div 
              className="lightbox-content"
              key={selectedIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={filteredItems[selectedIdx].img} alt={filteredItems[selectedIdx].title} className="lightbox-img" />
            </motion.div>

            <button className="lightbox-nav-btn next" onClick={handleNext} aria-label="Következő kép">
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
