import { useState } from 'react';
import { Calculator, Plus, Minus, Send, Box } from 'lucide-react';
import './VolumeCalculator.css';

export default function VolumeCalculator() {
  const [houseSize, setHouseSize] = useState('1 BHK');
  const [items, setItems] = useState({
    Sofa: 0,
    TV_Boxes: 0,
    Bed: 0,
    Fridge: 0,
    WashingMachine: 0,
    Almira: 0
  });

  const itemNames = {
    Sofa: 'Sofa',
    TV_Boxes: 'TV & Boxes',
    Bed: 'Bed',
    Fridge: 'Fridge',
    WashingMachine: 'Washing Machine',
    Almira: 'Almira (Wardrobe)'
  };

  const updateItem = (item, delta) => {
    setItems(prev => ({
      ...prev,
      [item]: Math.max(0, prev[item] + delta)
    }));
  };

  // Rough estimation logic
  const baseVolume = houseSize === '1 RK' ? 150 : houseSize === '1 BHK' ? 250 : houseSize === '2 BHK' ? 400 : 600;
  const itemsVolume = (items.Sofa * 30) + (items.TV_Boxes * 15) + (items.Bed * 40) + (items.Fridge * 20) + (items.WashingMachine * 15) + (items.Almira * 35);
  const totalVolume = baseVolume + itemsVolume;

  let recommendedTruck = "Tata Ace (Chota Hathi)";
  if (totalVolume > 200 && totalVolume <= 400) recommendedTruck = "14ft Eicher";
  if (totalVolume > 400) recommendedTruck = "19ft Container";

  const handleSendToWhatsApp = () => {
    const itemList = Object.entries(items).filter(([_, count]) => count > 0).map(([name, count]) => `- ${count}x ${itemNames[name]}`).join('\n');
    const message = `Hi ShiftEase! I used your Volume Calculator. 📦\n\n🏠 House Size: ${houseSize}\n🚚 Estimated Volume: ${totalVolume} CFT\n🚛 Recommended Truck: ${recommendedTruck}\n\n*My Inventory:*\n${itemList}\n\nPlease give me a fixed quote for this move!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919876543210?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section" id="calculator">
      <div className="container">
        <h2 className="section-title text-gradient">Smart Volume Calculator</h2>
        <p className="section-subtitle">Select your items and instantly know what size truck you need.</p>
        
        <div className="calculator-wrapper glass">
          <div className="calc-header">
            <Calculator size={40} color="var(--primary-color)" />
            <h3>Inventory Estimator</h3>
          </div>
          
          <div className="calc-body">
            <div className="calc-section">
              <h4>1. Select House Size</h4>
              <div className="house-size-selector">
                {['1 RK', '1 BHK', '2 BHK', '3+ BHK'].map(size => (
                  <button 
                    key={size}
                    className={`size-btn ${houseSize === size ? 'active' : ''}`}
                    onClick={() => setHouseSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-section">
              <h4>2. Add Heavy Items</h4>
              <div className="items-grid">
                {Object.keys(items).map(item => (
                  <div className="item-row" key={item}>
                    <span>{itemNames[item]}</span>
                    <div className="item-controls">
                      <button onClick={() => updateItem(item, -1)}><Minus size={16} /></button>
                      <span className="item-count">{items[item]}</span>
                      <button onClick={() => updateItem(item, 1)}><Plus size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="calc-results">
              <div className="result-card">
                <p>Estimated Volume</p>
                <div className="result-value">~{totalVolume} <span style={{fontSize:'1rem'}}>CFT</span></div>
              </div>
              <div className="result-card">
                <p>Recommended Truck</p>
                <div className="result-value truck-name">{recommendedTruck}</div>
              </div>
            </div>

            <button className="btn-primary w-100 send-wa-btn" onClick={handleSendToWhatsApp}>
              <Send size={20} /> Send to WhatsApp for Exact Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
