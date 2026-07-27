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
            {serviceName ? (
              <>
                {serviceName}<br />
                <span className="text-gradient">Experts.</span>
              </>
            ) : (
              <>
                Move<br />
                Without<br />
                <span className="text-gradient">Stress.</span>
              </>
            )}
          </h1>
          
          <p className="hero-subtitle fade-in-up" style={{animationDelay: '0.2s'}}>
            {serviceName 
              ? `Top-rated ${serviceName.toLowerCase()} in ${city || 'Mumbai'} with live GPS tracking, transparent pricing, and verified professionals.`
              : `Professional packers and movers in ${city || 'Mumbai'} with live GPS tracking, transparent pricing, and verified professionals.`
            }
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
            ★★★★★ <span className="stars-score">4.9</span> <span>Trusted by 500+ families</span>
          </div>
          <div className="trust-banner-items">
            <span>✓ <span className="hide-on-mobile">Live </span>GPS<span className="hide-on-mobile"> Tracking</span></span>
            <span>✓ Verified<span className="hide-on-mobile"> Drivers</span></span>
            <span>✓ On-time<span className="hide-on-mobile"> Delivery</span></span>
            <span className="hide-on-mobile">✓ No Hidden Charges</span>
            <span className="hide-on-mobile">✓ Damage Protection</span>
          </div>
        </div>
      </div>
    </section>
  );
}
