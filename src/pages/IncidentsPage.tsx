import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import IncidentCard from "@/components/Dashboard/IncidentCard";
import { useCrisisStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Search, Filter, Download } from "lucide-react";
import { useState } from "react";

export default function IncidentsPage() {
  const { incidents } = useCrisisStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredIncidents = incidents.filter(i => {
    const matchesSearch = i.type.toLowerCase().includes(search.toLowerCase()) || 
                         i.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || i.severity === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-500/20">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-outfit text-slate-900">Incident Command</h1>
              <p className="text-slate-500 font-medium">Historical logs and live anomaly detection feed.</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                <Download className="w-4 h-4" />
                Export Logs
             </button>
             <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-900 rounded-2xl text-xs font-bold text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
                New Action Log
             </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
            <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search by type, location or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all shadow-sm"
                />
            </div>
            <div className="flex p-1 bg-white border border-slate-200 rounded-2xl shadow-sm">
                {["all", "critical", "high", "medium", "low"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            filter === f ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                        {f}
                    </button>
                ))}
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
                className="p-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200"
              >
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No incidents match your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
