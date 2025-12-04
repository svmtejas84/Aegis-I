import { motion } from 'motion/react';
import { AlertCircle, AlertTriangle } from 'lucide-react';

interface MapMarkerProps {
  type: 'alert' | 'report' | 'location';
  x: number;
  y: number;
  onClick: () => void;
  isActive?: boolean;
}

export function MapMarker({ type, x, y, onClick, isActive }: MapMarkerProps) {
  const getMarkerStyles = () => {
    switch (type) {
      case 'alert':
        return {
          bg: 'bg-red-500',
          ring: 'ring-red-500/30',
          icon: <AlertCircle className="w-4 h-4 text-white" />
        };
      case 'report':
        return {
          bg: 'bg-orange-500',
          ring: 'ring-orange-500/30',
          icon: <AlertTriangle className="w-4 h-4 text-white" />
        };
      case 'location':
        return {
          bg: 'bg-[#00D9FF]',
          ring: 'ring-[#00D9FF]/30',
          icon: <div className="w-2 h-2 bg-white rounded-full" />
        };
    }
  };

  const styles = getMarkerStyles();

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 ${isActive ? 'z-40' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        {/* Ping animation */}
        <motion.div
          className={`absolute inset-0 ${styles.bg} rounded-full opacity-75`}
          animate={{
            scale: [1, 2, 2],
            opacity: [0.75, 0, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
        
        {/* Main marker */}
        <div className={`w-10 h-10 ${styles.bg} rounded-full flex items-center justify-center ring-4 ${styles.ring} ${isActive ? 'ring-8' : ''} transition-all shadow-lg`}>
          {styles.icon}
        </div>
      </div>
    </motion.button>
  );
}
