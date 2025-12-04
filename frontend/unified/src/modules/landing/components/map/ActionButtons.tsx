import { motion } from 'motion/react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ActionButtonsProps {
  onReportIncident: () => void;
  onMarkSafe: () => void;
}

export function ActionButtons({ onReportIncident, onMarkSafe }: ActionButtonsProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full backdrop-blur-2xl bg-[#1A1A1A]/70 border-t border-white/10 p-4"
    >
      <div className="flex gap-3">
        {/* Report Incident */}
        <button
          onClick={onReportIncident}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
        >
          <AlertCircle className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/90">Report Incident</span>
        </button>

        {/* I Am Safe */}
        <button
          onClick={onMarkSafe}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all"
        >
          <CheckCircle className="w-4 h-4 text-white/90" />
          <span className="text-sm text-white/90">I Am Safe</span>
        </button>
      </div>
    </motion.div>
  );
}
