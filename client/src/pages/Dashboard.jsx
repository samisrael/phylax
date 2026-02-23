import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  CloudRain, 
  MapPin, 
  AlertTriangle,
  LogOut,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    rainfall3Days: 45.2,
    temperature: 28.5,
    humidity: 72,
    expectedRainfall: 85.3,
    riskLevel: 'Most Expected',
    riskScore: 78
  });

  const [activeZones, setActiveZones] = useState([
    { id: 1, name: 'Chennai Flood Zone', users: 156, type: 'flood' },
    { id: 2, name: 'Coimbatore Landslide Alert', users: 89, type: 'landslide' },
    { id: 3, name: 'Madurai Emergency', users: 234, type: 'flood' }
  ]);

  const getRiskColor = (level) => {
    const colors = {
      'Evacuate Immediately': '#ff0000',
      'Most Expected': '#ff4500',
      'Expected': '#ff8c00',
      'Likely': '#ffa500',
      'Unlikely': '#90ee90'
    };
    return colors[level] || '#ffa500';
  };

  return (
    <div className="dashboard">
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

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="location-info">
            <MapPin size={20} />
            <span>{user?.location || 'Chennai, Tamil Nadu'}</span>
          </div>
          <div className="current-time">
            {new Date().toLocaleString('en-US', { 
              dateStyle: 'full', 
              timeStyle: 'short' 
            })}
          </div>
        </div>

        <section className="weather-section">
          <h2>Live Weather Data</h2>
          <div className="weather-cards">
            <div className="weather-card">
              <div className="card-icon">
                <CloudRain size={32} color="#4a9eff" />
              </div>
              <div className="card-content">
                <h3>Rainfall (Last 3 Days)</h3>
                <p className="card-value">{weatherData.rainfall3Days} mm</p>
                <div className="trend">
                  <TrendingUp size={16} color="#ff4500" />
                  <span>Increasing</span>
                </div>
              </div>
            </div>

            <div className="weather-card">
              <div className="card-icon">
                <Thermometer size={32} color="#ff6b6b" />
              </div>
              <div className="card-content">
                <h3>Temperature</h3>
                <p className="card-value">{weatherData.temperature}°C</p>
                <div className="trend">
                  <TrendingDown size={16} color="#4a9eff" />
                  <span>Normal</span>
                </div>
              </div>
            </div>

            <div className="weather-card">
              <div className="card-icon">
                <Droplets size={32} color="#4ecdc4" />
              </div>
              <div className="card-content">
                <h3>Humidity</h3>
                <p className="card-value">{weatherData.humidity}%</p>
                <div className="trend">
                  <TrendingUp size={16} color="#ff4500" />
                  <span>High</span>
                </div>
              </div>
            </div>

            <div className="weather-card">
              <div className="card-icon">
                <Cloud size={32} color="#a29bfe" />
              </div>
              <div className="card-content">
                <h3>Expected Rainfall (2-5 Days)</h3>
                <p className="card-value">{weatherData.expectedRainfall} mm</p>
                <div className="trend">
                  <TrendingUp size={16} color="#ff0000" />
                  <span>Alert</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="risk-section">
          <h2>Disaster Risk Assessment</h2>
          <div className="risk-card">
            <div className="risk-meter">
              <div className="speedometer">
                <div 
                  className="speedometer-fill" 
                  style={{ 
                    width: `${weatherData.riskScore}%`,
                    background: getRiskColor(weatherData.riskLevel)
                  }}
                />
              </div>
              <div className="risk-level" style={{ color: getRiskColor(weatherData.riskLevel) }}>
                {weatherData.riskLevel}
              </div>
              <div className="risk-score">Risk Score: {weatherData.riskScore}%</div>
            </div>
            <div className="risk-factors">
              <h3>Factors Analyzed:</h3>
              <ul>
                <li>✓ Location coordinates</li>
                <li>✓ Recent rainfall (45.2mm)</li>
                <li>✓ Forecasted rainfall (85.3mm)</li>
                <li>✓ Temperature & humidity levels</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="zone-section">
          <h2>Zone Options</h2>
          <div className="zone-buttons">
            <button 
              className="zone-btn create"
              onClick={() => navigate('/create-zone')}
            >
              Create a Zone
            </button>
            <button 
              className="zone-btn join"
              onClick={() => navigate('/join-zone')}
            >
              Join a Zone
            </button>
            <button 
              className="zone-btn view"
              onClick={() => navigate('/view-zones')}
            >
              View Existing Zones
            </button>
          </div>
        </section>

        <section className="active-zones-section">
          <h2>Active Zones (30+ Users)</h2>
          <div className="active-zones-list">
            {activeZones.map(zone => (
              <div 
                key={zone.id} 
                className="active-zone-card"
                onClick={() => navigate(`/zone/${zone.id}`)}
              >
                <div className="zone-info">
                  <h3>{zone.name}</h3>
                  <p className="zone-type">Type: {zone.type}</p>
                  <p className="zone-users">{zone.users} people affected</p>
                </div>
                <button className="join-btn">View Zone →</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
