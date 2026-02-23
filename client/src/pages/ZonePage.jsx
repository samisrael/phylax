import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, LogOut, ArrowLeft, Users, MapPin, Share2 } from 'lucide-react';
import '../styles/ZonePage.css';

const ZonePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { zoneId } = useParams();
  
  const [zoneData, setZoneData] = useState({
    id: zoneId,
    name: 'Chennai Flood Zone',
    type: 'flood',
    location: 'Chennai, Tamil Nadu',
    users: 156,
    description: 'Heavy rainfall causing flooding in low-lying areas',
    needs: {
      food: 120,
      water: 200,
      medical: 45,
      transport: 30
    }
  });

  const [selectedHelp, setSelectedHelp] = useState(null);

  const handleShare = () => {
    const link = `${window.location.origin}/zone/${zoneId}`;
    navigator.clipboard.writeText(link);
    alert('Zone link copied to clipboard!');
  };

  const handleHelpSubmit = () => {
    if (selectedHelp) {
      alert(`Thank you for offering ${selectedHelp} assistance!`);
      navigate('/dashboard');
    }
  };

  return (
    <div className="zone-page">
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

      <div className="zone-content">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="zone-header-card">
          <div className="zone-title-section">
            <h1>{zoneData.name}</h1>
            <p className="zone-description">{zoneData.description}</p>
          </div>
          <button className="share-btn" onClick={handleShare}>
            <Share2 size={20} />
            Share Zone
          </button>
        </div>

        <div className="zone-stats">
          <div className="stat-card">
            <Users size={32} />
            <div>
              <h3>{zoneData.users}</h3>
              <p>People Affected</p>
            </div>
          </div>
          <div className="stat-card">
            <MapPin size={32} />
            <div>
              <h3>{zoneData.location}</h3>
              <p>Location</p>
            </div>
          </div>
          <div className="stat-card">
            <AlertTriangle size={32} />
            <div>
              <h3>{zoneData.type}</h3>
              <p>Emergency Type</p>
            </div>
          </div>
        </div>

        <div className="needs-section">
          <h2>Current Needs</h2>
          <div className="needs-grid">
            <div className="need-card">
              <h3>🍽️ Food</h3>
              <p className="need-count">{zoneData.needs.food} people need food</p>
            </div>
            <div className="need-card">
              <h3>💧 Water</h3>
              <p className="need-count">{zoneData.needs.water} people need water</p>
            </div>
            <div className="need-card">
              <h3>🏥 Medical</h3>
              <p className="need-count">{zoneData.needs.medical} people need medical aid</p>
            </div>
            <div className="need-card">
              <h3>🚗 Transport</h3>
              <p className="need-count">{zoneData.needs.transport} people need transport</p>
            </div>
          </div>
        </div>

        <div className="help-section">
          <h2>How Can You Help?</h2>
          <div className="help-options">
            <button 
              className={`help-option ${selectedHelp === 'food' ? 'selected' : ''}`}
              onClick={() => setSelectedHelp('food')}
            >
              <span>🍽️</span>
              <span>Provide Food</span>
            </button>
            <button 
              className={`help-option ${selectedHelp === 'water' ? 'selected' : ''}`}
              onClick={() => setSelectedHelp('water')}
            >
              <span>💧</span>
              <span>Provide Water</span>
            </button>
            <button 
              className={`help-option ${selectedHelp === 'medical' ? 'selected' : ''}`}
              onClick={() => setSelectedHelp('medical')}
            >
              <span>🏥</span>
              <span>Medical Aid</span>
            </button>
            <button 
              className={`help-option ${selectedHelp === 'transport' ? 'selected' : ''}`}
              onClick={() => setSelectedHelp('transport')}
            >
              <span>🚗</span>
              <span>Transport Help</span>
            </button>
            <button 
              className={`help-option ${selectedHelp === 'volunteer' ? 'selected' : ''}`}
              onClick={() => setSelectedHelp('volunteer')}
            >
              <span>👥</span>
              <span>Volunteer</span>
            </button>
            <button 
              className={`help-option ${selectedHelp === 'money' ? 'selected' : ''}`}
              onClick={() => setSelectedHelp('money')}
            >
              <span>💰</span>
              <span>Financial Aid</span>
            </button>
          </div>

          {selectedHelp && (
            <button className="submit-help-btn" onClick={handleHelpSubmit}>
              Confirm Help Offer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZonePage;
