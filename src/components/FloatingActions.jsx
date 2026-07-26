import { Phone, MessageCircle } from 'lucide-react';
// We rely on index.css for global floating action styles now

export default function FloatingActions() {
  const whatsappNumber = "919967728718";
  const phoneNumber = "919967728718";

  return (
    <div className="floating-actions">
      <a 
        href={`https://wa.me/${whatsappNumber}?text=Hi%20ShiftEase,%20I%20would%20like%20to%20book%20a%20free%20virtual%20video%20survey%20for%20my%20move.`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fab whatsapp" 
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
      <a 
        href={`tel:+${phoneNumber}`} 
        className="fab call" 
        title="Call Us Now"
      >
        <Phone size={28} />
      </a>
    </div>
  );
}
