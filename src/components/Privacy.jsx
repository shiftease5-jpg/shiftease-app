import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
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
      <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Privacy Policy</h1>
      <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '40px' }}>
        We are currently updating our privacy policy to reflect our latest security practices and data protection standards. Check back soon!
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
