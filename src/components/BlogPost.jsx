import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogData } from '../data/blogData';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogData.find(p => p.slug === slug);

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#0f172a', color: 'white' }}>
        <h2>Article Not Found</h2>
        <Link to="/blog" style={{ color: '#f97316', marginTop: '20px' }}>Return to Blog</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#f8fafc', paddingBottom: '80px' }}>
      {/* Hero Image */}
      <div style={{ 
        width: '100%', 
        height: '400px', 
        backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.2), rgba(15,23,42,1)), url(${post.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'absolute', bottom: '40px', left: '0', right: '0', padding: '0 24px' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold', marginBottom: '24px' }}>
            <ArrowLeft size={20} /> Back to Articles
          </Link>
          <div style={{ display: 'flex', gap: '20px', color: '#94a3b8', fontSize: '0.95rem', marginBottom: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {post.readTime}</span>
          </div>
          <h1 style={{ fontSize: '3rem', fontFamily: 'Outfit', color: 'white', maxWidth: '800px', lineHeight: '1.2', margin: '0' }}>{post.title}</h1>
        </div>
      </div>

      {/* Article Content */}
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ 
          fontSize: '1.15rem', 
          lineHeight: '1.8', 
          color: '#cbd5e1',
          fontFamily: 'Inter, sans-serif'
        }}>
          {/* Custom styling for markdown elements */}
          <style>
            {`
              .blog-content h3 { color: white; margin-top: 40px; margin-bottom: 16px; font-size: 1.8rem; font-family: Outfit; }
              .blog-content p { margin-bottom: 24px; }
              .blog-content ul { margin-bottom: 24px; padding-left: 24px; }
              .blog-content li { margin-bottom: 12px; }
              .blog-content strong { color: white; }
            `}
          </style>
          
          <div className="blog-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
        
        {/* Call to Action */}
        <div style={{ 
          marginTop: '60px', 
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(249, 115, 22, 0.05))',
          border: '1px solid rgba(249, 115, 22, 0.2)',
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '16px', fontFamily: 'Outfit' }}>Ready for a Stress-Free Move?</h3>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px auto' }}>
            Let our professional Move Managers handle all the heavy lifting. Get an instant, transparent quote today.
          </p>
          <a 
            href="https://wa.me/919967728718?text=Hi%20ShiftEase,%20I%20read%20your%20blog%20and%20I'm%20interested%20in%20getting%20an%20instant%20quote%20for%20my%20move." 
            target="_blank"
            rel="noopener noreferrer"
            style={{
            display: 'inline-block',
            background: '#f97316',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            transition: 'background 0.3s'
          }}>
            Get Instant Quote
          </a>
        </div>
      </div>
    </div>
  );
}
