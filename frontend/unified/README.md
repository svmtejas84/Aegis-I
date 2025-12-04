# AEGIS Unified Frontend

A single-page website consolidating all AEGIS emergency response features into one cohesive application with internal navigation.

## Features

- **Dashboard**: Real-time stats and quick actions
- **Live Map**: View all incidents, alerts, resources, and shelters in real-time
- **Report Incident**: Multi-step form to report emergencies with photos and location
- **Admin Panel**: Manage and update incident status

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

## File Structure

```
src/
  ├── App.tsx          # Main app with routing
  ├── main.tsx         # React entry point
  ├── index.css        # Global styles
  ├── pages/           # Route pages
  │   ├── Dashboard.tsx
  │   ├── LiveMap.tsx
  │   ├── ReportIncident.tsx
  │   └── Admin.tsx
  └── components/      # Shared components
      └── Navigation.tsx
```

## API Integration

The app expects the backend to be running at `http://localhost:5000` with the following endpoints:
- `GET /api/incidents/admin` - Fetch all incidents
- `PUT /api/incidents/:id` - Update incident status

## Navigation

The top navigation bar provides links to all sections:
- Dashboard (home)
- Live Map
- Report Incident
- Admin Panel

On mobile, the menu collapses into a hamburger menu.
