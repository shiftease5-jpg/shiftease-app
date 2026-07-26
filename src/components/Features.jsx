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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
