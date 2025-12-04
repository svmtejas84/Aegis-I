import { motion } from 'motion/react';
import { Layers } from 'lucide-react';

interface LayerToggleButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function LayerToggleButton({ onClick, isOpen }: LayerToggleButtonProps) {
  return (
    <motion.button
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      onClick={onClick}
      className="fixed left-6 top-24 z-40 w-12 h-12 rounded-full backdrop-blur-xl bg-[#1A1A1A]/70 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#00D9FF] hover:border-[#00D9FF]/30 transition-all hover:scale-110 active:scale-95"
    >
      <Layers className="w-5 h-5" />
    </motion.button>
  );
}
