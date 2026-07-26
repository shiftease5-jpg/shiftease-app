import { useState } from 'react';
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
            Safe relocation in {city || 'Mumbai'} with live GPS tracking, 
            professional movers and transparent pricing.
          </p>
          
          <div className="hero-cta fade-in-up" style={{animationDelay: '0.3s'}}>
            <button className="btn-primary btn-large" onClick={scrollToQuote}>
              Get Free Quote
            </button>
          </div>
          
          <p className="hero-trust fade-in-up" style={{animationDelay: '0.4s'}}>
            Trusted across {city || 'Mumbai'}
          </p>
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
