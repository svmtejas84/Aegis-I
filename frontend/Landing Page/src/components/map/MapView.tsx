import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapMarker } from './MapMarker';
import { MarkerPopup } from './MarkerPopup';

interface Marker {
  id: string;
  type: 'alert' | 'report' | 'location';
  x: number;
  y: number;
  title: string;
  description: string;
  time: string;
  location: string;
}

interface MapViewProps {
  mapImage: string;
  markers: Marker[];
  zoom: number;
}

export function MapView({ mapImage, markers, zoom }: MapViewProps) {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const handleMarkerClick = (markerId: string) => {
    setActiveMarker(activeMarker === markerId ? null : markerId);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Map background */}
      <motion.div
        animate={{ scale: zoom }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="absolute inset-0 origin-center"
      >
        <img
          src={mapImage}
          alt="Emergency Response Map"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.85) saturate(1.2)' }}
        />
        
        {/* Subtle overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/10 via-transparent to-[#1A1A1A]/30" />
      </motion.div>

      {/* Markers */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {markers.map((marker) => (
          <MapMarker
            key={marker.id}
            type={marker.type}
            x={marker.x}
            y={marker.y}
            onClick={() => handleMarkerClick(marker.id)}
            isActive={activeMarker === marker.id}
          />
        ))}
      </motion.div>

      {/* Active popup */}
      <AnimatePresence>
        {activeMarker && markers.find(m => m.id === activeMarker) && (
          <MarkerPopup
            {...markers.find(m => m.id === activeMarker)!}
            onClose={() => setActiveMarker(null)}
          />
        )}
      </AnimatePresence>

      {/* Location indicator */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div className="relative">
          <div className="px-4 py-2 backdrop-blur-xl bg-white/90 rounded-full shadow-lg border border-white/20">
            <span className="text-xs text-[#1A1A1A]">Your Location</span>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-0.5 h-8 bg-white/50" />
        </div>
      </motion.div>
    </div>
  );
}
