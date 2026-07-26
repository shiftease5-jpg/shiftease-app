import { CalendarCheck, Package, Truck, MapPin, Box } from 'lucide-react';
import './HowItWorks.css';

export default function HowItWorks() {
  const steps = [
    { 
      number: "1", 
      title: "Book", 
      desc: "Get an instant fixed quote. No hidden fees."
    },
    { 
      number: "2", 
      title: "Pack", 
      desc: "Professional movers pack everything securely."
    },
    { 
      number: "3", 
      title: "Track Live", 
      desc: "Monitor your belongings via GPS."
    },
    {
      number: "4", 
      title: "Delivered", 
      desc: "On-time arrival and placement in your new home."
    }
  ];

  return (
    <section className="section bg-light" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">A seamless process designed for absolute peace of mind.</p>
        </div>
        
        <div className="timeline-container">
          <div className="timeline-steps">
            {steps.map((step, idx) => (
              <div className="timeline-step fade-in-up" style={{animationDelay: `${idx * 0.1}s`}} key={idx}>
                <div className="timeline-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
