import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Brands from './components/Brands';
import Treatments from './components/Treatments';
import LoyaltySection from './components/LoyaltySection';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import LoyaltyCard from './components/LoyaltyCard';
import SalonAdmin from './components/SalonAdmin';
import './App.css';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openBooking = () => setIsBookingOpen(true);

  // Útvonal-választó
  if (currentPath === '/kartya' || currentPath === '/klub') {
    return <LoyaltyCard />;
  }

  if (currentPath === '/szalon-admin' || currentPath === '/admin') {
    return <SalonAdmin />;
  }

  return (
    <div className="app-container">
      <Navbar onOpenBooking={openBooking} />
      <main>
        <Hero onOpenBooking={openBooking} />
        <About />
        <Brands />
        <Treatments onOpenBooking={openBooking} />
        <LoyaltySection />
        <Testimonials />
        <Gallery />
        <Contact onOpenBooking={openBooking} />
      </main>
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

export default App;
