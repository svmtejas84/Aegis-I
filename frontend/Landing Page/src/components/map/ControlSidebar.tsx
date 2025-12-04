import { Switch } from './ui/switch';

interface Layer {
  id: string;
  label: string;
  icon: React.ReactNode;
  enabled: boolean;
}

interface ControlSidebarProps {
  layers: Layer[];
  onLayerToggle: (id: string) => void;
  onEmergencyContacts: () => void;
  onViewGuide: () => void;
}

export function ControlSidebar({ layers, onLayerToggle, onEmergencyContacts, onViewGuide }: ControlSidebarProps) {
  return (
    <div className="h-full backdrop-blur-2xl bg-[#1A1A1A]/85 flex flex-col">
      {/* Map Layers Section */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-white mb-6">Map Layers</h2>
          
          <div className="space-y-4">
            {layers.map((layer) => (
              <div key={layer.id}>
                <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-all">
                      {layer.icon}
                    </div>
                    <span className="text-sm text-white/90">{layer.label}</span>
                  </div>
                  <Switch
                    checked={layer.enabled}
                    onCheckedChange={() => onLayerToggle(layer.id)}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Resources Section */}
      <div className="p-8 border-t border-white/10">
        <h2 className="text-white mb-4">Emergency Resources</h2>
        <p className="text-xs text-white/50 mb-6 leading-relaxed">
          Access critical emergency services and safety information
        </p>
        
        <div className="space-y-3">
          <button
            onClick={onEmergencyContacts}
            className="w-full py-3 px-4 rounded-xl bg-[#00D9FF] hover:bg-[#00F0FF] text-[#1A1A1A] transition-all shadow-lg shadow-[#00D9FF]/20"
          >
            Emergency Contacts
          </button>
          
          <button
            onClick={onViewGuide}
            className="w-full py-3 px-4 rounded-xl border border-white/20 text-white/90 hover:bg-white/5 transition-all"
          >
            View Guide
          </button>
        </div>
      </div>
    </div>
  );
}
