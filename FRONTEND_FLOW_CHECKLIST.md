# 🗺️ AEGIS Frontend Flow & Connection Checklist

## 📋 Overview
This document maps out all frontend pages, their connections, ports, and navigation flow to ensure everything is properly linked before deployment.

---

## 🚀 All Frontend Applications

### 1. **Landing Page** (Port: 5173)
- **Path**: `frontend/Landing Page/`
- **Purpose**: Main entry point / Homepage
- **Status**: ✅ Active

### 2. **Map Public** (Port: 3000)
- **Path**: `frontend/mapPublic/`
- **Purpose**: Public map view with live location & risk zones
- **Status**: ✅ Active

### 3. **Report Incidents** (Port: 3002)
- **Path**: `frontend/ReportIncidents/`
- **Purpose**: Form to report new incidents
- **Status**: ✅ Active

### 4. **Mission Admin** (Port: 3003)
- **Path**: `frontend/MissionAdmin/`
- **Purpose**: Admin panel for mission management
- **Status**: ✅ Active

### 5. **Incident Admin** (Port: 3004)
- **Path**: `frontend/IncidentAdmin/`
- **Purpose**: Admin panel for incident management
- **Status**: ✅ Active

### 6. **Location Popup** (Port: 3000)
- **Path**: `frontend/LocationPopup/`
- **Purpose**: Location permission/popup interface
- **Status**: ⚠️ Port Conflict with Map Public

---

## 🔗 Navigation Flow Map

```
┌─────────────────────────────────────────────────────────────┐
│                    Landing Page (5173)                      │
│                    Main Entry Point                          │
└───────────────┬──────────────────────┬──────────────────────┘
                │                      │
                ▼                      ▼
    ┌──────────────────┐   ┌─────────────────────┐
    │  Get Alerts      │   │   Admin Login       │
    │  Button          │   │   Button            │
    │  ↓               │   │   ↓                 │
    │  Map Public      │   │   Mission Admin     │
    │  (Port 3000)     │   │   (Port 3003)       │
    └──────────────────┘   └─────────────────────┘
            │
            │
            ▼
    ┌──────────────────────────────────────┐
    │      Map Public (3000)               │
    │  - Live Location                     │
    │  - Risk Zones                        │
    │  - Report Incident Button            │
    └──────────┬───────────────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │  Report Incidents    │
    │  (Port 3002)         │
    └──────────────────────┘

    ┌─────────────────────────────────────┐
    │   Mission Admin (3003)              │
    │   - Logout → Landing Page (5173)    │
    │   - Location → Map Public (3000)    │
    │   - Emergency → Location Popup(?)   │
    └─────────────────────────────────────┘

    ┌─────────────────────────────────────┐
    │   Incident Admin (3004)             │
    │   (Independent Admin Panel)         │
    └─────────────────────────────────────┘

    ┌─────────────────────────────────────┐
    │   Location Popup (3000)             │
    │   ⚠️ PORT CONFLICT with Map Public  │
    │   - Emergency → MissionAdmin(3005)  │
    └─────────────────────────────────────┘
```

---

## 🔍 Detailed Navigation Connections

### **Landing Page** → Other Pages

| From | Button/Link | Target | Port | Status |
|------|-------------|--------|------|--------|
| Landing Page | "Get Alerts" button | Map Public | 3000 | ✅ Connected |
| Landing Page | "Admin Login" button | Mission Admin | 3003 | ✅ Connected |

**Code Reference:**
```typescript
// Landing Page/src/App.tsx lines 133, 141
<Button onClick={() => window.location.href = 'http://localhost:3000'}>
  Get Alerts
</Button>
<Button onClick={() => window.location.href = 'http://localhost:3003'}>
  Admin Login
</Button>
```

---

### **Map Public** → Other Pages

| From | Button/Link | Target | Port | Status |
|------|-------------|--------|------|--------|
| Map Public | "Report an Incident" button | Report Incidents | 3002 | ✅ Connected |

**Code Reference:**
```typescript
// mapPublic/src/App.tsx line 254
const handleReportIncident = () => {
  window.location.href = 'http://localhost:3002';
};
```

**Features:**
- ✅ Live location tracking
- ✅ Risk zones (red/orange/green)
- ✅ Interactive map
- ✅ Location badge
- ✅ Zone legend

---

### **Mission Admin** → Other Pages

| From | Button/Link | Target | Port | Status |
|------|-------------|--------|------|--------|
| Mission Admin | Logout button | Landing Page | 5173 | ✅ Connected |
| Mission Admin | Unknown action | Map Public | 3005 | ❌ Wrong Port! |

**Code Reference:**
```typescript
// MissionAdmin/src/App.tsx lines 63, 66
window.location.href = 'http://localhost:3005'; // ❌ WRONG PORT
window.location.href = 'http://localhost:5173'; // ✅ Correct
```

