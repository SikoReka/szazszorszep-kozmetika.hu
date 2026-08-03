import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Check } from 'lucide-react';
import './Contact.css';

interface ContactProps {
  onOpenBooking: () => void;
}

const Contact = ({ onOpenBooking }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

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
                  <p><a href="mailto:reka@szazszorszep-kozmetika.hu">reka@szazszorszep-kozmetika.hu</a></p>
                </div>
              </div>

              <div className="detail-item">
  <Clock className="detail-icon" size={20} />
  <div className="detail-text">
    <h5>Nyitva tartás</h5>
    <p>Bejelentkezés alapján</p>
  </div>
</div>
            </div>

            {/* Social media connections */}
            <div className="contact-socials">
              <a href="https://www.facebook.com/profile.php?id=61564743670564" target="_blank" rel="noopener noreferrer" className="social-link-btn facebook" title="Kövessen minket Facebookon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                <span>Facebook</span>
              </a>
              <a href="https://www.instagram.com/kozmetikaszazszorszep/" target="_blank" rel="noopener noreferrer" className="social-link-btn instagram" title="Kövessen minket Instagramon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span>Instagram</span>
              </a>
            </div>

            {/* Map Embed */}
            <div className="contact-map">
              <iframe 
                title="Százszorszép Kozmetika Térkép"
                src="https://maps.google.com/maps?q=Sz%C3%A1zszorsz%C3%A9p%20Kozmetika,%20M%C3%B3rahalom,%20Kisvas%C3%BAt%20u.%209.&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
