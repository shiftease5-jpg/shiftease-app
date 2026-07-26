import React, { useState } from 'react';

export default function CustomerLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [forgotPhone, setForgotPhone] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        onLoginSuccess(data.user);
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg('Failed to connect to server. Ensure server is running.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: forgotPhone })
      });
      const data = await response.json();
      setForgotMsg(data.message); // Mock success message
    } catch (err) {
      setForgotMsg('Failed to connect to server.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '24px' }}>
      <div className="glass" style={{ padding: '40px', borderRadius: '16px', maxWidth: '450px', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
        
        {!isForgotMode ? (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Customer Login</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '32px' }}>
              Sign in securely to track your moving truck.
            </p>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Username or Phone Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. 9876543210 or CustomerA"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {errorMsg && <p style={{ color: '#EF4444', marginBottom: '16px', fontSize: '0.9rem' }}>{errorMsg}</p>}

              <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '16px' }}>
                Secure Login
              </button>

              <div style={{ textAlign: 'center' }}>
                <button 
                  type="button" 
                  style={{ background: 'none', color: 'var(--accent-color)', textDecoration: 'underline', fontSize: '0.9rem' }}
                  onClick={() => setIsForgotMode(true)}
                >
                  Forgot Username / Password?
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Account Recovery</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '32px' }}>
              Enter your registered phone number to receive a recovery link.
            </p>

            <form onSubmit={handleForgotPassword}>
              <div className="form-group">
                <label>Registered Phone Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. 9876543210"
                  value={forgotPhone}
                  onChange={(e) => setForgotPhone(e.target.value)}
                  required
                />
              </div>

              {forgotMsg && (
                <div style={{ padding: '12px', backgroundColor: '#ECFDF5', color: '#059669', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
                  {forgotMsg}
                </div>
              )}

              <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '16px' }}>
                Send Recovery Details
              </button>

              <div style={{ textAlign: 'center' }}>
                <button 
                  type="button" 
                  style={{ background: 'none', color: 'var(--text-light)', textDecoration: 'underline', fontSize: '0.9rem' }}
                  onClick={() => { setIsForgotMode(false); setForgotMsg(''); }}
                >
                  Back to Login
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
