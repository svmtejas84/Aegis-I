import { AlertCircle } from 'lucide-react';

const alerts = [
  "SEVERE WEATHER WARNING: Heavy rainfall expected in downtown area through 8 PM",
  "FLOOD ALERT: Riverside neighborhoods advised to evacuate immediately",
  "POWER OUTAGE: Multiple districts affected, crews working to restore service",
  "ROAD CLOSURE: Highway 101 closed due to accident, use alternate routes"
];

export function AlertTicker() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-red-500/20 border-b border-red-500/30">
      <div className="overflow-hidden py-3">
        <div className="flex gap-8 whitespace-nowrap animate-scroll">
          {[...alerts, ...alerts, ...alerts].map((alert, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-white">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{alert}</span>
              <span className="text-red-400 mx-4">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
