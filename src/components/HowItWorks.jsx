import { CalendarCheck, Package, Truck, MapPin, Box } from 'lucide-react';
import './HowItWorks.css';

export default function HowItWorks() {
  const steps = [
    { 
      number: "01", 
      title: "Book Survey", 
      desc: "Get a fixed quote instantly or via video survey.",
      icon: <CalendarCheck size={28} />
    },
    { 
      number: "02", 
      title: "Packing", 
      desc: "Our pros pack everything securely using 3-layer materials.",
      icon: <Package size={28} />
    },
    { 
      number: "03", 
      title: "Transport", 
      desc: "Your items are loaded into our GPS-tracked enclosed carriers.",
      icon: <Truck size={28} />
    },
    {
      number: "04", 
      title: "Delivery", 
      desc: "On-time arrival at your new destination.",
      icon: <MapPin size={28} />
    },
    {
      number: "05", 
      title: "Unpacking", 
      desc: "We unpack and assemble furniture exactly where you want it.",
      icon: <Box size={28} />
    }
  ];

  return (
    <section className="section bg-light" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title text-gradient">How It Works</h2>
          <p className="section-subtitle">A seamless, 5-step process designed for absolute peace of mind.</p>
        </div>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          <div className="timeline-steps">
            {steps.map((step, idx) => (
              <div className="timeline-step" key={idx}>
                <div className="timeline-icon-wrapper">
                  <div className="timeline-icon">{step.icon}</div>
                  <div className="timeline-number">{step.number}</div>
                </div>
                <div className="timeline-content fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
