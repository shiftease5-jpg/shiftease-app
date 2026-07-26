import { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import './QuoteSection.css';

export default function QuoteSection({ city }) {
  const [formData, setFormData] = useState({ name: '', from: city || '', to: '', date: '', size: '1 BHK', phone: '' });

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const text = `Hi, I need a quote for moving.\nFrom: ${formData.from}\nTo: ${formData.to}\nDate: ${formData.date}\nSize: ${formData.size}`;
    window.open(`https://wa.me/919797820423?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="section bg-light" id="quote-form">
      <div className="container quote-container">
        <div className="section-header">
          <h2 className="section-title">Get Your Free Quote</h2>
          <p className="section-subtitle">
            Moving should be simple. Fill in your move details.<br />
            We'll contact you within 5 minutes.
          </p>
          <div style={{marginTop: '20px', color: '#4B5563', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px'}}>
             <span style={{color: '#F59E0B', fontSize: '1.2rem'}}>★★★★★</span> 
             Trusted by 500+ families across Mumbai
          </div>
        </div>
        
        <div className="quote-form-wrapper fade-in-up">
          <div className="glass-form">
            <form onSubmit={handleWhatsApp} className="quote-form">
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

              <button type="submit" className="btn-primary submit-btn">
                Get Quote via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
