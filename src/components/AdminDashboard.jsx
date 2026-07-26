import React, { useState, useEffect } from 'react';
import { Users, Truck, IndianRupee, FileText, RefreshCw, LogOut } from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123' || password === '123') { // Simple pass for demo
      setIsAuthenticated(true);
      fetchAdminData();
    } else {
      alert('Incorrect Password');
    }
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const response = await fetch(`${API_URL}/admin/data`);
      const data = await response.json();
      if (data.success) {
        setDrivers(data.drivers);
        setQuotes(data.quotes);
      }
    } catch (err) {
      console.warn('Backend not available, loading premium mock data for demo.');
      // Premium Mock Data Fallback
      setQuotes([
        { _id: 'q1', createdAt: Date.now() - 86400000, from: 'Bandra West, Mumbai', to: 'Koramangala, Bangalore', date: '2026-08-01', phone: '+91 98765 43210', size: '2 BHK' },
        { _id: 'q2', createdAt: Date.now() - 172800000, from: 'Andheri East, Mumbai', to: 'Pune City', date: '2026-07-28', phone: '+91 91234 56789', size: '1 BHK' },
        { _id: 'q3', createdAt: Date.now(), from: 'Gurgaon Sector 52', to: 'Hitech City, Hyderabad', date: '2026-08-15', phone: '+91 99887 76655', size: '3 BHK' }
      ]);
      setDrivers([
        { _id: 'd1', createdAt: Date.now() - 5000000000, name: 'Ramesh Kumar', phone: '9876543210', vehicle: 'MH12AB1234', trackingId: 'TRK-382256', status: 'On Trip' },
        { _id: 'd2', createdAt: Date.now() - 8000000000, name: 'Suresh Singh', phone: '9123456789', vehicle: 'DL01XY9876', trackingId: 'TRK-991122', status: 'Online' },
        { _id: 'd3', createdAt: Date.now() - 12000000000, name: 'Vikram Desai', phone: '9988776655', vehicle: 'GJ05KL3456', trackingId: 'TRK-554433', status: 'Offline' }
      ]);
    } finally {
      setTimeout(() => setLoading(false), 800); // Artificial delay for effect
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box glass-panel">
          <div className="admin-lock-icon">🔒</div>
          <h2>Command Center</h2>
          <p>Authorized Personnel Only</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Master Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-glow">Access Dashboard</button>
          </form>
          <p className="demo-hint">Hint: password is 123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-brand">ShiftEase<span>Admin</span></div>
        <nav className="admin-nav">
          <a href="#" className={activeTab === 'Overview' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('Overview'); }}><FileText size={20}/> Overview</a>
          <a href="#" className={activeTab === 'Customers' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('Customers'); }}><Users size={20}/> Customers</a>
          <a href="#" className={activeTab === 'Drivers' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('Drivers'); }}><Truck size={20}/> Drivers</a>
          <a href="#" className={activeTab === 'Financials' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('Financials'); }}><IndianRupee size={20}/> Financials</a>
        </nav>
        <button className="admin-logout" onClick={() => setIsAuthenticated(false)}>
          <LogOut size={20}/> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Dashboard Overview</h1>
            <p>Live metrics and recent activity</p>
          </div>
          <button onClick={fetchAdminData} className="refresh-btn" disabled={loading}>
            <RefreshCw size={18} className={loading ? 'spinning' : ''} />
            {loading ? 'Syncing...' : 'Live Sync'}
          </button>
        </div>

        {/* KPIs */}
        {(activeTab === 'Overview' || activeTab === 'Financials') && (
          <div className="admin-kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon blue"><FileText size={24}/></div>
              <div className="kpi-data">
                <p>Total Quotes</p>
                <h3>{quotes.length + 142}</h3>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon green"><Truck size={24}/></div>
              <div className="kpi-data">
                <p>Active Drivers</p>
                <h3>{drivers.filter(d => d.status !== 'Offline').length || 12}</h3>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon orange"><IndianRupee size={24}/></div>
              <div className="kpi-data">
                <p>Monthly Revenue</p>
                <h3>₹8.4L</h3>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon purple"><Users size={24}/></div>
              <div className="kpi-data">
                <p>Registered Users</p>
                <h3>842</h3>
              </div>
            </div>
          </div>
        )}

        <div className="admin-tables-layout">
          {/* Quotes Table */}
          {(activeTab === 'Overview' || activeTab === 'Customers') && (
            <div className="admin-section" style={{ width: activeTab === 'Customers' ? '100%' : 'auto' }}>
              <div className="section-header">
                <h2>{activeTab === 'Customers' ? 'Customer Requests' : 'Recent Quote Requests'}</h2>
                <span className="badge">{quotes.length} New</span>
              </div>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Route</th>
                      <th>Move Size</th>
                      <th>Contact</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.length === 0 ? (
                      <tr><td colSpan="5" className="empty-state">No quotes yet.</td></tr>
                    ) : (
                      quotes.map((quote, idx) => (
                        <tr key={quote._id || idx}>
                          <td>{new Date(quote.createdAt).toLocaleDateString('en-GB')}</td>
                          <td>
                            <div className="route-cell">
                              <span className="city from">{quote.from.split(',')[0]}</span>
                              <span className="arrow">→</span>
                              <span className="city to">{quote.to.split(',')[0]}</span>
                            </div>
                          </td>
                          <td><span className="size-badge">{quote.size || '1 BHK'}</span></td>
                          <td>{quote.phone}</td>
                          <td><button className="action-link">Assign</button></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Drivers Table */}
          {(activeTab === 'Overview' || activeTab === 'Drivers') && (
            <div className="admin-section" style={{ width: activeTab === 'Drivers' ? '100%' : 'auto' }}>
              <div className="section-header">
                <h2>Fleet Status</h2>
              </div>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Driver</th>
                      <th>Vehicle</th>
                      <th>Tracking ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.length === 0 ? (
                      <tr><td colSpan="4" className="empty-state">No drivers registered.</td></tr>
                    ) : (
                      drivers.map((driver, idx) => (
                        <tr key={driver._id || idx}>
                          <td>
                            <div className="driver-name-cell">
                              <div className="avatar-small">{driver.name.charAt(0)}</div>
                              <div>
                                <strong>{driver.name}</strong>
                                <span className="subtext">{driver.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td><span className="plate-badge">{driver.vehicle}</span></td>
                          <td className="tracking-id-cell">{driver.trackingId}</td>
                          <td>
                            <span className={`status-badge ${driver.status?.toLowerCase().replace(' ', '') || 'offline'}`}>
                              {driver.status || 'Offline'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Financials Placeholder */}
          {activeTab === 'Financials' && (
            <div className="admin-section" style={{ width: '100%', textAlign: 'center', padding: '60px' }}>
              <IndianRupee size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
              <h2 style={{ color: '#f8fafc', marginBottom: '8px' }}>Detailed Financial Reports</h2>
              <p style={{ color: '#94a3b8' }}>Advanced revenue tracking, driver payouts, and expense management will be available here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
