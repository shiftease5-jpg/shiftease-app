import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Services.css';

export default function Services() {
  const services = [
    {
      id: "house-shifting",
      title: "Local Moving",
      description: "Seamless relocation within your city. Professional packing and transport.",
      image: "/images/movers_carrying_1785087185307.png"
    },
    {
      id: "intercity-moving",
      title: "Intercity Moving",
      description: "Secure long-distance transport with live GPS tracking included.",
      image: "/images/hero_truck_1785087164697.png"
    },
    {
      id: "packing-services",
      title: "Premium Packing",
      description: "3-layer secure packing using industry-leading materials.",
      image: "/images/packed_living_room_1785087175625.png"
    }
  ];

  return (
    <section className="section bg-light" id="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Everything you need for a perfect move.</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, idx) => (
            <div className="service-item fade-in-up" style={{animationDelay: `${idx * 0.1}s`}} key={idx}>
              <div className="service-image-wrapper">
                <img src={service.image} alt={service.title} className="service-image" />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={`/service/${service.id}`} className="service-link">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
