import { Routes, Route, useLocation } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Toaster } from 'sonner'
import { AnimatePresence } from 'motion/react'
import Home from './pages/Home'
import LiveMap from './pages/LiveMap'
import ReportIncident from './pages/ReportIncident'
import Admin from './pages/Admin'

export default function App() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'
  
  return (
    <>
      {!isLandingPage && <Navigation />}
      <AnimatePresence mode="wait">
        <main key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<LiveMap />} />
            <Route path="/report" element={<ReportIncident />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </AnimatePresence>
      <Toaster position="top-right" richColors />
    </>
  )
}
