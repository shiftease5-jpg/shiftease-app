import { MapPin, Calculator, ShieldCheck, UserCheck } from 'lucide-react';
import './Features.css';

export default function Features({ city }) {
  const features = [
    {
      icon: <Calculator size={32} color="var(--primary-color)" strokeWidth={1.5} />,
      title: "Transparent Pricing",
      description: "Absolute transparency. What you see on the estimate is exactly what you pay."
    },
    {
      icon: <MapPin size={32} color="var(--primary-color)" strokeWidth={1.5} />,
      title: "Live GPS",
      description: "Track your belongings in real-time from pickup to delivery directly on your phone."
    },
    {
      icon: <UserCheck size={32} color="var(--primary-color)" strokeWidth={1.5} />,
      title: "Verified Drivers",
      description: "Every professional mover undergoes strict background checks and training."
    },
    {
      icon: <ShieldCheck size={32} color="var(--primary-color)" strokeWidth={1.5} />,
      title: "Damage Protection",
      description: "Your items are covered. We pack with premium materials to ensure zero damage."
    }
  ];

  return (
    <section className="section" id="trust">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {city ? `Why customers in ${city} trust us.` : `Why customers trust us.`}
          </h2>
          <p className="section-subtitle">We redefine relocation with trust and technology.</p>
        </div>
        
        <div className="features-grid">
          {features.map((feat, idx) => (
            <div className="feature-item fade-in-up" style={{animationDelay: `${idx * 0.1}s`}} key={idx}>
              <div className="feature-icon-minimal">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
