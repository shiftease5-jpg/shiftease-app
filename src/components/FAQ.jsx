import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircleQuestion } from 'lucide-react';
import SchemaInjector from './SchemaInjector';
import './FAQ.css';

export default function FAQ({ city }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Are there any hidden charges in your quotes?",
      a: "Absolutely not. We guarantee zero hidden charges. The quote you receive after our virtual survey or volume calculation is final. Taxes, tolls, and packing materials are all clearly outlined upfront."
    },
    {
      q: "Do you provide insurance for my belongings?",
      a: "Yes! We provide comprehensive transit insurance for your valuable items. In the rare event of damage during transit, our dedicated claims team will process your reimbursement swiftly."
    },
    {
      q: "How do you pack fragile items like TVs and glassware?",
      a: "We use a premium 3-layer packing system. Fragile items are first wrapped in heavy-duty bubble wrap, followed by corrugated sheets, and finally packed securely into sturdy, labeled cartons with foam padding."
    },
    {
      q: "Can I track my moving truck in real-time?",
      a: "Yes, all our fleet vehicles are GPS-enabled. Once your move begins, you can log into our Secure Customer Portal to track your truck's exact location, just like tracking an Uber."
    },
    {
      q: "How much in advance should I book my move?",
      a: "We recommend booking at least 3-5 days in advance for local moves and 1-2 weeks in advance for intercity moves to ensure truck availability, especially during month-ends."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section className="section" id="faq">
      <SchemaInjector schemaData={faqSchema} />
      <div className="container">
        <h2 className="section-title text-gradient">
          {city ? `Frequently Asked Questions in ${city}` : `Frequently Asked Questions`}
        </h2>
        <p className="section-subtitle">Everything you need to know about moving with ShiftEase.</p>

        <div className="faq-container glass">
          <div className="faq-icon-header">
            <MessageCircleQuestion size={48} color="var(--secondary-color)" />
          </div>
          
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div 
                className={`faq-item ${openIndex === idx ? 'open' : ''}`} 
                key={idx}
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  {openIndex === idx ? <ChevronUp className="faq-chevron" /> : <ChevronDown className="faq-chevron" />}
                </div>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
