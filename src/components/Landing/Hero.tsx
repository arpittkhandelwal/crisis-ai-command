import { motion } from "framer-motion";
import { Shield, Zap, Activity, ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-20">
      {/* Premium Background Elements */}
      <div className="absolute top-0 -z-10 h-full w-full bg-[#fdfdff]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent" />
        <div className="absolute top-[10%] left-[10%] h-[400px] w-[400px] rounded-full bg-blue-400/5 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-indigo-400/5 blur-[100px] animate-pulse" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 max-w-5xl"
      >


        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 font-outfit text-slate-900 leading-[0.95]">
          Averting Crisis <br/>
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent uppercase tracking-tight">With Precision.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          Unified command center for high-stakes infrastructure. 
          Real-time incident detection, AI-driven evacuation protocols, and seamless response orchestration.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link to="/dashboard">
            <button className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25 group">
              Launch Strategic Command
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <button className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <Play className="w-4 h-4 fill-slate-700" />
            Watch Intelligence Demo
          </button>
        </div>
      </motion.div>

      {/* Modern Mockup Preview */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 60 }}
        transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
        className="relative mt-20 w-full max-w-6xl p-px rounded-[2.5rem] bg-gradient-to-b from-slate-200 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
      >
        <div className="bg-white rounded-[2.4rem] overflow-hidden p-3 md:p-4">
           <div className="w-full aspect-[16/9] bg-slate-50 rounded-[1.8rem] border border-slate-100 overflow-hidden flex flex-col shadow-inner relative">
                <div className="p-8 border-b border-slate-200/50 flex items-center justify-between">
                    <div className="flex gap-2">
                        <div className="w-8 h-2 bg-blue-500/20 rounded-full" />
                        <div className="w-12 h-2 bg-slate-200 rounded-full" />
                    </div>
                </div>
                <div className="flex-1 p-8 grid grid-cols-3 gap-6">
                    <div className="h-24 bg-white rounded-2xl border border-slate-200/50 shadow-sm" />
                    <div className="h-24 bg-white rounded-2xl border border-slate-200/50 shadow-sm" />
                    <div className="h-24 bg-white rounded-2xl border border-slate-200/50 shadow-sm" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <Activity className="w-20 h-20 text-blue-500/5 animate-pulse" />
                </div>
           </div>
        </div>
      </motion.div>
    </section>
  );
}
