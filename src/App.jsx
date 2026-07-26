import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import TrackingPreview from './components/TrackingPreview';
import Pricing from './components/Pricing';
import VolumeCalculator from './components/VolumeCalculator';
import Fleet from './components/Fleet';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import TrackingMap from './components/TrackingMap';
import DriverPortal from './components/DriverPortal';
import DriverDashboard from './components/DriverDashboard';
import DriverSimulator from './components/DriverSimulator';
import AdminDashboard from './components/AdminDashboard';
import Blog from './components/Blog';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import CityLandingPage from './components/CityLandingPage';
import ServiceLandingPage from './components/ServiceLandingPage';
import BlogPost from './components/BlogPost';
import { useParams, Navigate } from 'react-router-dom';

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
      </Helmet>
      <main>
        <Hero />
        <Features />
        <Services />
        <TrackingPreview />
        <HowItWorks />
        <Pricing />
        <VolumeCalculator />
        <Fleet />
        <Testimonials />
        <FAQ />
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
      </Router>
    </HelmetProvider>
  );
}

export default App;
