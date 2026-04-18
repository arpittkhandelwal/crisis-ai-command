import { motion } from "framer-motion";
import { Search, Zap, CheckCircle, Shield, Target, FileText } from "lucide-react";

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
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                   <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 mb-6"
                   >
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">Autonomous Workflow</span>
                   </motion.div>
                   <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-outfit text-slate-900 mb-8 tracking-tight"
                   >
                        Unified Command <br/>
                        <span className="text-blue-600">Infrastructure.</span>
                   </motion.h2>
                   <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 font-medium max-w-2xl mx-auto"
                   >
                        A single platform to manage everything from detection to debriefing. 
                        Engineered for clarity and rapid response.
                   </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {WORKFLOWS.map((flow, index) => (
                        <motion.div
                            key={flow.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="group p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 relative overflow-hidden"
                        >
                            <div className="mb-8">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl transition-transform group-hover:scale-110 duration-500 ${
                                    flow.color === 'blue' ? 'bg-blue-600 text-white shadow-blue-500/20' :
                                    flow.color === 'amber' ? 'bg-amber-600 text-white shadow-amber-500/20' :
                                    'bg-emerald-600 text-white shadow-emerald-500/20'
                                }`}>
                                    <flow.icon className="w-7 h-7" />
                                </div>
                                <div className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase mb-2">
                                    {flow.subtitle}
                                </div>
                                <h3 className="text-2xl font-bold font-outfit text-slate-900 mb-4 hove:text-blue-600 transition-colors">
                                    {flow.title.replace('_', ' ')}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                    {flow.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {flow.tags.map(tag => (
                                    <span key={tag} className="text-[9px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 flex items-center gap-1.5 uppercase tracking-wider">
                                        <div className="w-1 h-1 rounded-full bg-blue-500" />
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
