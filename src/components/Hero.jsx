import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero({ city, serviceName }) {
  const scrollToQuote = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-container container">
        
        <div className="hero-content">
          <p className="hero-eyebrow fade-in-up">Tech-Enabled Relocation</p>
          <h1 className="hero-title fade-in-up" style={{animationDelay: '0.1s'}}>
            Move<br />
            Without<br />
            <span className="text-gradient">Stress.</span>
          </h1>
          
          <p className="hero-subtitle fade-in-up" style={{animationDelay: '0.2s'}}>
            Professional packers and movers in {city || 'Mumbai'} with live GPS tracking, 
            transparent pricing, and verified moving teams.
          </p>
          
          <div className="hero-cta fade-in-up" style={{animationDelay: '0.3s'}}>
            <button className="btn-primary" onClick={scrollToQuote}>
              Get Free Quote
            </button>
            <Link to="/track" className="btn-secondary">
              Live Tracking
            </Link>
          </div>
          
          <div className="hero-trust-metrics fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="trust-metric"><span className="emoji">📦</span> 1000+ Moves</div>
            <div className="trust-metric"><span className="emoji">⭐</span> 4.9 Rating</div>
            <div className="trust-metric"><span className="emoji">📍</span> {city || 'Mumbai'}</div>
            <div className="trust-metric"><span className="emoji">🛡️</span> GPS Tracking</div>
          </div>
        </div>

        <div className="hero-visual fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="hero-image-wrapper">
            <img 
              src="/images/hero_truck_1785087164697.png" 
              alt="Clean white ShiftEase moving truck" 
              className="hero-image"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
