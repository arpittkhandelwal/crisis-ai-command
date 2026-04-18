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
      <div className="glass-white px-8 py-2.5 rounded-[2rem] flex items-center justify-center gap-12">
        {/* Unified Centered Group */}
        <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mr-4">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/10">
                <ShieldAlert className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-black font-outfit text-slate-900 uppercase tracking-tighter">CrisisAI</span>
            </div>

            {/* Links */}
            <div className="hidden lg:flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
               <a href="#features" className="hover:text-slate-900 transition-colors">Intelligence</a>
               <a href="#workflow" className="hover:text-slate-900 transition-colors">Tactical Ops</a>
               <a href="#metrics" className="hover:text-slate-900 transition-colors">Global Net</a>
            </div>

            {/* Action Button */}
            <Link to="/login" className="ml-4">
                <button className="flex items-center gap-2 pl-4 pr-3 py-1.5 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95 group">
                    Command Access
                    <ChevronRight className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>
            </Link>
        </div>
      </div>
    </motion.nav>
  );
}
