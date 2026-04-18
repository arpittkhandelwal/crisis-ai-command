import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import BuildingMap from "@/components/Map/BuildingMap";
import { motion } from "framer-motion";
import { Navigation, Info } from "lucide-react";

export default function MapPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-outfit text-slate-900">Tactical Floor Overlays</h1>
              <p className="text-slate-500 font-medium">Real-time building spatial intelligence and sensor fusion.</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <BuildingMap />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard 
                title="Active Protocols" 
                value="Standard Lockdown" 
                desc="All external gates are monitored by System Core."
            />
            <InfoCard 
                title="Sensor Health" 
                value="98.2%" 
                desc="312 / 315 sensors reporting live data."
            />
            <InfoCard 
                title="Response Teams" 
                value="04 Ready" 
                desc="SWAT-ready squads positioned at East/West exits."
            />
        </div>
      </div>
    </DashboardLayout>
  );
}

function InfoCard({ title, value, desc }: { title: string, value: string, desc: string }) {
    return (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{title}</h3>
            <p className="text-2xl font-bold text-slate-900 mb-2 font-outfit">{value}</p>
            <p className="text-xs font-medium text-slate-500 leading-relaxed">{desc}</p>
        </div>
    );
}
