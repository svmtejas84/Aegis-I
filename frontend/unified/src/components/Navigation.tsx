import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const links = [
    { path: '/map', label: 'Map' },
    { path: '/report', label: 'Report' },
    { path: '/admin', label: 'Admin' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#1A1A1A]/70 border-b border-white/5"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/map" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#0088CC] flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#1A1A1A]" />
          </div>
          <div>
            <h1 className="text-white tracking-tight font-semibold">AEGIS</h1>
            <p className="text-xs text-white/50">Emergency Response</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-medium transition-colors ${
                isActive(path)
                  ? 'text-[#00D9FF]'
                  : 'text-white/70 hover:text-[#00D9FF]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-white/5 bg-[#1A1A1A]/95"
        >
          <nav className="flex flex-col p-4 gap-2">
            {links.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive(path)
                    ? 'bg-[#00D9FF]/20 text-[#00D9FF]'
                    : 'text-white/70 hover:text-[#00D9FF]'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
