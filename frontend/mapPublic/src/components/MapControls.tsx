import { Locate, Plus, Minus } from 'lucide-react';

interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onLocate?: () => void;
}

export function MapControls({ onZoomIn, onZoomOut, onLocate }: MapControlsProps) {
  return (
    <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
      <button 
        onClick={onLocate}
        className="w-10 h-10 rounded-lg backdrop-blur-xl bg-white/90 shadow-lg hover:bg-white transition-colors flex items-center justify-center border border-white/20"
      >
        <Locate className="w-5 h-5 text-gray-700" />
      </button>
      <button 
        onClick={onZoomIn}
        className="w-10 h-10 rounded-lg backdrop-blur-xl bg-white/90 shadow-lg hover:bg-white transition-colors flex items-center justify-center border border-white/20"
      >
        <Plus className="w-5 h-5 text-gray-700" />
      </button>
      <button 
        onClick={onZoomOut}
        className="w-10 h-10 rounded-lg backdrop-blur-xl bg-white/90 shadow-lg hover:bg-white transition-colors flex items-center justify-center border border-white/20"
      >
        <Minus className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}
