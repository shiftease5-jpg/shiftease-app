import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from './Hero';
import Features from './Features';
import Services from './Services';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Footer from './Footer';
import FloatingActions from './FloatingActions';
import SchemaInjector from './SchemaInjector';

// Helper to format service names (house-shifting -> House Shifting)
const formatService = (serviceId) => {
  if (!serviceId) return '';
  return serviceId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function ServiceLandingPage() {
  const { serviceId } = useParams();
  const formattedService = formatService(serviceId);
  
  const seoTitle = `${formattedService} in Mumbai | ShiftEase Packers and Movers`;
  const seoDesc = `Professional ${formattedService.toLowerCase()} services in Mumbai with live GPS tracking, transparent pricing, and secure packing. Get a free quote today.`;
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": formattedService,
    "provider": {
      "@type": "MovingCompany",
      "name": "ShiftEase",
      "telephone": ["+919797820423", "+919967728718"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Lokhandwala",
        "addressLocality": "Kandivali East, Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400101",
        "addressCountry": "IN"
      }
    },
    "areaServed": "Mumbai"
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={`https://shiftease.in/service/${serviceId}`} />
      </Helmet>
      <SchemaInjector schemaData={serviceSchema} />
      <main>
        {/* We can pass service name to Hero so it adjusts the H1 tag appropriately */}
        <Hero serviceName={formattedService} />
        <Features />
        <HowItWorks />
        <Services />
        <Testimonials />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
