#  AEGIS - Advanced Emergency Guidance and Incident System

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)

A comprehensive emergency response and disaster management system that enables real-time incident reporting, live location tracking, emergency alerts, and coordinated response operations.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Modules](#-modules)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## Features

### Core Functionality
-  **Real-time Incident Reporting** - Citizens can report emergencies with photos, location, and details
-  **Live Location Tracking** - Real-time GPS tracking for field agents and emergency responders
-  **Interactive Maps** - Visualize incidents, risk zones, and resources on dynamic maps
-  **Emergency Alerts** - Broadcast alerts to subscribers via SMS and web notifications
-  **Mission Management** - Coordinate emergency response teams and operations
-  **Check-in System** - Safety check-ins for citizens in affected areas
-  **Admin Dashboard** - Monitor and manage incidents, alerts, and operations

### Disaster Types Supported
-  **Tsunami** - Tsunami warnings and evacuation guidance
-  **Cyclone** - Cyclone tracking and safety protocols
-  **Heatwaves** - Heat advisory and safety measures
-  **Chemical Hazards** - Chemical spill response and containment
-  **Nuclear Emergencies** - Radiation safety and evacuation
-  **Landslides** - Landslide warnings and prevention
-  **Urban Floods** - Flood monitoring and response
-  **Earthquakes** - Seismic activity tracking and safety

##  Tech Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **SMS Service**: Twilio
- **Security**: bcryptjs, CORS

### Frontend
- **Framework**: React 18.3
- **Build Tool**: Vite 6.3
- **UI Library**: Radix UI
- **Styling**: Tailwind CSS
- **Maps**: Leaflet & React Leaflet
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Notifications**: Sonner (Toast notifications)
- **Charts**: Recharts
- **HTTP Client**: Fetch API

##  Project Structure

```
Aegis/
├── backend/                    # Node.js Express backend
│   ├── src/
│   │   ├── api/               # API routes
│   │   ├── config/            # Configuration files
│   │   ├── middleware/        # Express middleware
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/          # Authentication
│   │   │   ├── incidents/     # Incident management
│   │   │   ├── alerts/        # Alert system
│   │   │   ├── checkIns/      # Check-in system
│   │   │   ├── sms/           # SMS notifications
│   │   │   └── subscribers/   # Subscriber management
│   │   ├── services/          # Business logic services
│   │   └── utils/             # Utility functions
│   ├── uploads/               # File uploads (temp storage)
│   ├── server.js              # Server entry point
│   └── package.json
│
├── frontend/                   # React frontend applications
│   ├── Landing Page/          # Main landing page
│   ├── ReportIncidents/       # Incident reporting interface
│   ├── IncidentAdmin/         # Admin incident management
│   ├── MissionAdmin/          # Mission coordination
│   ├── LocationPopup/         # Location selection widget
│   └── mapPublic/             # Public incident map
│
├── cards/                      # Disaster-specific info cards
│   ├── tsunami/               # Tsunami information
│   ├── Cyclone/               # Cyclone information
│   ├── Heatwaves/             # Heatwave information
│   ├── chemical/              # Chemical hazard info
│   ├── nuclear/               # Nuclear emergency info
│   ├── Landslide/             # Landslide information
│   ├── urbanfloods/           # Urban flood info
│   └── earthquake/            # Earthquake information
│
└── docs/                       # Documentation files
```

##  Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **MongoDB** (v6.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

### Required Services
- **Cloudinary Account** - For image storage ([Sign up](https://cloudinary.com/))
- **Twilio Account** - For SMS notifications ([Sign up](https://www.twilio.com/))
- **MongoDB Atlas** (Optional) - For cloud database ([Sign up](https://www.mongodb.com/cloud/atlas))

##  Installation

### 1. Clone the Repository

```powershell
git clone https://github.com/RJScripts-24/Aegis.git
cd Aegis
```

### 2. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env
```

Edit the `.env` file with your credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/aegis

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Twilio Configuration
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:5175
```

### 3. Frontend Setup

Install dependencies for each frontend application:

```powershell
# Landing Page
cd "frontend/Landing Page"
npm install

# Report Incidents
cd "../ReportIncidents"
npm install
npm install sonner

# Incident Admin
cd "../IncidentAdmin"
npm install
npm install socket.io-client sonner

# Mission Admin
cd "../MissionAdmin"
npm install
npm install socket.io-client sonner

# Public Map
cd "../mapPublic"
npm install
npm install socket.io-client sonner

# Location Popup
cd "../LocationPopup"
npm install
```

### 4. Install Disaster Card Dependencies

```powershell
# Tsunami
cd "../../cards/tsunami"
npm install

# Cyclone
cd "../Cyclone"
npm install

# Continue for other disaster cards...
```

##  Configuration

### Backend Configuration

Create `backend/.env` file with the following variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | ✅ |
| `NODE_ENV` | Environment (development/production) | ✅ |
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | ✅ |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | ✅ |
| `TWILIO_PHONE_NUMBER` | Twilio phone number | ✅ |
| `CORS_ORIGIN` | Allowed CORS origins | ✅ |

### Frontend Configuration

Each frontend app may require a `.env` file pointing to the backend:

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

##  Running the Application

### Development Mode

#### Start Backend Server

```powershell
cd backend
npm run dev
```
Server will run on `http://localhost:5000`

#### Start Frontend Applications

Open separate terminal windows for each:

```powershell
# Terminal 1: Landing Page
cd "frontend/Landing Page"
npm run dev

# Terminal 2: Report Incidents (Main interface)
cd "frontend/ReportIncidents"
npm run dev

# Terminal 3: Incident Admin
cd "frontend/IncidentAdmin"
npm run dev

# Terminal 4: Mission Admin
cd "frontend/MissionAdmin"
npm run dev

# Terminal 5: Public Map
cd "frontend/mapPublic"
npm run dev
```

### Production Build

```powershell
# Build all frontend applications
cd "frontend/Landing Page" && npm run build
cd "../ReportIncidents" && npm run build
cd "../IncidentAdmin" && npm run build
cd "../MissionAdmin" && npm run build
cd "../mapPublic" && npm run build

# Start backend in production
cd ../../backend
npm start
```

##  Modules

###  Authentication (`/api/auth`)
- User registration and login
- JWT-based authentication
- Role-based access control (Admin, User)

###  Incidents (`/api/incidents`)
- Report new incidents with photos and location
- View all incidents
- Update incident status
- Filter by disaster type and severity

###  Alerts (`/api/alerts`)
- Create and broadcast emergency alerts
- Target specific regions or disaster types
- SMS notifications to subscribers
- Real-time web notifications via Socket.io

###  Check-ins (`/api/check-ins`)
- Safety check-in for citizens
- Location-based check-ins
- Status tracking (Safe, Need Help, Emergency)

###  Subscribers (`/api/subscribers`)
- Subscribe to emergency alerts
- Manage notification preferences
- Phone number verification

###  SMS (`/api/sms`)
- Send SMS notifications
- Bulk SMS to subscribers
- Delivery status tracking

##  API Documentation

### Base URL
```
http://localhost:5000/api
```

### Health Check
```http
GET /health
```

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phone": "+1234567890"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Incident Endpoints

#### Create Incident
```http
POST /api/incidents
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "disasterType": "earthquake",
  "description": "Building collapse reported",
  "severity": "high",
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "address": "New Delhi, India"
  },
  "photo": <file>
}
```

#### Get All Incidents
```http
GET /api/incidents
Authorization: Bearer <token>
```

#### Get Incident by ID
```http
GET /api/incidents/:id
Authorization: Bearer <token>
```

#### Update Incident Status
```http
PUT /api/incidents/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "resolved"
}
```

### Alert Endpoints

#### Create Alert
```http
POST /api/alerts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Tsunami Warning",
  "message": "Evacuate coastal areas immediately",
  "disasterType": "tsunami",
  "severity": "critical",
  "region": "Coastal Area",
  "sendSMS": true
}
```

#### Get All Alerts
```http
GET /api/alerts
```

### Check-in Endpoints

#### Create Check-in
```http
POST /api/check-ins
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "safe",
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090
  },
  "message": "All family members safe"
}
```

## 🔌 Socket.io Events

### Client → Server

- `join:incident` - Join incident room for updates
- `join:alert` - Join alert notifications
- `location:update` - Send live location update

### Server → Client

- `incident:new` - New incident reported
- `incident:update` - Incident status updated
- `alert:new` - New emergency alert
- `location:update` - Live location update from field agent

##  Testing

### Database Verification

```powershell
# Connect to MongoDB
mongosh

# Switch to AEGIS database
use aegis

# View collections
show collections

# View incidents
db.incidents.find().pretty()

# View alerts
db.alerts.find().pretty()

# View users
db.users.find().pretty()
```

### API Testing with cURL

```powershell
# Health check
curl http://localhost:5000/health

# Get incidents (no auth required for public view)
curl http://localhost:5000/api/incidents

# Get alerts
curl http://localhost:5000/api/alerts
```

##  Documentation Files

- `QUICK_START.md` - Quick start guide
- `SETUP_GUIDE.md` - Detailed setup instructions
- `FRONTEND_FLOW_CHECKLIST.md` - Frontend development checklist
- `LIVE_LOCATION_FEATURE.md` - Live location tracking documentation
- `PHOTO_UPLOAD_IMPLEMENTATION.md` - Photo upload feature guide
- `RISK_ZONES_FEATURE.md` - Risk zone mapping documentation
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- `FIXES_APPLIED_SUMMARY.md` - Bug fixes and updates

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint configurations
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting PR

##  Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```powershell
# Make sure MongoDB is running
mongod --version
net start MongoDB
```

**Port Already in Use**
```powershell
# Find and kill process using port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

**Node Modules Issues**
```powershell
# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

**Cloudinary Upload Failed**
- Verify API credentials in `.env`
- Check image size (max 10MB)
- Ensure stable internet connection

**Twilio SMS Not Sending**
- Verify Twilio credentials
- Check phone number format (+CountryCode)
- Ensure sufficient Twilio credits

##  License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

##  Team

**AEGIS Team** - [RJScripts-24](https://github.com/RJScripts-24)

##  Acknowledgments

- [Express.js](https://expressjs.com/) - Backend framework
- [React](https://reactjs.org/) - Frontend library
- [MongoDB](https://www.mongodb.com/) - Database
- [Socket.io](https://socket.io/) - Real-time communication
- [Cloudinary](https://cloudinary.com/) - Image hosting
- [Twilio](https://www.twilio.com/) - SMS service
- [Leaflet](https://leafletjs.com/) - Map visualization
- [Radix UI](https://www.radix-ui.com/) - UI components



## 🔗 Links

- **Repository**: [https://github.com/RJScripts-24/Aegis](https://github.com/RJScripts-24/Aegis)
- **Documentation**: See `docs/` folder
- **Issues**: [Report a bug](https://github.com/RJScripts-24/Aegis/issues)

---


