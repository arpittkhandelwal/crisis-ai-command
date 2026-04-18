import { motion } from "framer-motion";
import { ShieldAlert, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-3rem)] max-w-5xl"
    >
      <div className="glass-white px-8 py-3.5 rounded-[2rem] grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/10">
            <ShieldAlert className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-lg font-bold font-outfit text-slate-900 tracking-tight text-gradient">CrisisAI</span>
        </div>

        {/* Center Links (Desktop only) */}
        <div className="hidden md:flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
           <a href="#features" className="hover:text-slate-900 transition-colors">Intelligence</a>
           <a href="#workflow" className="hover:text-slate-900 transition-colors">Tactical Ops</a>
           <a href="#metrics" className="hover:text-slate-900 transition-colors">Global Net</a>
        </div>

        {/* Action Button Section */}
        <div className="flex justify-end">
          <Link to="/login">
              <button className="flex items-center gap-2 pl-5 pr-3 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95 group">
                  Command Access
                  <div className="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ChevronRight className="w-3 h-3 text-white" />
                  </div>
              </button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
