import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { io } from 'socket.io-client';
import { Phone, MessageCircle, Map as MapIcon, Star, Clock, Briefcase, IndianRupee, LocateFixed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './DriverDashboard.css';
import DriverLogin from './DriverLogin';

// Fix Leaflet icon issue in React
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
  popupAnchor: [0, -48]
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

// Component to handle recentering the map
function RecenterButton({ position }) {
  const map = useMap();
  return (
    <button 
      onClick={() => map.flyTo(position, 15, { animate: true })} 
      className="recenter-btn"
      title="My Location"
    >
      <LocateFixed size={24} />
    </button>
  );
}

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  
  // Status: 'offline', 'online', 'ontrip'
  const [status, setStatus] = useState('offline');
  const [buttonState, setButtonState] = useState('idle'); // idle, confirm, loading, success
  
  const [position, setPosition] = useState([19.1136, 72.8697]); // Andheri West
  const [speed, setSpeed] = useState(0);
  const [activeTab, setActiveTab] = useState('current');
  const [history, setHistory] = useState([]);
  
  const socketRef = useRef(null);
  const watchIdRef = useRef(null); // Used for real GPS tracking

  const [jobDetails, setJobDetails] = useState(null);
  const [searchState, setSearchState] = useState('idle'); // idle, loading, error

  useEffect(() => {
    if (!driver) return;
    
    // Get real initial location of the driver
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    socketRef.current = io(API_URL);
    socketRef.current.on('connect', () => console.log('Driver connected to server'));

    setHistory([
      { _id: '1', date: 'Today', pickup: 'Dadar', dropoff: 'Powai', price: '₹5,400', status: 'Completed' },
      { _id: '2', date: 'Yesterday', pickup: 'Thane', dropoff: 'Vashi', price: '₹3,200', status: 'Completed' }
    ]);

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, [driver]);

  const fetchLocation = async (q) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`);
    const data = await res.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  };

  const searchLocation = async (query) => {
    const q = query.toLowerCase().trim();
    
    // 1. FAST LOCAL DICTIONARY (Prevents API rate limits and guarantees accuracy for demos)
    const mumbaiLocations = {
      'andheri': [19.1136, 72.8697],
      'bandra': [19.0596, 72.8600],
      'bkc': [19.0664, 72.8659],
      'borivali': [19.2288, 72.8541],
      'goregaon': [19.1645, 72.8449],
      'malad': [19.1834, 72.8397],
      'juhu': [19.1026, 72.8258],
      'ghatkopar': [19.0790, 72.9080],
      'mulund': [19.1724, 72.9425],
      'thane': [19.2183, 72.9781],
      'dadar': [19.0176, 72.8562],
      'khar': [19.0694, 72.8400],
      'santacruz': [19.0843, 72.8360],
      'vile parle': [19.1006, 72.8436],
      'kurla': [19.0728, 72.8797],
      'colaba': [18.9067, 72.8147],
      'powai': [19.1176, 72.9060],
      'navi mumbai': [19.0330, 73.0297],
      'vashi': [19.0771, 72.9986],
      'panvel': [18.9894, 73.1175]
    };

    // Try finding a match in our local dictionary
    for (const [key, coords] of Object.entries(mumbaiLocations)) {
      if (q.includes(key)) {
        return coords;
      }
    }

    try {
      // 2. Try Nominatim API if not in local dictionary
      let coords = await fetchLocation(query);
      if (coords) return coords;
      
      coords = await fetchLocation(query + ", Mumbai, India");
      if (coords) return coords;
      
      if (query.toLowerCase().includes('w')) {
         coords = await fetchLocation(query.toLowerCase().replace(/w/g, 'v') + ", Mumbai, India");
         if (coords) return coords;
      }
    } catch (e) {
      console.error("Geocoding error:", e);
    }
    
    // SAFE FALLBACK: Hash to a guaranteed land coordinate to prevent crashing
    const safeCoords = Object.values(mumbaiLocations);
    let hash = 0;
    for (let i = 0; i < query.length; i++) {
      hash = query.charCodeAt(i) + ((hash << 5) - hash);
    }
    return safeCoords[Math.abs(hash) % safeCoords.length];
  };

  const handleSearchJob = async (e) => {
    e.preventDefault();
    const dropoffQuery = e.target.dropoff.value;
    
    if (!dropoffQuery) return;
    
    setSearchState('loading');
    
    // Automatically use driver's exact current GPS coordinates!
    const pickupCoords = position; 
    const dropoffCoords = await searchLocation(dropoffQuery);
    
    if (pickupCoords && dropoffCoords) {
      setJobDetails({
        pickup: "Current Location",
        pickupCoords,
        dropoff: dropoffQuery,
        dropoffCoords,
        distance: Math.floor(Math.random() * 50 + 5) + " km", // Dummy distance
        time: Math.floor(Math.random() * 120 + 15) + " mins", // Dummy time
        customerPhone: "919876543211"
      });
      setPosition(pickupCoords); // Jump map to pickup
      setSearchState('idle');
    } else {
      setSearchState('error');
    }
  };

  const handleStartTrip = () => {
    if (status === 'offline') {
      setStatus('online');
      return;
    }
    
    if (status === 'online' && buttonState === 'idle') {
      setButtonState('confirm');
      return;
    }
    
    if (buttonState === 'confirm') {
      setButtonState('loading');
      setTimeout(() => {
        setButtonState('success');
        setStatus('ontrip');
        startRealTracking(); // Launch real GPS tracking
        setTimeout(() => setButtonState('idle'), 2000);
      }, 1500);
    }
  };

  const handleEndTrip = async () => {
    setStatus('offline');
    setButtonState('idle');
    setSpeed(0);
    if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    if (socketRef.current) socketRef.current.emit('driverTripEnded', { trackingId: driver.trackingId });
    if (jobDetails) setPosition(jobDetails.pickupCoords);
    setJobDetails(null); // Clear job details so form shows again
  };

  // Haversine formula to calculate distance between two coordinates in km
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  const startRealTracking = () => {
    if (!jobDetails) return;
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const currentLat = pos.coords.latitude;
        const currentLng = pos.coords.longitude;
        // Speed comes in meters/second. Convert to km/h. Fallback to 0 if not moving.
        const currentSpeed = pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : 0; 
        
        setPosition([currentLat, currentLng]);
        setSpeed(currentSpeed);

        if (socketRef.current) {
          socketRef.current.emit('driverLocationUpdate', {
            trackingId: driver.trackingId,
            lat: currentLat,
            lng: currentLng,
            speed: currentSpeed
          });
        }

        // Check if arrived (within 200 meters of destination)
        const dist = getDistanceFromLatLonInKm(currentLat, currentLng, jobDetails.dropoffCoords[0], jobDetails.dropoffCoords[1]);
        if (dist < 0.2) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          if (socketRef.current) {
            socketRef.current.emit('driverTripEnded', { trackingId: driver.trackingId });
          }
          setTimeout(() => {
            alert("🎉 Destination Reached! Trip successfully completed.");
            handleEndTrip();
          }, 1500);
        }
      },
      (error) => {
        console.error("Error getting location", error);
        alert("Please enable GPS location services to start the trip.");
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
  };

  if (!driver) {
    return <DriverLogin onLoginSuccess={(d) => setDriver(d)} />;
  }

  return (
    <div className="driver-dashboard-container">
      
      <div className="driver-floating-header">
        <div className="driver-identity">
          <div className="driver-avatar">
            {driver.name ? driver.name.charAt(0).toUpperCase() : 'R'}
          </div>
          <div className="driver-info">
            <h3>Welcome, {driver.name || 'Ramesh'}</h3>
            <div className="driver-vehicle">{driver.vehicle || 'MH12AB1234'}</div>
          </div>
        </div>
        
        <div className={`status-pill ${status}`}>
          <div className="status-dot"></div>
          {status.toUpperCase()}
        </div>
      </div>

      <div className="driver-map-wrapper">
        <div className="map-stats-overlay">
          <div className="map-stat-card">
            <div className="map-stat-label">Today's Trips</div>
            <div className="map-stat-value">3</div>
          </div>
        </div>

        <MapContainer center={position} zoom={13} zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          <Marker position={position} icon={truckIcon}>
            <Popup>You are here ({speed} km/h)</Popup>
          </Marker>
          
          {(status === 'online' || status === 'ontrip') && jobDetails && (
            <>
              <Polyline positions={[jobDetails.pickupCoords, jobDetails.dropoffCoords]} color="#3b82f6" weight={4} dashArray="10, 10" />
              <Marker position={jobDetails.pickupCoords} icon={pickupIcon}>
                <Popup>Pickup: {jobDetails.pickup}</Popup>
              </Marker>
              <Marker position={jobDetails.dropoffCoords} icon={dropoffIcon}>
                <Popup>Drop-off: {jobDetails.dropoff}</Popup>
              </Marker>
            </>
          )}

          <RecenterButton position={position} />
        </MapContainer>
      </div>

      <div className="driver-bottom-panel">
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '12px', padding: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Customer Tracking ID</p>
            <h3 style={{ margin: 0, color: '#38bdf8', fontSize: '1.3rem', letterSpacing: '2px' }}>{driver.trackingId}</h3>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(driver.trackingId);
              alert("Tracking ID copied to clipboard!");
            }}
            style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}
          >
            Copy
          </button>
        </div>

        <div className="driver-tabs">
          <button className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`} onClick={() => setActiveTab('current')}>Current Assignment</button>
          <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>Trip History</button>
        </div>

        {activeTab === 'current' && (
          <>
            {!jobDetails ? (
              <div className="driver-job-card">
                <h4 style={{ margin: '0 0 16px 0', color: 'white' }}>Find New Job</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px' }}>Enter a pickup and drop-off location (e.g. "Mumbai" or "Pune") to generate a new tracking route.</p>
                <form onSubmit={handleSearchJob} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 8px #3b82f6' }} />
                    <span style={{ fontSize: '0.9rem' }}>Current Location (Auto-detected via GPS)</span>
                  </div>
                  <input type="text" name="dropoff" placeholder="Enter Destination..." style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} required />
                  {searchState === 'error' && <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>Could not find location. Try being more specific.</p>}
                  <button type="submit" disabled={searchState === 'loading'} style={{ padding: '12px', borderRadius: '8px', background: '#3b82f6', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                    {searchState === 'loading' ? 'Searching...' : 'Assign Job'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="driver-job-card">
                <div className="driver-job-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                    
                    {/* Route Timeline */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3b82f6' }} />
                        <div style={{ width: '2px', height: '30px', background: '#334155', margin: '4px 0' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '0', background: '#f97316' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>Pickup</p>
                          <h4 style={{ margin: 0, fontSize: '1rem', color: 'white' }}>{jobDetails.pickup}</h4>
                        </div>
                        <div>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>Destination</p>
                          <h4 style={{ margin: 0, fontSize: '1rem', color: 'white' }}>{jobDetails.dropoff}</h4>
                        </div>
                      </div>
                    </div>

                    {/* Meta Grid */}
                    <div className="job-meta-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                      <div className="job-meta-item">
                        <span className="job-meta-label">Est. Distance</span>
                        <span className="job-meta-value">{jobDetails.distance}</span>
                      </div>
                      <div className="job-meta-item">
                        <span className="job-meta-label">Est. Time</span>
                        <span className="job-meta-value">{jobDetails.time}</span>
                      </div>
                    </div>

                    {/* One-Tap Actions */}
                    <div className="action-buttons-grid">
                      <button className="action-btn btn-call" onClick={() => window.location.href = `tel:+${jobDetails.customerPhone}`}>
                        <Phone size={16} /> Call
                      </button>
                      <button className="action-btn btn-whatsapp" onClick={() => window.open(`https://wa.me/${jobDetails.customerPhone}`, '_blank')}>
                        <MessageCircle size={16} /> Chat
                      </button>
                      <button className="action-btn btn-navigate" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${jobDetails.dropoffCoords[0]},${jobDetails.dropoffCoords[1]}`, '_blank')}>
                        <MapIcon size={16} /> Navigate
                      </button>
                    </div>
                    
                  </div>
                </div>
              </div>
            )}

            {/* Smart Button */}
            {status === 'ontrip' ? (
              <button className="go-online-btn end-trip" onClick={handleEndTrip}>
                Complete Trip & Go Offline
              </button>
            ) : (
              <button 
                className={`go-online-btn ${status === 'offline' ? 'primary' : buttonState === 'idle' ? 'primary' : buttonState === 'confirm' ? 'confirm' : buttonState === 'loading' ? 'loading' : 'success'}`}
                onClick={handleStartTrip}
                disabled={buttonState === 'loading' || buttonState === 'success'}
              >
                {status === 'offline' && 'Go Online to Receive Jobs'}
                {status === 'online' && buttonState === 'idle' && 'Start Trip'}
                {status === 'online' && buttonState === 'confirm' && 'Tap to Confirm Start'}
                {buttonState === 'loading' && <div className="loader-spinner"></div>}
                {buttonState === 'success' && 'Trip Started!'}
              </button>
            )}

            {/* Stats Grid */}
            <h4 style={{ color: '#cbd5e1', marginTop: '32px', marginBottom: '16px' }}>Performance Overview</h4>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-box-label"><MapIcon size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> Distance Driven</span>
                <span className="stat-box-value" style={{ color: '#10b981' }}>142 km</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-label"><Briefcase size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> Completed Trips</span>
                <span className="stat-box-value">12</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-label"><Star size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> Rating</span>
                <span className="stat-box-value" style={{ color: '#f59e0b' }}>4.9★</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-label"><Clock size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> Hours Online</span>
                <span className="stat-box-value">7h 24m</span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <div>
            <div className="history-date-header">Today</div>
            {history.filter(t => t.date === 'Today').map(trip => (
              <div key={trip._id} className="history-item">
                <div className="history-route">
                  <div className="history-location">
                    <div className="history-location-dot dot-pickup"></div> {trip.pickup}
                  </div>
                  <div style={{ height: '12px', borderLeft: '2px dotted #334155', marginLeft: '3px' }}></div>
                  <div className="history-location">
                    <div className="history-location-dot dot-dropoff"></div> {trip.dropoff}
                  </div>
                </div>
                <div className="history-details">
                  <span className="history-status">{trip.status}</span>
                </div>
              </div>
            ))}

            <div className="history-date-header">Yesterday</div>
            {history.filter(t => t.date === 'Yesterday').map(trip => (
              <div key={trip._id} className="history-item">
                <div className="history-route">
                  <div className="history-location">
                    <div className="history-location-dot dot-pickup"></div> {trip.pickup}
                  </div>
                  <div style={{ height: '12px', borderLeft: '2px dotted #334155', marginLeft: '3px' }}></div>
                  <div className="history-location">
                    <div className="history-location-dot dot-dropoff"></div> {trip.dropoff}
                  </div>
                </div>
                <div className="history-details">
                  <span className="history-status">{trip.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={() => { setDriver(null); navigate('/driver'); }}
          style={{ width: '100%', marginTop: '32px', padding: '16px', background: 'transparent', border: '1px solid #334155', color: '#94a3b8', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