**⚠️ Issue Found:**
- Line 63 references port 3005 (doesn't exist)
- Should be 3000 for Map Public

---

### **Location Popup** → Other Pages

| From | Button/Link | Target | Port | Status |
|------|-------------|--------|------|--------|
| Location Popup | Emergency button | Mission Admin | 3005 | ❌ Wrong Port! |

**Code Reference:**
```typescript
// LocationPopup/src/App.tsx line 25
window.location.href = 'http://localhost:3005'; // ❌ WRONG PORT
```

**⚠️ Issues Found:**
1. Port 3005 doesn't exist (should be 3003 for Mission Admin)
2. Location Popup uses port 3000 (conflicts with Map Public)

---

## ⚠️ Issues Found

### 🔴 Critical Issues

1. **Port Conflict**
   - **Location Popup** and **Map Public** both use port 3000
   - **Fix**: Change Location Popup to a different port (e.g., 3001)

2. **Wrong Port References**
   - Mission Admin references port 3005 (doesn't exist)
   - Location Popup references port 3005 (doesn't exist)
   - **Fix**: Update to correct port 3003 (Mission Admin)

3. **Incident Admin Not Connected**
   - No navigation links to Incident Admin from any page
   - **Status**: Standalone page (may be intentional)

---

## ✅ Fixes Needed Before Deployment

### Fix #1: Update Location Popup Port
```typescript
// File: frontend/LocationPopup/vite.config.ts
server: {
  port: 3001, // Changed from 3000 to avoid conflict
  open: true,
}
```

### Fix #2: Update Mission Admin Navigation
```typescript
// File: frontend/MissionAdmin/src/App.tsx line 63
// Change from:
window.location.href = 'http://localhost:3005';
// To:
window.location.href = 'http://localhost:3000'; // Map Public
```

### Fix #3: Update Location Popup Navigation
```typescript
// File: frontend/LocationPopup/src/App.tsx line 25
// Change from:
window.location.href = 'http://localhost:3005';
// To:
window.location.href = 'http://localhost:3003'; // Mission Admin
```

---

## 📊 Port Summary

| Port | Application | Status | Purpose |
|------|-------------|--------|---------|
| 5173 | Landing Page | ✅ Active | Homepage/Entry point |
| 3000 | Map Public | ✅ Active | Public map with live location |
| 3001 | Location Popup | ⚠️ Change needed | Location permission UI |
| 3002 | Report Incidents | ✅ Active | Incident reporting form |
| 3003 | Mission Admin | ✅ Active | Mission management dashboard |
| 3004 | Incident Admin | ✅ Active | Incident management dashboard |
| 3005 | None | ❌ Referenced but doesn't exist | Remove references |

---

## 🧪 Testing Checklist

### Before Deployment, Test Each Flow:

#### ✅ User Flow
- [ ] Open Landing Page (http://localhost:5173)
- [ ] Click "Get Alerts" → Should go to Map Public (3000)
- [ ] Verify live location works
- [ ] Verify risk zones appear
- [ ] Click "Report an Incident" → Should go to Report Incidents (3002)
- [ ] Fill and submit incident report

#### ✅ Admin Flow
- [ ] Open Landing Page (http://localhost:5173)
- [ ] Click "Admin Login" → Should go to Mission Admin (3003)
- [ ] Test logout → Should return to Landing Page (5173)
- [ ] Test navigation to Map (after fix)

#### ✅ Standalone Pages
- [ ] Open Incident Admin directly (http://localhost:3004)
- [ ] Verify all features work
- [ ] Open Location Popup directly (http://localhost:3001 after fix)

---

## 🚀 Deployment Considerations

### For Production, Replace localhost URLs:

1. **Create Environment Variables**
```typescript
// .env file
VITE_LANDING_PAGE_URL=https://yourdomain.com
VITE_MAP_URL=https://map.yourdomain.com
VITE_REPORT_URL=https://report.yourdomain.com
VITE_MISSION_ADMIN_URL=https://mission.yourdomain.com
VITE_INCIDENT_ADMIN_URL=https://incident.yourdomain.com
```

2. **Update Navigation Code**
```typescript
// Instead of:
window.location.href = 'http://localhost:3000';

// Use:
window.location.href = import.meta.env.VITE_MAP_URL;
```

3. **Backend API Endpoints**
   - Ensure all pages point to production API
   - Update CORS settings on backend
   - Test API connections

---

## 📝 Summary

### ✅ What's Working
- Landing Page → Map Public ✅
- Landing Page → Mission Admin ✅
- Map Public → Report Incidents ✅
- All pages have correct port configurations (except conflicts)
- Live location feature working ✅
- Risk zones feature working ✅

### ⚠️ What Needs Fixing
1. Port conflict: Location Popup (3000) conflicts with Map Public
2. Mission Admin wrong port reference (3005 → 3000)
3. Location Popup wrong port reference (3005 → 3003)
4. Incident Admin has no navigation connections (may be intentional)

### 🎯 Next Steps
1. Apply the 3 fixes listed above
2. Run all pages simultaneously to test
3. Follow testing checklist
4. Prepare environment variables for production
5. Update all localhost references for deployment

---

## 🔧 Quick Fix Commands

Run these fixes:

```bash
# Fix 1: Update Location Popup port in vite.config.ts
# Manual edit required

# Fix 2 & 3: Update navigation URLs
# Manual edit required in:
# - frontend/MissionAdmin/src/App.tsx
# - frontend/LocationPopup/src/App.tsx
```

---

**Last Updated**: October 25, 2025
**Status**: Ready for fixes before deployment ⚠️
