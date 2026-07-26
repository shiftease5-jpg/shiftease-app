import { useState, useEffect } from 'react';
import { Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DriverPortal.css';

export default function DriverPortal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleType: 'Tata Ace',
    city: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const message = `*NEW DRIVER APPLICATION* 🚛\n\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n📍 City: ${formData.city}\n🚚 Vehicle: ${formData.vehicleType}\n\nI want to join the ShiftEase partner network. Please contact me with the onboarding details!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "919876543210"; 
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    
    // Clear form
    setFormData({ name: '', phone: '', vehicleType: 'Tata Ace', city: '' });
    alert("Application sent successfully via WhatsApp! Our team will contact you shortly.");
  };

  return (
    <div className="driver-portal-page">
      <div className="portal-header" style={{paddingTop: '120px'}}>
        <div className="container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          <div className="portal-title-wrapper" style={{justifyContent: 'center'}}>
            <Truck size={48} color="white" />
            <h1>Partner With <span className="text-gradient" style={{background: 'linear-gradient(90deg, #fff, #f8fafc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>ShiftEase</span></h1>
          </div>
          <p>Join India's fastest-growing premium logistics network. Get guaranteed trips, weekly payouts, and 24/7 support.</p>
          <button 
            onClick={() => navigate('/driver/dashboard')} 
            style={{position: 'relative', zIndex: 1, marginTop: '24px', padding: '12px 32px', background: 'white', color: 'var(--primary-color)', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1.1rem'}}
          >
            Driver Login
          </button>
        </div>
      </div>

      <div className="container portal-content">
        <div className="benefits-section">
          <h2>Why Drive With Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card glass">
              <ShieldCheck size={32} color="var(--secondary-color)" />
              <h3>Guaranteed Earnings</h3>
              <p>Get consistent bookings and guaranteed weekly payouts directly to your bank account.</p>
            </div>
            <div className="benefit-card glass">
              <CheckCircle2 size={32} color="var(--secondary-color)" />
              <h3>Flexible Hours</h3>
              <p>You are your own boss. Accept the trips that work for your schedule and route.</p>
            </div>
          </div>
        </div>

        <div className="onboarding-form-wrapper glass">
          <h2>Apply Now</h2>
          <p>Fill out the form below to connect with our onboarding team via WhatsApp.</p>
          
          <form className="onboarding-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Ramesh Kumar" required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 9876543210" required />
            </div>
            <div className="form-group">
              <label>City of Operation</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. New Delhi" required />
            </div>
            <div className="form-group">
              <label>Vehicle Type</label>
              <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required>
                <option value="Tata Ace">Tata Ace (Chota Hathi)</option>
                <option value="Bolero Pickup">Bolero Pickup</option>
                <option value="14ft Eicher">14ft Eicher</option>
                <option value="19ft Container">19ft Container</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-100" style={{marginTop: '10px'}}>
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
