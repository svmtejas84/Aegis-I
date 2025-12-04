import { CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

interface FloatingActionButtonsProps {
  onMarkSafe: () => void;
  onReportIncident: () => void;
  isSafe: boolean;
}

export function FloatingActionButtons({ onMarkSafe, onReportIncident, isSafe }: FloatingActionButtonsProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
      {/* I Am Safe / I Am In Danger Toggle Button */}
      <button
        onClick={onMarkSafe}
        className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl overflow-hidden transition-all ${
          isSafe 
            ? 'bg-gradient-to-r from-[#00FF88] to-[#00CC66] hover:brightness-110' 
            : 'bg-gradient-to-r from-red-500 to-red-600 hover:brightness-110'
        }`}
      >
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            {isSafe ? (
              <CheckCircle className="w-5 h-5 text-[#1A1A1A]" />
            ) : (
              <AlertOctagon className="w-5 h-5 text-white" />
            )}
          </div>
          <span className={isSafe ? 'text-[#1A1A1A]' : 'text-white'}>
            {isSafe ? 'I Am Safe' : 'I Am In Danger'}
          </span>
        </div>
      </button>

      {/* Report an Incident Button */}
      <button
        onClick={onReportIncident}
        className="group flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-xl bg-[#1A1A1A]/70 border-2 border-white/30 hover:border-red-400/50 hover:bg-[#1A1A1A]/80 transition-all shadow-xl"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-red-400/10 transition-all">
          <AlertTriangle className="w-5 h-5 text-white/90 group-hover:text-red-400 transition-colors" />
        </div>
        <span className="text-white/90">Report an Incident</span>
      </button>
    </div>
  );
}
