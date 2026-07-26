import React, { useState } from 'react';

export default function TrackingLogin({ onLoginSuccess }) {
  const [trackingId, setTrackingId] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (trackingId.trim() !== '') {
      // For simplicity, we just pass the tracking ID up. 
      // In a real app, we might verify this ID against the backend first.
      onLoginSuccess({ trackingId: trackingId.trim() });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '24px' }}>
      <div className="glass" style={{ padding: '40px', borderRadius: '16px', maxWidth: '450px', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
        
        <h2 style={{ textAlign: 'center', marginBottom: '8px', color: 'var(--primary-color)' }}>Track Your Move</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '32px' }}>
          Enter the Driver's Phone Number or Tracking ID provided in your WhatsApp message.
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Tracking ID / Phone Number</label>
            <input 
              type="text" 
              placeholder="e.g. 9876543210"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              required
              style={{ fontSize: '1.1rem', letterSpacing: '1px' }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px', padding: '14px', fontSize: '1.1rem' }}>
            Track Now
          </button>
        </form>

      </div>
    </div>
  );
}
