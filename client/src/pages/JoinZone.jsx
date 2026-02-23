import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, LogOut, ArrowLeft, Search } from 'lucide-react';
import '../styles/JoinZone.css';

const JoinZone = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneLink, setZoneLink] = useState('');
  
  const [nearbyZones, setNearbyZones] = useState([
    { id: 1, name: 'Chennai Flood Zone', distance: '2 km', users: 156, type: 'flood' },
    { id: 2, name: 'Adyar Relief Center', distance: '5 km', users: 45, type: 'flood' },
    { id: 3, name: 'Velachery Emergency', distance: '8 km', users: 78, type: 'flood' }
  ]);

  const handleJoinZone = (zoneId) => {
    navigate(`/zone/${zoneId}`);
  };

  const handleJoinByLink = (e) => {
    e.preventDefault();
    if (zoneLink) {
      const zoneId = zoneLink.split('/').pop();
      navigate(`/zone/${zoneId}`);
    }
  };

  const filteredZones = nearbyZones.filter(zone => 
    zone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="join-zone-page">
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

      <div className="join-zone-content">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="join-zone-card">
          <h1>Join a Zone</h1>
          <p className="subtitle">Connect with nearby emergency zones or use a shared link</p>

          <div className="join-options">
            <div className="join-by-link">
              <h3>Join by Link</h3>
              <form onSubmit={handleJoinByLink}>
                <input
                  type="text"
                  placeholder="Paste zone link here..."
                  value={zoneLink}
                  onChange={(e) => setZoneLink(e.target.value)}
                />
                <button type="submit" className="join-link-btn">Join</button>
              </form>
            </div>

            <div className="divider-text">OR</div>

            <div className="nearby-zones">
              <h3>Nearby Zones</h3>
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search zones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="zones-list">
                {filteredZones.map(zone => (
                  <div key={zone.id} className="zone-card">
                    <div className="zone-details">
                      <h4>{zone.name}</h4>
                      <div className="zone-meta">
                        <span className="distance">📍 {zone.distance} away</span>
                        <span className="users">👥 {zone.users} members</span>
                        <span className="type">🚨 {zone.type}</span>
                      </div>
                    </div>
                    <button 
                      className="join-btn"
                      onClick={() => handleJoinZone(zone.id)}
                    >
                      Join Zone
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinZone;
