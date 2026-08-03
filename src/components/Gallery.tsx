import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

// Import all gallery images dynamically
const imageModules = import.meta.glob('../assets/gallery/*.webp', { eager: true, as: 'url' });
const galleryImages = Object.values(imageModules).map((mod: any) => mod.default || mod);

// Load workshop pictures
const pictureModules = import.meta.glob('../assets/pictures/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true, as: 'url' });
const pictureImages = Object.values(pictureModules).map((mod: any) => mod.default || mod);

const Gallery: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'salon' | 'workshop'>('all');
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = [
    { id: 'all', name: 'Összes' },
    { id: 'salon', name: 'Szalon' },
    { id: 'workshop', name: 'Workshopok' }
  ];

  // Map the raw image URLs into structured gallery items
  const galleryItems: any[] = [];

  // Salon images
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
    galleryItems.push({
      id: `w-${idx}`,
      img,
      category: 'workshop',
      categoryLabel: 'Workshop',
      title: 'Sminkelő Workshop',
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

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = info.offset.x;
    if (swipe < -50 || info.velocity.x < -200) {
      handleNext();
    } else if (swipe > 50 || info.velocity.x > 200) {
      handlePrev();
    }
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

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        
        {/* Header Block */}
        <div className="gallery-header-block">
          <span className="section-subtitle">Galéria</span>
          <h2 className="section-title">A Szalon Pillanatai</h2>
        </div>

        {/* Category Filters */}
        <div className="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(cat.id as any);
                setVisibleCount(8);
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <motion.div layout className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="gallery-card glass"
                onClick={() => handleOpen(item.img)}
              >
                <div className="gallery-img-wrapper">
                  <img src={item.img} alt={item.title} className="gallery-img" loading="lazy" />
                  <div className="gallery-overlay">
                    <div className="overlay-icon">
                      <ZoomIn size={24} />
                    </div>
                    <span className="overlay-category">{item.categoryLabel}</span>
                    <h3 className="overlay-title">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <div className="gallery-more-wrapper">
            <button onClick={() => setVisibleCount(prev => prev + 6)} className="btn btn-outline">
              <span>További képek betöltése</span>
              <ChevronDown size={16} />
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {selectedIdx !== null && filteredItems[selectedIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setSelectedIdx(null)}
          >
            {/* Top Bar with Counter and Close */}
            <div className="lightbox-top-bar" onClick={(e) => e.stopPropagation()}>
              <span className="lightbox-counter">
                {selectedIdx + 1} / {filteredItems.length} kép
              </span>
              <button className="lightbox-close" onClick={() => setSelectedIdx(null)} aria-label="Bezárás">
                <X size={26} />
              </button>
            </div>

            {/* Nav Prev */}
            <button className="lightbox-nav prev" onClick={handlePrev} aria-label="Előző kép">
              <ChevronLeft size={36} />
            </button>

            {/* Main Lightbox Content with Drag Swipe */}
            <motion.div
              key={selectedIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-img-container">
                <img
                  src={filteredItems[selectedIdx].img}
                  alt={filteredItems[selectedIdx].title}
                  className="lightbox-img"
                />
              </div>
              
              <div className="lightbox-caption">
                <span className="lightbox-category">{filteredItems[selectedIdx].categoryLabel}</span>
                <h3 className="lightbox-title">{filteredItems[selectedIdx].title}</h3>
              </div>
            </motion.div>

            {/* Nav Next */}
            <button className="lightbox-nav next" onClick={handleNext} aria-label="Következő kép">
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;
