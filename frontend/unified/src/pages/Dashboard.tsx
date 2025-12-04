import { useState, useEffect } from 'react'
import { AlertCircle, MapPin, TrendingUp, Clock } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeAlerts: 0,
    reportsToday: 0,
    sheltersAvailable: 0,
    avgResponseTime: '0 min'
  })

  useEffect(() => {
    // Fetch stats from backend
    const fetchStats = async () => {
      try {
        // Placeholder - replace with actual API calls
        setStats({
          activeAlerts: 12,
          reportsToday: 47,
          sheltersAvailable: 8,
          avgResponseTime: '4.2 min'
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      label: 'Active Alerts',
      value: stats.activeAlerts,
      icon: AlertCircle,
      color: 'bg-red-50 text-red-600'
    },
    {
      label: 'Reports Today',
      value: stats.reportsToday,
      icon: TrendingUp,
      color: 'bg-orange-50 text-orange-600'
    },
    {
      label: 'Shelters Available',
      value: stats.sheltersAvailable,
      icon: MapPin,
      color: 'bg-green-50 text-green-600'
    },
    {
      label: 'Avg Response Time',
      value: stats.avgResponseTime,
      icon: Clock,
      color: 'bg-blue-50 text-blue-600'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          AEGIS Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Real-time emergency response and disaster management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">{card.label}</p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/map"
            className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-center"
          >
            <MapPin className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">View Live Map</p>
            <p className="text-sm text-gray-600">See alerts and incidents</p>
          </a>
          <a
            href="/report"
            className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors text-center"
          >
            <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Report Incident</p>
            <p className="text-sm text-gray-600">Submit an incident report</p>
          </a>
          <a
            href="/admin"
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
          >
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Admin Panel</p>
            <p className="text-sm text-gray-600">Manage incidents</p>
          </a>
          <a
            href="/map"
            className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-center"
          >
            <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Find Shelters</p>
            <p className="text-sm text-gray-600">Nearby evacuation centers</p>
          </a>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-900">
          <strong>Welcome to AEGIS:</strong> This unified dashboard provides real-time emergency response coordination. Use the navigation menu to access live maps, report incidents, and manage operations.
        </p>
      </div>
    </div>
  )
}
