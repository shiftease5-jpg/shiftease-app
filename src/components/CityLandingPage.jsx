import React from 'react';
import { useParams } from 'react-router-dom';
import Hero from './Hero';
import Features from './Features';
import Services from './Services';
import HowItWorks from './HowItWorks';
import TrackingPreview from './TrackingPreview';
import Pricing from './Pricing';
import VolumeCalculator from './VolumeCalculator';
import Fleet from './Fleet';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Footer from './Footer';
import FloatingActions from './FloatingActions';
import SEO from './SEO';
import SchemaInjector from './SchemaInjector';

// Helper to format city names (mumbai -> Mumbai)
const formatCity = (city) => {
  if (!city) return '';
  return city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ');
};

export default function CityLandingPage() {
  const { city } = useParams();
  const formattedCity = formatCity(city);
  
  const seoTitle = `Packers and Movers in ${formattedCity} | Shift Ease`;
  const seoDesc = `Affordable and trusted packers and movers in ${formattedCity} with live GPS tracking, secure packing, and transparent pricing. Get a free quote today.`;
  
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `ShiftEase Packers and Movers ${formattedCity}`,
    "image": "https://shiftease.com/logo.png",
    "telephone": "+919876543210",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": formattedCity,
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} />
      <SchemaInjector schemaData={localBusinessSchema} />
      <main>
        {/* Pass city to components that need dynamic text */}
        <Hero city={formattedCity} />
        <Features city={formattedCity} />
        <Services />
        <TrackingPreview />
        <HowItWorks />
        <Pricing />
        <VolumeCalculator />
        <Fleet />
        <Testimonials />
        <FAQ city={formattedCity} />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
