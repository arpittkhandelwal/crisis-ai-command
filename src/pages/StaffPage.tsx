import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { useCrisisStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Users, Mail, MapPin, Phone, ShieldCheck, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StaffPage() {
  const { staff } = useCrisisStore();

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-5"
        >
          <div className="p-4 bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/10">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-outfit text-slate-900 tracking-tight">Personnel Directory</h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Real-time status // active deployments</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {staff.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 p-8 group relative"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shadow-inner">
                  <span className="text-xl font-bold text-slate-300 font-outfit uppercase">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  <div className={cn("absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full border-2 border-white", 
                    member.status === "on-duty" ? "bg-emerald-500" : 
                    member.status === "responding" ? "bg-red-500 animate-pulse" : "bg-slate-300"
                  )} />
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    ID: {member.id}
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold text-slate-900 font-outfit tracking-tight">{member.name}</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-lg">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{member.role}</span>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-slate-500">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold uppercase tracking-wider">{member.location}</span>
                    </div>
                    {member.status === "responding" && (
                        <div className="px-2.5 py-1 bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-widest rounded-lg animate-pulse">
                            En Route
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2.5 text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Level 4 Clearance</span>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button className="flex-1 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-slate-200">
                   Contact
                </button>
                <button className={cn(
                    "flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    member.status === "responding" 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                    : "bg-white text-slate-400 border border-slate-200"
                )}>
                   {member.status === "responding" ? "In Field" : "Recall"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 
