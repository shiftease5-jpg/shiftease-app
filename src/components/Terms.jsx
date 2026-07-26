import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#0f172a',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Terms of Service</h1>
      <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '40px' }}>
        Our legal team is currently finalizing our terms of service to ensure full transparency and compliance. Check back soon!
      </p>

      <Link to="/" style={{
        marginTop: '60px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        color: '#f97316',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>
        <ArrowLeft size={20} /> Back to Homepage
      </Link>
    </div>
  );
}
