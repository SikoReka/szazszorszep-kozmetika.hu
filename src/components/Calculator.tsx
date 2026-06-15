import { useState } from 'react';
import { servicesData } from './Services';
import { Sparkles, Clock, CreditCard, Send } from 'lucide-react';
import './Calculator.css';

interface CalculatorProps {
  onQuoteRequest: (message: string) => void;
}

const Calculator = ({ onQuoteRequest }: CalculatorProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectedServices = servicesData.filter(s => selectedIds.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

  const handleRequest = () => {
    if (selectedServices.length === 0) return;
    
    const serviceNames = selectedServices.map(s => ` - ${s.name} (${s.duration} perc, ${s.price.toLocaleString('hu-HU')} Ft)`).join('\n');
    const message = `Kedves Réka!\n\nSzeretnék időpontot kérni az alábbi kezelésekre:\n${serviceNames}\n\nÖsszesen: ${totalDuration} perc, ${totalPrice.toLocaleString('hu-HU')} Ft.`;
    
    onQuoteRequest(message);
  };

  return (
    <section id="calculator" className="section calculator-section">
      <div className="container">
        <span className="section-subtitle">Tervező</span>
        <h2 className="section-title">Kezelés-kalkulátor</h2>
        
        <div className="calc-grid">
          
          {/* Service Selector Column */}
          <div className="calc-selector">
            <h3 className="calc-column-title">Válassza ki a kezeléseket:</h3>
            <div className="calc-services-list">
              {servicesData.map((service) => {
                const isSelected = selectedIds.includes(service.id);
                return (
                  <div 
                    key={service.id}
                    className={`calc-service-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggle(service.id)}
                  >
                    <div className="calc-checkbox">
                      <div className="calc-checkbox-inner"></div>
                    </div>
                    <div className="calc-service-info">
                      <span className="calc-service-name">{service.name}</span>
                      <span className="calc-service-desc">{service.desc}</span>
                    </div>
                    <div className="calc-service-values">
                      <span className="calc-service-price">{service.price.toLocaleString('hu-HU')} Ft</span>
                      <span className="calc-service-duration">{service.duration} perc</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="calc-summary-wrapper">
            <div className="calc-summary glass">
              <h3 className="calc-summary-title">Összesítés</h3>
              
              {selectedServices.length === 0 ? (
                <div className="calc-empty-state">
                  <Sparkles size={36} className="calc-empty-icon" />
                  <p>Kattintson a kezelésekre a bal oldali listában a kalkulációhoz.</p>
                </div>
              ) : (
                <div className="calc-summary-content">
                  <div className="calc-summary-list">
                    {selectedServices.map(s => (
                      <div key={s.id} className="calc-summary-item">
                        <span>{s.name}</span>
                        <span>{s.price.toLocaleString('hu-HU')} Ft</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="calc-totals">
                    <div className="total-row">
                      <div className="total-icon-label">
                        <Clock size={18} />
                        <span>Várható időtartam:</span>
                      </div>
                      <span className="total-value">{totalDuration} perc</span>
                    </div>
                    
                    <div className="total-row highlight">
                      <div className="total-icon-label">
                        <CreditCard size={18} />
                        <span>Végösszeg:</span>
                      </div>
                      <span className="total-value">{totalPrice.toLocaleString('hu-HU')} Ft</span>
                    </div>
                  </div>

                  <button 
                    className="btn btn-accent btn-calc-submit"
                    onClick={handleRequest}
                  >
                    <Send size={16} />
                    Időpont kérése
                  </button>
                  <p className="calc-summary-note">
                    A gombra kattintva a lenti űrlap üzenet mezeje automatikusan kitöltődik az itt összeállított kezelésekkel.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Calculator;
