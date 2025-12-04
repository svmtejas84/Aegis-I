import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface IncidentMapProps {
  center?: [number, number];
  markerPosition?: [number, number];
}

export function IncidentMap({ center = [37.7749, -122.4194], markerPosition = [37.7749, -122.4194] }: IncidentMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: 14,
      zoomControl: false,
    });

    L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google',
      maxZoom: 20,
    }).addTo(map);

    L.tileLayer('https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google',
      maxZoom: 20,
      opacity: 0.4,
    }).addTo(map);

    const redIcon = L.divIcon({
      className: 'custom-incident-marker',
      html: `
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
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const marker = L.marker(markerPosition, { icon: redIcon })
      .addTo(map)
      .bindPopup(`
        <div style="padding: 8px;">
          <h3 style="margin: 0 0 8px 0; color: #111827; font-weight: 600;">Incident Location</h3>
          <p style="margin: 0 0 12px 0; font-size: 14px; color: #4b5563;">Emergency situation</p>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #6b7280;">
            <span style="color: #ef4444;">CRITICAL</span>
            <span>${markerPosition[0].toFixed(4)}, ${markerPosition[1].toFixed(4)}</span>
          </div>
        </div>
      `);

    markerRef.current = marker;
    mapInstanceRef.current = map;
    setIsLoaded(true);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0; }
      }
      .marker-pulse-container { position: relative; width: 40px; height: 40px; }
      .marker-pulse-ring { position: absolute; top: 0; left: 0; width: 40px; height: 40px; border-radius: 50%; background-color: rgba(239, 68, 68, 0.5); animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      .custom-incident-marker { background: transparent !important; border: none !important; }
      .leaflet-container { background: #0a0a0a; font-family: inherit; }
      .leaflet-tile-pane { filter: brightness(0.65) contrast(1.15) saturate(1.05); }
      .leaflet-popup-content-wrapper { padding: 1px; text-align: left; border-radius: 12px; background: white; box-shadow: 0 3px 14px rgba(0,0,0,0.4); }
      .leaflet-popup-content { margin: 0; line-height: 1.4; min-width: 200px; }
      .leaflet-popup-tip { background: white; }
      .leaflet-popup-close-button { color: #666; transition: color 0.2s ease; }
      .leaflet-popup-close-button:hover { color: #000; }
    `;
    document.head.appendChild(style);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, markerPosition]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  return (
    <div className="relative w-full h-full bg-[#1a1a1a]">
      <div 
        ref={mapContainerRef} 
        className="w-full h-full rounded-xl"
        style={{ minHeight: '234px' }}
      />
      <div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.45) 100%)'
        }}
      />
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-[1000]">
        <button 
          onClick={handleZoomIn}
          className="bg-[#2a2a2a] border border-[#3a3a3a] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#333333] transition-colors"
        >
          +
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-[#2a2a2a] border border-[#3a3a3a] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#333333] transition-colors"
        >
          
        </button>
      </div>
      <div className="absolute bottom-3 left-3 bg-[#2a2a2a]/90 border border-[#3a3a3a] rounded-lg px-3 py-2 flex items-center gap-2 backdrop-blur-sm z-[1000]">
        <MapPin className="w-4 h-4 text-red-500" />
        <span className="text-white text-sm">Incident Location</span>
      </div>
    </div>
  );
}
