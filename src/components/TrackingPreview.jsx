import { MapPin, Navigation, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './TrackingPreview.css';

export default function TrackingPreview() {
  return (
    <section className="section" id="tracking-preview" style={{ background: '#0f172a', color: 'white', overflow: 'hidden', position: 'relative' }}>
      
      {/* Decorative Background Elements */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="tracking-preview-layout">
          
          <div className="tracking-preview-text fade-in-up">
            <h2 className="section-title" style={{ color: 'white', textAlign: 'left', marginBottom: '24px' }}>
              Live GPS Tracking. <span className="text-gradient">Zero Anxiety.</span>
            </h2>
            <p className="section-subtitle" style={{ color: '#94a3b8', marginBottom: '32px', textAlign: 'left' }}>
              Unlike traditional movers, ShiftEase turns your relocation into a digital experience. Track your belongings in real-time, share your ETA with family, and message your driver instantly.
            </p>
            
            <ul className="tracking-benefits">
              <li><Navigation size={20} color="#38bdf8" /> Real-time route updates every 5 seconds</li>
              <li><Clock size={20} color="#38bdf8" /> AI-powered exact Estimated Time of Arrival</li>
              <li><MapPin size={20} color="#38bdf8" /> Secure tracking link sharing</li>
            </ul>

            <Link to="/track" className="btn-primary pulse-button" style={{ marginTop: '40px', display: 'inline-block' }}>
              Explore the App
            </Link>
          </div>

          <div className="tracking-preview-visual fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="mock-phone float-animation">
              <div className="mock-map">
                {/* Simulated Map Route Graphic */}
                <div className="mock-route-line"></div>
                <div className="mock-truck-marker">
                  <div className="mock-truck-pulse"></div>
                  🚚
                </div>
                <div className="mock-destination-marker"><MapPin fill="#f97316" color="white" /></div>
              </div>
              
              <div className="mock-phone-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Status</span>
                  <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#059669', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>ON THE WAY</span>
                </div>
                
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: '#0f172a' }}>Heading to Bangalore</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Estimated Arrival: <strong style={{color: '#0f172a'}}>2 hrs 14 mins</strong></p>

                <div className="mock-driver-card hover-lift">
                  <div className="mock-avatar"></div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ margin: '0 0 2px 0', color: '#0f172a' }}>Ramesh K.</h5>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <span style={{color: '#f59e0b', fontSize: '0.8rem'}}>★</span>
                      <span style={{color: '#f59e0b', fontSize: '0.8rem'}}>★</span>
                      <span style={{color: '#f59e0b', fontSize: '0.8rem'}}>★</span>
                      <span style={{color: '#f59e0b', fontSize: '0.8rem'}}>★</span>
                      <span style={{color: '#f59e0b', fontSize: '0.8rem'}}>★</span>
                    </div>
                  </div>
                  <div className="mock-call-btn">📞</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
