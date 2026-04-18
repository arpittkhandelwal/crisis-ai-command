import { motion } from "framer-motion";
import { ShieldCheck, Activity, Map, Zap, ArrowRight, Target, Database } from "lucide-react";

const FEATURES = [
    {
        title: "NEURAL_SENTRY",
        desc: "Autonomous computer vision that predicts structural failure before the first crack appears.",
        icon: ShieldCheck,
        size: "large",
        metric: "99.9% ACCURACY",
        color: "blue"
    },
    {
        title: "QUANTUM_GRID",
        desc: "Hardened mesh networking that survives total infrastructure blackout.",
        icon: Database,
        size: "small",
        metric: "NON-SILOED",
        color: "indigo"
    },
    {
        title: "DYNAMICS_AI",
        desc: "Real-time crowd velocity analysis and predictive evacuation physics.",
        icon: Zap,
        size: "small",
        metric: "T+1.2s RESP",
        color: "amber"
    },
    {
        title: "TERRAIN_ORBIT",
        desc: "Multi-satellite synchronization for sub-meter positioning in dense urban centers.",
        icon: Map,
        size: "medium",
        metric: "GPS_L3_SYNC",
        color: "emerald"
    }
];

export default function Features() {
  return (
    <section id="features" className="py-40 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mb-32">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-6"
                >
                    <div className="w-10 h-[1px] bg-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Core Infrastructure Capabilities</span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-6xl md:text-8xl font-black font-outfit text-slate-900 tracking-tight leading-[0.9] mb-8"
                >
                    Engineered for <br/>
                    <span className="text-gradient">Maximum Integrity.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-slate-500 font-medium max-w-xl leading-relaxed"
                >
                    A unified suite of tactical tools designed to maintain operational stability in high-stakes environments.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 min-h-[800px]">
                {FEATURES.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`group p-12 rounded-[3.5rem] bg-white border border-slate-100 hover:border-blue-500/20 shadow-sm hover:shadow-2xl transition-all duration-700 relative overflow-hidden flex flex-col justify-between ${
                            feature.size === "large" ? "md:col-span-2 md:row-span-2" : 
                            feature.size === "medium" ? "md:col-span-2" : ""
                        }`}
                    >
                        {/* Decorative Large Icon */}
                        <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                            <feature.icon className="w-64 h-64" />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-12">
                                <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 transition-colors duration-500">
                                    <feature.icon className="w-7 h-7 text-slate-400 group-hover:text-white transition-colors" />
                                </div>
                                <div className="text-[9px] font-black tracking-[0.2em] text-slate-300 group-hover:text-blue-500 transition-colors">
                                    {feature.metric}
                                </div>
                            </div>
                            
                            <h3 className="text-3xl font-black font-outfit text-slate-900 mb-6 tracking-tighter group-hover:text-blue-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-sm">
                                {feature.desc}
                            </p>
                        </div>
                        
                        <div className="mt-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                            <span className="h-px w-8 bg-slate-100 group-hover:w-12 group-hover:bg-blue-600 transition-all duration-500" />
                            Technical Specs
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
}
