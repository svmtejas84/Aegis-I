import { motion } from 'motion/react';
import { X, Clock, MapPin } from 'lucide-react';

interface MarkerPopupProps {
  title: string;
  description: string;
  time: string;
  location: string;
  x: number;
  y: number;
  onClose: () => void;
}

export function MarkerPopup({ title, description, time, location, x, y, onClose }: MarkerPopupProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 10 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute z-50 -translate-x-1/2 -translate-y-full mb-12"
    >
      <div className="w-80 backdrop-blur-2xl bg-[#1A1A1A]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-start justify-between">
            <h3 className="text-white pr-4">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-sm text-white/70 leading-relaxed">{description}</p>
          
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-white/50">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-white/5 flex gap-2">
          <button className="flex-1 py-2 px-4 rounded-lg border border-white/10 text-xs text-white/70 hover:border-[#00D9FF]/50 hover:text-white transition-all">
            View Details
          </button>
          <button className="flex-1 py-2 px-4 rounded-lg bg-[#00D9FF] text-xs text-[#1A1A1A] hover:bg-[#00F0FF] transition-all">
            Get Directions
          </button>
        </div>
      </div>

      {/* Arrow pointer */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full">
        <div className="w-4 h-4 bg-[#1A1A1A]/90 border-l border-b border-white/10 rotate-45 -translate-y-2" />
      </div>
    </motion.div>
  );
}
