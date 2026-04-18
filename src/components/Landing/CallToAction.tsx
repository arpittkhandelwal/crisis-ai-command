import { motion } from "framer-motion";
import { ChevronRight, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="py-40 px-6 relative overflow-hidden bg-slate-900 border-t border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-20 h-20 rounded-[2.5rem] bg-blue-600 flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-blue-500/20"
            >
                <ShieldAlert className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl font-bold font-outfit text-white mb-8 tracking-tight leading-tight"
            >
                Ready to Establish <br/>
                <span className="text-blue-400">Strategic Command?</span>
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-400 font-medium mb-12 max-w-xl mx-auto leading-relaxed"
            >
                Join the network of secure, AI-powered emergency centers. 
                Deploy CrisisAI and protect your infrastructure today.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
            >
                <Link to="/login">
                    <button className="px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center gap-3 shadow-2xl shadow-blue-500/20 group">
                        Enter Command Hub
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
                <button className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all group">
                    Request Technical Overview
                </button>
            </motion.div>

            <div className="mt-24 pt-24 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {[
                    { label: "Uptime", val: "99.99%" },
                    { label: "Response", val: "T+1.2s" },
                    { label: "Security", val: "Lvl 4" },
                    { label: "Sites", val: "Unlimited" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">{stat.label}</p>
                        <p className="text-2xl font-bold text-white font-outfit">{stat.val}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
}
