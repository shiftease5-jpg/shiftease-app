import { useState } from 'react';
import { ShieldCheck, Truck, Clock, Star, MapPin, CheckCircle2 } from 'lucide-react';
import './Hero.css';

export default function Hero({ city }) {
  const [formData, setFormData] = useState({ from: city || '', to: '', date: '', size: '1 BHK', phone: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      await fetch(`${API_URL}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const message = `Hi ShiftEase! I need an instant estimate. 🚚\n\n📍 From: ${formData.from}\n📍 To: ${formData.to}\n🏠 Size: ${formData.size}\n📅 Date: ${formData.date}\n📞 Phone: ${formData.phone}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "919797820423";
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
      
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert('Failed to submit quote. Please try again.');
    }
  };

  const handleNewRequest = () => {
    setStatus('idle');
    setFormData({ from: city || '', to: '', date: '', size: '1 BHK', phone: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="hero">
      <div className="hero-background-gradient"></div>
      
      <div className="container hero-container">
        
        {/* LEFT SIDE: Copy & Trust Signals */}
        <div className="hero-content fade-in-up">
          <div className="hero-badge">
            <CheckCircle2 size={16} color="#059669" />
            <span style={{color: '#059669'}}>Tech-Enabled Relocation</span>
          </div>

          <div className="hero-mobile-visual">
            <Truck size={42} color="#F97316" />
          </div>

          <h1 className="hero-title">
            {city ? `Premium Packers and Movers in ` : `Modern, Transparent `}
            <span className="text-gradient">{city ? city : 'Relocation.'}</span>
          </h1>
          
          <p className="hero-subtitle">
            {city 
              ? `Safe relocation in ${city} with live GPS tracking, trained professionals, and honest pricing.`
              : `Safe relocation with live GPS tracking, trained professionals, and honest pricing. No surprises.`}
          </p>

          <button 
            className="btn-primary hero-mobile-cta" 
            onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            🟧 Get Free Quote
          </button>

          <div className="hero-trust-list">
            <div className="trust-item"><CheckCircle2 size={20} color="#10B981" /> <span>Transparent Pricing</span></div>
            <div className="trust-item"><CheckCircle2 size={20} color="#10B981" /> <span>Live GPS Tracking</span></div>
            <div className="trust-item"><CheckCircle2 size={20} color="#10B981" /> <span>Verified Moving Partners</span></div>
            <div className="trust-item"><CheckCircle2 size={20} color="#10B981" /> <span>Secure Packing Materials</span></div>
            <div className="trust-item"><CheckCircle2 size={20} color="#10B981" /> <span>24×7 Customer Support</span></div>
            <div className="trust-item"><CheckCircle2 size={20} color="#10B981" /> <span>Dedicated Coordinator</span></div>
          </div>
        </div>
        
        {/* RIGHT SIDE: Glass Quote Form */}
        <div className="hero-form-wrapper fade-in-up" style={{ animationDelay: '0.2s' }}>

          <div className="hero-form-card glass-premium" id="quote-form">
            <h3 style={{marginBottom: '24px', textAlign: 'center', fontSize: '1.4rem'}}>Get Instant Estimate</h3>
            
            {status === 'success' ? (
              <div className="success-state">
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <h4 style={{ color: '#059669', marginBottom: '8px' }}>Estimate Sent!</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem' }}>Our team will call you at <strong>{formData.phone}</strong> in 5 minutes.</p>
                <button className="btn-primary" style={{ marginTop: '24px', width: '100%' }} onClick={handleNewRequest}>
                  Calculate Another Move
                </button>
              </div>
            ) : (
              <form className="quote-form" onSubmit={handleSubmit}>
                
                <div className="form-group-premium">
                  <div className="input-icon-wrapper">
                    <MapPin size={18} className="input-icon" />
                    <input type="text" name="from" placeholder="Moving From (e.g. Mumbai)" value={formData.from} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group-premium">
                  <div className="input-icon-wrapper">
                    <MapPin size={18} className="input-icon" color="#f97316" />
                    <input type="text" name="to" placeholder="Moving To (e.g. Bangalore)" value={formData.to} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-premium" style={{flex: 1}}>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required title="Moving Date" />
                  </div>
                  <div className="form-group-premium" style={{flex: 1}}>
                    <select name="size" value={formData.size} onChange={handleChange}>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4+ BHK">4+ BHK / Villa</option>
                      <option value="Independent House">Independent House</option>
                      <option value="Office">Office / Commercial</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-premium">
                  <input type="tel" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} required />
                </div>
                
                <button type="submit" className="btn-primary btn-premium-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Calculating...' : 'Get Instant Estimate'}
                </button>
                <p className="form-trust-text">🔒 Your data is 100% secure with us.</p>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
