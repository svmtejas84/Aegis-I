import { motion } from 'motion/react';
import { Layers } from 'lucide-react';
import { Checkbox } from './ui/checkbox';

interface Layer {
  id: string;
  label: string;
  icon: React.ReactNode;
  enabled: boolean;
}

interface LayersPanelProps {
  layers: Layer[];
  onLayerToggle: (id: string) => void;
  onEmergencyContacts: () => void;
  onViewGuide: () => void;
}

export function LayersPanel({ layers, onLayerToggle, onEmergencyContacts, onViewGuide }: LayersPanelProps) {
  return (
    <div className="h-full bg-[#151010] rounded-2xl shadow-lg p-6 flex flex-col overflow-hidden">
      {/* Header */}
      <motion.div 
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="w-10 h-10 rounded-lg bg-[#fb2c36] flex items-center justify-center"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Layers className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h3 className="text-white">Map Layers</h3>
          <p className="text-xs text-[#a5a5a5]">Toggle visibility</p>
        </div>
      </motion.div>

      {/* Layers List */}
      <div className="flex-1 space-y-3 mb-6">
        {layers.map((layer, index) => (
          <motion.label
            key={layer.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3 + index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ x: 4 }}
          >
            <Checkbox
              checked={layer.enabled}
              onCheckedChange={() => onLayerToggle(layer.id)}
              className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:border-white"
            />
            <div className="flex items-center gap-2 flex-1">
              <motion.div
                animate={layer.enabled ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {layer.icon}
              </motion.div>
              <span className="text-sm text-white">{layer.label}</span>
            </div>
          </motion.label>
        ))}
      </div>

      {/* Emergency Resources */}
      <motion.div 
        className="border-t border-white/10 pt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3 className="text-white mb-3">Emergency Resources</h3>
        <p className="text-xs text-[#6a7282] mb-4 leading-relaxed">
          Access emergency services, evacuation routes, and real-time safety guidance.
        </p>

        <motion.div 
          className="space-y-3 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <motion.button
            onClick={onViewGuide}
            className="w-full text-left text-sm text-[#364153] hover:text-[#4a5163] transition-colors"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            View Guide
          </motion.button>
          <motion.button
            onClick={onEmergencyContacts}
            className="w-full text-left text-sm text-[#e60000] hover:text-[#ff0000] transition-colors"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Emergency Contacts
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
