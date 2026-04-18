import { motion } from "framer-motion";
import { Activity, Zap, CheckCircle, Shield, Target } from "lucide-react";

const WORKFLOWS = [
    {
        title: "NEURAL_DETECTION",
        subtitle: "AI PHASE 01",
        description: "Scanning multi-spectral feeds for thermal anomalies, biological distress signatures, and crowd velocity mismatches.",
        icon: Target,
        color: "blue",
        tags: ["SIG_MATCH", "THERMAL_SCAN"]
    },
    {
        title: "TACTICAL_ORCHESTRATION",
        subtitle: "AI PHASE 02",
        description: "Autonomous response team dispatch and dynamic evacuation route calculation based on real-time threat vectors.",
        icon: Zap,
        color: "amber",
        tags: ["ROUTING_AI", "AUTO_DISPATCH"]
    },
    {
        title: "STRATEGIC_RESOLUTION",
        subtitle: "AI PHASE 03",
        description: "Incident containment verification and automated generation of technical debriefs for forensic analysis.",
        icon: CheckCircle,
        color: "emerald",
        tags: ["FORENSIC_GEN", "RESOLVED"]
    }
];

export default function PlatformWorkflow() {
    return (
        <section id="workflow" className="py-40 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-32">
                   <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 mb-8"
                   >
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">Adaptive Intelligence Protocol</span>
                   </motion.div>
                   <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold font-outfit text-slate-900 mb-8 tracking-tight leading-tight"
                   >
                        Coordinated <br/>
                        <span className="text-gradient">Strategic Response.</span>
                   </motion.h2>
                </div>

                {/* Animated Intelligence Flow (Desktop) */}
                <div className="hidden lg:block absolute top-[60%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-px -z-10">
                    <svg className="w-full overflow-visible">
                        <motion.path
                            d="M 0 0 Q 250 100 500 0 Q 750 -100 1000 0"
                            stroke="url(#flowGradient)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <defs>
                            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {WORKFLOWS.map((flow, index) => (
                        <motion.div
                            key={flow.title}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                            className="group p-12 rounded-[3.5rem] bg-white border border-slate-100 hover:border-blue-500/20 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-700 relative"
                        >
                            {/* Phase Indicator */}
                            <div className="absolute -top-6 left-12 flex items-center gap-3">
                                <div className="p-3.5 bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/10">
                                    <flow.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="h-px w-8 bg-slate-200" />
                            </div>

                            <div className="mt-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    <div className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase">
                                        {flow.subtitle}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold font-outfit text-slate-900 mb-6 group-hover:text-blue-600 transition-colors">
                                    {flow.title.replace('_', ' ')}
                                </h3>
                                <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                                    {flow.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                {flow.tags.map(tag => (
                                    <span key={tag} className="text-[9px] font-black text-slate-400 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2 uppercase tracking-widest group-hover:bg-white group-hover:border-blue-100 transition-colors">
                                        <Activity className="w-3 h-3 text-blue-500/40" />
                                        {tag.replace('_', ' ')}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
