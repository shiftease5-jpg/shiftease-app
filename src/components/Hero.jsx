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
          <p className="hero-eyebrow fade-in-up">India's modern moving platform.</p>
          <h1 className="hero-title fade-in-up" style={{animationDelay: '0.1s'}}>
            Move<br />
            Without<br />
            <span className="text-gradient">Stress.</span>
          </h1>
          
          <p className="hero-subtitle fade-in-up" style={{animationDelay: '0.2s'}}>
            Professional packers and movers in {city || 'Mumbai'} with live GPS tracking, transparent pricing, and verified professionals.
          </p>
          
          <div className="hero-cta fade-in-up" style={{animationDelay: '0.3s'}}>
            <button className="btn-primary" onClick={scrollToQuote}>
              Get Free Quote
            </button>
            <Link to="/track" className="btn-secondary">
              Live Tracking
            </Link>
          </div>
          
          {/* Removed inline trust metrics to move to full-width banner */}
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

      <div className="hero-trust-banner-fullwidth fade-in-up" style={{animationDelay: '0.5s'}}>
        <div className="container trust-banner-content">
          <div className="trust-banner-stars">
            ★★★★★ <span>Trusted by 500+ families</span>
          </div>
          <div className="trust-banner-items">
            <span>✓ Verified Drivers</span>
            <span>✓ Live GPS Tracking</span>
            <span>✓ No Hidden Charges</span>
            <span>✓ On-Time Delivery</span>
            <span>✓ Damage Protection</span>
          </div>
        </div>
      </div>
    </section>
  );
}
