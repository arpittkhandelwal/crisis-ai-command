import { motion } from "framer-motion";
import { Clock, MapPin, ChevronRight, AlertTriangle, AlertCircle, Info, ShieldAlert } from "lucide-react";
import { Incident, useCrisisStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export default function IncidentCard({ incident }: { incident: Incident }) {
  const { setActiveIncident } = useCrisisStore();

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "critical": return {
        bg: "bg-red-50",
        text: "text-red-600",
        border: "border-red-100",
        pill: "bg-red-600 text-white shadow-red-500/20",
        icon: <ShieldAlert className="w-5 h-5" />
      };
      case "high": return {
        bg: "bg-orange-50",
        text: "text-orange-600",
        border: "border-orange-100",
        pill: "bg-orange-600 text-white shadow-orange-500/20",
        icon: <AlertTriangle className="w-5 h-5" />
      };
      case "medium": return {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-100",
        pill: "bg-blue-600 text-white shadow-blue-500/20",
        icon: <AlertCircle className="w-5 h-5" />
      };
      default: return {
        bg: "bg-slate-50",
        text: "text-slate-600",
        border: "border-slate-100",
        pill: "bg-slate-600 text-white shadow-slate-500/20",
        icon: <Info className="w-5 h-5" />
      };
    }
  };

  const config = getSeverityConfig(incident.severity);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ 
        opacity: [0, 1, 0.8, 1], // Flickering entry
        scale: 1, 
        y: 0 
      }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={cn(
        "bg-white border border-slate-100 p-6 rounded-[2rem] flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden",
        incident.severity === "critical" && "ring-1 ring-red-100"
      )}
      onClick={() => setActiveIncident(incident.id)}
    >
      {/* Visual Accent */}
      <div className={cn("absolute top-0 left-0 w-1.5 h-full", 
        incident.severity === "critical" ? "bg-red-500" : 
        incident.severity === "high" ? "bg-orange-500" : "bg-blue-500"
      )} />

      <div className="flex items-center gap-6 flex-1">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300", config.bg, config.text, "border", config.border)}>
          {config.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-lg font-bold text-slate-900 truncate font-outfit uppercase tracking-tight">{incident.type}</h4>
            <span className={cn(
              "text-[9px] uppercase tracking-[0.15em] font-black px-2.5 py-1 rounded-lg shadow-sm border border-black/5",
              config.pill
            )}>
              {incident.severity}
            </span>
          </div>
          <div className="flex items-center gap-5 text-[9px] text-slate-400 font-black uppercase tracking-[0.15em] mb-4">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {incident.location}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {formatDistanceToNow(incident.timestamp, { addSuffix: true })}</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-blue-500 font-mono opacity-60">LOG_ID: 0x{incident.id.slice(0,6).toUpperCase()}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
              <div className="w-full sm:w-32 h-1 bg-slate-50 rounded-full overflow-hidden border border-slate-100 flex-shrink-0">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${incident.aiConfidence}%` }}
                    className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                  />
              </div>
              <span className="text-[10px] font-mono font-black text-blue-600 mr-2">{incident.aiConfidence?.toFixed(1)}% CONFIDENCE</span>
              
              {incident.aiEvidence?.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-slate-900/5 border border-slate-200 rounded-md text-[8px] font-black text-slate-400 tracking-widest uppercase">
                      {tag}
                  </span>
              ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 ml-6">
        <div className="hidden lg:block text-right">
            <div className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-300 mb-1.5 text-right">Protection Status</div>
            <div className="inline-flex items-center gap-2 text-[10px] font-black text-slate-900 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl uppercase tracking-widest">
               <div className={cn("w-1.5 h-1.5 rounded-full", incident.status === "resolving" ? "bg-orange-500" : "bg-emerald-500")} />
               {incident.status}
            </div>
        </div>
        <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-300">
           <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-all group-hover:translate-x-0.5" />
        </div>
      </div>
    </motion.div>
  );
}
