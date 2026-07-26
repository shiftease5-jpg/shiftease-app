import './Testimonials.css';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Moved Delhi → Bangalore',
      content: 'The Live Tracking gave me so much peace of mind. I could see exactly where the truck was at all times. The packing quality was excellent and highly professional.',
    },
    {
      id: 2,
      name: 'Priya Desai',
      role: 'Office Relocation, Mumbai',
      content: 'Absolutely incredible service. I loved the Virtual Survey feature—it took 5 minutes and the quote was fixed. No hidden charges on moving day!',
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Local Move, Hyderabad',
      content: 'Everything was wrapped securely in 3-layer packaging, and not a single item was scratched. They even dismantled and reassembled my bed perfectly.',
    }
  ];

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Customer Reviews</h2>
          <p className="section-subtitle">Real experiences from our customers.</p>
        </div>
        
        <div className="testimonials-grid">
          {reviews.map((review, idx) => (
            <div key={review.id} className="testimonial-item fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
              <p className="testimonial-content">"{review.content}"</p>
              <div className="testimonial-author">
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
