import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import QuoteSection from './components/QuoteSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
const TrackingMap = lazy(() => import('./components/TrackingMap'));
const DriverPortal = lazy(() => import('./components/DriverPortal'));
const DriverDashboard = lazy(() => import('./components/DriverDashboard'));
const DriverSimulator = lazy(() => import('./components/DriverSimulator'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const Blog = lazy(() => import('./components/Blog'));
const Privacy = lazy(() => import('./components/Privacy'));
const Terms = lazy(() => import('./components/Terms'));
const CityLandingPage = lazy(() => import('./components/CityLandingPage'));
const ServiceLandingPage = lazy(() => import('./components/ServiceLandingPage'));
const BlogPost = lazy(() => import('./components/BlogPost'));

function DynamicRouteHandler() {
  const { slug } = useParams();
  
  if (slug && slug.startsWith('packers-and-movers-')) {
    const city = slug.replace('packers-and-movers-', '');
    return <CityLandingPage city={city} />;
  }
  
  // If no match, redirect to home or 404
  return <Navigate to="/" replace />;
}

function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Packers and Movers in Mumbai | ShiftEase</title>
        <meta name="description" content="Professional Packers and Movers in Mumbai with live GPS tracking, transparent pricing, secure packing and affordable relocation. Get a free quote today." />
        <meta property="og:title" content="Packers and Movers in Mumbai | ShiftEase" />
        <meta property="og:description" content="Professional Packers and Movers in Mumbai with live GPS tracking, transparent pricing, secure packing and affordable relocation. Get a free quote today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shiftease.in" />
        <meta property="og:image" content="https://shiftease.in/images/hero_truck_1785087164697.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Packers and Movers in Mumbai | ShiftEase" />
        <meta name="twitter:description" content="Professional Packers and Movers in Mumbai with live GPS tracking, transparent pricing, secure packing and affordable relocation. Get a free quote today." />
        <meta name="twitter:image" content="https://shiftease.in/images/hero_truck_1785087164697.png" />
      </Helmet>
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Services />
        <Testimonials />
        <QuoteSection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', color: '#FF5A00', fontSize: '1.5rem', fontWeight: 600}}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/:slug" element={<DynamicRouteHandler />} />
            <Route path="/service/:serviceId" element={<ServiceLandingPage />} />
            <Route path="/track" element={<TrackingMap />} />
            <Route path="/driver" element={<DriverPortal />} />
            <Route path="/driver/dashboard" element={<DriverDashboard />} />
            <Route path="/simulator" element={<DriverSimulator />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
