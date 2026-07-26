import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-apple">
      <div className="container">
        <div className="footer-apple-content">
          <div className="footer-trust-row">
            <span>✔ GST Number</span>
            <span>✔ Business Hours</span>
            <span>✔ Office Address</span>
            <span>✔ Google Reviews</span>
          </div>
          
          <div className="footer-bottom-row">
            <p className="footer-copyright">
            Copyright © {new Date().getFullYear()} ShiftEase. All rights reserved.
          </p>
          <ul className="footer-apple-links">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Use</Link></li>
            <li><Link to="/blog">News</Link></li>
            <li><a href="mailto:shiftease5@gmail.com">Support</a></li>
            <li><a href="tel:+919797820423">Contact</a></li>
          </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
