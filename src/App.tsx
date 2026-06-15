import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Calculator from './components/Calculator';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import './App.css';

function App() {
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleQuoteRequest = (message: string) => {
    setPrefilledMessage(message);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openBooking = () => setIsBookingOpen(true);

  return (
    <div className="app-container">
      <Navbar onOpenBooking={openBooking} />
      <main>
        <Hero onOpenBooking={openBooking} />
        <Services />
        <About />
        <Calculator onQuoteRequest={handleQuoteRequest} onOpenBooking={openBooking} />
        <Gallery />
        <Contact prefilledMessage={prefilledMessage} onOpenBooking={openBooking} />
      </main>
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

export default App;
