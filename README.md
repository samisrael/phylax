# Phylax - Comprehensive Project Documentation

**AI-Driven Geography-Aware Disaster Risk Prediction And Relief Coordination System**

A complete, production-ready disaster monitoring and relief coordination web application built with React, Spring Boot, and PostgreSQL.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Quick Start Guide](#quick-start-guide)
4. [API Endpoints](#api-endpoints)
5. [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
6. [Database Schema](#database-schema)
7. [Features](#features)
8. [Project Structure](#project-structure)
9. [Frontend Setup](#frontend-setup)
10. [Backend Setup](#backend-setup)
11. [Troubleshooting](#troubleshooting)
12. [Implementation Checklist](#implementation-checklist)

---

## Project Overview

Phylax is a disaster management system designed to:
- Monitor environmental data and predict disaster risks
- Coordinate relief efforts through emergency zones
- Track contributions and resource allocation
- Provide real-time authentication and authorization
- Enable role-based admin and user functionalities

### Key Technologies

| Component | Technology |
|-----------|-----------|
| Frontend | React 19 with Vite |
| Backend | Spring Boot 3.x with JWT |
| Database | PostgreSQL 14+ |
| Build Tools | Maven (Backend), npm (Frontend) |
| Authentication | JWT with Role-Based Access Control |
| API Communication | REST with Axios |

---

## Architecture

### Three-Tier Architecture

```
┌─────────────────────────────────────────┐
│          Frontend (React)                │
│  - React Components, Pages, Services    │
│  - Zustand State Management             │
│  - Role-based UI Components             │
│  - RBAC Utilities (roleUtils.js)        │
└────────────────┬────────────────────────┘
                 │ HTTP/REST
                 ↓
┌─────────────────────────────────────────┐
│       Backend (Spring Boot)             │
│  - Controllers, Services, Repositories  │
│  - JWT Authentication & Authorization   │
│  - Method-level Security (@PreAuthorize)│
│  - Business Logic & Validation          │
└────────────────┬────────────────────────┘
                 │ JDBC
                 ↓
┌─────────────────────────────────────────┐
│       Database (PostgreSQL)             │
│  - Users, Zones, Contributions          │
│  - Environmental Data                   │
│  - Complete ACID Compliance             │
└─────────────────────────────────────────┘
```

---

## Quick Start Guide

### Prerequisites

- PostgreSQL 14+ installed and running
- Java 17+ installed
- Node.js 18+ and npm installed
- Git (optional)

### Step 1: Database Setup (2 minutes)

```bash
# Connect to PostgreSQL
psql -U postgres

# In PostgreSQL terminal, run:
CREATE DATABASE phylax_db;
CREATE USER phylax_user WITH PASSWORD 'root';
GRANT ALL PRIVILEGES ON DATABASE phylax_db TO phylax_user;
\q

# Exit and load schema
cd phylax
psql -U phylax_user -d phylax_db -f phylax-schema.sql
```

### Step 2: Start Backend (1 minute)

```bash
cd server

# Build and start
mvn clean install
mvn spring-boot:run

# Backend runs at http://localhost:8080
# Test: curl http://localhost:8080/api/environment/current
```

### Step 3: Start Frontend (1 minute)

```bash
cd client

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev

# Frontend runs at http://localhost:5173
```

### Step 4: Access Application

Open browser: **http://localhost:5173**

### Step 5: Test Login

```
Email: test@phylax.com
Password: password123
```

---

## API Endpoints

### Base URL
```
http://localhost:8080/api
```

### Authentication Header (for protected endpoints)
```
Authorization: Bearer {jwt_token}
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response (201):
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "createdAt": "2026-03-19T10:30:00"
  }
}
```

**Errors:** 400 (Email exists), 400 (Invalid data)

---

### Login User
**POST** `/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response (200): Same as Register

**Errors:** 401 (Invalid credentials), 404 (User not found)

---

## Environmental Data Endpoints

### Get Current Environmental Data
**GET** `/environment/current?latitude={lat}&longitude={lng}`

Response (200):
```json
{
  "latitude": 37.7749,
  "longitude": -122.4194,
  "temperature": 72.5,
  "humidity": 65,
  "rainfall": 0.5,
  "timestamp": "2026-03-19T10:30:00"
}
```

---

## Zone Endpoints

### Get All Zones (Public)
**GET** `/zones`

Response (200):
```json
[
  {
    "id": 1,
    "name": "Downtown Flood Zone",
    "location": "San Francisco",
    "status": "ACTIVE",
    "riskScore": 65.5,
    "participantCount": 150
  }
]
```

---

### Get Zone by ID (Public)
**GET** `/zones/{id}`

Response (200): Single zone object

---

### Create Zone (Admin Only)
**POST** `/zones` Admin

Request:
```json
{
  "name": "Coastal Flood Alert",
  "location": "Miami",
  "description": "Potential flooding in coastal areas",
  "populationEstimate": 50000
}
```

Response (201): Created zone

**Authorization:** ADMIN role required

---

### Update Zone (Admin Only)
**PUT** `/zones/{id}` Admin

Request: Same as Create

Response (200): Updated zone

---

### Delete Zone (Admin Only)
**DELETE** `/zones/{id}` Admin

Response (200): `{ "message": "Zone deleted successfully" }`

---

### Get Active Zones (Public)
**GET** `/zones/active`

Response (200): List of active zones

---

### Search Zones (Public)
**GET** `/zones/search?location={location}`

Response (200): Matching zones

---

### Update Zone Risk Score (Admin Only)
**PUT** `/zones/{id}/risk-score?riskScore={score}` Admin

Response (200): Updated zone

---

## Contribution Endpoints

### Create Contribution (Authenticated)
**POST** `/contributions` Auth

Request:
```json
{
  "zoneId": 1,
  "type": "MONEY",
  "amount": 500,
  "description": "Financial aid for relief"
}
```

Response (201): Created contribution

---

### Get My Contributions (Authenticated)
**GET** `/contributions/my-contributions` Auth

Response (200): User's contributions

---

### Get Contributions by User (Authenticated)
**GET** `/contributions/user/{userId}` Auth

Response (200): User's contributions

---

### Get Contributions by Zone (Public)
**GET** `/contributions/zone/{zoneId}`

Response (200): Zone's contributions

---

### Get Total Money Contributions (Public)
**GET** `/contributions/zone/{zoneId}/total-money`

Response (200):
```json
{
  "total": 15000.50
}
```

---

### Update Contribution (Authenticated)
**PUT** `/contributions/{id}` Auth

Request: Same as Create

Response (200): Updated contribution

**Note:** Users can only update own contributions; admins can update any

---

### Delete Contribution (Authenticated)
**DELETE** `/contributions/{id}` Auth

Response (200): `{ "message": "Contribution deleted successfully" }`

**Note:** Users can only delete own contributions; admins can delete any

---

## User Management Endpoints (Admin Only)

### Get All Users
**GET** `/users` Admin

Response (200): List of all users

---

### Get User by ID
**GET** `/users/{id}` Admin

Response (200): User details

---

### Update User Role
**PUT** `/users/{userId}/role` Admin

Request:
```json
{
  "role": "ADMIN"
}
```

Response (200): Updated user

---

### Delete User
**DELETE** `/users/{id}` Admin

Response (200): `{ "message": "User deleted successfully" }`

---

### Update Own Profile
**PUT** `/users/profile/update`   Auth

Request:
```json
{
  "name": "Updated Name"
}
```

Response (200): Updated user profile

---

### Get Dashboard Statistics
**GET** `/users/admin/statistics`     Admin

Response (200):
```json
{
  "totalUsers": 50,
  "totalZones": 12,
  "totalContributions": 350,
  "usersByRole": {
    "ADMIN": 2,
    "USER": 45,
    "RESPONDER": 3
  },
  "recentUsers": [...]
}
```

---

## Risk Assessment Endpoints

### Get Risk Assessment
**GET** `/risk-assessment?latitude={lat}&longitude={lng}` (Public)

Response (200):
```json
{
  "riskLevel": "HIGH",
  "riskScore": 75.5,
  "recommendation": "Prepare for potential evacuation"
}
```

---

## Needs Estimation Endpoints

### Get Daily Needs Estimation
**GET** `/needs-estimation?zoneId={id}` (Public)

Response (200):
```json
{
  "zoneId": 1,
  "estimatedFamilies": 500,
  "dailyFood": {
    "quantity": 1500,
    "unit": "kg"
  },
  "dailyWater": {
    "quantity": 5000,
    "unit": "liters"
  }
}
```

---

## Role-Based Access Control (RBAC)

### Roles Overview

| Role | Permissions |
|------|------------|
| **ADMIN** | Full CRUD on users, zones, contributions; view dashboard |
| **USER** | Create contributions, manage own data, view zones (read-only) |
| **RESPONDER** | Similar to USER, intended for emergency responders |

---

### Access Matrix

| Feature | Admin | User | Responder | Public |
|---------|-------|------|-----------|--------|
| View zones |  ✓ |  ✓ |  ✓ |  ✓ |
| Create zone |  ✓ |  x |  x |  x |
| Edit zone |  ✓ |  x |  x |  x |
| Delete zone |  ✓ |  x |  x |  x |
| Create contribution |  ✓ |  ✓ |  ✓ |  x |
| Edit own contribution |  ✓ |  ✓ |  ✓ |  x |
| Edit others' contribution |  ✓ |  x |  x |  x |
| Delete own contribution |  ✓ |  ✓ |  ✓ |  x |
| Delete others' contribution |  ✓ |  x |  x |  x |
| Manage users |  ✓ |  x |  x |  x |
| View admin dashboard |  ✓ |  x |  x |  x |
| Update own profile |  ✓ |  ✓ |  ✓ |  x |

---

### Backend RBAC Implementation

#### JWT Token with Role
- Role embedded in JWT token
- Extracted on each request
- Added to Spring Security context as `SimpleGrantedAuthority`

#### Security Configuration
```java
@EnableMethodSecurity(prePostEnabled = true)
```

#### Authorization Annotations
```java
@PreAuthorize("hasRole('ADMIN')")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<?> endpoint() { ... }
```

---

### Frontend RBAC Implementation

#### Role Checking Utility (roleUtils.js)
```javascript
import { isAdmin, hasRole, canEditContribution } from '../../utils/roleUtils';

// Check if user is admin
if (isAdmin()) { ... }

// Check specific role
if (hasRole('ADMIN')) { ... }

// Check permission
if (canEditContribution(userId)) { ... }
```

#### Role Guard Component
```jsx
import RoleGuard from '../components/common/RoleGuard';

<RoleGuard role="ADMIN">
  <AdminDashboard />
</RoleGuard>
```

#### Auth Store Methods
```javascript
const { user, isAdmin, hasRole } = useAuthStore();

if (user.role === 'ADMIN') { ... }
```

---

### Admin Features

#### Admin Dashboard (`/admin/dashboard`)
- Total users count
- Total zones count
- Total contributions count
- Users by role breakdown
- Recent users table with details
- Real-time statistics fetching

#### User Management (`/admin/users`)
- List all users
- Edit user roles (dropdown)
- Delete users (with confirmation)
- View user details (name, email, role, join date)
- Success/error notifications

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN', 'RESPONDER')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Zones Table
```sql
CREATE TABLE zones (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  population_estimate INTEGER,
  status VARCHAR(50) NOT NULL DEFAULT 'INACTIVE' CHECK (status IN ('INACTIVE', 'MONITORING', 'ACTIVE', 'HIGH_ALERT', 'EVACUATE')),
  risk_score DECIMAL(5,2) DEFAULT 0.0,
  participant_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Contributions Table
```sql
CREATE TABLE contributions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  zone_id BIGINT NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('MONEY', 'FOOD', 'WATER', 'MEDICAL', 'TRANSPORT', 'VOLUNTEER')),
  amount DECIMAL(10,2) DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Environmental Data Table
```sql
CREATE TABLE environmental_data (
  id BIGSERIAL PRIMARY KEY,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  temperature DECIMAL(5,2),
  humidity DECIMAL(5,2),
  rainfall DECIMAL(8,2),
  timestamp TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Features

### 1. User Authentication
-  ✓ Sign up with Email/Password
-  ✓ Secure JWT-based authentication
-  ✓ Token stored in localStorage
-  ✓ Automatic token refresh on app load

### 2. Dashboard
-  ✓ Real-time weather data display (rainfall, temperature, humidity)
-  ✓ Disaster risk prediction based on location and weather
-  ✓ Visual risk meter displaying threat levels
-  ✓ Active zones display with participant counts

### 3. Disaster Risk Prediction
-  ✓ Analyzes location coordinates
-  ✓ Processes rainfall and forecasted data
-  ✓ Calculates temperature and humidity patterns
-  ✓ Displays risk levels (Evacuate, High Alert, Active, Monitoring, Inactive)

### 4. Zone Management
-  ✓ Create zones (admin only)
-  ✓ Join existing zones
-  ✓ View all zones with filters
-  ✓ Search zones by location
-  ✓ View zone details and status
-  ✓ Track participant counts

### 5. Contribution Management
-  ✓ Create contributions (donations)
-  ✓ Track personal contributions
-  ✓ View zone needs estimation
-  ✓ Monitor total contributions
-  ✓ Edit own contributions
-  ✓ Delete own contributions

### 6. Admin Features 
-  ✓ Full user management (CRUD)
-  ✓ Role assignment (USER, ADMIN, RESPONDER)
-  ✓ Comprehensive admin dashboard
-  ✓ Overall statistics and reporting
-  ✓ Full zone and contribution management

### 7. Role-Based Access Control
-  ✓ Three-tier role system (ADMIN, USER, RESPONDER)
-  ✓ JWT-based role enforcement
-  ✓ Method-level security (`@PreAuthorize`)
-  ✓ Frontend role checks and UI guards
-  ✓ Contribution ownership validation

---

## Project Structure

### Backend Structure
```
server/
├── src/main/java/com/phylax/server/
│   ├── ServerApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   └── OAuth2SecurityConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   ├── ZoneController.java
│   │   ├── ContributionController.java
│   │   ├── EnvironmentalDataController.java
│   │   ├── RiskAssessmentController.java
│   │   └── NeedsEstimationController.java
│   ├── dto/
│   │   ├── AuthRequest.java
│   │   ├── AuthResponse.java
│   │   ├── UserDTO.java
│   │   └── [...other DTOs]
│   ├── model/
│   │   ├── User.java
│   │   ├── UserRole.java
│   │   ├── Zone.java
│   │   ├── Contribution.java
│   │   └── [...]
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── ZoneRepository.java
│   │   ├── ContributionRepository.java
│   │   └── EnvironmentalDataRepository.java
│   ├── security/
│   │   ├── JwtTokenProvider.java
│   │   └── JwtAuthenticationFilter.java
│   └── service/
│       ├── AuthService.java
│       ├── UserService.java
│       ├── ZoneService.java
│       ├── ContributionService.java
│       ├── EnvironmentalDataService.java
│       ├── RiskAssessmentService.java
│       └── NeedsEstimationService.java
├── pom.xml
└── application.properties
```

### Frontend Structure
```
client/
├── src/
│   ├── main.jsx
│   ├── index.css
│   ├── App.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ZonesPage.jsx
│   │   ├── ZoneDetailPage.jsx
│   │   ├── CreateZonePage.jsx
│   │   ├── ContributionsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── AdminDashboardPage.jsx
│   │   └── UserManagementPage.jsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── EmptyState.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── RoleGuard.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── layout/
│   │   │   ├── Navigation.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── zones/
│   │   │   ├── ZoneCard.jsx
│   │   │   ├── CreateZoneForm.jsx
│   │   │   └── ZoneDetailModal.jsx
│   │   ├── contributions/
│   │   │   ├── ContributionCard.jsx
│   │   │   └── ContributionModal.jsx
│   │   └── routes/
│   │       └── ProtectedRoute.jsx
│   ├── services/
│   │   └── api.js
│   ├── store/
│   │   └── authStore.js
│   └── utils/
│       ├── helpers.js
│       └── roleUtils.js
├── package.json
├── vite.config.js
└── index.html
```

---

## Frontend Setup

### Installation

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

### Environment Variables

Create `.env` file in client directory:
```
VITE_API_URL=http://localhost:8080/api
```

### Dependencies

- React 19
- React Router DOM v7
- Axios (API client)
- Zustand (state management)
- Font Awesome Icons
- Tailwind CSS (if configured)

---

## Backend Setup

### Prerequisites
- Java 17+
- Maven 3.6+

### Installation

```bash
cd server

# Build
mvn clean install

# Run
mvn spring-boot:run

# Or run tests
mvn test
```

### Configuration

Update `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/phylax_db
spring.datasource.username=phylax_user
spring.datasource.password=root

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQL10Dialect

jwt.secret=your-super-secret-key-min-256-bits-long-minimum-256-chars-for-security
jwt.expiration=86400000

server.port=8080
server.servlet.context-path=/
```

### Dependencies (Maven)
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- PostgreSQL Driver
- JWT (jjwt)
- Lombok

---

## Troubleshooting

### Backend Won't Start

**Error: Connection refused on port 8080**
```bash
# Check if port is in use
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or use different port in application.properties:
# server.port=8081
```

**Error: Database connection error**
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Verify credentials in application.properties
# Verify database exists
psql -U phylax_user -d phylax_db -c "\dt"
```

---

### Frontend Won't Load API

**Error: CORS policy or 404**
```bash
# Ensure backend is running
curl http://localhost:8080/api/auth/test

# Check frontend API URL in services/api.js
# Should be: http://localhost:8080/api
```

**Error: Module not found**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

### API Returns 401 Token

**Error: Unauthorized**
```bash
# Clear localStorage in browser
# 1. Open DevTools (F12)
# 2. Go to Application tab
# 3. Clear localStorage
# 4. Log back in
```

---

### Port Already in Use

**Frontend port 5173:**
```bash
# Kill process or use different port
npx vite --port 5174
```

**Backend port 8080:**
```bash
# Edit application.properties
# server.port=8081
```

---

## Testing Recommendations

### Admin Account Testing
```bash
# 1. Create admin user
# 2. Test user management (CRUD)
# 3. Test zone management (CRUD)
# 4. Verify dashboard loads
```

### Regular User Testing
```bash
# 1. Create regular user
# 2. Test contribution operations (own only)
# 3. Verify admin endpoints return 403
```

### Token Testing
```bash
# 1. Decode JWT token from /api/auth/login
# 2. Verify role is included in payload
# 3. Test with role-based endpoints
```

### Contribution Ownership
```bash
# 1. User A creates contribution
# 2. User A can edit/delete it
# 3. User B cannot edit/delete User A's
# 4. Admin can edit/delete any
```

---

## Security Notes

-  ✓ Role is extracted from JWT and added to Spring Security context
-  ✓ `@PreAuthorize` annotations enforce method-level security
-  ✓ URL patterns restrict access at filter level
-  ✓ Ownership checks prevent cross-user data access
-  ✓ Admin role required for user/zone management
- ⚠️ **Important:** Always validate role on backend, never trust frontend role claims
- ⚠️ Use HTTPS in production
- ⚠️ Rotate JWT secret regularly
- ⚠️ Implement rate limiting on sensitive endpoints

---

## Production Deployment

### Backend Deployment
1. Build with Maven: `mvn clean package`
2. Deploy JAR to production server
3. Set environment variables for database and JWT secret
4. Configure HTTPS/SSL
5. Set up database backups

### Frontend Deployment
1. Build with Vite: `npm run build`
2. Deploy dist folder to CDN or web server
3. Configure API endpoint for production
4. Set up caching headers
5. Enable gzip compression

### Database Migration
1. Export schema: `pg_dump -U phylax_user phylax_db > backup.sql`
2. Backup existing data
3. Apply schema changes
4. Verify data integrity

---

## Support & FAQ

**Q: How do I create an admin user?**
A: Connect to PostgreSQL and run:
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

**Q: Can I change a user's role?**
A: Yes, use the Admin Dashboard -> Manage Users page or API endpoint:
```
PUT /api/users/{userId}/role
```

**Q: What happens when I delete a user?**
A: User and all their contributions are deleted (cascade delete). Zones remain.

**Q: How long does the JWT token last?**
A: Default is 24 hours (86400000 milliseconds). Configure in `application.properties`:
```
jwt.expiration=86400000
```

---



**Last Updated:** March 19, 2026  
**Status:** Production Ready
