import { ArrowRight, Home, Briefcase, Car } from 'lucide-react';
import './Services.css';

export default function Services() {
  const services = [
    {
      icon: <Home size={40} className="service-icon-svg" />,
      title: "Home Relocation",
      description: "Professional packing, 3-layer furniture protection, and full transit insurance for your complete household.",
      price: "Starting ₹4,999",
      delay: "0.1s"
    },
    {
      icon: <Briefcase size={40} className="service-icon-svg" />,
      title: "Office Relocation",
      description: "Zero downtime corporate shifting. We handle IT infrastructure, cubicles, and files with military precision.",
      price: "Starting ₹9,999",
      delay: "0.2s"
    },
    {
      icon: <Car size={40} className="service-icon-svg" />,
      title: "Vehicle Transport",
      description: "Safe transportation for cars and bikes in enclosed GPS-tracked carriers with wheel chocks and safety straps.",
      price: "Starting ₹2,999",
      delay: "0.3s"
    }
  ];

  return (
    <section className="section bg-light" id="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title text-gradient">Our Premium Services</h2>
          <p className="section-subtitle">Tailored, tech-enabled relocation solutions to meet your specific needs.</p>
        </div>
        
        <div className="services-grid-premium">
          {services.map((service, idx) => (
            <div className="service-card-premium fade-in-up" style={{animationDelay: service.delay}} key={idx}>
              <div className="service-card-content">
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-price">{service.price}</div>
              </div>
              <div 
                className="service-card-action" 
                onClick={() => {
                  const message = `Hi ShiftEase! I am looking for more details about your ${service.title} service.`;
                  const encodedMessage = encodeURIComponent(message);
                  const whatsappNumber = "919797820423";
                  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
                }}
                style={{ cursor: 'pointer' }}
              >
                <span>More Details</span>
                <ArrowRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
