import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-minimal">
      <div className="container">
        <ul className="footer-minimal-links">
          <li>ShiftEase © {new Date().getFullYear()}</li>
          <li><Link to="/privacy">Privacy & Legal</Link></li>
          <li><Link to="/terms">Terms of Service</Link></li>
          <li><Link to="/blog">News</Link></li>
          <li><a href="mailto:shiftease5@gmail.com">shiftease5@gmail.com</a></li>
          <li><a href="tel:+919967728718">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
