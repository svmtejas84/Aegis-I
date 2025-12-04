import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, AlertCircle, Info, Bell } from 'lucide-react';

interface BroadcastAlert {
  _id: string;
  title: string;
  message: string;
  type: 'emergency' | 'warning' | 'info' | 'advisory';
  createdAt: string;
  isActive: boolean;
}

const alertConfig = {
  emergency: {
    icon: AlertTriangle,
    color: 'bg-red-500',
    borderColor: 'border-red-500',
    textColor: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  warning: {
    icon: AlertCircle,
    color: 'bg-orange-500',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  info: {
    icon: Info,
    color: 'bg-blue-500',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  advisory: {
    icon: Bell,
    color: 'bg-purple-500',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
};

export function BroadcastNotification() {
  const [alerts, setAlerts] = useState<BroadcastAlert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  // Fetch broadcast alerts from backend
  const fetchBroadcastAlerts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/alerts/broadcast');
      if (response.ok) {
        const data = await response.json();
        console.log('📢 Broadcast alerts received:', data);
        
        // Filter out dismissed alerts
        const newAlerts = (data.data || []).filter(
          (alert: BroadcastAlert) => !dismissedAlerts.has(alert._id)
        );
        setAlerts(newAlerts);
      }
    } catch (error) {
      console.error('Error fetching broadcast alerts:', error);
    }
  };

  // Fetch alerts on mount and every 1 minute
  useEffect(() => {
    fetchBroadcastAlerts();
    const interval = setInterval(fetchBroadcastAlerts, 60000); // 60 seconds = 1 minute
    
    return () => clearInterval(interval);
  }, [dismissedAlerts]);

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
    setAlerts(prev => prev.filter(alert => alert._id !== alertId));
  };

  const getTimeAgo = (dateString: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="fixed top-4 right-4 z-[1000] max-w-md space-y-3">
      <AnimatePresence mode="popLayout">
        {alerts.map((alert, index) => {
          const config = alertConfig[alert.type];
          const Icon = config.icon;
          
          return (
            <motion.div
              key={alert._id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30,
                delay: index * 0.1 
              }}
              className={`relative backdrop-blur-xl ${config.bgColor} border-2 ${config.borderColor} rounded-xl p-4 shadow-2xl`}
            >
              {/* Close button */}
              <button
                onClick={() => handleDismiss(alert._id)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>

              {/* Alert content */}
              <div className="flex items-start gap-3 pr-6">
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${config.textColor}`}>
                      {alert.title}
                    </h3>
                    <span className="text-xs text-white/50">
                      {getTimeAgo(alert.createdAt)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-white/90 leading-relaxed">
                    {alert.message}
                  </p>
                  
                  {/* Pulse animation for emergency */}
                  {alert.type === 'emergency' && (
                    <motion.div
                      className="absolute inset-0 border-2 border-red-500 rounded-xl"
                      animate={{ 
                        opacity: [0.5, 0, 0.5],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
