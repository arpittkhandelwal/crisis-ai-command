import { Bell, Search, Command, Clock, User, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { useCrisisStore } from "@/lib/store";

export default function Topbar() {
  const { user, currentSite, setSite, showHeatmap, toggleHeatmap } = useCrisisStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-24 border-b border-slate-100 bg-white/50 backdrop-blur-md sticky top-0 z-40 px-10 flex items-center justify-between gap-8">
      <div className="flex items-center gap-6 flex-1">
        {/* Site Switcher */}
        <div className="flex bg-slate-900/5 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
            {(["Campus Hub", "Industrial", "Metro Mall"] as const).map(site => (
                <button
                    key={site}
                    onClick={() => setSite(site)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        currentSite === site 
                        ? "bg-slate-900 text-white shadow-lg" 
                        : "text-slate-400 hover:text-slate-600 hover:bg-white"
                    }`}
                >
                    {site}
                </button>
            ))}
        </div>

        <div className="h-8 w-px bg-slate-100 mx-2" />

        {/* Heatmap Toggle */}
        <button 
            onClick={() => toggleHeatmap()}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all ${
                showHeatmap 
                ? "bg-red-500 text-white border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse" 
                : "bg-white text-slate-400 border-slate-100 hover:border-slate-300"
            }`}
        >
            <Activity className={`w-4 h-4 ${showHeatmap ? "text-white" : "text-slate-400"}`} />
            <span className="text-[10px] font-black uppercase tracking-widest">Risk Projection</span>
        </button>
      </div>

      <div className="flex items-center gap-8">
        {/* Master Clock */}
        <div className="hidden md:flex items-center gap-4 px-5 py-2.5 bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-800">
            <div className="p-1.5 bg-blue-500/20 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[11px] font-black text-white font-mono tracking-tighter tabular-nums leading-none">
                    {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span className="text-[8px] font-black text-blue-500/60 uppercase tracking-widest mt-1">System Master Time</span>
            </div>
        </div>

        <button className="relative p-3 rounded-2xl bg-white border border-slate-100 hover:bg-slate-50 transition-all group">
          <Bell className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </button>
        
        <div className="h-10 w-px bg-slate-100" />
        
        <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
          <div className="text-right">
             <p className="text-xs font-bold text-slate-900 leading-none mb-1">{user?.name || "Initializing..."}</p>
             <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none">Level 4 Clearance</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-400">
            {user?.name?.[0] || <User className="w-5 h-5" />}
          </div>
        </div>
      </div>
    </header>
  );
}
