import { motion } from "framer-motion";
import { Shield, Zap, Activity, ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const title = "Averting Crisis With Precision.";
  const words = title.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-40 pb-20">
      {/* Premium Background Elements */}
      <div className="absolute top-0 -z-10 h-full w-full bg-[#fdfdff]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        
        {/* Floating Tactical Orbs */}
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: [0.05, 0.1, 0.05],
                    y: [0, -40, 0],
                    x: [0, 20, 0]
                }}
                transition={{ 
                    duration: 5 + i * 2,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeInOut"
                }}
                className="absolute rounded-full bg-blue-500/10 blur-[80px]"
                style={{
                    width: 200 + i * 100,
                    height: 200 + i * 100,
                    left: `${(i * 30) % 100}%`,
                    top: `${(i * 20) % 100}%`,
                }}
            />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_100%,transparent_100%)] opacity-50" />

      <div className="text-center z-10 max-w-5xl">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8"
        >
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Strategic Intelligence Active</span>
        </motion.div>

        <motion.h1 
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-6xl md:text-9xl font-bold tracking-tight mb-8 font-outfit text-slate-900 leading-[0.85]"
        >
          {words.map((word, index) => (
            <motion.span
                variants={child}
                key={index}
                className={index > 1 ? "text-gradient block md:inline" : ""}
            >
                {word}{" "}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Predictive emergency orchestration for high-stakes environments. 
          Respond in seconds, secure for years.
        </motion.p>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center mb-24"
        >
          <Link to="/login">
            <button className="px-10 py-5 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-2xl shadow-slate-900/20 group">
              Initialize Command Hub
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <button className="px-10 py-5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm group">
            <Play className="w-4 h-4 fill-slate-700 group-hover:scale-110 transition-transform" />
            System Walkthrough
          </button>
        </motion.div>
      </div>

      {/* Modern Mockup Preview */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 60 }}
        transition={{ delay: 1.4, duration: 1, ease: "circOut" }}
        className="relative w-full max-w-6xl p-px rounded-[3.5rem] bg-gradient-to-b from-slate-200 to-transparent shadow-[0_40px_100px_rgba(0,0,0,0.08)]"
      >
        <div className="bg-white rounded-[3.4rem] overflow-hidden p-4 md:p-6">
           <div className="w-full aspect-[16/10] bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden flex flex-col shadow-inner relative">
                <div className="p-6 border-b border-slate-200/50 flex items-center justify-between bg-white/50 backdrop-blur-sm">
                    {/* Window Controls */}
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                    </div>
                    
                    {/* Mock Command Bar */}
                    <div className="flex-1 max-w-md mx-8">
                        <div className="h-8 rounded-xl bg-slate-100/80 border border-slate-200/50 flex items-center px-4 gap-2">
                            <Shield className="w-3 h-3 text-slate-400" />
                            <div className="h-2 w-32 bg-slate-300/30 rounded-full" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200/50" />
                    </div>
                </div>
                <div className="flex-1 p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="h-40 bg-white rounded-3xl border border-slate-200/50 shadow-sm p-6">
                        <div className="w-3/4 h-3 bg-slate-50 rounded-full mb-4" />
                        <div className="w-1/2 h-8 bg-blue-50 rounded-xl" />
                    </div>
                    <div className="h-40 bg-white rounded-3xl border border-slate-200/50 shadow-sm p-6">
                        <div className="w-3/4 h-3 bg-slate-50 rounded-full mb-4" />
                        <div className="w-1/2 h-8 bg-emerald-50 rounded-xl" />
                    </div>
                    <div className="h-40 bg-white rounded-3xl border border-slate-200/50 shadow-sm p-6 hidden lg:block">
                        <div className="w-3/4 h-3 bg-slate-50 rounded-full mb-4" />
                        <div className="w-1/2 h-8 bg-amber-50 rounded-xl" />
                    </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <Activity className="w-40 h-40 text-blue-500/5 animate-pulse" />
                </div>
           </div>
        </div>

        {/* Floating Mini Stats */}
        <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 top-1/4 glass-white p-6 rounded-3xl border border-white/50 shadow-2xl hidden lg:block"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status 01</p>
                    <p className="text-xl font-bold text-slate-900 font-outfit">Ready</p>
                </div>
            </div>
        </motion.div>

        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-8 bottom-1/4 glass-white p-6 rounded-3xl border border-white/50 shadow-2xl hidden lg:block"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security</p>
                    <p className="text-xl font-bold text-slate-900 font-outfit">Active</p>
                </div>
            </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
