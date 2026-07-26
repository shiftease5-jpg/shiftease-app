import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { io } from 'socket.io-client';
import { ArrowLeft, Phone, MessageCircle, Map as MapIcon, LifeBuoy, Check, LocateFixed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './TrackingMap.css';
import TrackingLogin from './TrackingLogin';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Icons
const truckIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2769/2769339.png', 
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
  className: 'animated-truck'
});

const pickupIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const dropoffIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Timeline Steps
const TIMELINE_STEPS = [
  'Booking Confirmed',
  'Truck Assigned',
  'Driver On The Way',
  'Packing',
  'Transit',
  'Delivered'
];

function MapUpdater({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { animate: true, duration: 2 });
    }
  }, [position, map]);
  return null;
}

// Component to handle recentering the map
function RecenterButton({ position }) {
  const map = useMap();
  return (
    <button 
      onClick={() => map.flyTo(position, 15, { animate: true })} 
      className="recenter-btn"
      title="Live Truck Location"
    >
      <LocateFixed size={24} />
    </button>
  );
}

export default function TrackingMap() {
  const [customer, setCustomer] = useState(null);
  
  // Coordinates
  const pickupCoords = [19.1136, 72.8697];
  const dropoffCoords = [19.0596, 72.8600];
  
  const [position, setPosition] = useState(pickupCoords);
  const [speed, setSpeed] = useState(0);
  const [isArrived, setIsArrived] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(2); // "Driver On The Way"
  const [lastUpdatedTime, setLastUpdatedTime] = useState(0); // seconds ago
  
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    if (!customer) return;

    // Connect to backend server
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    socketRef.current = io(API_URL);

    socketRef.current.on('connect', () => {
      console.log('Connected to tracking server');
      socketRef.current.emit('joinTrackingRoom', customer.trackingId);
    });

    socketRef.current.on('customerLocationUpdate', (data) => {
      setPosition([data.lat, data.lng]);
      setSpeed(data.speed);
      setCurrentStepIndex(4); // Transit
      setIsArrived(false);
      setLastUpdatedTime(0); // Reset timer on update
    });

    socketRef.current.on('tripEnded', () => {
      setSpeed(0);
      setIsArrived(true);
      setCurrentStepIndex(5); // Delivered
      
      // Automatically notify the client
      setTimeout(() => {
        alert("✅ Good news! Your shipment has successfully arrived at the destination.");
      }, 500);
    });

    // Simple timer to simulate "Last updated X sec ago"
    timerRef.current = setInterval(() => {
      setLastUpdatedTime(prev => prev + 1);
    }, 1000);

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [customer]);

  if (!customer) {
    return <div style={{paddingTop: '80px'}}><TrackingLogin onLoginSuccess={(user) => setCustomer(user)} /></div>;
  }

  return (
    <div className="tracking-app-container">
      <button className="tracking-close-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={24} />
      </button>

      <div className="tracking-map-wrapper">
        {/* ETA Glass Overlay */}
        <div className="tracking-eta-overlay">
          <div className="live-badge">
            <div className="live-dot"></div> LIVE
          </div>
          <div className="eta-details">
            <div className="eta-block">
              <p>ETA</p>
              <h3 style={{color: '#10b981'}}>18 mins</h3>
            </div>
            <div className="eta-block" style={{textAlign: 'right'}}>
              <p>Distance</p>
              <h3>7.4 km</h3>
            </div>
          </div>
          <p className="eta-last-update">Last Updated: {lastUpdatedTime} sec ago</p>
        </div>

        <MapContainer center={pickupCoords} zoom={13} zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          <Polyline positions={[pickupCoords, dropoffCoords]} color="#3b82f6" weight={4} dashArray="10, 10" />
          
          <Marker position={pickupCoords} icon={pickupIcon}>
            <Popup>Pickup</Popup>
          </Marker>
          
          <Marker position={dropoffCoords} icon={dropoffIcon}>
            <Popup>Destination</Popup>
          </Marker>

          <Marker position={position} icon={truckIcon}>
            <Popup>{isArrived ? 'Arrived!' : `Truck Speed: ${speed} km/h`}</Popup>
          </Marker>

          <MapUpdater position={position} />
          <RecenterButton position={position} />
        </MapContainer>
        
        {/* Scrollable Bottom Sheet */}
        <div className="tracking-bottom-sheet">
          
          {/* Driver Rich Card */}
          <div className="driver-info-card">
            <div className="driver-profile">
              <div className="driver-avatar-group">
                <div className="driver-avatar">👨</div>
                <div className="driver-details">
                  <h4>Ramesh Kumar</h4>
                  <p><span className="driver-rating">★★★★☆</span> 4.9 (120 Deliveries)</p>
                </div>
              </div>
              <div className="vehicle-plate">MH12AB1234</div>
            </div>
            <div className="driver-stats-row">
              <div className="driver-stat">
                <p>Experience</p>
                <h5>4 Years</h5>
              </div>
              <div className="driver-stat">
                <p>Languages</p>
                <h5>Hindi, Marathi</h5>
              </div>
              <div className="driver-stat">
                <p>Vaccinated</p>
                <h5 style={{color: '#10b981'}}>Yes ✓</h5>
              </div>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="driver-actions">
            <button className="action-btn primary" onClick={() => window.location.href = 'tel:+919797820423'}>
              <Phone size={16} /> Call Driver
            </button>
            <button className="action-btn success" onClick={() => window.open('https://wa.me/919797820423', '_blank')}>
              <MessageSquare size={16} /> WhatsApp
            </button>
            <button className="action-btn warning" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`, '_blank')}>
              <MapIcon size={20} /> Navigate
            </button>
            <button className="action-btn danger" onClick={() => window.location.href = 'mailto:support@shiftease.com'}>
              <LifeBuoy size={20} /> Support
            </button>
          </div>

          {/* Progress Timeline */}
          <div className="tracking-timeline-container">
            {TIMELINE_STEPS.map((step, index) => {
              let stateClass = '';
              if (index < currentStepIndex) stateClass = 'completed';
              else if (index === currentStepIndex) stateClass = 'active';

              return (
                <div key={index} className={`tracking-timeline-step ${stateClass}`}>
                  <div className="step-icon">
                    <Check size={14} />
                  </div>
                  <div className="step-content">
                    <h4 className="step-title">{step}</h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shipment Summary */}
          <div className="summary-section">
            <h4>Shipment Summary</h4>
            <div className="data-grid">
              <div className="data-item">
                <p>Booking ID</p>
                <h5>{customer.trackingId}</h5>
              </div>
              <div className="data-item">
                <p>Customer</p>
                <h5>Rahul Sharma</h5>
              </div>
              <div className="data-item">
                <p>Move Date</p>
                <h5>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h5>
              </div>
              <div className="data-item">
                <p>Insurance</p>
                <h5 style={{color: '#10b981'}}>Secured</h5>
              </div>
            </div>
          </div>

          {/* Moving Details */}
          <div className="summary-section">
            <h4>Moving Details</h4>
            <div className="data-grid">
              <div className="data-item">
                <p>Move Type</p>
                <h5>2 BHK Premium</h5>
              </div>
              <div className="data-item">
                <p>Items</p>
                <h5>46 Total</h5>
              </div>
              <div className="data-item">
                <p>Packing Status</p>
                <h5>Completed</h5>
              </div>
              <div className="data-item">
                <p>Expected Delivery</p>
                <h5>{new Date(Date.now() + 18 * 60000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</h5>
              </div>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="summary-section">
            <h4>Recent Updates</h4>
            <div className="updates-feed">
              <div className="update-item">
                <div className="update-icon">🚚</div>
                <div className="update-text">
                  <p>Driver is 5 km away.</p>
                  <span>10 mins ago</span>
                </div>
              </div>
              <div className="update-item">
                <div className="update-icon">📍</div>
                <div className="update-text">
                  <p>Vehicle departed warehouse.</p>
                  <span>{new Date(Date.now() - 45 * 60000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                </div>
              </div>
              <div className="update-item">
                <div className="update-icon">📦</div>
                <div className="update-text">
                  <p>Packing completed.</p>
                  <span>{new Date(Date.now() - 120 * 60000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => { setCustomer(null); }}
            style={{ width: '100%', marginTop: '32px', padding: '16px', background: 'transparent', border: '1px solid #cbd5e1', color: '#64748b', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Logout / Track Another Shipment
          </button>

        </div>
      </div>
    </div>
  );
}
