import './TrustedBy.css';

export default function TrustedBy() {
  const partners = [
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Flipkart", logo: "https://cdn.worldvectorlogo.com/logos/flipkart.svg" },
    { name: "TCS", logo: "https://cdn.worldvectorlogo.com/logos/tata-consultancy-services.svg" },
    { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
    { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
  ];

  return (
    <section className="trusted-by-section">
      <div className="container">
        <p className="trusted-title">TRUSTED BY EMPLOYEES FROM TOP COMPANIES</p>
        <div className="trusted-logos">
          {partners.map((partner, idx) => (
            <div key={idx} className="trusted-logo-wrapper">
              <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" className="trusted-logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
