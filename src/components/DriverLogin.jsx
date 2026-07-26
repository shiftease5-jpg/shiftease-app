import React, { useState } from 'react';
import { Truck, CheckCircle2, Eye, EyeOff, Map, DollarSign, Bell } from 'lucide-react';
import './DriverLogin.css';

export default function DriverLogin({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleType, setVehicleType] = useState('Tata Ace');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // State for showing the beautiful success card
  const [newDriverData, setNewDriverData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    // MOCK LOGIN FOR VERCEL PROTOTYPE
    // Since we don't have a live backend database connected to Vercel, we will mock the login success.
    const mockDriver = {
      name: name || "Test Driver",
      phone: phone,
      vehicle: isSignup ? `${vehicleType} (${vehicleNumber})` : "Tata Ace (MH 12 AB 1234)",
      trackingId: "TRK-" + Math.floor(100000 + Math.random() * 900000)
    };

    if (isSignup) {
      setNewDriverData(mockDriver);
    } else {
      setIsLoggingIn(true);
      setTimeout(() => {
        onLoginSuccess(mockDriver);
      }, 1500);
    }
  };

  return (
    <div className="driver-login-page">
      <div className="login-left-pane">
        <div className="login-form-card" style={{ position: 'relative' }}>
          
          {isLoggingIn && (
            <div className="login-success-overlay">
              <CheckCircle2 size={64} color="#10b981" style={{ marginBottom: '16px' }} />
              <h2 style={{ color: 'white', marginBottom: '8px' }}>Login Successful!</h2>
              <p style={{ color: '#94a3b8' }}>Redirecting to your dashboard...</p>
            </div>
          )}

          {newDriverData ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h2 style={{ color: 'white', marginBottom: '8px' }}>Account Created!</h2>
              <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Please take a screenshot of your credentials below.</p>
              
              <div style={{ background: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px dashed #334155', marginBottom: '24px', textAlign: 'left' }}>
                <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '0.9rem' }}>Phone Number:</p>
                <p style={{ color: 'white', margin: '0 0 16px 0', fontWeight: 'bold' }}>{newDriverData.phone}</p>
                
                <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '0.9rem' }}>Password:</p>
                <p style={{ color: 'white', margin: '0 0 16px 0', fontWeight: 'bold' }}>{password}</p>
                
                <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '0.9rem' }}>Driver Tracking ID:</p>
                <p style={{ color: '#f97316', margin: '0', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>{newDriverData.trackingId}</p>
              </div>

              <button 
                onClick={() => onLoginSuccess(newDriverData)}
                className="login-btn"
              >
                Access Dashboard
              </button>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ background: 'rgba(249, 115, 22, 0.1)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Truck size={32} color="#f97316" />
                </div>
                <h2 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '8px' }}>
                  {isSignup ? 'Create Driver Account' : 'Driver Login'}
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0 }}>
                  {isSignup ? 'Register your details to join the network.' : 'Access your delivery dashboard securely.'}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {isSignup && (
                  <>
                    <div style={{ marginBottom: '20px' }}>
                      <label className="form-label">Driver Name</label>
                      <input 
                        type="text" 
                        className="form-input"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                      <div>
                        <label className="form-label">Vehicle Type</label>
                        <select 
                          className="form-input"
                          value={vehicleType}
                          onChange={(e) => setVehicleType(e.target.value)}
                        >
                          <option value="Tata Ace">Tata Ace</option>
                          <option value="Bolero Pickup">Bolero Pickup</option>
                          <option value="14ft Eicher">14ft Eicher</option>
                          <option value="19ft Container">19ft Container</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Vehicle Number</label>
                        <input 
                          type="text" 
                          className="form-input"
                          placeholder="MH 12 AB 1234"
                          value={vehicleNumber}
                          onChange={(e) => setVehicleNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-input"
                    placeholder="Enter your 10-digit mobile number"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 10) setPhone(val);
                    }}
                    pattern="[0-9]{10}"
                    title="Please enter exactly 10 digits"
                    required
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                    {!isSignup && (
                      <button type="button" style={{ background: 'none', border: 'none', color: '#f97316', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}>
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ paddingRight: '48px' }}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px', marginBottom: 0 }}>
                    {isSignup ? 'Use at least 8 characters.' : "We'll never share your credentials."}
                  </p>
                </div>

                {errorMsg && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{errorMsg}</div>}

                <button type="submit" className="login-btn">
                  {isSignup ? 'Create Driver Account' : 'Login to Dashboard'}
                </button>
              </form>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <span style={{ color: '#64748b' }}>
                  {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                </span>
                <button 
                  type="button" 
                  onClick={() => { setIsSignup(!isSignup); setErrorMsg(''); }}
                  style={{ background: 'transparent', border: 'none', color: '#f97316', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', padding: 0 }}
                >
                  {isSignup ? 'Login' : 'Sign Up'}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
      
      {/* Right side illustration panel (Desktop only) */}
      <div className="login-right-pane">
        <div className="login-glow"></div>
        <div className="login-illustration-content">
          <Truck size={80} color="#f97316" style={{ marginBottom: '24px' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Drive your success with ShiftEase</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Join India's most advanced logistics network and take control of your earnings.
          </p>
          
          <ul className="feature-list">
            <li>
              <div className="feature-list-icon"><Map size={24} /></div>
              <span>Live route optimization</span>
            </li>
            <li>
              <div className="feature-list-icon"><DollarSign size={24} /></div>
              <span>Guaranteed weekly payouts</span>
            </li>
            <li>
              <div className="feature-list-icon"><Bell size={24} /></div>
              <span>Instant trip notifications</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
