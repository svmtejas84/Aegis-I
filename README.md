
# AEGIS - Advanced Emergency Guidance and Incident System

A consolidated emergency response platform with real-time incident reporting, live maps, alert broadcasts, and admin controls. The current build runs a unified frontend plus the backend API.

## Table of Contents

- Features
- Tech Stack
- Project Structure
- Prerequisites
- Installation
- Configuration
- Running the Application
- API Overview

## Features

Core
- Real-time incident reporting with photos and geo-tagging
- Live maps with user location tracking and accuracy rings
- Incident pins on landing and map views, refreshed automatically
- Alert broadcasts from admin; alerts can be ended/deactivated and disappear from maps
- Admin dashboard for acknowledge/resolve flow and incident filtering
- Risk zones overlay on the map view

Recent additions
- Broadcast alerts are visible on landing and map views with animated pins
- Admin can end active alerts (deactivate) from the dashboard
- Continuous user location updates via watchPosition across maps

## Tech Stack

Backend
- Node.js 18+, Express, MongoDB (Mongoose)
- Socket.io for realtime updates
- Multer for uploads; optional Cloudinary integration
- Twilio SMS (optional; disabled without credentials)

Frontend (unified app)
- React 18, Vite, Tailwind CSS
- Leaflet for maps
- Sonner for notifications

## Project Structure

```
Aegis-I/
├─ backend/                # Express API, sockets, services
│  ├─ src/modules/         # auth, incidents, alerts, checkIns, sms, subscribers
│  ├─ src/services/        # cloudinary, sms, socket
│  └─ server.js
├─ frontend/unified/       # Single React frontend (landing, report, admin, map)
└─ cards/                  # Disaster info cards (static)
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB 6+
- PowerShell (for run-all script on Windows)

Optional services: Twilio (SMS), Cloudinary (image hosting).

## Installation

Clone and install
```powershell
git clone https://github.com/RJScripts-24/Aegis.git
cd Aegis-I

# Backend
cd backend
npm install
copy .env.example .env

# Frontend (unified)
cd ../frontend/unified
npm install
```

## Configuration

Backend `.env` (minimal)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/aegis
JWT_SECRET=change-me
CORS_ORIGIN=http://localhost:5173

# Optional
# CLOUDINARY_CLOUD_NAME=...
# CLOUDINARY_API_KEY=...
# CLOUDINARY_API_SECRET=...
# TWILIO_ACCOUNT_SID=...
# TWILIO_AUTH_TOKEN=...
# TWILIO_PHONE_NUMBER=...
```

Frontend `.env` (frontend/unified)
```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## Running the Application

PowerShell one-liner (Windows)
```powershell
.\run-all.ps1
```

Manual (two terminals)
```powershell
# Terminal 1 - backend
cd backend
npm run dev

# Terminal 2 - frontend unified
cd frontend/unified
npm run dev
```

URLs
- Frontend unified: http://localhost:5173
- Backend API: http://localhost:5000

## API Overview

Base URL: http://localhost:5000/api

Incidents
- GET /incidents                 # Public incidents (Acknowledged/Resolved)
- GET /incidents/admin           # All incidents (admin view)
- POST /incidents                # Create incident (multipart form-data)
- PUT /incidents/:id             # Update status (Pending, Acknowledged, Resolved)

Alerts
- GET /alerts/broadcast          # Active broadcast alerts
- POST /alerts/broadcast         # Create broadcast alert
- PUT /alerts/:id/deactivate     # End/deactivate an alert

Auth
- POST /auth/register
- POST /auth/login

## Notes

- Twilio credentials are optional; without them, SMS will log warnings but the app still runs.
- Alert pins disappear automatically once deactivated via the admin end-alert action.
- Live maps use browser geolocation; ensure location permissions are granted for full functionality.


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


