import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import L from 'leaflet';

interface MarkerData {
  id: string;
  type: 'alert' | 'report' | 'location';
  lat?: number;
  lng?: number;
  x?: number;
  y?: number;
  title: string;
  description: string;
  time: string;
  location: string;
}

interface ImmersiveMapProps {
  markers: MarkerData[];
  showControls?: boolean;
  center?: [number, number];
  zoom?: number;
  shouldRecenter?: boolean;
}

export function ImmersiveMap({ markers, showControls = true, center = [37.7749, -122.4194], zoom = 13, shouldRecenter = false }: ImmersiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const zonesRef = useRef<L.Polygon[]>([]);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    // If a map already exists (e.g., after HMR), remove it to apply new basemap cleanly
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    // Create map instance
    const map = L.map(mapRef.current, {
      center: center,
      zoom: zoom,
      zoomControl: false,
      attributionControl: false,
    });

    // Add dark satellite imagery tile layer (Google-style satellite view)
    // Using multiple providers for best coverage
    const satelliteLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      attribution: '&copy; Google'
    });

    // Add dark labels/roads overlay for context
    const labelsLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      opacity: 0.4,
      attribution: '&copy; Google'
    });
    
    satelliteLayer.addTo(map);
    labelsLayer.addTo(map);

    // Get the center coordinates to position zones relative to current location
    const [centerLat, centerLng] = center;
    
    // Create offset values for zone positioning (in degrees)
    const offset = 0.02; // Approximately 2km offset

    // Add colored zones (Red, Orange, Green) - positioned relative to map center
    // Red Zone - High Risk Area (Northwest of center)
    const redZone = L.polygon([
      [centerLat + offset * 0.5, centerLng - offset * 2],
      [centerLat + offset * 1.5, centerLng - offset],
      [centerLat + offset * 2.5, centerLng],
      [centerLat + offset * 1.5, centerLng + offset * 1.5],
      [centerLat + offset * 0.5, centerLng + offset],
      [centerLat, centerLng - offset]
    ], {
      color: '#ef4444',
      fillColor: '#ef4444',
      fillOpacity: 0.4,
      weight: 3,
      opacity: 0.8
    }).addTo(map);

    redZone.bindPopup(`
      <div style="padding: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #ef4444; font-weight: 600;">🔴 High Risk Zone</h3>
        <p style="margin: 0; font-size: 14px; color: #4b5563;">This area requires immediate attention. Avoid if possible.</p>
      </div>
    `);

    // Orange Zone - Medium Risk Area (Northeast of center)
    const orangeZone = L.polygon([
      [centerLat + offset * 0.5, centerLng + offset],
      [centerLat + offset * 1.5, centerLng + offset * 1.5],
      [centerLat + offset * 1.5, centerLng + offset * 3],
      [centerLat, centerLng + offset * 3.5],
      [centerLat - offset * 0.5, centerLng + offset * 2.5],
      [centerLat - offset * 0.5, centerLng + offset]
    ], {
      color: '#f97316',
      fillColor: '#f97316',
      fillOpacity: 0.4,
      weight: 3,
      opacity: 0.8
    }).addTo(map);

    orangeZone.bindPopup(`
      <div style="padding: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #f97316; font-weight: 600;">🟠 Moderate Risk Zone</h3>
        <p style="margin: 0; font-size: 14px; color: #4b5563;">Exercise caution in this area. Monitor updates.</p>
      </div>
    `);

    // Green Zone - Safe Area (South of center)
    const greenZone = L.polygon([
      [centerLat - offset * 0.5, centerLng + offset],
      [centerLat, centerLng],
      [centerLat - offset * 0.5, centerLng - offset],
      [centerLat - offset * 0.5, centerLng - offset * 2],
      [centerLat - offset * 1.5, centerLng - offset * 2],
      [centerLat - offset * 2, centerLng - offset],
      [centerLat - offset * 2, centerLng + offset],
      [centerLat - offset * 1.5, centerLng + offset * 2]
    ], {
      color: '#22c55e',
      fillColor: '#22c55e',
      fillOpacity: 0.35,
      weight: 3,
      opacity: 0.8
    }).addTo(map);

    greenZone.bindPopup(`
      <div style="padding: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #22c55e; font-weight: 600;">🟢 Safe Zone</h3>
        <p style="margin: 0; font-size: 14px; color: #4b5563;">This area is currently safe. Shelter available.</p>
      </div>
    `);

    zonesRef.current = [redZone, orangeZone, greenZone];

    leafletMapRef.current = map;

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, [center, zoom]);

  // Effect to update map center when center prop changes
  useEffect(() => {
    if (leafletMapRef.current && center) {
      leafletMapRef.current.setView(center, zoom, { animate: true });
    }
  }, [center, zoom]);

  useEffect(() => {
    if (!leafletMapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers with animation
    markers.forEach((markerData, index) => {
      if (!markerData.lat || !markerData.lng || !leafletMapRef.current) return;

      // Create custom icon HTML with pulsing animation for alerts
      let iconHtml = '';
      let iconSize: [number, number] = [40, 40];
      let iconAnchor: [number, number] = [20, 20];

      if (markerData.type === 'alert') {
        iconHtml = `
          <div class="marker-pulse-container">
            <div class="marker-pulse-ring"></div>
            <div style="width: 40px; height: 40px; background-color: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.3), 0 4px 6px rgba(0,0,0,0.3); position: relative; z-index: 10;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
          </div>
        `;
      } else if (markerData.type === 'report') {
        iconHtml = `
          <div style="width: 40px; height: 40px; background-color: #f97316; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.3), 0 4px 6px rgba(0,0,0,0.3); animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
        `;
      } else if (markerData.type === 'location') {
        iconHtml = `
          <div style="display: flex; flex-direction: column; align-items: center; animation: fadeInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);">
            <div style="padding: 8px 16px; background: white; border-radius: 999px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); white-space: nowrap;">
              <span style="font-size: 12px; color: #111827; font-weight: 500;">Your Location</span>
            </div>
            <div style="width: 4px; height: 32px; background: linear-gradient(to bottom, #111827, transparent); margin-top: 8px;"></div>
            <div class="location-pulse" style="width: 12px; height: 12px; background-color: #3b82f6; border-radius: 50%; margin-top: -4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>
          </div>
        `;
        iconSize = [140, 80];
        iconAnchor = [70, 80];
      }

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-marker',
        iconSize: iconSize,
        iconAnchor: iconAnchor,
      });

      const marker = L.marker([markerData.lat, markerData.lng], {
        icon: customIcon,
      }).addTo(leafletMapRef.current);

      // Add popup for non-location markers
      if (markerData.type !== 'location') {
        const popupContent = `
          <div style="padding: 8px; animation: fadeIn 0.3s ease-out;">
            <h3 style="margin: 0 0 8px 0; color: #111827; font-weight: 600;">${markerData.title}</h3>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #4b5563;">${markerData.description}</p>
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: #6b7280;">
              <span>${markerData.location}</span>
              <span>${markerData.time}</span>
            </div>
          </div>
        `;
        marker.bindPopup(popupContent);
      }

      markersRef.current.push(marker);
    });
  }, [markers]);

  const handleZoomIn = () => {
    leafletMapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    leafletMapRef.current?.zoomOut();
  };

  const handleLocate = () => {
    leafletMapRef.current?.setView(center, zoom);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={mapRef} className="w-full h-full" style={{ minHeight: '100vh' }} />
      {/* Darkening overlay to match night-time aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.45) 100%)'
        }}
      />

      {/* Leaflet Styles + Animations */}
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
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

        @keyframes locationPulse {
          0%, 100% {
            box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          50% {
            box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 0 0 8px rgba(59, 130, 246, 0);
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

        .location-pulse {
          animation: locationPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .leaflet-pane,
        .leaflet-tile,
        .leaflet-marker-icon,
        .leaflet-marker-shadow,
        .leaflet-tile-container,
        .leaflet-pane > svg,
        .leaflet-pane > canvas,
        .leaflet-zoom-box,
        .leaflet-image-layer,
        .leaflet-layer {
          position: absolute;
          left: 0;
          top: 0;
        }
        
        .leaflet-container {
          overflow: hidden;
          background: #1a1a1a;
          outline: 0;
        }
        
        .leaflet-tile,
        .leaflet-marker-icon,
        .leaflet-marker-shadow {
          user-select: none;
          -webkit-user-drag: none;
        }
        
        .leaflet-tile-pane { z-index: 200; }
        .leaflet-overlay-pane { z-index: 400; }
        .leaflet-shadow-pane { z-index: 500; }
        .leaflet-marker-pane { z-index: 600; }
        .leaflet-tooltip-pane { z-index: 650; }
        .leaflet-popup-pane { z-index: 700; }
        .leaflet-map-pane canvas { z-index: 100; }
        .leaflet-map-pane svg { z-index: 200; }
        
        .leaflet-control {
          position: relative;
          z-index: 800;
          pointer-events: auto;
        }
        
        .custom-leaflet-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-popup {
          position: absolute;
          text-align: center;
          margin-bottom: 20px;
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
        
        .leaflet-popup-content p {
          margin: 18px 0;
        }
        
        .leaflet-popup-tip-container {
          width: 40px;
          height: 20px;
          position: absolute;
          left: 50%;
          margin-left: -20px;
          overflow: hidden;
          pointer-events: none;
        }
        
        .leaflet-popup-tip {
          width: 17px;
          height: 17px;
          padding: 1px;
          margin: -10px auto 0;
          transform: rotate(45deg);
          background: white;
        }
        
        .leaflet-popup-close-button {
          position: absolute;
          top: 0;
          right: 0;
          padding: 4px 8px;
          border: none;
          text-align: center;
          width: 24px;
          height: 24px;
          font-size: 20px;
          line-height: 24px;
          color: #666;
          text-decoration: none;
          background: transparent;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        
        .leaflet-popup-close-button:hover {
          color: #000;
        }
        
        .leaflet-container a.leaflet-popup-close-button {
          color: #666;
        }
        
        .leaflet-zoom-anim .leaflet-zoom-animated {
          transition: transform 0.25s cubic-bezier(0,0,0.25,1);
        }
        
        .leaflet-interactive {
          cursor: pointer;
        }
        
        .leaflet-grab {
          cursor: grab;
        }
        
        .leaflet-crosshair,
        .leaflet-crosshair .leaflet-interactive {
          cursor: crosshair;
        }
        
        .leaflet-dragging .leaflet-grab,
        .leaflet-dragging .leaflet-grab .leaflet-interactive,
        .leaflet-dragging .leaflet-marker-draggable {
          cursor: grabbing;
        }
        
        .leaflet-marker-icon,
        .leaflet-marker-shadow,
        .leaflet-image-layer,
        .leaflet-pane > svg path,
        .leaflet-tile-container {
          pointer-events: none;
        }
        
        .leaflet-marker-icon.leaflet-interactive,
        .leaflet-image-layer.leaflet-interactive,
        .leaflet-pane > svg path.leaflet-interactive,
        svg.leaflet-image-layer.leaflet-interactive path {
          pointer-events: visiblePainted;
          pointer-events: auto;
        }
        
        .leaflet-container {
          background: #0a0a0a;
          font-family: inherit;
        }
        
        .leaflet-tile-pane {
          filter: brightness(0.65) contrast(1.15) saturate(1.05);
        }
        
        .leaflet-container a {
          color: #0078A8;
        }
        
        .leaflet-container .leaflet-control-attribution {
          background: #fff;
          background: rgba(255, 255, 255, 0.7);
          margin: 0;
        }
      `}</style>
    </div>
  );
}
