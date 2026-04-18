import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  ShieldAlert, 
  Users, 
  Settings, 
  LogOut,
  Activity,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCrisisStore } from "@/lib/store";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: MapIcon, label: "Building Map", href: "/dashboard/map" },
  { icon: ShieldAlert, label: "Incidents", href: "/dashboard/incidents" },
  { icon: Users, label: "Staff", href: "/dashboard/staff" },
  { icon: Activity, label: "Analytics", href: "/dashboard/analytics" },
];

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, logout } = useCrisisStore();

  return (
    <aside className="w-80 h-screen border-r border-slate-200/60 bg-white flex flex-col p-10 pb-12 sticky top-0 overflow-y-auto">
      <div className="flex items-center gap-4 mb-14 px-1">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl shadow-slate-900/20 ring-4 ring-slate-50">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <div>
          <span className="text-2xl font-black font-outfit text-slate-900 block leading-none tracking-tight uppercase">
            CrisisAI
          </span>
          <div className="flex items-center gap-1.5 mt-1.5">
             <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Strategic Intel
             </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => (
          <Link key={item.href} to={item.href}>
            <motion.div 
               whileHover={{ x: 5 }}
               className={cn(
                "flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all duration-300 group relative",
                pathname === item.href 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}>
              <item.icon className={cn(
                "w-5 h-5 transition-all duration-300",
                pathname === item.href ? "text-blue-400" : "text-slate-400 group-hover:text-slate-900 group-hover:scale-110"
              )} />
              <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
              
              {pathname === item.href && (
                <motion.div 
                  layoutId="active-indicator"
                  className="ml-auto"
                >
                   <ChevronRight className="w-4 h-4 text-slate-500" />
                </motion.div>
              )}
            </motion.div>
          </Link>
        ))}
      </nav>

      <div className="pt-10 border-t border-slate-100 space-y-3">
        <div className="bg-slate-50 rounded-2xl p-4 mb-6 flex items-center gap-3 border border-slate-100/50">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-400">
                {user?.name?.[0] || "U"}
            </div>
            <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.name || "System User"}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{user?.role || "Operational Lead"}</p>
            </div>
        </div>

        <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all group font-bold text-[10px] uppercase tracking-widest">
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-700" />
          System Settings
        </button>
        <button 
           onClick={logout}
           className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-[10px] uppercase tracking-widest group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Terminate Session
        </button>
      </div>
    </aside>
  );
} 
