import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
import SchemaInjector from './SchemaInjector';

// Helper to format city names (mumbai -> Mumbai)
const formatCity = (city) => {
  if (!city) return '';
  return city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ');
};

export default function CityLandingPage({ city }) {
  const formattedCity = formatCity(city);
  
  const seoTitle = `Packers and Movers in ${formattedCity} | ShiftEase`;
  const seoDesc = `Affordable and trusted packers and movers in ${formattedCity} with live GPS tracking, secure packing, and transparent pricing. Get a free quote today.`;
  
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "name": `ShiftEase Packers and Movers ${formattedCity}`,
    "url": `https://shiftease.in/packers-and-movers-${city}`,
    "telephone": ["+919797820423", "+919967728718"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Lokhandwala",
      "addressLocality": "Kandivali East, Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400101",
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={`https://shiftease.in/packers-and-movers-${city}`} />
      </Helmet>
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
