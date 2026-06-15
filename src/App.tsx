import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Calculator from './components/Calculator';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [prefilledMessage, setPrefilledMessage] = useState('');

  const handleQuoteRequest = (message: string) => {
    setPrefilledMessage(message);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Calculator onQuoteRequest={handleQuoteRequest} />
        <Gallery />
        <Contact prefilledMessage={prefilledMessage} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
