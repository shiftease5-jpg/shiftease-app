import { Navigation, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Fleet.css';

export default function Fleet() {
  const fleet = [
    {
      name: "Tata Ace (Chota Hathi)",
      capacity: "1 RK / Few Items",
      weight: "Up to 750 kg",
      ideal: "Local shifting within the city",
      image: "/images/tata_ace.png"
    },
    {
      name: "14ft Eicher / Bolero",
      capacity: "1-2 BHK",
      weight: "Up to 2.5 Tons",
      ideal: "Local & Intercity moves",
      image: "/images/eicher.png"
    },
    {
      name: "19ft Closed Container",
      capacity: "3+ BHK / Corporate",
      weight: "Up to 5 Tons",
      ideal: "Long distance intercity moves",
      image: "/images/container.png"
    }
  ];

  return (
    <section className="section bg-light" id="fleet">
      <div className="container">
        <h2 className="section-title text-gradient">Our Premium Fleet</h2>
        <p className="section-subtitle">A modern, well-maintained fleet equipped with live GPS tracking for your peace of mind.</p>
        
        <div className="fleet-grid">
          {fleet.map((vehicle, idx) => (
            <div className="fleet-card glass" key={idx}>
              <div className="fleet-image-container">
                <img src={vehicle.image} alt={vehicle.name} className="fleet-image" />
              </div>
              <div className="fleet-content">
                <h3>{vehicle.name}</h3>
                <div className="fleet-specs">
                  <div className="spec">
                    <span className="spec-label">Capacity</span>
                    <span className="spec-value">{vehicle.capacity}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-label">Payload</span>
                    <span className="spec-value">{vehicle.weight}</span>
                  </div>
                </div>
                <div className="fleet-badges">
                  <Link to="/track" className="badge interactive-badge" title="Click to open Live Tracking Portal">
                    <Navigation size={14} /> GPS Enabled
                  </Link>
                  <span className="badge" title="Protects your belongings from rain and dust">
                    <ShieldCheck size={14} /> Closed Body
                  </span>
                </div>
                <p className="fleet-ideal"><strong>Ideal for:</strong> {vehicle.ideal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
