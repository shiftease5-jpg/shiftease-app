import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
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
      <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>ShiftEase Blog</h1>
      <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '40px' }}>
        We're currently writing some amazing articles about moving tips, packing guides, and relocation advice. Check back soon!
      </p>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '300px', textAlign: 'left' }}>
          <div style={{ width: '100%', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '16px' }}></div>
          <h3 style={{ marginBottom: '8px', color: 'white' }}>10 Tips for a Stress-Free Move</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Coming soon...</p>
        </div>
        
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '300px', textAlign: 'left' }}>
          <div style={{ width: '100%', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '16px' }}></div>
          <h3 style={{ marginBottom: '8px', color: 'white' }}>How to Pack Fragile Items</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Coming soon...</p>
        </div>
      </div>

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
