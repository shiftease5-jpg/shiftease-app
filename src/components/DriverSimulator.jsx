import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './TrackingMap.css';

export default function DriverSimulator() {
  const [isDriving, setIsDriving] = useState(false);
  const [driverName, setDriverName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const socketRef = useRef(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    socketRef.current = io(API_URL);
    socketRef.current.on('connect', () => {
      console.log('Driver App Connected to Server');
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  const startTrip = () => {
    if (!driverName.trim()) {
      setErrorMsg('Please enter your Driver Name first.');
      return;
    }

    if (!('geolocation' in navigator)) {
      setErrorMsg('GPS is not supported by your browser.');
      return;
    }

    setErrorMsg('');
    setIsDriving(true);

    // Request continuous GPS location
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, speed } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });

        // Calculate speed (m/s to km/h). If speed is null, fallback to 0 or mock slightly if walking.
        let calculatedSpeed = speed ? Math.round(speed * 3.6) : 0;
        
        // Emitting the real location!
        const locationData = {
          lat: latitude,
          lng: longitude,
          speed: calculatedSpeed,
          driver: driverName,
          timestamp: new Date().toISOString()
        };

        socketRef.current.emit('driverLocationUpdate', locationData);
        console.log('Broadcasted Real Location:', locationData);
      },
      (error) => {
        setIsDriving(false);
        if (error.code === error.PERMISSION_DENIED) {
          setErrorMsg('GPS Permission Denied. Please allow location access in your browser settings.');
        } else {
          setErrorMsg('Failed to get GPS location. ' + error.message);
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000
      }
    );
  };

  const stopTrip = () => {
    setIsDriving(false);
    setCurrentLocation(null);
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  return (
    <div className="tracking-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass" style={{ padding: '40px', borderRadius: '16px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ marginBottom: '20px' }}>Driver Web App (Real GPS)</h2>
        <p style={{ marginBottom: '30px', color: 'var(--text-light)' }}>
          This app uses your phone's actual GPS chip (100% free) to track your location.
        </p>

        {!isDriving ? (
          <>
            <div className="form-group" style={{ textAlign: 'left', marginBottom: '24px' }}>
              <label>Driver Name</label>
              <input 
                type="text" 
                placeholder="e.g. Ramesh Kumar" 
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
              />
            </div>
            
            {errorMsg && <p style={{ color: '#EF4444', marginBottom: '16px', fontWeight: 'bold' }}>{errorMsg}</p>}

            <button 
              className="btn-primary" 
              onClick={startTrip}
              style={{ width: '100%', padding: '16px', fontSize: '1.25rem', backgroundColor: '#22C55E' }}
            >
              Start Trip
            </button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}>
              <p style={{ color: '#22C55E', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '8px' }}>
                🟢 Trip Active
              </p>
              <p><strong>Driver:</strong> {driverName}</p>
              {currentLocation ? (
                <>
                  <p><strong>Lat:</strong> {currentLocation.lat.toFixed(5)}</p>
                  <p><strong>Lng:</strong> {currentLocation.lng.toFixed(5)}</p>
                </>
              ) : (
                <p>Acquiring GPS Signal...</p>
              )}
            </div>

            <button 
              className="btn-primary" 
              onClick={stopTrip}
              style={{ width: '100%', padding: '16px', fontSize: '1.25rem', backgroundColor: '#EF4444' }}
            >
              Stop Trip
            </button>
          </>
        )}
      </div>
    </div>
  );
}
