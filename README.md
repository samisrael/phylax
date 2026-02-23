# phylax

AI-Driven Geography-Aware Disaster Risk Prediction And Relief Coordination System

A comprehensive web application for coordinating disaster relief efforts and emergency response.

## Features

### 1. User Authentication
- Sign up with Google, Facebook, or Email/Password
- Secure authentication and session management

### 2. Dashboard
- Real-time weather data display (rainfall, temperature, humidity, forecasts)
- Disaster risk prediction based on location and weather patterns
- Visual risk meter/speedometer showing threat levels
- Active zones display (30+ users)

### 3. Disaster Risk Prediction
- Analyzes location coordinates
- Processes recent and forecasted rainfall data
- Calculates temperature and humidity patterns
- Displays risk levels:
  - Evacuate Immediately
  - Most Expected
  - Expected
  - Likely
  - Unlikely

### 4. Zone Management

#### Create a Zone
- Auto-filled location detection
- Basic zone information (name, description)
- Emergency type selection (flood, landslide, earthquake, etc.)
- Severity level selection
- Visible to nearby users
- Becomes "Active Zone" when 30+ users join

#### Join a Zone
- Join via shared link
- Browse nearby zones
- Search functionality
- View zone distance and member count

#### View Existing Zones
- Filter by emergency type
- View all active zones
- See zone status and member count

### 5. Zone Coordination Page
Inside a zone, users can:
- View number of people affected
- See posted needs (food, water, medical, transport)
- Choose how to help:
  - Provide Food
  - Provide Water
  - Medical Aid
  - Transport Help
  - Volunteer
  - Financial Aid
- Share zone link with others

## Tech Stack

- **Frontend**: React 19
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: Custom CSS with modern gradients and animations

## Installation

1. Navigate to the project directory:
```bash
git clone https://github.com/samisrael/phylax
cd phylax
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Project Structure

```
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx      # Authentication page
│   │   ├── Dashboard.jsx        # Main dashboard with weather & risk data
│   │   ├── CreateZone.jsx       # Create new emergency zone
│   │   ├── JoinZone.jsx         # Join existing zones
│   │   ├── ViewZones.jsx        # Browse all active zones
│   │   └── ZonePage.jsx         # Individual zone coordination page
│   ├── styles/
│   │   ├── LandingPage.css
│   │   ├── Dashboard.css
│   │   ├── CreateZone.css
│   │   ├── JoinZone.css
│   │   ├── ViewZones.css
│   │   └── ZonePage.css
│   ├── App.jsx                  # Main app component with routing
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## User Flow

1. **Login** → User signs up/signs in
2. **Dashboard** → View weather data, risk predictions, and active zones
3. **Predict Risk** → System calculates disaster probability
4. **Zone Options** → Create, Join, or View Zones
5. **Create Zone** → Set up emergency coordination area
6. **Join Zone** → Connect via link or nearby search
7. **Zone Page** → Coordinate relief efforts, view needs, offer help

## Color Scheme

- **Primary Background**: Dark gradients (#0a0a0a to #1a1a2e)
- **Cards**: #16213e with subtle borders
- **Accent Colors**: 
  - Primary: #667eea to #764ba2 (purple gradient)
  - Secondary: #f093fb to #f5576c (pink gradient)
  - Tertiary: #4facfe to #00f2fe (blue gradient)
- **Alert Colors**: 
  - Danger: #ff6b6b
  - Warning: #ffa500
  - Success: #4cd137

## Next Steps (Backend Integration)

To make this fully functional, you'll need to:

1. Set up a backend server (Node.js/Express, Python/Flask, etc.)
2. Implement real authentication (Google OAuth, Facebook OAuth, JWT)
3. Integrate weather API (OpenWeatherMap, WeatherAPI, etc.)
4. Create database schema for zones, users, and help requests
5. Implement real-time updates (Socket.io or similar)
6. Add geolocation services for accurate positioning
7. Implement actual risk prediction algorithm
8. Set up notification system for alerts

