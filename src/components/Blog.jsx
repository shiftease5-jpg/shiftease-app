import { ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogData } from '../data/blogData';

export default function Blog() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#0f172a',
      color: 'white',
      padding: '120px 24px 60px 24px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '16px', color: 'white', fontFamily: 'Outfit' }}>ShiftEase <span style={{ color: '#f97316' }}>Blog</span></h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Expert moving tips, packing guides, and relocation advice from India's most trusted packers and movers.
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', width: '100%' }}>
        {blogData.map((post) => (
          <div key={post.id} style={{ 
            background: 'rgba(30, 41, 59, 0.7)', 
            backdropFilter: 'blur(10px)',
            borderRadius: '16px', 
            border: '1px solid rgba(255,255,255,0.1)', 
            width: '100%',
            maxWidth: '350px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{ 
              width: '100%', 
              height: '200px', 
              backgroundImage: `url(${post.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {post.readTime}</span>
              </div>
              <h3 style={{ marginBottom: '12px', color: 'white', fontSize: '1.3rem', lineHeight: '1.4' }}>{post.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.5', flex: 1 }}>
                {post.excerpt}
              </p>
              <Link to={`/blog/${post.slug}`} style={{
                display: 'inline-block',
                background: '#f97316',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                textAlign: 'center',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#ea580c'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f97316'}
              >
                Read Article
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Link to="/" style={{
        marginTop: '60px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        color: '#38bdf8',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1.1rem'
      }}>
        <ArrowLeft size={20} /> Back to Homepage
      </Link>
    </div>
  );
}
