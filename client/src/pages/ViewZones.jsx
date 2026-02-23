import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, LogOut, ArrowLeft, Filter } from 'lucide-react';
import '../styles/ViewZones.css';

const ViewZones = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('all');
  
  const [zones, setZones] = useState([
    { id: 1, name: 'Chennai Flood Zone', users: 156, type: 'flood', status: 'active', location: 'Chennai' },
    { id: 2, name: 'Coimbatore Landslide Alert', users: 89, type: 'landslide', status: 'active', location: 'Coimbatore' },
    { id: 3, name: 'Madurai Emergency', users: 234, type: 'flood', status: 'active', location: 'Madurai' },
    { id: 4, name: 'Salem Cyclone Watch', users: 45, type: 'cyclone', status: 'monitoring', location: 'Salem' },
    { id: 5, name: 'Trichy Fire Emergency', users: 67, type: 'fire', status: 'active', location: 'Trichy' }
  ]);

  const filteredZones = filterType === 'all' 
    ? zones 
    : zones.filter(zone => zone.type === filterType);

  return (
    <div className="view-zones-page">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <AlertTriangle size={24} />
          <span>Disaster Management</span>
        </div>
        <div className="nav-user">
          <span>{user?.name || 'User'}</span>
          <button onClick={onLogout} className="logout-btn">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <div className="view-zones-content">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="view-zones-card">
          <div className="header-section">
            <div>
              <h1>All Active Zones</h1>
              <p className="subtitle">View and join emergency coordination zones</p>
            </div>
            
            <div className="filter-section">
              <Filter size={20} />
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Types</option>
                <option value="flood">Flood</option>
                <option value="landslide">Landslide</option>
                <option value="cyclone">Cyclone</option>
                <option value="fire">Fire</option>
                <option value="earthquake">Earthquake</option>
              </select>
            </div>
          </div>

          <div className="zones-grid">
            {filteredZones.map(zone => (
              <div key={zone.id} className="zone-item">
                <div className="zone-header">
                  <h3>{zone.name}</h3>
                  <span className={`status-badge ${zone.status}`}>
                    {zone.status}
                  </span>
                </div>
                <div className="zone-info">
                  <p className="location">📍 {zone.location}</p>
                  <p className="type">🚨 Type: {zone.type}</p>
                  <p className="users">👥 {zone.users} people affected</p>
                </div>
                <button 
                  className="view-zone-btn"
                  onClick={() => navigate(`/zone/${zone.id}`)}
                >
                  View Zone Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewZones;
