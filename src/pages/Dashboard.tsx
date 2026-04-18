import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import SimulationPanel from "@/components/Alerts/SimulationPanel";
import IncidentCard from "@/components/Dashboard/IncidentCard";
import BuildingMap from "@/components/Map/BuildingMap";
import IncidentReportModal from "@/components/Dashboard/IncidentReportModal";
import NeuralHub from "@/components/Dashboard/NeuralHub";
import { useCrisisStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Users, Activity, Bell, LayoutGrid, Zap, FileText, MapPin } from "lucide-react";
import { useState } from "react";


export default function Dashboard() {
  const { 
    incidents, 
    activeIncidentId, 
    setActiveIncident, 
    updateIncidentStatus 
  } = useCrisisStore();

  const [showReport, setShowReport] = useState(false);

  const filteredIncidents = incidents.filter(i => i.status !== "resolved");
  const activeIncidentsCount = filteredIncidents.length;
  const activeIncident = incidents.find(i => i.id === activeIncidentId);

  const handleResolve = () => {
    if (activeIncidentId) {
       updateIncidentStatus(activeIncidentId, "resolved");
       setShowReport(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <AnimatePresence mode="wait">
            {showReport && activeIncident && (
                <IncidentReportModal 
                    incident={activeIncident} 
                    onClose={() => {
                        setShowReport(false);
                        setActiveIncident(null);
                    }} 
                />
            )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
            <div className="relative z-10">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex items-center gap-3 mb-3"
               >
                  <LayoutGrid className="w-5 h-5 text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">System Monitoring // Sector_Alfa</span>
               </motion.div>
               <h1 className="text-4xl md:text-5xl font-bold font-outfit text-slate-900 tracking-tight">Command Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-6 bg-white p-3 border border-slate-200 rounded-2xl shadow-sm relative z-10">
                <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-xl bg-slate-50 border-2 border-white flex items-center justify-center shadow-sm">
                            <Users className="w-5 h-5 text-slate-400" />
                        </div>
                    ))}
                </div>
                <div className="h-8 w-px bg-slate-100" />
                <div className="pr-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 text-right">Operational Status</p>
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-widest text-right">12 Tactical Units Online</p>
                </div>
            </div>
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<ShieldAlert className="w-5 h-5" />} 
            label="Active Alerts" 
            value={activeIncidentsCount.toString()} 
            trend="+2 IN QUEUE"
            color="red"
          />
          <StatCard 
            icon={<Users className="w-5 h-5" />} 
            label="Deployed Staff" 
            value="31" 
            trend="ZONE A READY"
            color="blue"
          />
          <StatCard 
            icon={<Activity className="w-5 h-5" />} 
            label="Neural Uptime" 
            value="Optimal" 
            trend="99.9% ACC"
            color="emerald"
          />
          <StatCard 
            icon={<Zap className="w-5 h-5" />} 
            label="Sensor Load" 
            value="24%" 
            trend="STABLE"
            color="amber"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="xl:col-span-8 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
                    </div>
                   <h2 className="text-2xl font-bold font-outfit text-slate-900 tracking-tight">
                    Tactical Feed
                  </h2>
                </div>
                
                <div className="flex items-center gap-3 px-4 py-2 bg-red-50 border border-red-100 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Live Monitoring</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredIncidents.length > 0 ? (
                    filteredIncidents.map((incident) => (
                      <IncidentCard key={incident.id} incident={incident} />
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 border border-slate-100 mb-6">
                          <Activity className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">System Secure. No active threats detected.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            <SimulationPanel />
          </div>

          {/* Right Controls */}
          <div className="xl:col-span-4 space-y-8">
            <BuildingMap compact />
            
            <NeuralHub />

            {/* Active Incident Detail Panel */}
            <AnimatePresence mode="wait">
                {activeIncidentId ? (
                    <motion.div 
                        key="active-incident"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white border border-red-100 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6">
                            <button onClick={() => setActiveIncident(null)} className="text-slate-300 hover:text-slate-900 transition-colors">
                                <Bell className="w-5 h-5 rotate-45" />
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-5 mb-8 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                                <ShieldAlert className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 mb-1">Priority Attention</h4>
                                <h3 className="text-xl font-bold font-outfit text-slate-900 tracking-tight">{incidents.find(i => i.id === activeIncidentId)?.type}</h3>
                            </div>
                        </div>

                        <div className="space-y-6 mb-8 text-sm relative z-10">
                            <div className="flex items-center gap-4 text-slate-500 font-bold uppercase tracking-wider bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                <span>{incidents.find(i => i.id === activeIncidentId)?.location}</span>
                            </div>
                            <div className="text-slate-600 leading-relaxed font-medium bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">Intelligence Summary</div>
                                {incidents.find(i => i.id === activeIncidentId)?.details}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 relative z-10">
                            <button 
                                onClick={handleResolve}
                                className="py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
                            >
                                <FileText className="w-4 h-4" />
                                Resolve & Debrief
                            </button>
                            <button 
                                onClick={() => updateIncidentStatus(activeIncidentId, "responding")}
                                className="py-4 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-200"
                            >
                                Mark as Responding
                            </button>
                        </div>
                    </motion.div>
                ) : (
                        <motion.div 
                        key="quick-actions"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white border border-slate-100 text-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden shadow-sm"
                    >
                         <div className="flex items-center gap-3 mb-8 relative z-10">
                            <Zap className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-bold font-outfit uppercase tracking-wider">Fast Presets</h3>
                         </div>
                         <div className="grid grid-cols-1 gap-4 relative z-10">
                             <button className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-red-200 hover:shadow-xl transition-all text-left group flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-red-500/10">
                                    <ShieldAlert className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest block mb-0.5">Full Lockdown</span>
                                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Code Alfa-9</span>
                                </div>
                             </button>
                             <button className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-xl transition-all text-left group flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
                                    <Bell className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest block mb-0.5">Mass Evac</span>
                                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Protocol Beta</span>
                                </div>
                             </button>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon, label, value, trend, color }: any) {
  const colors: any = {
    red: "bg-red-50 border-red-100 text-red-600",
    blue: "bg-blue-50 border-blue-100 text-blue-600",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
    amber: "bg-amber-50 border-amber-100 text-amber-600",
  };

  const iconColors: any = {
    red: "bg-red-600 text-white",
    blue: "bg-blue-600 text-white",
    emerald: "bg-emerald-600 text-white",
    amber: "bg-amber-600 text-white",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-8">
        <div className={cn("p-3 rounded-xl shadow-lg", iconColors[color])}>
          {icon}
        </div>
        <div className={cn("px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider", colors[color])}>
            {trend}
        </div>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-4xl font-bold text-slate-900 font-outfit tracking-tight tabular-nums">{value}</h3>
    </motion.div>
  );
}
