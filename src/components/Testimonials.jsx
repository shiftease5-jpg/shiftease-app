import { Star } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Moved Delhi → Bangalore',
      content: 'The Live Tracking gave me so much peace of mind. I could see exactly where the truck was at all times. The packing quality was excellent and highly professional.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=0f172a&color=fff&bold=true'
    },
    {
      id: 2,
      name: 'Priya Desai',
      role: 'Office Relocation, Mumbai',
      content: 'Absolutely incredible service. I loved the Virtual Survey feature—it took 5 minutes and the quote was fixed. No hidden charges on moving day!',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Priya+Desai&background=0ea5e9&color=fff&bold=true'
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Local Move, Hyderabad',
      content: 'Everything was wrapped securely in 3-layer packaging, and not a single item was scratched. They even dismantled and reassembled my bed perfectly.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=10b981&color=fff&bold=true'
    }
  ];

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title text-gradient">Early Adopter Stories</h2>
          <p className="section-subtitle">Real experiences from our first customers who gave ShiftEase a try.</p>
        </div>
        
        <div className="testimonials-grid-premium">
          {reviews.map((review, idx) => (
            <div key={review.id} className="testimonial-card-premium fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
              <p className="testimonial-content">"{review.content}"</p>
              
              <div className="testimonial-author">
                <img src={review.image} alt={review.name} className="author-img" />
                <div className="author-info">
                  <h4>{review.name}</h4>
                  <span>{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
