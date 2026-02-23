import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import '../styles/LandingPage.css';

const LandingPage = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    onLogin({ name: email.split('@')[0], email, location: 'Auto-detected' });
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    onLogin({ name: `User via ${provider}`, email: `user@${provider}.com`, location: 'Auto-detected' });
  };

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-header">
          <AlertTriangle size={48} className="logo-icon" />
          <h1>Disaster Management Platform</h1>
          <p>Coordinate relief efforts and stay safe during emergencies</p>
        </div>

        <div className="auth-card">
          <div className="auth-tabs">
            <button 
              className={!isSignUp ? 'active' : ''} 
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
            <button 
              className={isSignUp ? 'active' : ''} 
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="social-buttons">
              <button 
                type="button" 
                className="social-btn google"
                onClick={() => handleSocialLogin('Google')}
              >
                <span>🔵</span> Continue with Google
              </button>
              <button 
                type="button" 
                className="social-btn facebook"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <span>🔷</span> Continue with Facebook
              </button>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <p className="auth-footer">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsSignUp(!isSignUp)} className="link-btn">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
