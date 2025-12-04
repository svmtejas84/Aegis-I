import svgPaths from "./imports/svg-fxavcettkm";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { AlertTriangle, MapPin, Users, Clock, Radio, Send, Bell, Info, ShieldAlert, AlertCircle, Navigation as NavigationIcon } from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Checkbox } from "./components/ui/checkbox";

// Add types for incidents
interface Incident {
  _id: string;
  type: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  photo?: {
    data: string;
    contentType: string;
    filename: string;
  };
  additionalNotes?: string;
  status: 'Pending' | 'Acknowledged' | 'Resolved';
  createdAt: string;
  updatedAt: string;
}

interface LocationInfo {
  coordinates: [number, number]; // [longitude, latitude]
  address: string;
  city: string;
  state: string;
  country: string;
}

function Navigation({ onPrioritizeClick, onBroadcastClick }: { onPrioritizeClick: () => void; onBroadcastClick: () => void }) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  
  const menuItems = [
    { id: 'prioritize', label: 'Prioritize' },
    { id: 'broadcast', label: 'Broadcast Alert' },
    { id: 'incidents', label: 'Incidents' },
    { id: 'logout', label: 'Log Out' }
  ];

  const handleMenuClick = (itemId: string) => {
    setActiveItem(itemId);
    if (itemId === 'prioritize') {
      onPrioritizeClick();
    } else if (itemId === 'broadcast') {
      onBroadcastClick();
    } else if (itemId === 'incidents') {
      window.location.href = 'http://localhost:3004';
    } else if (itemId === 'logout') {
      // Redirect to Landing Page
      window.location.href = 'http://localhost:5173';
    }
  };

  return (
    <div className="bg-[#0f0f0f] h-screen relative w-[280px] border-r border-[#2a2a2a]" data-name="Navigation">
      <div className="flex flex-col h-full p-8">
        {/* Logo/Brand Area */}
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="tracking-wider text-white">AEGIS</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                activeItem === item.id
                  ? 'bg-[#2a2a2a] text-white'
                  : 'text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer Info */}
        <div className="pt-6 border-t border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center">
              <span className="text-[#a0a0a0] text-xs">OP</span>
            </div>
            <div className="flex-1">
              <div className="text-sm text-white">Operator</div>
              <div className="text-xs text-[#666]">Online</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapSection({ adminLocation, incidents }: { adminLocation: LocationInfo | null; incidents: Incident[] }) {
  // Define threat zones - these would typically come from your backend based on real data
  // Using explicit coordinate arrays for Leaflet Polygon
  const baseCenter = adminLocation ? [adminLocation.coordinates[1], adminLocation.coordinates[0]] : [40.7489, -73.9680];
  
  const threatZones = {
    // Critical/Red Zones - High threat areas
    redZones: [
      {
        id: 'red-1',
        name: 'Downtown Critical Zone',
        positions: [
          [baseCenter[0] + 0.015, baseCenter[1] - 0.02],
          [baseCenter[0] + 0.025, baseCenter[1] - 0.01],
          [baseCenter[0] + 0.023, baseCenter[1] + 0.005],
          [baseCenter[0] + 0.018, baseCenter[1] + 0.008],
          [baseCenter[0] + 0.012, baseCenter[1] - 0.005],
        ] as [number, number][],
        severity: 'Critical',
        description: 'Severe structural damage, evacuation required'
      },
      {
        id: 'red-2',
        name: 'Eastern Emergency Zone',
        positions: [
          [baseCenter[0] - 0.008, baseCenter[1] + 0.015],
          [baseCenter[0] - 0.005, baseCenter[1] + 0.025],
          [baseCenter[0] + 0.002, baseCenter[1] + 0.028],
          [baseCenter[0] + 0.005, baseCenter[1] + 0.018],
          [baseCenter[0] - 0.003, baseCenter[1] + 0.012],
        ] as [number, number][],
        severity: 'Critical',
        description: 'Major flooding, power outages'
      }
    ],
    // Warning/Orange Zones - Moderate threat
    orangeZones: [
      {
        id: 'orange-1',
        name: 'Northern Warning Zone',
        positions: [
          [baseCenter[0] + 0.028, baseCenter[1] - 0.025],
          [baseCenter[0] + 0.038, baseCenter[1] - 0.015],
          [baseCenter[0] + 0.042, baseCenter[1] + 0.002],
          [baseCenter[0] + 0.035, baseCenter[1] + 0.012],
          [baseCenter[0] + 0.025, baseCenter[1] + 0.005],
        ] as [number, number][],
        severity: 'High',
        description: 'Elevated risk, monitor situation'
      },
      {
        id: 'orange-2',
        name: 'Southwest Caution Area',
        positions: [
          [baseCenter[0] - 0.015, baseCenter[1] - 0.028],
          [baseCenter[0] - 0.010, baseCenter[1] - 0.018],
          [baseCenter[0] - 0.005, baseCenter[1] - 0.020],
          [baseCenter[0] - 0.008, baseCenter[1] - 0.032],
          [baseCenter[0] - 0.018, baseCenter[1] - 0.035],
        ] as [number, number][],
        severity: 'High',
        description: 'Potential hazards, stay alert'
      },
      {
        id: 'orange-3',
        name: 'Riverside Warning',
        positions: [
          [baseCenter[0] - 0.020, baseCenter[1] + 0.008],
          [baseCenter[0] - 0.012, baseCenter[1] + 0.018],
          [baseCenter[0] - 0.008, baseCenter[1] + 0.015],
          [baseCenter[0] - 0.015, baseCenter[1] + 0.005],
          [baseCenter[0] - 0.022, baseCenter[1] + 0.003],
        ] as [number, number][],
        severity: 'High',
        description: 'Weather advisory in effect'
      }
    ],
    // Safe/Green Zones - Low threat, safe areas
    greenZones: [
      {
        id: 'green-1',
        name: 'Safe Harbor District',
        positions: [
          [baseCenter[0] + 0.005, baseCenter[1] - 0.035],
          [baseCenter[0] + 0.012, baseCenter[1] - 0.028],
          [baseCenter[0] + 0.008, baseCenter[1] - 0.015],
          [baseCenter[0] + 0.002, baseCenter[1] - 0.018],
          [baseCenter[0] - 0.002, baseCenter[1] - 0.030],
        ] as [number, number][],
        severity: 'Safe',
        description: 'Designated safe zone, emergency services available'
      },
      {
        id: 'green-2',
        name: 'Central Safe Area',
        positions: [
          [baseCenter[0] - 0.005, baseCenter[1] - 0.008],
          [baseCenter[0] + 0.003, baseCenter[1] - 0.005],
          [baseCenter[0] + 0.005, baseCenter[1] + 0.005],
          [baseCenter[0] + 0.002, baseCenter[1] + 0.010],
          [baseCenter[0] - 0.005, baseCenter[1] + 0.008],
          [baseCenter[0] - 0.008, baseCenter[1] - 0.002],
        ] as [number, number][],
        severity: 'Safe',
        description: 'Shelter and medical facilities operational'
      },
      {
        id: 'green-3',
        name: 'Park Safe Haven',
        positions: [
          [baseCenter[0] + 0.008, baseCenter[1] + 0.020],
          [baseCenter[0] + 0.015, baseCenter[1] + 0.028],
          [baseCenter[0] + 0.020, baseCenter[1] + 0.025],
          [baseCenter[0] + 0.018, baseCenter[1] + 0.015],
          [baseCenter[0] + 0.012, baseCenter[1] + 0.012],
        ] as [number, number][],
        severity: 'Safe',
        description: 'Open evacuation area with resources'
      }
    ]
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-[#2a2a2a]">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#2a2a2a] flex items-center justify-between">
        <h2 className="text-[rgb(255,116,116)] tracking-wide">Mission Control Screen</h2>
        {adminLocation && (
          <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
            <NavigationIcon className="w-4 h-4 text-[#10b981]" />
            <span>{adminLocation.city}, {adminLocation.state}</span>
          </div>
        )}
      </div>

      {/* Interactive Map Container */}
      <div style={{ height: '420px', width: '100%', position: 'relative' }}>
        <MapContainer
          center={adminLocation ? [adminLocation.coordinates[1], adminLocation.coordinates[0]] : [40.7489, -73.9680]}
          zoom={14}
          style={{ height: '420px', width: '100%', backgroundColor: '#0a0a0a' }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          {/* Dark Satellite Imagery - Google Satellite View */}
          <TileLayer
            attribution='&copy; Google'
            url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            maxZoom={20}
          />
          
          {/* Dark Labels Overlay for Context */}
          <TileLayer
            attribution='&copy; Google'
            url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"
            maxZoom={20}
            opacity={0.4}
          />

          {/* Red Zones - Critical Threat Areas */}
          {threatZones.redZones.map((zone) => (
            <Polygon
              key={zone.id}
              positions={zone.positions}
              pathOptions={{
                color: '#ef4444',
                fillColor: '#ef4444',
                fillOpacity: 0.25,
                weight: 2,
                opacity: 0.8
              }}
            >
              <Popup>
                <div className="p-3">
                  <div className="font-semibold mb-1 text-red-600">{zone.name}</div>
                  <div className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded inline-block mb-2">
                    {zone.severity} Zone
                  </div>
                  <div className="text-sm text-gray-600">{zone.description}</div>
                </div>
              </Popup>
            </Polygon>
          ))}

          {/* Orange Zones - Warning/Moderate Threat Areas */}
          {threatZones.orangeZones.map((zone) => (
            <Polygon
              key={zone.id}
              positions={zone.positions}
              pathOptions={{
                color: '#f59e0b',
                fillColor: '#f59e0b',
                fillOpacity: 0.2,
                weight: 2,
                opacity: 0.7
              }}
            >
              <Popup>
                <div className="p-3">
                  <div className="font-semibold mb-1 text-orange-600">{zone.name}</div>
                  <div className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded inline-block mb-2">
                    {zone.severity} Zone
                  </div>
                  <div className="text-sm text-gray-600">{zone.description}</div>
                </div>
              </Popup>
            </Polygon>
          ))}

          {/* Green Zones - Safe Areas */}
          {threatZones.greenZones.map((zone) => (
            <Polygon
              key={zone.id}
              positions={zone.positions}
              pathOptions={{
                color: '#10b981',
                fillColor: '#10b981',
                fillOpacity: 0.15,
                weight: 2,
                opacity: 0.6
              }}
            >
              <Popup>
                <div className="p-3">
                  <div className="font-semibold mb-1 text-green-600">{zone.name}</div>
                  <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded inline-block mb-2">
                    {zone.severity} Zone
                  </div>
                  <div className="text-sm text-gray-600">{zone.description}</div>
                </div>
              </Popup>
            </Polygon>
          ))}
          
          {/* Admin Location Marker */}
          {adminLocation && (
            <Marker
              position={[adminLocation.coordinates[1], adminLocation.coordinates[0]]}
              icon={L.divIcon({
                className: 'custom-leaflet-marker',
                html: `
                  <div class="marker-pulse-container">
                    <div class="marker-pulse-ring" style="background-color: rgba(16, 185, 129, 0.5);"></div>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 12px; height: 12px; border-radius: 50%; background-color: #10b981; border: 2px solid white; box-shadow: 0 0 10px rgba(16, 185, 129, 0.8);"></div>
                  </div>
                `
              })}
            >
              <Popup className="custom-popup">
                <div className="p-3">
                  <div className="font-semibold mb-1 text-[#10b981]">Your Location</div>
                  <div className="text-sm text-gray-600">{adminLocation.address}</div>
                  <div className="text-xs text-gray-500 mt-1">{adminLocation.city}, {adminLocation.state}</div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Incident Markers */}
          {incidents.map((incident) => (
            <Marker
              key={incident._id}
              position={[incident.location.coordinates[1], incident.location.coordinates[0]]}
              icon={L.divIcon({
                className: 'custom-leaflet-marker',
                html: `
                  <div class="marker-pulse-container">
                    <div class="marker-pulse-ring"></div>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 14px; height: 14px; border-radius: 50%; background-color: #ef4444; border: 2px solid white; box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);"></div>
                  </div>
                `
              })}
            >
              <Popup className="custom-popup">
                <div className="p-3">
                  <div className="font-semibold mb-1 text-[#ef4444] capitalize">{incident.type} Emergency</div>
                  <div className="text-sm text-gray-600 mb-2">{incident.additionalNotes || 'No additional details'}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {new Date(incident.createdAt).toLocaleString()}
                  </div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      incident.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      incident.status === 'Acknowledged' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {incident.status}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Darkening overlay for night-time aesthetic */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.45) 100%)'
          }}
        />

        {/* Zone Legend */}
        <div className="absolute bottom-6 left-6 bg-[#1a1a1a]/95 backdrop-blur-sm border border-[#2a2a2a] rounded-lg p-4 shadow-2xl z-[1000]">
          <div className="text-white font-semibold mb-3 text-sm">Threat Zones</div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded border-2 border-[#ef4444]" style={{ backgroundColor: 'rgba(239, 68, 68, 0.25)' }}></div>
              <div>
                <div className="text-xs text-white">Critical Zone</div>
                <div className="text-[10px] text-[#666]">Evacuation Required</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded border-2 border-[#f59e0b]" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}></div>
              <div>
                <div className="text-xs text-white">Warning Zone</div>
                <div className="text-[10px] text-[#666]">Elevated Risk</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded border-2 border-[#10b981]" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}></div>
              <div>
                <div className="text-xs text-white">Safe Zone</div>
                <div className="text-[10px] text-[#666]">Shelter Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaflet Custom Styles + Animations */}
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0;
            }
          }

          .marker-pulse-container {
            position: relative;
            width: 40px;
            height: 40px;
          }

          .marker-pulse-ring {
            position: absolute;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(239, 68, 68, 0.5);
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          .custom-leaflet-marker {
            background: transparent !important;
            border: none !important;
          }

          .leaflet-container {
            background: #0a0a0a;
            font-family: inherit;
          }

          .leaflet-tile-pane {
            filter: brightness(0.65) contrast(1.15) saturate(1.05);
          }

          .leaflet-popup-content-wrapper {
            padding: 1px;
            text-align: left;
            border-radius: 12px;
            background: white;
            box-shadow: 0 3px 14px rgba(0,0,0,0.4);
          }

          .leaflet-popup-content {
            margin: 0;
            line-height: 1.4;
            min-width: 200px;
          }

          .leaflet-popup-tip {
            background: white;
          }

          .leaflet-popup-close-button {
            color: #666;
            transition: color 0.2s ease;
          }

          .leaflet-popup-close-button:hover {
            color: #000;
          }
        `}</style>
      </div>
    </div>
  );
}

function TriageFeed({ incidents, adminLocation }: { incidents: Incident[]; adminLocation: LocationInfo | null }) {
  // Define red zones (same as in MapSection for consistency)
  const baseCenter = adminLocation ? [adminLocation.coordinates[1], adminLocation.coordinates[0]] : [40.7489, -73.9680];
  
  const redZones = [
    {
      id: 'red-1',
      name: 'Downtown Critical Zone',
      positions: [
        [baseCenter[0] + 0.015, baseCenter[1] - 0.02],
        [baseCenter[0] + 0.025, baseCenter[1] - 0.01],
        [baseCenter[0] + 0.023, baseCenter[1] + 0.005],
        [baseCenter[0] + 0.018, baseCenter[1] + 0.008],
        [baseCenter[0] + 0.012, baseCenter[1] - 0.005],
      ] as [number, number][]
    },
    {
      id: 'red-2',
      name: 'Eastern Emergency Zone',
      positions: [
        [baseCenter[0] - 0.008, baseCenter[1] + 0.015],
        [baseCenter[0] - 0.005, baseCenter[1] + 0.025],
        [baseCenter[0] + 0.002, baseCenter[1] + 0.028],
        [baseCenter[0] + 0.005, baseCenter[1] + 0.018],
        [baseCenter[0] - 0.003, baseCenter[1] + 0.012],
      ] as [number, number][]
    }
  ];

  // Check if a point is inside a polygon using ray-casting algorithm
  const isPointInPolygon = (point: [number, number], polygon: [number, number][]): boolean => {
    const [x, y] = point;
    let inside = false;
    
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];
      
      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    
    return inside;
  };

  // Check if incident is in any red zone
  const isInRedZone = (incident: Incident): { inZone: boolean; zoneName: string } => {
    const incidentPoint: [number, number] = [
      incident.location.coordinates[1], // latitude
      incident.location.coordinates[0]  // longitude
    ];
    
    for (const zone of redZones) {
      if (isPointInPolygon(incidentPoint, zone.positions)) {
        return { inZone: true, zoneName: zone.name };
      }
    }
    
    return { inZone: false, zoneName: '' };
  };

  // Calculate distance between two coordinates in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Sort incidents: red zone incidents first, then by distance
  const sortedIncidents = incidents.map(incident => {
    const distance = adminLocation
      ? calculateDistance(
          adminLocation.coordinates[1],
          adminLocation.coordinates[0],
          incident.location.coordinates[1],
          incident.location.coordinates[0]
        )
      : 0;
    
    const zoneInfo = isInRedZone(incident);
    
    return { 
      ...incident, 
      distance,
      inRedZone: zoneInfo.inZone,
      redZoneName: zoneInfo.zoneName
    };
  }).sort((a, b) => {
    // First sort by red zone (red zone incidents first)
    if (a.inRedZone && !b.inRedZone) return -1;
    if (!a.inRedZone && b.inRedZone) return 1;
    
    // Then sort by distance
    return a.distance - b.distance;
  });

  // Count incidents in red zones
  const redZoneIncidents = sortedIncidents.filter(i => i.inRedZone).length;

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const getIncidentIcon = (type: string) => {
    const iconMap: Record<string, any> = {
      cyclone: svgPaths.p2cf60600,
      flood: svgPaths.p25397b80,
      earthquake: svgPaths.p270c5f00,
      tsunami: svgPaths.p2e0cc000,
      landslide: svgPaths.p382997c0,
      heatwave: svgPaths.p2ad65a80,
    };
    return iconMap[type.toLowerCase()] || svgPaths.p270c5f00;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Pending') {
      return (
        <span className="px-3 py-1 rounded-md text-xs tracking-wide bg-[#ef4444]/20 text-[#f87171] border border-[#ef4444]/30">
          Pending
        </span>
      );
    }
    if (status === 'Acknowledged') {
      return (
        <span className="px-3 py-1 rounded-md text-xs bg-[#f59e0b]/20 text-[#fbbf24] border border-[#f59e0b]/30 tracking-wide">
          Acknowledged
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-md text-xs bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/30 tracking-wide">
        Resolved
      </span>
    );
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-[#2a2a2a]">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#2a2a2a]">
        <h2 className="text-white tracking-wide">Live Triage Feed</h2>
      </div>

      {/* Incidents List */}
      <div className="divide-y divide-[#2a2a2a]">
        {sortedIncidents.map((incident) => (
          <div 
            key={incident._id}
            className={`px-6 py-4 transition-colors duration-150 cursor-pointer group ${
              incident.inRedZone 
                ? 'bg-[#ef4444]/5 hover:bg-[#ef4444]/10 border-l-4 border-[#ef4444]' 
                : 'hover:bg-[#1f1f1f]'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className={`p-2 rounded-lg ${
                incident.inRedZone
                  ? 'bg-[#ef4444]/20 text-[#ef4444] ring-2 ring-[#ef4444]/50'
                  : incident.status === 'Pending'
                  ? 'bg-[#ef4444]/10 text-[#f87171]'
                  : incident.status === 'Acknowledged'
                  ? 'bg-[#f59e0b]/10 text-[#fbbf24]'
                  : 'bg-[#10b981]/10 text-[#34d399]'
              }`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                  <path d={getIncidentIcon(incident.type)} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>

              {/* Location & Distance */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[#e0e0e0] group-hover:text-white transition-colors capitalize">
                    {incident.type} Emergency
                  </p>
                  {incident.inRedZone && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30 font-semibold tracking-wider">
                      CRITICAL ZONE
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#666]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{incident.distance < 1 ? `${Math.round(incident.distance * 1000)}m away` : `${incident.distance.toFixed(1)}km away`}</span>
                  </div>
                  {incident.inRedZone && (
                    <div className="flex items-center gap-1 text-[#ef4444]">
                      <AlertTriangle className="w-3 h-3" />
                      <span className="text-xs">{incident.redZoneName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Time */}
              <div className="text-sm text-[#666]">
                {getTimeAgo(incident.createdAt)}
              </div>

              {/* Status Badge */}
              <div>
                {getStatusBadge(incident.status)}
              </div>
            </div>
            
            {/* Additional Notes */}
            {incident.additionalNotes && (
              <div className={`mt-3 pl-11 text-sm ${
                incident.inRedZone ? 'text-[#e0e0e0]' : 'text-[#a0a0a0]'
              }`}>
                {incident.additionalNotes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BroadcastDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [alertType, setAlertType] = useState('emergency');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const alertTypes = [
    {
      id: 'emergency',
      label: 'Emergency',
      icon: ShieldAlert,
      color: 'text-[#ef4444]',
      bgColor: 'bg-[#ef4444]/10',
      borderColor: 'border-[#ef4444]/30',
      description: 'Critical situation requiring immediate action',
      buttonText: 'Send Emergency Alert',
      buttonIcon: Send,
      buttonStyle: 'bg-[#ef4444] hover:bg-[#dc2626]'
    },
    {
      id: 'warning',
      label: 'Warning',
      icon: AlertTriangle,
      color: 'text-[#f59e0b]',
      bgColor: 'bg-[#f59e0b]/10',
      borderColor: 'border-[#f59e0b]/30',
      description: 'Important alert requiring attention',
      buttonText: 'Send Warning Alert',
      buttonIcon: Send,
      buttonStyle: 'bg-[#f59e0b] hover:bg-[#d97706]'
    },
    {
      id: 'info',
      label: 'Information',
      icon: Info,
      color: 'text-[#3b82f6]',
      bgColor: 'bg-[#3b82f6]/10',
      borderColor: 'border-[#3b82f6]/30',
      description: 'General information or updates',
      buttonText: 'Send Info Alert',
      buttonIcon: Send,
      buttonStyle: 'bg-[#3b82f6] hover:bg-[#2563eb]'
    },
    {
      id: 'advisory',
      label: 'Advisory',
      icon: Bell,
      color: 'text-[#8b5cf6]',
      bgColor: 'bg-[#8b5cf6]/10',
      borderColor: 'border-[#8b5cf6]/30',
      description: 'Guidance and recommendations',
      buttonText: 'Send Advisory Alert',
      buttonIcon: Send,
      buttonStyle: 'bg-[#8b5cf6] hover:bg-[#7c3aed]'
    }
  ];

  const handleSendBroadcast = async () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/alerts/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          type: alertType,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Broadcast alert sent successfully:', data);
        
        // Show success message
        setTimeout(() => {
          setIsSending(false);
          setMessage('');
          setAlertType('emergency');
          onOpenChange(false);
        }, 1000);
      } else {
        console.error('❌ Failed to send broadcast alert');
        setIsSending(false);
      }
    } catch (error) {
      console.error('❌ Error sending broadcast alert:', error);
      setIsSending(false);
    }
  };

  const selectedType = alertTypes.find(t => t.id === alertType)!;
  const ButtonIcon = selectedType.buttonIcon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-[#1a1a1a] border-[#2a2a2a] text-white max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div className="p-2 bg-[#6366f1]/10 rounded-lg">
              <Radio className="w-6 h-6 text-[#6366f1]" />
            </div>
            Broadcast Alert
          </DialogTitle>
          <DialogDescription className="text-[#a0a0a0]">
            Send emergency alerts and messages across all platforms
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-6 pr-2">
          {/* Alert Type Selection */}
          <div>
            <Label className="text-[#e0e0e0] mb-3 block">Alert Type</Label>
            <RadioGroup value={alertType} onValueChange={setAlertType}>
              <div className="grid grid-cols-2 gap-3">
                {alertTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <label
                      key={type.id}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        alertType === type.id
                          ? `${type.borderColor} ${type.bgColor}`
                          : 'border-[#2a2a2a] bg-[#0f0f0f] hover:border-[#3a3a3a]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={type.id} id={type.id} className="border-[#3a3a3a]" />
                        <Icon className={`w-5 h-5 ${type.color}`} />
                        <div className="flex-1">
                          <div className={`mb-1 ${alertType === type.id ? type.color : 'text-white'}`}>
                            {type.label}
                          </div>
                          <div className="text-xs text-[#666]">{type.description}</div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Message Input */}
          <div>
            <Label htmlFor="message" className="text-[#e0e0e0] mb-3 block">
              Alert Message
            </Label>
            <Textarea
              id="message"
              placeholder="Enter your broadcast message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-[#666] focus:border-[#6366f1] resize-none"
            />
            <div className="mt-2 text-xs text-[#666]">
              <span>This message will be displayed on maps, alerts, and notification pages</span>
            </div>
          </div>

          {/* Preview */}
          {message && (
            <div>
              <Label className="text-[#e0e0e0] mb-3 block">Preview</Label>
              <div className={`rounded-lg border-2 ${selectedType.borderColor} ${selectedType.bgColor} p-4`}>
                <div className="flex items-start gap-3">
                  <selectedType.icon className={`w-5 h-5 ${selectedType.color} mt-0.5`} />
                  <div className="flex-1">
                    <div className={`mb-1 font-semibold ${selectedType.color}`}>
                      {selectedType.label}
                    </div>
                    <div className="text-[#e0e0e0]">{message}</div>
                    <div className="mt-2 text-xs text-[#666]">
                      Broadcasting to 7,800 people
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
          <div className="text-sm text-[#a0a0a0]">
            Broadcasting to all zones • 7,800 people
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="px-6 py-2.5 rounded-lg border border-[#3a3a3a] text-[#a0a0a0] hover:bg-[#1f1f1f] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendBroadcast}
              disabled={!message.trim() || isSending}
              style={{
                backgroundColor: !message.trim() || isSending
                  ? '#2a2a2a'
                  : alertType === 'emergency'
                  ? '#ef4444'
                  : alertType === 'warning'
                  ? '#f59e0b'
                  : alertType === 'info'
                  ? '#3b82f6'
                  : '#8b5cf6'
              }}
              className={`px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg ${
                !message.trim() || isSending
                  ? 'text-[#666] cursor-not-allowed'
                  : 'text-white'
              }`}
              onMouseEnter={(e) => {
                if (!message.trim() || isSending) return;
                const hoverColor = alertType === 'emergency'
                  ? '#dc2626'
                  : alertType === 'warning'
                  ? '#d97706'
                  : alertType === 'info'
                  ? '#2563eb'
                  : '#7c3aed';
                e.currentTarget.style.backgroundColor = hoverColor;
              }}
              onMouseLeave={(e) => {
                if (!message.trim() || isSending) return;
                const normalColor = alertType === 'emergency'
                  ? '#ef4444'
                  : alertType === 'warning'
                  ? '#f59e0b'
                  : alertType === 'info'
                  ? '#3b82f6'
                  : '#8b5cf6';
                e.currentTarget.style.backgroundColor = normalColor;
              }}
            >
              {isSending ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Broadcasting...
                </>
              ) : (
                <>
                  <ButtonIcon className="w-4 h-4" />
                  {selectedType.buttonText}
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RedZoneDialog({ open, onOpenChange, incidents, adminLocation }: { open: boolean; onOpenChange: (open: boolean) => void; incidents: Incident[]; adminLocation: LocationInfo | null }) {
  const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());
  const [rescueSent, setRescueSent] = useState(false);

  // Calculate distance between two coordinates in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Convert incidents to zones with distance and severity classification
  const allZones = incidents.map(incident => {
    const distance = adminLocation
      ? calculateDistance(
          adminLocation.coordinates[1],
          adminLocation.coordinates[0],
          incident.location.coordinates[1],
          incident.location.coordinates[0]
        )
      : 0;

    // Classify by severity: Red (Critical), Orange (High), Green (Moderate)
    let severity: 'Red' | 'Orange' | 'Green';
    if (incident.status === 'Pending') {
      // All pending incidents are RED (critical)
      severity = 'Red';
    } else if (incident.status === 'Acknowledged') {
      // Acknowledged incidents are ORANGE (high priority)
      severity = 'Orange';
    } else {
      // Resolved incidents are GREEN (moderate/low)
      severity = 'Green';
    }

    const getTimeAgo = (date: string) => {
      const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
      if (seconds < 60) return `${seconds}s ago`;
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      return `${hours}h ago`;
    };

    return {
      id: incident._id,
      name: `${incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} Emergency Zone`,
      severity,
      affected: Math.floor(distance * 150 + Math.random() * 500), // Estimate affected people
      address: incident.additionalNotes || `${distance.toFixed(1)}km from your location`,
      location: `Lat: ${incident.location.coordinates[1].toFixed(4)}, Lon: ${incident.location.coordinates[0].toFixed(4)}`,
      time: getTimeAgo(incident.createdAt),
      type: `${incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} Emergency`,
      units: incident.status === 'Acknowledged' ? Math.floor(Math.random() * 3) + 1 : 0,
      distance
    };
  });

  // Filter only RED zones for the critical list (sorted by distance)
  const redZones = allZones.filter(zone => zone.severity === 'Red').sort((a, b) => a.distance - b.distance);

  // Debug logging
  console.log('Total incidents:', incidents.length);
  console.log('All zones:', allZones.length);
  console.log('Red zones:', redZones.length);
  console.log('Incidents data:', incidents);
  console.log('Red zones data:', redZones);

  const toggleZone = (id: string) => {
    const newSelected = new Set(selectedZones);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedZones(newSelected);
  };

  const handleSendRescue = () => {
    setRescueSent(true);
    setTimeout(() => {
      setRescueSent(false);
      setSelectedZones(new Set());
    }, 3000);
  };

  const totalAffected = allZones.reduce((sum, zone) => sum + zone.affected, 0);
  const totalZones = allZones.length;
  const criticalZones = redZones.length; // Only count RED zones as critical

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-[#1a1a1a] border-[#2a2a2a] text-white max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div className="p-2 bg-[#ef4444]/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-[#ef4444]" />
            </div>
            Priority Red Zones - Critical Emergency Areas
          </DialogTitle>
          <DialogDescription className="text-[#a0a0a0]">
            High-priority RED zones requiring immediate rescue deployment - Sorted by distance
          </DialogDescription>
        </DialogHeader>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="bg-[#0f0f0f] rounded-lg p-4 border border-[#2a2a2a]">
            <div className="flex items-center gap-2 text-[#666] text-sm mb-1">
              <MapPin className="w-4 h-4" />
              Total Zones
            </div>
            <div className="text-2xl text-white">{totalZones}</div>
            <div className="text-xs text-[#666] mt-1">Red + Orange + Green</div>
          </div>
          <div className="bg-[#0f0f0f] rounded-lg p-4 border border-[#ef4444]/30">
            <div className="flex items-center gap-2 text-[#666] text-sm mb-1">
              <AlertTriangle className="w-4 h-4" />
              Critical (Red)
            </div>
            <div className="text-2xl text-[#ef4444]">{criticalZones}</div>
            <div className="text-xs text-[#ef4444]/70 mt-1">Needs immediate action</div>
          </div>
          <div className="bg-[#0f0f0f] rounded-lg p-4 border border-[#2a2a2a]">
            <div className="flex items-center gap-2 text-[#666] text-sm mb-1">
              <Users className="w-4 h-4" />
              Total Affected
            </div>
            <div className="text-2xl text-[#fbbf24]">{totalAffected.toLocaleString()}</div>
            <div className="text-xs text-[#666] mt-1">People in all zones</div>
          </div>
        </div>

        {/* Red Zones List - Only Critical RED zones */}
        <div className="flex-1 overflow-auto space-y-3 pr-2">
          {redZones.length === 0 ? (
            <div className="text-center py-12 text-[#666]">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No critical RED zones detected</p>
              <p className="text-sm mt-2">All zones are either Orange or Green priority</p>
            </div>
          ) : (
            redZones.map((zone) => (
              <div
                key={zone.id}
                onClick={() => toggleZone(zone.id)}
                className={`bg-[#0f0f0f] rounded-lg p-4 border cursor-pointer transition-all duration-200 ${
                  selectedZones.has(zone.id)
                    ? 'border-[#6366f1] bg-[#6366f1]/5'
                    : 'border-[#2a2a2a] hover:border-[#3a3a3a]'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedZones.has(zone.id)
                      ? 'bg-[#6366f1] border-[#6366f1]'
                      : 'border-[#3a3a3a]'
                  }`}>
                    {selectedZones.has(zone.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-white mb-1 font-semibold">{zone.name}</h3>
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-2 text-[#a0a0a0]">
                            <MapPin className="w-3.5 h-3.5 text-[#ef4444]" />
                            <span className="font-medium text-[#e0e0e0]">{zone.location}</span>
                          </div>
                          {zone.address && zone.address !== zone.location && (
                            <div className="pl-5 text-xs text-[#888]">
                              {zone.address}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30">
                          RED - CRITICAL
                        </span>
                        <div className="flex items-center gap-1 text-xs text-[#666]">
                          <Clock className="w-3 h-3" />
                          {zone.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm bg-[#1a1a1a] rounded p-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#666]">Type:</span>
                        <span className="text-[#e0e0e0] font-medium">{zone.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#666]">Distance:</span>
                        <span className="text-[#fbbf24] font-semibold">
                          {zone.distance < 1 ? `${Math.round(zone.distance * 1000)}m` : `${zone.distance.toFixed(1)}km`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#666]">Affected:</span>
                        <span className="text-[#e0e0e0]">{zone.affected.toLocaleString()} people</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#666]">Units:</span>
                        <span className={zone.units > 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}>
                          {zone.units} deployed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
          <div className="text-sm text-[#a0a0a0]">
            {selectedZones.size > 0 ? (
              <span>{selectedZones.size} zone{selectedZones.size > 1 ? 's' : ''} selected</span>
            ) : (
              <span>Select zones to deploy rescue teams</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="px-6 py-2.5 rounded-lg border border-[#3a3a3a] text-[#a0a0a0] hover:bg-[#1f1f1f] hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSendRescue}
              disabled={selectedZones.size === 0 || rescueSent}
              className={`px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                selectedZones.size === 0 || rescueSent
                  ? 'bg-[#2a2a2a] text-[#666] cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white hover:shadow-lg hover:shadow-[#ef4444]/20'
              }`}
            >
              {rescueSent ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Dispatching...
                </>
              ) : (
                <>
                  <Users className="w-4 h-4" />
                  Send Rescue Teams
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function App() {
  const [prioritizeDialogOpen, setPrioritizeDialogOpen] = useState(false);
  const [broadcastDialogOpen, setBroadcastDialogOpen] = useState(false);
  const [adminLocation, setAdminLocation] = useState<LocationInfo | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoadingIncidents, setIsLoadingIncidents] = useState(true);

  // Fetch admin location
  useEffect(() => {
    const getLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { longitude, latitude } = position.coords;
            
            try {
              // Reverse geocoding to get address
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=en`
              );
              const data = await response.json();
              
              setAdminLocation({
                coordinates: [longitude, latitude],
                address: data.display_name || 'Unknown location',
                city: data.address?.city || data.address?.town || data.address?.village || 'Unknown',
                state: data.address?.state || '',
                country: data.address?.country || 'Unknown'
              });
            } catch (error) {
              console.error('Geocoding error:', error);
              setAdminLocation({
                coordinates: [longitude, latitude],
                address: 'Location services available',
                city: 'Unknown',
                state: '',
                country: 'Unknown'
              });
            }
            setIsLoadingLocation(false);
          },
          (error) => {
            console.error('Geolocation error:', error);
            // Default to New York coordinates
            setAdminLocation({
              coordinates: [-73.9680, 40.7489],
              address: 'Default Location',
              city: 'New York',
              state: 'NY',
              country: 'USA'
            });
            setIsLoadingLocation(false);
          }
        );
      } else {
        // Default location
        setAdminLocation({
          coordinates: [-73.9680, 40.7489],
          address: 'Default Location',
          city: 'New York',
          state: 'NY',
          country: 'USA'
        });
        setIsLoadingLocation(false);
      }
    };

    getLocation();
  }, []);

  // Fetch incidents from backend
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        console.log('Fetching incidents from backend...');
        const response = await fetch('http://localhost:5000/api/incidents/admin', {
          headers: {
            // Add auth token if needed
            // 'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Incidents data received:', data);
          setIncidents(data.data || []);
          console.log('Number of incidents:', (data.data || []).length);
        } else {
          console.error('Failed to fetch incidents:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching incidents:', error);
      } finally {
        setIsLoadingIncidents(false);
      }
    };

    fetchIncidents();
    
    // Poll for new incidents every 10 seconds
    const interval = setInterval(fetchIncidents, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-[#0a0a0a] font-['Inter',_system-ui,_-apple-system,_sans-serif]">
      <Navigation 
        onPrioritizeClick={() => setPrioritizeDialogOpen(true)}
        onBroadcastClick={() => setBroadcastDialogOpen(true)}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8 space-y-6 max-w-[1400px]">
          {isLoadingLocation ? (
            <div className="bg-[#1a1a1a] rounded-xl p-12 text-center border border-[#2a2a2a]">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6366f1]"></div>
              <p className="text-[#a0a0a0] mt-4">Getting your location...</p>
            </div>
          ) : (
            <MapSection adminLocation={adminLocation} incidents={incidents} />
          )}
        </div>
      </div>

      <RedZoneDialog 
        open={prioritizeDialogOpen} 
        onOpenChange={setPrioritizeDialogOpen}
        incidents={incidents}
        adminLocation={adminLocation}
      />
      <BroadcastDialog open={broadcastDialogOpen} onOpenChange={setBroadcastDialogOpen} />
    </div>
  );
}
