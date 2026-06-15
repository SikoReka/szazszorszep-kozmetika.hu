import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';
import './BookingModal.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="booking-modal-overlay">
          {/* Backdrop lock */}
          <motion.div 
            className="booking-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Content container */}
          <motion.div 
            className="booking-modal-container glass"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          >
            {/* Modal Header */}
            <div className="booking-modal-header">
              <div>
                <h4 className="booking-modal-title">Online Időpontfoglalás</h4>
                <p className="booking-modal-subtitle">Válassza ki a kívánt szolgáltatást és időpontot</p>
              </div>
              <button className="booking-modal-close" onClick={onClose} aria-label="Bezárás">
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body with Iframe */}
            <div className="booking-modal-body">
              <iframe 
                src={config.setmoreBookingUrl}
                className="booking-iframe"
                title="Setmore Online Booking"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
