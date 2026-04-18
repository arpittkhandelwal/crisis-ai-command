import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldAlert, HeartPulse, Flame, Trash2, Cpu, Users, Zap } from "lucide-react";
import { useCrisisStore, IncidentSeverity } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function SimulationPanel() {
  const { clearIncidents, startScenario } = useCrisisStore();

  return (
    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group/sim">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Simulation Control</span>
          </div>
          <h3 className="text-3xl font-bold font-outfit text-slate-900 tracking-tight">System Simulation</h3>
        </div>
        
        <button 
          onClick={clearIncidents}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-50 text-slate-500 border border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all active:scale-95 group/purge"
        >
          <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          Purge Active State
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <ScenarioButton 
            icon={Flame}
            label="Metro Mall Fire"
            sublabel="Sector 4 Analysis"
            color="red"
            onClick={() => startScenario("FIRE")}
        />
        <ScenarioButton 
            icon={ShieldAlert}
            label="Campus Breach"
            sublabel="North Perimeter"
            color="orange"
            onClick={() => startScenario("BREACH")}
        />
        <ScenarioButton 
            icon={Cpu}
            label="Neural Panic"
            sublabel="System Anomaly"
            color="blue"
            onClick={() => startScenario("PANIC")}
        />
      </div>

      <div className="mt-12 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 relative z-10">
          <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/10">
                      <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                      <h4 className="text-slate-900 font-bold font-outfit uppercase tracking-tight">Rapid Response Demo</h4>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Execute coordinated rescue sequence</p>
                  </div>
              </div>
              <button 
                onClick={() => startScenario("FIRE")}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95"
              >
                Launch Live Demo
              </button>
          </div>
      </div>
    </div>
  );
}

function ScenarioButton({ icon: Icon, label, sublabel, color, onClick }: any) {
    const [isThinking, setIsThinking] = useState(false);

    const handleClick = () => {
        setIsThinking(true);
        onClick();
        setTimeout(() => setIsThinking(false), 2000);
    };

    const colors: any = {
        red: "border-red-100 hover:border-red-200 text-red-600 bg-red-50/30",
        orange: "border-orange-100 hover:border-orange-200 text-orange-600 bg-orange-50/30",
        blue: "border-blue-100 hover:border-blue-200 text-blue-600 bg-blue-50/30"
    };

    const iconColors: any = {
        red: "bg-red-600 text-white",
        orange: "bg-orange-600 text-white",
        blue: "bg-blue-600 text-white"
    };

    return (
        <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
            className={cn(
                "p-8 rounded-[2.2rem] bg-white border text-left group/btn transition-all duration-300 relative",
                colors[color]
            )}
        >
            <div className="relative z-10">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg", iconColors[color])}>
                    <Icon className={cn("w-7 h-7", isThinking && "animate-spin")} />
                </div>
                <h4 className="text-slate-900 font-bold font-outfit uppercase text-lg mb-1">{isThinking ? "PROCESSING..." : label}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sublabel}</p>
            </div>
        </motion.button>
    );
}
