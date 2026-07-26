import { useState } from 'react';
import { ShieldCheck, Truck, Clock, Star, MapPin, CheckCircle2, FileText } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Hero.css';

export default function Hero({ city }) {
  const [formData, setFormData] = useState({ name: '', from: city || '', to: '', date: '', size: '1 BHK', phone: '' });
  const [status, setStatus] = useState('idle');
  const [quoteResult, setQuoteResult] = useState(null);

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
      
      const message = `Hi ShiftEase! I need an estimate. 🚚\n\n👤 Name: ${formData.name}\n📍 From: ${formData.from}\n📍 To: ${formData.to}\n🏠 Size: ${formData.size}\n📅 Date: ${formData.date}\n📞 Phone: ${formData.phone}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "919797820423";
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
      
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert('Failed to calculate quote. Please try again.');
    }
  };

  const handleNewRequest = () => {
    setStatus('idle');
    setFormData({ name: '', from: city || '', to: '', date: '', size: '1 BHK', phone: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });
    } else if (name === 'name') {
      const alphaValue = value.replace(/[^A-Za-z\s]/g, '');
      setFormData({ ...formData, [name]: alphaValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
            <FileText size={18} />
            <span>Get Free Quote</span>
          </button>
          
          <p className="hero-mobile-trust">
            🔒 Free quote • No hidden charges • Response in minutes
          </p>

          <div className="hero-trust-list">
            <div className="trust-item"><CheckCircle2 size={20} color="#10B981" /> <span>Transparent Pricing</span></div>
            <div className="trust-item"><CheckCircle2 size={20} color="#10B981" /> <span>Live GPS Tracking</span></div>
            <div className="trust-item"><CheckCircle2 size={20} color="#10B981" /> <span>Verified Moving Partners</span></div>
            <div className="trust-item"><CheckCircle2 size={20} color="#10B981" /> <span>Secure Packing Materials</span></div>
            <a href="tel:+919967728718" style={{ textDecoration: 'none' }}>
              <div className="trust-item" style={{ cursor: 'pointer' }}>
                <CheckCircle2 size={20} color="#10B981" /> <span style={{ color: 'var(--secondary-color)', fontWeight: '600', textDecoration: 'underline' }}>24×7 Support: Call Us</span>
              </div>
            </a>
            <div className="trust-item"><CheckCircle2 size={20} color="#10B981" /> <span>Dedicated Coordinator</span></div>
          </div>
        </div>
        
        {/* RIGHT SIDE: Glass Quote Form */}
        <div className="hero-form-wrapper fade-in-up" style={{ animationDelay: '0.2s' }}>

          <div className="hero-form-card glass-premium" id="quote-form">
            <div className="hero-form-map-banner">
              <MapContainer 
                center={[21.1458, 79.0882]} // Center of India (Nagpur)
                zoom={4} 
                zoomControl={false} 
                dragging={false} 
                scrollWheelZoom={false} 
                doubleClickZoom={false}
                style={{ height: '160px', width: '100%', zIndex: 1 }}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                {/* Mumbai to Bangalore demo route */}
                <Marker position={[19.0760, 72.8777]} icon={new L.Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png', iconSize: [20, 32], iconAnchor: [10, 32] })} />
                <Marker position={[12.9716, 77.5946]} icon={new L.Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png', iconSize: [20, 32], iconAnchor: [10, 32] })} />
                <Polyline positions={[[19.0760, 72.8777], [12.9716, 77.5946]]} color="#f97316" weight={3} dashArray="6, 8" />
              </MapContainer>
              <div className="map-banner-overlay"></div>
            </div>

            <div className="hero-form-inner">
              <h3 style={{marginBottom: '24px', textAlign: 'center', fontSize: '1.4rem'}}>Get Instant Estimate</h3>
            
            {status === 'success' ? (
              <div className="success-state fade-in-up">
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <h4 style={{ color: '#059669', marginBottom: '8px' }}>Request Sent!</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem' }}>You've been redirected to WhatsApp. A real human will provide your quote shortly.</p>
                <button className="btn-primary" style={{ marginTop: '24px', width: '100%' }} onClick={handleNewRequest}>
                  Calculate Another Move
                </button>
              </div>
            ) : (
              <form className="quote-form" onSubmit={handleSubmit}>
                
                <div className="form-group-premium">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required pattern="[A-Za-z ]{2,50}" title="Please enter a valid name (2-50 characters, letters only)" />
                </div>

                <div className="form-group-premium">
                  <label className="form-label">Moving From</label>
                  <div className="input-icon-wrapper">
                    <MapPin size={18} className="input-icon" />
                    <input type="text" name="from" placeholder="e.g. Mumbai" value={formData.from} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label className="form-label">Moving To</label>
                  <div className="input-icon-wrapper">
                    <MapPin size={18} className="input-icon" color="#f97316" />
                    <input type="text" name="to" placeholder="e.g. Bangalore" value={formData.to} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-premium" style={{flex: 55}}>
                    <label className="form-label">Moving Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required title="Moving Date" />
                  </div>
                  <div className="form-group-premium" style={{flex: 45}}>
                    <label className="form-label">Home Size</label>
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
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    inputMode="numeric"
                    name="phone" 
                    placeholder="10-digit Mobile Number" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    pattern="[0-9]{10}"
                    maxLength="10"
                    title="Please enter exactly 10 digits"
                  />
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

      </div>
    </section>
  );
}
