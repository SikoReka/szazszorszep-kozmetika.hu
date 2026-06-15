import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Check } from 'lucide-react';
import './Contact.css';

interface ContactProps {
  prefilledMessage: string;
  onOpenBooking: () => void;
}

const Contact = ({ prefilledMessage, onOpenBooking }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Prefill message when it changes (from Calculator)
  useEffect(() => {
    if (prefilledMessage) {
      setFormData(prev => ({
        ...prev,
        message: prefilledMessage
      }));
    }
  }, [prefilledMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    
    // Simulate sending
    console.log("Submitting contact request:", formData);
    setSubmitted(true);
    
    // Reset form after a delay (except submission state)
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <span className="section-subtitle">Kapcsolat</span>
        <h2 className="section-title">Bejelentkezés</h2>
        
        <div className="contact-grid">
          
          {/* Details & Map Column */}
          <div className="contact-info">
            <h3 className="contact-column-title">Elérhetőségek</h3>
            
            <div className="contact-details">
              <div className="detail-item">
                <MapPin className="detail-icon" size={20} />
                <div className="detail-text">
                  <h5>Címünk</h5>
                  <p>6782 Mórahalom, Kisvasút u. 9.</p>
                </div>
              </div>

              <div className="detail-item">
                <Phone className="detail-icon" size={20} />
                <div className="detail-text">
                  <h5>Telefon</h5>
                  <p><a href="tel:+36203912199">+36 20 391 2199</a></p>
                </div>
              </div>

              <div className="detail-item">
                <Mail className="detail-icon" size={20} />
                <div className="detail-text">
                  <h5>E-mail</h5>
                  <p><a href="mailto:rekasiko78@gmail.com">rekasiko78@gmail.com</a></p>
                </div>
              </div>

              <div className="detail-item">
                <Clock className="detail-icon" size={20} />
                <div className="detail-text">
                  <h5>Nyitvatartás</h5>
                  <p>Hétfőtől péntekig: 9:00 - 17:00<br />Szombat - Vasárnap: Zárva</p>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="contact-map">
              <iframe 
                title="Százszorszép Kozmetika Térkép"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2764.08833924375!2d19.8860269769352!3d46.20818298357731!2m3!1f0!2f0!3f0!3m2!1i1024|2i768|4f13.1!3m3!1m2!1s0x4743ee80d32bb5ff%3A0xe5f807d2130ea8c8!2zTcOzcmFoYWxvbSwgS2lzdmFzw7p0IHUuIDksIDY3ODI!5e0!3m2!1shu!2shu!4v1718448888888!5m2!1shu!2shu"
                width="100%" 
                height="230" 
                style={{ border: 0, borderRadius: 'var(--radius-sm)' }} 
                allowFullScreen={false} 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="contact-form-wrapper">
            {/* Setmore Booking CTA */}
            <div className="booking-cta-card glass">
              <div>
                <h4>Azonnali Időpontfoglalás</h4>
                <p>Foglalja le szabad időpontját online, kényelmesen a Setmore rendszerünkben.</p>
              </div>
              <button onClick={onOpenBooking} className="btn btn-accent btn-booking-cta">
                Foglalás most
              </button>
            </div>

            <div className="contact-card glass">
              <h3 className="contact-column-title">Üzenetküldés / Egyedi megkeresés</h3>
              
              {submitted ? (
                <motion.div 
                  className="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="success-icon-circle">
                    <Check size={28} />
                  </div>
                  <h4>Sikeres küldés!</h4>
                  <p>Köszönjük a megkeresést, Sikó Réka hamarosan keresni fogja Önt a megadott elérhetőségeken az időpont egyeztetése miatt.</p>
                  <button 
                    className="btn btn-outline btn-success-back"
                    onClick={() => setSubmitted(false)}
                  >
                    Új üzenet küldése
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Teljes Név *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Pl. Szabó Mária"
                    />
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="email">E-mail Cím *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Pl. maria@gmail.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Telefonszám *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Pl. +36 20 123 4567"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Üzenet / Kezelések *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5}
                      required 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Írja le milyen kezelést szeretne, vagy válassza ki őket a fenti kezelés-kalkulátorban..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-form-submit">
                    Küldés
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
