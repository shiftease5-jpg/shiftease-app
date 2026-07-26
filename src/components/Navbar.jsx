import { useState, useEffect } from 'react';
import { Menu, Truck, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleHomeClick = (e) => {
    closeMenu();
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/driver')) {
    return null;
  }

  const handleQuoteClick = (e) => {
    e.preventDefault();
    closeMenu();
    if (window.location.pathname !== '/') {
      window.location.href = '/#quote-form';
      return;
    }
    const element = document.getElementById('quote-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={handleHomeClick}>
          <Truck size={28} color="var(--secondary-color)" />
          Shift<span>Ease</span>
        </Link>

        <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" onClick={handleHomeClick}>Home</Link>
          <a href="/#about" onClick={closeMenu}>Why Us</a>
          <a href="/#services" onClick={closeMenu}>Services</a>
          <Link to="/track" onClick={closeMenu} style={{color: 'var(--secondary-color)', fontWeight: 'bold'}}>Live Truck Tracking</Link>
          <a href="tel:+919967728718" onClick={closeMenu} style={{color: '#10B981', fontWeight: 'bold'}}>24/7 Support</a>
          <Link to="/driver" onClick={closeMenu} className="btn-primary" style={{textDecoration: 'none'}}>Driver Portal</Link>
          <Link to="/admin" onClick={closeMenu} style={{color: '#94a3b8', fontSize: '0.9rem'}}>Admin</Link>
          <button onClick={handleQuoteClick} className="btn-primary mobile-only-btn">
            Get a Quote
          </button>
        </nav>

        <button onClick={handleQuoteClick} className="btn-primary nav-btn" style={{ textDecoration: 'none' }}>
          Get a Quote
        </button>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={closeMenu}></div>
      )}
    </header>
  );
}
