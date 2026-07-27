import { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import './QuoteSection.css';

export default function QuoteSection({ city }) {
  const [formData, setFormData] = useState({ name: '', from: city || '', to: '', date: '', size: '1 BHK', phone: '' });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      
      await fetch(`${API_URL}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || 'Website Lead',
          from: formData.from,
          to: formData.to,
          date: formData.date,
          size: formData.size,
          phone: formData.phone || 'N/A'
        })
      });
      
      const text = `Hi, I need a quote for moving.\nFrom: ${formData.from}\nTo: ${formData.to}\nDate: ${formData.date}\nSize: ${formData.size}`;
      window.open(`https://wa.me/919797820423?text=${encodeURIComponent(text)}`, '_blank');
      
    } catch (error) {
      console.error("Failed to save quote:", error);
      const text = `Hi, I need a quote for moving.\nFrom: ${formData.from}\nTo: ${formData.to}\nDate: ${formData.date}\nSize: ${formData.size}`;
      window.open(`https://wa.me/919797820423?text=${encodeURIComponent(text)}`, '_blank');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section bg-light" id="quote-form">
      <div className="container quote-container">
        <div className="section-header">
          <h2 className="section-title">Get Your Fixed Moving Quote</h2>
          <p className="section-subtitle">
            Takes less than 30 seconds
          </p>
          {/* Trust text has moved to Hero section */}
        </div>
        
        <div className="quote-form-wrapper fade-in-up">
          <div className="glass-form">
            <form onSubmit={handleSubmit} className="quote-form">
              <div className="form-group">
                <div className="input-wrapper">
                  <MapPin size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="Pickup Location (e.g., Bandra)" 
                    value={formData.from}
                    onChange={e => setFormData({...formData, from: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div className="input-wrapper">
                  <MapPin size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="Drop Location (e.g., Andheri)" 
                    value={formData.to}
                    onChange={e => setFormData({...formData, to: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <select 
                    value={formData.size}
                    onChange={e => setFormData({...formData, size: e.target.value})}
                  >
                    <option>1 BHK</option>
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>Villa / Office</option>
                    <option>Few Items</option>
                  </select>
                </div>
                
                <div className="form-group half">
                  <div className="input-wrapper">
                    <Clock size={18} className="input-icon" />
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                {loading ? 'Saving...' : 'Get Quote via WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
