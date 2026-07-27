import { useState } from 'react';
import { MapPin, Clock, Home, Box, Building, Calendar, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import './QuoteSection.css';

export default function QuoteSection({ city }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    name: 'Website Lead', 
    from: city || '', 
    to: '', 
    date: '', 
    size: '1 BHK', 
    phone: '' 
  });
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState(null);

  const nextStep = () => {
    if (step === 1 && (!formData.from || !formData.to)) return alert('Please enter pickup and drop locations');
    if (step === 3 && (!formData.date || !formData.phone)) return alert('Please enter date and phone number');
    
    if (step === 3) {
      calculateEstimate();
    }
    setStep(prev => prev + 1);
  };

  const calculateEstimate = () => {
    let base = 3000;
    if (formData.size === '2 BHK') base = 5000;
    if (formData.size === '3 BHK') base = 8000;
    if (formData.size === 'Villa / Office') base = 12000;
    if (formData.size === 'Few Items') base = 1500;
    
    // Add some randomness for realism
    const min = base + Math.floor(Math.random() * 500);
    const max = min + 800 + Math.floor(Math.random() * 500);
    setEstimate(`₹${min.toLocaleString('en-IN')} - ₹${max.toLocaleString('en-IN')}`);
  };

  const handleBookNow = async () => {
    setLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      await fetch(`${API_URL}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const text = `Hi, I got an estimate of ${estimate} on the website.\n\nRoute: ${formData.from} to ${formData.to}\nSize: ${formData.size}\nDate: ${formData.date}\nPhone: ${formData.phone}\n\nI want to book this move!`;
      window.open(`https://wa.me/919967728718?text=${encodeURIComponent(text)}`, '_blank');
      
    } catch (error) {
      console.error("Failed to save quote:", error);
      const text = `Hi, I got an estimate of ${estimate} on the website.\n\nRoute: ${formData.from} to ${formData.to}\nSize: ${formData.size}\nDate: ${formData.date}\nPhone: ${formData.phone}\n\nI want to book this move!`;
      window.open(`https://wa.me/919967728718?text=${encodeURIComponent(text)}`, '_blank');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="wizard-step fade-in">
            <h3 className="step-title">Where are you moving?</h3>
            <div className="form-group">
              <div className="input-wrapper">
                <MapPin size={18} className="input-icon" />
                <input type="text" placeholder="Pickup Location (e.g., Bandra)" value={formData.from} onChange={e => setFormData({...formData, from: e.target.value})} required autoFocus />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <MapPin size={18} className="input-icon" style={{color: '#ff5a00'}} />
                <input type="text" placeholder="Drop Location (e.g., Andheri)" value={formData.to} onChange={e => setFormData({...formData, to: e.target.value})} required />
              </div>
            </div>
            <button onClick={nextStep} className="btn-primary wizard-btn">Continue <ArrowRight size={18}/></button>
          </div>
        );
      case 2:
        return (
          <div className="wizard-step fade-in">
            <h3 className="step-title">What are you moving?</h3>
            <div className="inventory-grid">
              {['1 BHK', '2 BHK', '3 BHK', 'Villa / Office', 'Few Items'].map((size) => (
                <div 
                  key={size}
                  className={`inventory-card ${formData.size === size ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, size})}
                >
                  <div className="inventory-icon">
                    {size.includes('BHK') ? <Home size={24}/> : size.includes('Villa') ? <Building size={24}/> : <Box size={24}/>}
                  </div>
                  <span>{size}</span>
                  {formData.size === size && <CheckCircle2 size={16} className="check-icon" />}
                </div>
              ))}
            </div>
            <div className="wizard-actions">
              <button onClick={() => setStep(1)} className="btn-secondary wizard-btn outline">Back</button>
              <button onClick={nextStep} className="btn-primary wizard-btn">Continue <ArrowRight size={18}/></button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="wizard-step fade-in">
            <h3 className="step-title">When are you moving?</h3>
            <div className="form-group">
              <div className="input-wrapper">
                <Calendar size={18} className="input-icon" />
                <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <Phone size={18} className="input-icon" />
                <input type="tel" placeholder="Your Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
              </div>
            </div>
            <div className="wizard-actions">
              <button onClick={() => setStep(2)} className="btn-secondary wizard-btn outline">Back</button>
              <button onClick={nextStep} className="btn-primary wizard-btn calculate-btn">Calculate Estimate</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="wizard-step fade-in estimate-step">
            <div className="estimate-success-icon">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="step-title">Your Instant Estimate</h3>
            <p className="estimate-subtitle">Based on your {formData.size} move from {formData.from} to {formData.to}</p>
            
            <div className="estimate-price-box">
              <span className="estimate-currency">₹</span>
              <span className="estimate-amount">{estimate?.replace('₹', '')}</span>
            </div>
            <p className="estimate-note">Price includes transport, loading, unloading, and basic packing.</p>
            
            <button onClick={handleBookNow} className="btn-primary wizard-btn submit-btn" disabled={loading}>
              {loading ? 'Booking...' : 'Lock Price on WhatsApp'}
            </button>
            <button onClick={() => setStep(1)} className="btn-secondary wizard-btn outline" style={{marginTop: '12px', width: '100%'}}>Start Over</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="section bg-light" id="quote-form">
      <div className="container quote-container">
        <div className="section-header">
          <h2 className="section-title">Get Your Instant Moving Estimate</h2>
          <p className="section-subtitle">
            No waiting for calls. See your price instantly.
          </p>
        </div>
        
        <div className="quote-form-wrapper fade-in-up">
          <div className="glass-form wizard-form">
            
            {/* Progress Bar */}
            <div className="wizard-progress">
              {[1, 2, 3, 4].map(num => (
                <div key={num} className={`progress-dot ${step >= num ? 'active' : ''} ${step === num ? 'current' : ''}`}>
                  {num}
                </div>
              ))}
              <div className="progress-line" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
            </div>

            {/* Step Content */}
            <div className="wizard-content">
              {renderStep()}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
