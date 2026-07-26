import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import BlogPost from './components/BlogPost';

function LandingPage() {
  return (
    <>
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
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/packers-and-movers-:city" element={<CityLandingPage />} />
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
