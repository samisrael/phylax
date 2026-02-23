import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MapPin, LogOut, ArrowLeft } from 'lucide-react';
import '../styles/CreateZone.css';

const CreateZone = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: user?.location || 'Chennai, Tamil Nadu',
    zoneName: '',
    description: '',
    emergencyType: 'flood',
    contactNumber: '',
    severity: 'medium'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating zone:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="create-zone-page">
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

      <div className="create-zone-content">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="create-zone-card">
          <h1>Create a Zone</h1>
          <p className="subtitle">Set up a coordination zone for emergency relief efforts</p>

          <form onSubmit={handleSubmit} className="zone-form">
            <div className="form-group">
              <label htmlFor="location">
                <MapPin size={18} />
                Location (Auto-filled)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location will be auto-detected"
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="zoneName">Zone Name *</label>
              <input
                type="text"
                id="zoneName"
                name="zoneName"
                value={formData.zoneName}
                onChange={handleChange}
                placeholder="e.g., Chennai Central Flood Relief"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the situation..."
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emergencyType">Type of Emergency *</label>
                <select
                  id="emergencyType"
                  name="emergencyType"
                  value={formData.emergencyType}
                  onChange={handleChange}
                  required
                >
                  <option value="flood">Flood</option>
                  <option value="landslide">Landslide</option>
                  <option value="earthquake">Earthquake</option>
                  <option value="cyclone">Cyclone</option>
                  <option value="tsunami">Tsunami</option>
                  <option value="fire">Fire</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="severity">Severity Level *</label>
                <select
                  id="severity"
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+91 1234567890"
              />
            </div>

            <div className="info-box">
              <AlertTriangle size={20} />
              <div>
                <h4>Zone Visibility</h4>
                <p>Your zone will be visible to users in nearby regions. Once 30 or more users join, it becomes an Active Zone visible to all users.</p>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Create Zone
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateZone;
