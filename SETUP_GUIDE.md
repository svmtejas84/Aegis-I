# AEGIS - Complete Setup & Integration Guide

## 🎯 Project Status

✅ **Backend:** FULLY COMPLETED & CONNECTED
✅ **ReportIncidents Frontend:** FULLY COMPLETED & CONNECTED  
⏳ **mapPublic:** Ready to connect (next priority)
⏳ **IncidentAdmin:** Ready to connect
⏳ **MissionAdmin:** Ready to connect

---

## 📦 Phase 1: Backend Setup (COMPLETED ✅)

### Step 1: Install Backend Dependencies

```powershell
cd backend
npm install
```

### Step 2: Create `.env` File

Copy `.env.example` to `.env`:

```powershell
copy .env.example .env
```

Then edit `.env` and fill in your credentials:

```env
# MongoDB - Use either local or cloud
MONGODB_URI=mongodb://localhost:27017/aegis
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aegis

# JWT Secret (change this!)
JWT_SECRET=your-super-secret-key-here-make-it-long-and-random

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Twilio (for SMS alerts)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Port
PORT=5000
```

### Step 3: Start Backend Server

```powershell
cd backend
npm run dev
# OR
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 AEGIS Backend Server running on port 5000
📡 Socket.io ready for real-time connections
```

---

## 🎨 Phase 2: Frontend Setup

### ReportIncidents (COMPLETED ✅)

#### Step 1: Install Dependencies

```powershell
cd "frontend/ReportIncidents"
npm install sonner
```

#### Step 2: Create `.env` File

```powershell
copy .env.example .env
```

Content should be:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

#### Step 3: Start the App

```powershell
npm run dev
```

#### ✅ Features Implemented:
- ✅ Multi-step incident reporting form
- ✅ Real-time geolocation capture
- ✅ Photo upload with preview
- ✅ API integration to `/api/incidents`
- ✅ Success/Error toast notifications
- ✅ Loading states & validation
- ✅ Form reset after submission

---

### mapPublic (READY TO CONNECT ⏳)

This will be completed next with:
- Real-time alert fetching
- Real-time incident markers
- Socket.io live updates
- "I'm Safe" button functionality
- SMS subscription form

---

### IncidentAdmin (READY TO CONNECT ⏳)

Will include:
- Admin authentication
- Incident list from API
- Status update functionality
- Real-time updates via Socket.io

---

### MissionAdmin (READY TO CONNECT ⏳)

Will include:
- Admin login
- Alert broadcasting
- Real-time incident monitoring
- Mission control dashboard

---

## 🔥 Testing the Integration

### Test 1: Submit an Incident Report

1. Start backend: `cd backend && npm run dev`
2. Start ReportIncidents: `cd "frontend/ReportIncidents" && npm run dev`
3. Open browser: `http://localhost:5174`
4. Follow the form steps:
   - Select disaster type (e.g., "Fire")
   - Upload a photo
   - Add notes (optional)
   - Submit
5. Check browser console for success message
6. Check backend logs for received data

### Test 2: Verify Database

```powershell
# Connect to MongoDB
mongosh

# Switch to aegis database
use aegis

# View incidents
db.incidents.find().pretty()
```

### Test 3: API Endpoints

Use Thunder Client, Postman, or curl:

```powershell
# Health check
curl http://localhost:5000/health

# Get public incidents
curl http://localhost:5000/api/incidents

# Get alerts
curl http://localhost:5000/api/alerts
```

---

## 🚀 Next Steps (Priority Order)

### 1. Connect mapPublic (Est: 2-3 hours)
- [ ] Copy API service files
- [ ] Fetch real alerts on load
- [ ] Fetch real incidents on load
- [ ] Add Socket.io client
- [ ] Connect "I'm Safe" button
- [ ] Add SMS subscription form

### 2. Connect IncidentAdmin (Est: 2-3 hours)
- [ ] Add authentication context
- [ ] Create login page
- [ ] Fetch incidents from API
- [ ] Implement status updates
- [ ] Add real-time updates

### 3. Connect MissionAdmin (Est: 2-3 hours)
- [ ] Integrate login
- [ ] Connect alert broadcast
- [ ] Add real-time incident feed
- [ ] Implement prioritization

---

## 📡 Socket.io Real-Time Events

The backend emits these events:

| Event | Room | Data | Description |
|-------|------|------|-------------|
| `new-incident` | `Admin` | Incident object | New incident reported |
| `incident-updated` | `Public` | `{id, newStatus}` | Incident status changed |
| `new-alert` | `Public` | Alert object | New alert broadcast |

### Frontend Socket.io Setup (Coming Next)

```typescript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

// Join Public room (for map apps)
socket.on('connect', () => {
  console.log('Connected to Socket.io');
});

// Listen for new alerts
socket.on('new-alert', (alert) => {
  console.log('New alert:', alert);
  // Add to map markers
});

// Listen for incident updates
socket.on('incident-updated', (update) => {
  console.log('Incident updated:', update);
  // Update marker status
});
```

---

## 🎯 Success Metrics

### Backend
✅ Server running on port 5000
✅ MongoDB connected
✅ All 6 API modules working
✅ Socket.io initialized
✅ Error handling middleware active

### ReportIncidents
✅ Form validation working
✅ Geolocation captured
✅ Photos uploadable
✅ API calls successful
✅ Toast notifications working
✅ Loading states implemented

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: MongoNetworkError: failed to connect to server
```
**Solution:** Make sure MongoDB is running:
```powershell
# Windows
net start MongoDB

# Or start MongoDB service manually
```

### CORS Error
```
Access to fetch at 'http://localhost:5000/api/incidents' has been blocked by CORS policy
```
**Solution:** Backend `.env` should have:
```env
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:5175
```

### Module Not Found
```
Error: Cannot find module 'sonner'
```
**Solution:** Install dependencies:
```powershell
cd "frontend/ReportIncidents"
npm install sonner
```

---

## 📝 Notes

- **Backend runs on:** `http://localhost:5000`
- **Frontend ports:**
  - Landing Page: `5173`
  - ReportIncidents: `5174`
  - mapPublic: `5175`
  - IncidentAdmin: `5176`
  - MissionAdmin: `5177`
  
- **Default admin credentials** (you need to seed):
  - Username: `admin`
  - Password: `admin123`

---

## 🎉 What's Working Now

1. ✅ **Complete backend API** with all routes
2. ✅ **ReportIncidents app** fully connected to backend
3. ✅ **Real incident reporting** with photos & location
4. ✅ **Database persistence** in MongoDB
5. ✅ **Error handling** & validation
6. ✅ **User feedback** via toast notifications

---

## 🔜 Coming Next

I'll now create the same integration for **mapPublic** to:
- Display real alerts on the map
- Show real incident markers
- Enable "I'm Safe" check-ins
- Add SMS subscription
- Implement real-time updates

Would you like me to continue with mapPublic integration?
