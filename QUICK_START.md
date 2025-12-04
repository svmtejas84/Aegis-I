# AEGIS - Quick Start Commands

## 🚀 Backend Setup

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (then edit with your credentials)
copy .env.example .env

# Start server
npm run dev
```

## 🎨 Frontend - ReportIncidents Setup

```powershell
# Navigate to ReportIncidents
cd "frontend/ReportIncidents"

# Install missing dependency
npm install sonner

# Create .env file
copy .env.example .env

# Start development server
npm run dev
```

## 📦 Dependencies to Install

### ReportIncidents
```powershell
cd "frontend/ReportIncidents"
npm install sonner
```

### mapPublic (When ready)
```powershell
cd "frontend/mapPublic"
npm install socket.io-client sonner
```

### IncidentAdmin (When ready)
```powershell
cd "frontend/IncidentAdmin"
npm install socket.io-client sonner
```

### MissionAdmin (When ready)  
```powershell
cd "frontend/MissionAdmin"
npm install socket.io-client sonner
```

## 🧪 Test Everything

```powershell
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: ReportIncidents
cd "frontend/ReportIncidents"
npm run dev

# Open browser: http://localhost:5174
```

## ✅ Verification Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] MongoDB connected (check backend logs)
- [ ] ReportIncidents running on `http://localhost:5174`
- [ ] Can select disaster type
- [ ] Can upload photo
- [ ] Location is captured
- [ ] Submit button works
- [ ] Success toast appears
- [ ] Incident saved in database

## 🗄️ Check Database

```powershell
# Connect to MongoDB
mongosh

# Switch to aegis database
use aegis

# View incidents
db.incidents.find().pretty()

# View alerts
db.alerts.find().pretty()
```

## 🌐 API Testing

```powershell
# Health check
curl http://localhost:5000/health

# Get incidents
curl http://localhost:5000/api/incidents

# Get alerts
curl http://localhost:5000/api/alerts
```
