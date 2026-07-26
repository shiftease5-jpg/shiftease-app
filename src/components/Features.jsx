import { Video, MapPin, Calculator, Headphones } from 'lucide-react';
import './Features.css';

export default function Features({ city }) {
  const features = [
    {
      icon: <Calculator size={32} color="var(--secondary-color)" />,
      title: "No Hidden Costs Guarantee",
      description: "Offer absolute transparency in pricing. What you see on the app is exactly what you pay."
    },
    {
      icon: <MapPin size={32} color="var(--secondary-color)" />,
      title: "Real-time Tracking",
      description: "Uber-like GPS tracking for our trucks so you can monitor your shipments in real-time."
    },
    {
      icon: <Video size={32} color="var(--secondary-color)" />,
      title: "Virtual Surveys",
      description: "Convenient video calls via WhatsApp to scan your rooms. Our Move Managers instantly estimate volume and provide a fixed quote."
    },
    {
      icon: <Headphones size={32} color="var(--secondary-color)" />,
      title: "24/7 Support",
      description: "Dedicated Move Managers available via WhatsApp and calls for a stress-free experience."
    }
  ];

  return (
    <section className="section bg-light" id="about">
      <div className="container">
        <h2 className="section-title text-gradient">
          {city ? `Why Choose ShiftEase in ${city}` : `Why Choose ShiftEase`}
        </h2>
        <p className="section-subtitle">We are redefining relocation in India with trust, transparency, and technology.</p>
        
        <div className="features-grid">
          {features.map((feat, idx) => (
            <div className="feature-card glass" key={idx}>
              <div className="feature-icon">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.description}</p>
              {feat.title === "24/7 Support" && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
                  <a href="tel:+919967728718" className="btn-secondary" style={{ padding: '8px 12px', fontSize: '0.95rem', flex: 1, textAlign: 'center', borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' }}>Call Now</a>
                  <a href="https://wa.me/919967728718" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 12px', fontSize: '0.95rem', backgroundColor: '#25D366', flex: 1, textAlign: 'center' }}>WhatsApp</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
