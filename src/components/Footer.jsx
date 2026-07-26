import { 
  Mail, Phone, MapPin, ShieldCheck, Navigation, 
  DollarSign, Clock, ArrowRight, Home, Briefcase, 
  Car, Package, HelpCircle, FileText, Info, Truck, CheckCircle2
} from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const handleScroll = (e, id) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      window.location.href = `/${id}`;
      return;
    }
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Pre-Footer CTA */}
      <section className="pre-footer-cta">
        <div className="container">
          <div className="cta-content glass-premium fade-in-up">
            <h2>Start Your Move Today</h2>
            <p>Get your free moving estimate. Takes less than 30 seconds.</p>
            <button onClick={(e) => handleScroll(e, '#quote-form')} className="btn-primary cta-btn" style={{border: 'none', cursor: 'pointer', fontFamily: 'inherit'}}>
              Get Free Quote <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <footer className="footer premium-footer" id="contact">
        {/* Background Glow Elements */}
        <div className="footer-glow glow-blue"></div>
        <div className="footer-glow glow-orange"></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          
          {/* Glass Trust Cards Row */}
          <div className="footer-trust-cards">
            <div className="trust-glass-card">
              <ShieldCheck size={28} color="#10b981" className="trust-icon" />
              <h4>Safe Packing</h4>
              <span>Professional Handling</span>
            </div>
            <div className="trust-glass-card">
              <Navigation size={28} color="#38bdf8" className="trust-icon" />
              <h4>Real-Time GPS</h4>
              <span>Track Every Mile</span>
            </div>
            <div className="trust-glass-card">
              <DollarSign size={28} color="#f59e0b" className="trust-icon" />
              <h4>Transparent Pricing</h4>
              <span>No Hidden Fees</span>
            </div>
            <div className="trust-glass-card">
              <Clock size={28} color="#f43f5e" className="trust-icon" />
              <h4>24×7 Support</h4>
              <span>Always Here</span>
            </div>
          </div>

          {/* Top Brand Section */}
          <div className="footer-brand-header">
            <div className="footer-brand-left">
              <button onClick={(e) => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); }} className="footer-logo-link" style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>
                <Truck size={32} color="#f97316" />
                <span>Shift<span style={{color: '#f97316'}}>Ease</span></span>
              </button>
              <p className="footer-tagline">
                Making relocation simple through technology, transparency, and professional moving services across India.
              </p>
              <div className="footer-badges">
                <span className="badge-item"><CheckCircle2 size={14} color="#10b981"/> Customer First</span>
                <span className="badge-item"><CheckCircle2 size={14} color="#10b981"/> Safe • Reliable • Transparent</span>
              </div>
            </div>
            <div className="footer-brand-right">
              <div className="btn-glow-bg"></div>
              <button onClick={(e) => handleScroll(e, '#quote-form')} className="btn-primary footer-action-btn" style={{position: 'relative', zIndex: 2, border: 'none', cursor: 'pointer'}}>Get a Free Quote</button>
              <a href="tel:+919797820423" className="btn-secondary footer-action-btn glass-btn" style={{position: 'relative', zIndex: 2}}>Call Now</a>
            </div>
          </div>

          {/* Multi-Column Navigation */}
          <div className="footer-grid">
            <div className="footer-col">
              <h4>SERVICES</h4>
              <ul className="footer-links">
                <li><a href="/service/house-shifting"><Home size={16} className="link-icon" /> <span>House Shifting</span></a></li>
                <li><a href="/service/office-relocation"><Briefcase size={16} className="link-icon" /> <span>Office Relocation</span></a></li>
                <li><a href="/service/bike-transport"><Car size={16} className="link-icon" /> <span>Bike Transport</span></a></li>
                <li><a href="/service/car-transport"><Car size={16} className="link-icon" /> <span>Car Transport</span></a></li>
                <li><a href="/service/packing-services"><Package size={16} className="link-icon" /> <span>Packing Services</span></a></li>
                <li><a href="/service/storage-services"><Package size={16} className="link-icon" /> <span>Storage Services</span></a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>SERVICE AREAS</h4>
              <ul className="footer-links">
                <li><a href="/packers-and-movers-mumbai"><MapPin size={16} className="link-icon" /> <span>Mumbai</span></a></li>
                <li><a href="/packers-and-movers-andheri"><MapPin size={16} className="link-icon" /> <span>Andheri</span></a></li>
                <li><a href="/packers-and-movers-bandra"><MapPin size={16} className="link-icon" /> <span>Bandra</span></a></li>
                <li><a href="/packers-and-movers-thane"><MapPin size={16} className="link-icon" /> <span>Thane</span></a></li>
                <li><a href="/packers-and-movers-navi-mumbai"><MapPin size={16} className="link-icon" /> <span>Navi Mumbai</span></a></li>
                <li><a href="/packers-and-movers-pune"><MapPin size={16} className="link-icon" /> <span>Pune</span></a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>COMPANY</h4>
              <ul className="footer-links">
                <li><a href="#about" onClick={(e) => handleScroll(e, '#about')}><Info size={16} className="link-icon" /> <span>About Us</span></a></li>
                <li><a href="/blog"><FileText size={16} className="link-icon" /> <span>Blog</span></a></li>
                <li><a href="#contact" onClick={(e) => handleScroll(e, '#contact')}><Mail size={16} className="link-icon" /> <span>Contact</span></a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>SUPPORT</h4>
              <ul className="footer-links">
                <li><a href="#faq" onClick={(e) => handleScroll(e, '#faq')}><HelpCircle size={16} className="link-icon" /> <span>FAQ</span></a></li>
                <li><a href="/privacy"><ShieldCheck size={16} className="link-icon" /> <span>Privacy Policy</span></a></li>
                <li><a href="/terms"><FileText size={16} className="link-icon" /> <span>Terms of Service</span></a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>CONTACT</h4>
              <ul className="footer-contact">
                <li><Phone size={16} /> <span>+91 9797820423</span></li>
                <li><Phone size={16} /> <span>+91 9967728718</span></li>
                <li><Mail size={16} /> <span>shiftease5@gmail.com</span></li>
                <li><MapPin size={16} /> <span>Serving Pan India</span></li>
                <li className="social-row">
                  {/* Inline SVGs for Socials */}
                  <a href="#" className="social-icon" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="social-icon" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="#" className="social-icon" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="#" className="social-icon" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Guarantees & Copyright */}
          <div className="footer-bottom-bar">
            <div className="footer-guarantees">
              <span><ShieldCheck size={14} color="#10b981"/> Safe Packing</span>
              <span><Navigation size={14} color="#38bdf8"/> Live GPS</span>
              <span><DollarSign size={14} color="#f59e0b"/> Transparent Pricing</span>
              <span><Clock size={14} color="#f43f5e"/> 24×7 Support</span>
            </div>
            <div className="footer-copyright">
              <p>&copy; {new Date().getFullYear()} ShiftEase. All rights reserved.</p>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
