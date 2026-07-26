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

  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/driver/dashboard') || location.pathname.startsWith('/simulator')) {
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
          <a href="/#trust" onClick={closeMenu}>Why ShiftEase</a>
          <a href="/#services" onClick={closeMenu}>Services</a>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/track" onClick={closeMenu} style={{color: 'var(--secondary-color)', fontWeight: 'bold'}}>Tracking</Link>
          <a href="tel:+919967728718" onClick={closeMenu} style={{fontWeight: '500'}}>
            🟢 Support
          </a>
          
          <div className="mobile-only-btn">
            <Link to="/driver" onClick={closeMenu} className="btn-secondary" style={{textDecoration: 'none'}}>Driver Portal</Link>
            <button onClick={handleQuoteClick} className="btn-primary" style={{width: '100%'}}>
              Get a Quote
            </button>
          </div>
        </nav>

        <div className="nav-btn-group nav-btn">
          <Link to="/driver" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Driver Portal
          </Link>
          <button onClick={handleQuoteClick} className="btn-primary" style={{ textDecoration: 'none' }}>
            Get a Quote
          </button>
        </div>

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
