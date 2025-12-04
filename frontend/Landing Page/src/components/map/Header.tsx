import { motion } from 'motion/react';
import { Shield, Menu } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#1A1A1A]/70 border-b border-white/5"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#0088CC] flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#1A1A1A]" />
          </div>
          <div>
            <h1 className="text-white tracking-tight">Emergency Command</h1>
            <p className="text-xs text-white/50">Real-time Response System</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-white/70 hover:text-[#00D9FF] transition-colors">Dashboard</a>
          <a href="#" className="text-sm text-white/70 hover:text-[#00D9FF] transition-colors">Alerts</a>
          <a href="#" className="text-sm text-white/70 hover:text-[#00D9FF] transition-colors">Resources</a>
          <a href="#" className="text-sm text-white/70 hover:text-[#00D9FF] transition-colors">Reports</a>
        </nav>

        <button className="md:hidden p-2 text-white/70 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.header>
  );
}
