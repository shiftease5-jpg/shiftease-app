import { CheckCircle2 } from 'lucide-react';
import './Pricing.css';

export default function Pricing() {
  const plans = [
    {
      title: 'Local Move (1 BHK)',
      price: '₹7,000',
      subtitle: 'Starting from',
      features: [
        'Premium Packing Materials',
        'Loading & Unloading',
        'Safe Transportation',
        'Live GPS Tracking',
        'Basic Insurance Cover'
      ]
    },
    {
      title: 'Intercity Move (2-3 BHK)',
      price: '₹18,000',
      subtitle: 'Starting from',
      features: [
        'Multi-layer Secure Packing',
        'Dedicated Truck Options',
        'Loading & Unloading',
        'Live GPS Tracking',
        'Comprehensive Insurance'
      ],
      highlighted: true
    },
    {
      title: 'Bike & Car Transport',
      price: '₹3,000',
      subtitle: 'Starting from',
      features: [
        'Door-to-door Pickup',
        'Enclosed Car Carriers',
        'Zero Damage Guarantee',
        'Live GPS Tracking',
        'Transit Insurance'
      ]
    }
  ];

  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <h2 className="section-title text-gradient">Transparent Pricing</h2>
        <p className="section-subtitle">Realistic, honest pricing with no hidden charges on moving day. See our detailed breakdown below.</p>
        
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card glass ${plan.highlighted ? 'highlighted' : ''}`}>
              {plan.highlighted && <div className="popular-badge">Most Popular</div>}
              <h3>{plan.title}</h3>
              <div className="price-display">
                <span className="price-label">{plan.subtitle}</span>
                <span className="price-value">{plan.price}</span>
              </div>
              
              <ul className="pricing-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <CheckCircle2 size={20} color="var(--secondary-color)" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#quote-form" className={`btn-primary ${!plan.highlighted ? 'btn-outline' : ''}`} style={{ width: '100%', textAlign: 'center' }}>
                Get Exact Quote
              </a>
            </div>
          ))}
        </div>

        <div className="detailed-pricing-tables mt-5">
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.8rem', color: 'var(--text-main)' }}>Estimated Price List for Local Shifting (Within City)</h3>
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '30px' }}>The main factors that affect the cost are how much you need to move and how far your new place is.</p>
          
          <div className="table-responsive">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Move Size</th>
                  <th>Labor</th>
                  <th>Packing</th>
                  <th>Transport</th>
                  <th>Total Estimated Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>1 RK</strong></td><td>₹1,000 - 1,500</td><td>₹2,000 - 2,500</td><td>₹2,500 - 3,000</td><td><strong>₹5,500 - 7,000</strong></td></tr>
                <tr><td><strong>1 BHK</strong></td><td>₹1,500 - 2,000</td><td>₹2,500 - 3,000</td><td>₹3,000 - 3,500</td><td><strong>₹7,000 - 8,500</strong></td></tr>
                <tr><td><strong>2 BHK</strong></td><td>₹2,500 - 3,000</td><td>₹3,500 - 4,000</td><td>₹4,000 - 4,500</td><td><strong>₹10,000 - 11,500</strong></td></tr>
                <tr><td><strong>3 BHK</strong></td><td>₹3,500 - 4,000</td><td>₹4,500 - 5,000</td><td>₹5,500 - 6,000</td><td><strong>₹13,500 - 15,000</strong></td></tr>
                <tr><td><strong>4 BHK</strong></td><td>₹4,500 - 5,000</td><td>₹5,500 - 6,000</td><td>₹6,500 - 7,000</td><td><strong>₹16,500 - 18,000</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '60px', fontSize: '1.8rem', color: 'var(--text-main)' }}>Estimated Price List for Intercity Relocation</h3>
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '30px' }}>For moving to another city, the distance and the size of your home are the main factors.</p>
          
          <div className="table-responsive">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Move Type</th>
                  <th>100 - 350 km</th>
                  <th>350 - 750 km</th>
                  <th>750 - 1200 km</th>
                  <th>1200 - 1700 km</th>
                  <th>1700 - 2300 km</th>
                  <th>2300 - 3000 km</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>1 BHK</strong></td><td>₹14k - 18.5k</td><td>₹16.5k - 21.5k</td><td>₹18.5k - 24k</td><td>₹22k - 26.5k</td><td>₹25k - 29k</td><td>₹28k - 33k</td></tr>
                <tr><td><strong>2 BHK</strong></td><td>₹18k - 23k</td><td>₹21k - 26k</td><td>₹24k - 29.5k</td><td>₹27.5k - 34k</td><td>₹31k - 37k</td><td>₹34.5k - 41.5k</td></tr>
                <tr><td><strong>3 BHK</strong></td><td>₹22k - 27k</td><td>₹25k - 31.5k</td><td>₹28.5k - 35k</td><td>₹32k - 39k</td><td>₹36.5k - 44.5k</td><td>₹39.5k - 49k</td></tr>
                <tr><td><strong>4+ BHK / Villa</strong></td><td>₹27k - 33.5k</td><td>₹30.5k - 37.5k</td><td>₹34.5k - 41.5k</td><td>₹38.5k - 45.5k</td><td>₹42.5k - 51k</td><td>₹47k - 55k</td></tr>
                <tr><td><strong>Bike Transport</strong></td><td>₹3k - 5k</td><td>₹4k - 6k</td><td>₹5.5k - 8k</td><td>₹8k - 10k</td><td>₹9k - 11k</td><td>₹10k - 12.5k</td></tr>
                <tr><td><strong>Car Transport</strong></td><td>₹7k - 9k</td><td>₹9k - 11.5k</td><td>₹11k - 15k</td><td>₹13k - 18k</td><td>₹15k - 20k</td><td>₹17k - 23.5k</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
