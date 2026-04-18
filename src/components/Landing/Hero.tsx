import { motion } from "framer-motion";
import { Shield, Zap, Activity, ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const title = "SECONDS SAVE LIVES.";
  const subtitle = "INTELLIGENCE SAVES SECONDS.";
  const titleWords = title.split(" ");
  const subtitleWords = subtitle.split(" ");

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
      } as const,
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      } as const,
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-44 pb-20">
      {/* Orbital Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full pointer-events-none">
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{ 
                    duration: 20 + i * 10, 
                    repeat: Infinity, 
                    ease: "linear",
                    opacity: { duration: 2 }
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/5"
                style={{
                    width: 400 + i * 250,
                    height: 400 + i * 250,
                }}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400/20 rounded-full" />
            </motion.div>
        ))}
      </div>

      <div className="absolute top-0 -z-20 h-full w-full bg-[#fdfdff]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_100%,transparent_100%)] opacity-50" />

      <div className="text-center z-10 max-w-6xl">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-800 mb-10 shadow-2xl shadow-slate-900/10"
        >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Tactical Grade Intelligence v4.0</span>
        </motion.div>

        <motion.h1 
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-7xl md:text-[10rem] font-black tracking-tighter mb-4 font-outfit text-slate-900 leading-[0.8]"
        >
          {titleWords.map((word, index) => (
            <motion.span variants={child} key={index} className="inline-block mr-4">
                {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.h2
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-7xl font-bold tracking-tight mb-12 font-outfit text-gradient"
        >
            {subtitleWords.map((word, index) => (
                <motion.span variants={child} key={index} className="inline-block mr-3">
                    {word}
                </motion.span>
            ))}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-lg md:text-xl text-slate-500 mb-14 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          The next generation of autonomous infrastructure safety. 
          Real-time threat detection, AI orchestration, and coordinated response—unified.
        </motion.p>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-28"
        >
          <Link to="/login">
            <button className="px-12 py-5 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center gap-3 shadow-2xl shadow-slate-900/20 active:scale-95 group">
              Establish Command
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <button className="px-12 py-5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center gap-3 shadow-sm group">
            <Play className="w-4 h-4 fill-slate-700 group-hover:scale-110 transition-transform" />
            Technical Briefing
          </button>
        </motion.div>
      </div>

      {/* Modern Mockup Preview */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 60 }}
        transition={{ delay: 1.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl p-px rounded-[4rem] bg-gradient-to-b from-slate-200 via-slate-100 to-transparent shadow-[0_60px_120px_rgba(0,0,0,0.1)] mb-20"
      >
        <div className="bg-white rounded-[3.9rem] overflow-hidden p-2">
           <div className="w-full aspect-[16/9] bg-slate-50 rounded-[3.5rem] border border-slate-100 overflow-hidden flex flex-col shadow-inner relative">
                {/* Dashboard Header Mockup */}
                <div className="p-8 border-b border-slate-200/50 flex items-center justify-between bg-white/50 backdrop-blur-md">
                    <div className="flex gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-200" />
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-200" />
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-200" />
                    </div>
                    
                    <div className="flex-1 max-w-lg mx-12">
                        <div className="h-10 rounded-2xl bg-slate-100/50 border border-slate-200/50 flex items-center px-5 gap-3">
                            <Shield className="w-4 h-4 text-slate-400" />
                            <div className="h-2 w-40 bg-slate-200/50 rounded-full" />
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200/50" />
                    </div>
                </div>

                {/* Technical "Live Grid" Implementation */}
                <div className="flex-1 p-10 grid grid-cols-12 gap-6">
                    <div className="col-span-8 h-full bg-white rounded-[2.5rem] border border-slate-200/50 overflow-hidden relative shadow-sm">
                        <div className="absolute inset-0 bg-slate-900/5 grid grid-cols-4 grid-rows-4 p-4 gap-2">
                            {[...Array(16)].map((_, i) => (
                                <div key={i} className="rounded-lg bg-slate-900/10 border border-white/20 relative">
                                    <div className="absolute top-2 left-2 text-[6px] font-black text-white/40">CAM_{String(i+1).padStart(2, '0')}</div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                             <Activity className="w-32 h-32 text-blue-500/10 animate-pulse" />
                        </div>
                    </div>
                    <div className="col-span-4 flex flex-col gap-6">
                        <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200/50 shadow-sm p-8">
                             <div className="w-14 h-1 bg-blue-500/20 rounded-full mb-6" />
                             <div className="space-y-4">
                                <div className="h-3 w-3/4 bg-slate-100 rounded-full" />
                                <div className="h-3 w-1/2 bg-slate-100 rounded-full" />
                             </div>
                        </div>
                        <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200/50 shadow-sm p-8">
                             <div className="w-14 h-1 bg-emerald-500/20 rounded-full mb-6" />
                             <div className="space-y-4">
                                <div className="h-3 w-3/4 bg-slate-100 rounded-full" />
                                <div className="h-3 w-1/2 bg-slate-100 rounded-full" />
                             </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>

        {/* Floating Intelligence Bits */}
        <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-12 top-1/4 glass-white p-8 rounded-[2.5rem] border border-white/60 shadow-2xl hidden xl:block"
        >
            <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Activity className="w-7 h-7 text-white" />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Live Telemetry</p>
                    <p className="text-2xl font-bold text-slate-900 font-outfit">Synchronized</p>
                </div>
            </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
