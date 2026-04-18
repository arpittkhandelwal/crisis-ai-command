import { motion } from "framer-motion";
import { useState } from "react";
import { useCrisisStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ShieldCheck, MapPin, Navigation, Wind, Info, AlertCircle } from "lucide-react";

export default function BuildingMap({ compact = false }: { compact?: boolean }) {
  const { incidents, currentSite, showHeatmap } = useCrisisStore();
  const [activeFloor, setActiveFloor] = useState(1);

  const siteData: any = {
    "Campus Hub": {
      rooms: [
        { id: "401", x: 80, y: 80, w: 200, h: 130, label: "Lecture Hall" },
        { id: "402", x: 290, y: 80, w: 240, h: 130, label: "Command Core" },
        { id: "403", x: 540, y: 80, w: 180, h: 130, label: "Tech Bay" },
        { id: "corridor", x: 80, y: 220, w: 640, h: 60, label: "Transit Node", isCorridor: true },
        { id: "404", x: 80, y: 290, w: 220, h: 130, label: "Admin Wing" },
        { id: "Server Room", x: 310, y: 290, w: 220, h: 130, label: "Server Nucleus" },
        { id: "406", x: 540, y: 290, w: 180, h: 130, label: "Exit Gate", isStairs: true },
      ],
      hotspots: [{ x: 400, y: 350 }, { x: 150, y: 150 }]
    },
    "Industrial": {
      rooms: [
        { id: "I1", x: 80, y: 80, w: 200, h: 180, label: "Turbines" },
        { id: "I2", x: 290, y: 80, w: 240, h: 130, label: "Control Room" },
        { id: "I3", x: 540, y: 80, w: 180, h: 180, label: "Fuel Depot" },
        { id: "corridor", x: 80, y: 270, w: 640, h: 60, label: "Safety Gallery", isCorridor: true },
        { id: "I4", x: 80, y: 340, w: 300, h: 80, label: "Chemical Lab" },
        { id: "I5", x: 390, y: 340, w: 330, h: 80, label: "Cooling Tower" },
      ],
      hotspots: [{ x: 200, y: 200 }, { x: 600, y: 150 }]
    },
    "Metro Mall": {
      rooms: [
        { id: "M1", x: 80, y: 80, w: 300, h: 130, label: "West Wing Retail" },
        { id: "M2", x: 390, y: 80, w: 330, h: 130, label: "Food Court" },
        { id: "corridor", x: 80, y: 220, w: 640, h: 60, label: "Central Plaza", isCorridor: true },
        { id: "M3", x: 80, y: 290, w: 200, h: 130, label: "Security Hub" },
        { id: "M4", x: 290, y: 290, w: 240, h: 130, label: "Anchor Store" },
        { id: "M5", x: 540, y: 290, w: 180, h: 130, label: "Service Tunnel", isStairs: true },
      ],
      hotspots: [{ x: 500, y: 250 }, { x: 100, y: 400 }]
    }
  };

  const currentData = siteData[currentSite] || siteData["Campus Hub"];

  // Filter incidents for currently viewed floor (simulated)
  const floorIncidents = incidents.filter(i => {
      if (activeFloor === 1) return i.location.includes("Lobby") || i.location.includes("Floor 1") || i.location.includes(currentData.rooms[0].label) || i.location.includes(currentData.rooms[1].label);
      return false;
  });

  return (
    <div className={cn(
      "bg-white rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[650px] flex flex-col group/map",
      compact ? "p-6" : "p-10"
    )}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
        <div>
          <h2 className={cn("font-bold font-outfit flex items-center gap-4 text-slate-900", compact ? "text-xl" : "text-3xl")}>
            <div className={cn("bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20", compact ? "p-2" : "p-3")}>
               <Navigation className={cn("text-white", compact ? "w-4 h-4" : "w-6 h-6")} />
            </div>
            {currentSite} Navigation
          </h2>
          {!compact && <p className="text-[10px] font-black text-slate-400 mt-3 ml-16 uppercase tracking-[0.2em]">Live Sector Intelligence</p>}
        </div>
        
        <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100 shadow-inner flex-wrap">
          {[1, 2, 3, 4].map((floor) => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              className={cn(
                "rounded-xl text-[10px] font-black transition-all duration-300 uppercase tracking-widest",
                compact ? "px-3 py-1.5" : "px-6 py-3",
                activeFloor === floor 
                  ? "bg-white text-slate-900 shadow-lg ring-1 ring-slate-100" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              F{floor}
            </button>
          ))}
        </div>
      </div>

      <div className={cn("flex-1 grid grid-cols-1 gap-10", !compact && "xl:grid-cols-12")}>
        {/* SVG Map Container */}
        <div className={cn(
          "bg-slate-50 rounded-[3rem] border border-slate-100 relative overflow-hidden flex items-center justify-center group/svg shadow-inner",
          compact ? "p-8" : "xl:col-span-8 p-12"
        )}>
          <div className="w-full h-full aspect-[16/10] max-h-[500px]">
            <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <defs>
                  <radialGradient id="heatGradient">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="#ef4444" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </radialGradient>
              </defs>

              {/* Outer Walls */}
              <rect x="50" y="50" width="700" height="400" rx="40" fill="white" stroke="#e2e8f0" strokeWidth="2" />
              
              {/* Rooms */}
              {currentData.rooms.map((room: any) => (
                <Room 
                    key={room.id}
                    id={room.id} 
                    x={room.x} y={room.y} w={room.w} h={room.h} 
                    label={room.label} 
                    activeFloor={activeFloor} 
                    incidents={floorIncidents}
                    isCorridor={room.isCorridor}
                    isStairs={room.isStairs}
                />
              ))}

              {/* Heatmap Layer */}
              {showHeatmap && currentData.hotspots.map((spot: any, i: number) => (
                  <motion.circle
                    key={i}
                    cx={spot.x} cy={spot.y} r="80"
                    fill="url(#heatGradient)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                  />
              ))}

              {/* Laser Scanning Line */}
              <motion.line
                x1="50" x2="750"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeOpacity="0.3"
                initial={{ y1: 50, y2: 50 }}
                animate={{ y1: [50, 450, 50], y2: [50, 450, 50] }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                style={{ filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" }}
              />

              {/* Evacuation Paths */}
              <motion.path
                d="M 400 135 L 400 250 L 630 250 L 630 365"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeDasharray="12 16"
                strokeLinecap="round"
                animate={{ strokeDashoffset: -100 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="opacity-40"
              />
            </svg>
          </div>
          
          {/* Overlay Info */}
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl shadow-2xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse" />
                  <span className="text-[8px] uppercase font-black text-white tracking-[0.1em]">SENSORS ACTIVE</span>
              </div>
              {showHeatmap && (
                  <div className="flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-xl shadow-2xl animate-bounce">
                    <AlertCircle className="w-3 h-3 text-white" />
                    <span className="text-[8px] uppercase font-black text-white tracking-[0.1em]">RISK PROJECTION ON</span>
                  </div>
              )}
          </div>
        </div>

        {/* Legend & Details */}
        <div className={cn("flex flex-col gap-8", !compact && "xl:col-span-4")}>
          <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 shadow-inner">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
               <Info className="w-4 h-4" />
               Tactical Legend
            </h4>
            <div className={cn("grid gap-5", compact ? "grid-cols-1 sm:grid-cols-3 xl:grid-cols-1" : "grid-cols-1")}>
              <LegendItem color="bg-emerald-500" border="border-emerald-500/20" iconColor="text-emerald-500" label="Secured Zone" />
              <LegendItem color="bg-red-500" border="border-red-500/20" iconColor="text-red-500" label="Compromised" />
              <LegendItem color="bg-blue-500" border="border-blue-500/20" iconColor="text-blue-600" label="Escape Vector" />
            </div>
          </div>

          <div className={cn(
               "bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col",
               !compact && "flex-1"
          )}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
               <Wind className="w-4 h-4" />
               Floor Intelligence
            </h4>
            <div className={cn("flex-1", compact ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-8" : "space-y-8")}>
               <div className="group/stat">
                  <div className="flex justify-between text-[10px] font-black mb-3 uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                      <span>Occupancy</span>
                      <span className="text-blue-600 font-black">64%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "64%" }}
                        className="h-full bg-blue-600 rounded-full shadow-lg shadow-blue-500/20" 
                      />
                  </div>
               </div>
               <div className="group/stat">
                  <div className="flex justify-between text-[10px] font-black mb-3 uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                      <span>Air Purity</span>
                      <span className="text-emerald-500 font-black">92%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "92%" }}
                        className="h-full bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20" 
                      />
                  </div>
               </div>
            </div>

            <div className={cn(
                "rounded-[2rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group/alert",
                compact ? "mt-8 p-5" : "mt-8 p-6"
            )}>
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover/alert:bg-blue-500/20 transition-colors" />
               <div className="flex items-center gap-3 mb-4 relative z-10">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Protocol Alpha</span>
               </div>
               <p className={cn(
                   "font-bold leading-relaxed text-slate-400 group-hover/alert:text-white transition-colors relative z-10",
                   compact ? "text-[10px]" : "text-[11px]"
               )}>
                  Automated security containment active. All external access points locked. Standby for bio-verification.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Room({ id, x, y, w, h, label, activeFloor, incidents, isCorridor, isStairs }: any) {
  const isTargeted = incidents?.some((inc: any) => inc.location.includes(id));
  const coord = `[${id.toString().slice(0,3).toUpperCase()}]`;
  
  return (
    <g className="cursor-pointer group/room">
      <motion.rect
        x={x} y={y} width={w} height={h}
        rx="15"
        initial={false}
        animate={{
          fill: isTargeted ? "#fef2f2" : (isCorridor ? "#f8fafc" : "#ffffff"),
          stroke: isTargeted ? "#ef4444" : "#e2e8f0",
          strokeWidth: isTargeted ? 3 : 1
        }}
        whileHover={{ stroke: isTargeted ? "#ef4444" : "#3b82f6", strokeWidth: 3 }}
        className="transition-colors duration-500"
      />
      
      {isTargeted && (
          <>
            <motion.rect
                x={x} y={y} width={w} height={h}
                rx="15"
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                fill="#ef4444"
            />
            {/* AI Detection Brackets */}
            <g className="text-red-500 overflow-visible">
                <motion.path 
                    d={`M ${x-5} ${y+15} L ${x-5} ${y-5} L ${x+15} ${y-5}`} 
                    fill="none" stroke="currentColor" strokeWidth="2"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                />
                <motion.path 
                    d={`M ${x+w-15} ${y-5} L ${x+w+5} ${y-5} L ${x+w+5} ${y+15}`} 
                    fill="none" stroke="currentColor" strokeWidth="2"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                />
                <motion.path 
                    d={`M ${x+w+5} ${y+h-15} L ${x+w+5} ${y+h+5} L ${x+w-15} ${y+h+5}`} 
                    fill="none" stroke="currentColor" strokeWidth="2"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                />
                <motion.path 
                    d={`M ${x+15} ${y+h+5} L ${x-5} ${y+h+5} L ${x-5} ${y+h-15}`} 
                    fill="none" stroke="currentColor" strokeWidth="2"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                />
                <motion.text 
                    x={x + w + 10} y={y - 10} 
                    fill="currentColor" fontSize="8" fontWeight="bold"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    TARGET_LOCKED
                </motion.text>
            </g>
          </>
      )}

      <text 
        x={x + 15} 
        y={y + 25} 
        fill={isTargeted ? "#ef4444" : "#94a3b8"} 
        fontSize="8" 
        className="font-black opacity-40 font-mono tracking-tighter"
      >
        {coord}
      </text>

      <text 
        x={x + w/2} 
        y={y + h/2 + 5} 
        fill={isTargeted ? "#ef4444" : "#1e293b"} 
        fontSize="10" 
        textAnchor="middle"
        className={cn("font-black uppercase tracking-[0.15em] transition-colors pointer-events-none", isTargeted ? "opacity-100" : "opacity-80")}
      >
        {isTargeted ? "DANGER" : label}
      </text>

      {isStairs && (
          <path d={`M ${x+w/2-15} ${y+h/2-15} L ${x+w/2+15} ${y+h/2+15} M ${x+w/2-15} ${y+h/2+15} L ${x+w/2+15} ${y+h/2-15}`} stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" className="pointer-events-none" />
      )}
    </g>
  );
}

function LegendItem({ color, border, iconColor, label }: any) {
  return (
    <div className="flex items-center gap-4 text-xs font-bold text-slate-600 transition-transform hover:translate-x-1 cursor-default">
      <div className={cn("w-6 h-6 rounded-lg border flex items-center justify-center bg-white shadow-sm", border)}>
         <div className={cn("w-2 h-2 rounded-full", color)} />
      </div>
      <span className="uppercase tracking-[0.1em]">{label}</span>
      <div className={cn("ml-auto", iconColor)}>
         <ShieldCheck className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}
