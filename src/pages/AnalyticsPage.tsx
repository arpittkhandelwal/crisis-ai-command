import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-outfit text-slate-900">Strategic Intelligence</h1>
              <p className="text-slate-500 font-medium">System performance metrics and historical incident trends.</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="System Efficiency" value="94.2%" trend="+2.4%" icon={Activity} up />
            <MetricCard title="Avg Response" value="2.3m" trend="-12s" icon={Clock} up={false} />
            <MetricCard title="Incident volume" value="142" trend="+12" icon={TrendingUp} up />
            <MetricCard title="False Positives" value="1.2%" trend="-0.4%" icon={AlertTriangle} up={false} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 animate-pulse rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-30" />
               <div className="flex items-center justify-between mb-12 relative z-10">
                  <h3 className="text-xl font-bold font-outfit text-slate-900">Incident Frequency (24h)</h3>
                  <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                     <button className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase text-blue-600 bg-white shadow-sm ring-1 ring-slate-100">Hourly</button>
                     <button className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase text-slate-400 hover:text-slate-600">Daily</button>
                  </div>
               </div>

               <div className="h-64 flex items-end gap-2 relative z-10">
                  {[40, 65, 30, 85, 45, 90, 60, 35, 75, 55, 80, 50, 40, 60, 20, 95, 70, 45, 85, 30, 90, 50, 40, 65].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.02, duration: 0.8, ease: "circOut" }}
                        className="flex-1 bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-lg shadow-lg shadow-blue-500/10 min-w-[4px] hover:from-blue-400 hover:to-indigo-500 transition-all cursor-pointer group/bar relative"
                      >
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-all shadow-xl">
                            {h}%
                         </div>
                      </motion.div>
                  ))}
               </div>
               <div className="flex justify-between mt-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>00:00</span>
                  <span>12:00</span>
                  <span>23:59</span>
               </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 flex-1 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
                    <h3 className="text-xl font-bold font-outfit mb-8 relative z-10">Peak Severity Analysis</h3>
                    <div className="space-y-8 relative z-10">
                        <SeverityItem label="Critical" value={14} color="bg-red-500" total={142} />
                        <SeverityItem label="High" value={38} color="bg-orange-500" total={142} />
                        <SeverityItem label="Medium" value={64} color="bg-blue-500" total={142} />
                        <SeverityItem label="Low" value={26} color="bg-emerald-500" total={142} />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MetricCard({ title, value, trend, icon: Icon, up }: any) {
    return (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
             <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                </div>
                <div className={cn("flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg", up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600")}>
                    {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trend}
                </div>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{title}</p>
             <h3 className="text-3xl font-bold text-slate-900 font-outfit">{value}</h3>
        </div>
    );
}

function SeverityItem({ label, value, color, total }: any) {
    const percent = (value / total) * 100;
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                <span className="text-lg font-bold font-outfit">{value}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden p-0.5">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className={cn("h-full rounded-full shadow-lg", color)} 
                />
            </div>
        </div>
    );
}
