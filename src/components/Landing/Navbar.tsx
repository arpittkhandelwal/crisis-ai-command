import { motion } from "framer-motion";
import { ShieldAlert, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4"
    >
      <div className="glass-white px-10 py-3.5 rounded-[2.5rem] flex items-center justify-center gap-10 md:gap-16 w-fit mx-auto shadow-2xl shadow-slate-200/60 transition-all duration-500 hover:py-4">
        {/* LOGO */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl shadow-slate-900/20">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <span className="text-base font-black font-outfit text-slate-900 uppercase tracking-tighter">CrisisAI</span>
        </div>

        {/* LINKS LEFT */}
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
           <a href="#features" className="hover:text-slate-900 transition-colors">Intelligence</a>
           <a href="#workflow" className="hover:text-slate-900 transition-colors">Tactical Ops</a>
        </div>

        {/* THE CENTER COMMAND BUTTON */}
        <Link to="/login">
            <button className="flex items-center gap-3.5 pl-8 pr-5 py-3.5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 active:scale-95 group">
                Command Access
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-4 h-4 text-white" />
                </div>
            </button>
        </Link>

        {/* LINKS RIGHT */}
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
           <a href="#metrics" className="hover:text-slate-900 transition-colors">Global Net</a>
           <Link to="/contact" className="hover:text-slate-900 transition-colors">Support</Link>
        </div>
      </div>
    </motion.nav>
  );
}
