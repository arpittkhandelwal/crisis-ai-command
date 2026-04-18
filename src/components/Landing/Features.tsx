import { motion } from "framer-motion";
import { ShieldCheck, Activity, Map, Zap, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Real-Time AI Detection",
    description: "Instantly detect anomalies like fire, smoke, and unauthorized access using state-of-the-art vision models.",
    icon: Activity,
    color: "bg-blue-50 text-blue-600",
    accent: "bg-blue-600"
  },
  {
    title: "Smart Evacuation Routing",
    description: "Dynamically calculate and display the safest exit paths on live maps, avoiding detected danger zones.",
    icon: Map,
    color: "bg-emerald-50 text-emerald-600",
    accent: "bg-emerald-600"
  },
  {
    title: "Automated Dispatch",
    description: "Instantly alert security personnel and emergency services with exact coordinates and situation context.",
    icon: Zap,
    color: "bg-amber-50 text-amber-600",
    accent: "bg-amber-600"
  },
  {
    title: "High-End Security",
    description: "Enterprise-grade encryption and military-level access control guarantees your data is never compromised.",
    icon: ShieldCheck,
    color: "bg-indigo-50 text-indigo-600",
    accent: "bg-indigo-600"
  }
];

export default function Features() {
  return (
    <section className="py-32 px-4 relative max-w-7xl mx-auto bg-white/50">
      <div className="text-center mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold font-outfit mb-6 text-slate-900"
        >
          Everything You Need, <span className="text-slate-400 font-medium">In One Place.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto font-medium"
        >
          A fully integrated ecosystem designed to save seconds when they matter most. 
          Powerful features wrapped in an intuitive interface.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white rounded-[2rem] p-10 border border-slate-100 hover:border-slate-200 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 cursor-pointer overflow-hidden"
          >
            {/* Hover Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-[0.03] transition-transform duration-500 group-hover:scale-150 rounded-full blur-3xl ${feature.accent}`} />
            
            <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 transition-transform group-hover:rotate-6`}>
              <feature.icon className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold mb-4 font-outfit text-slate-900">{feature.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-6">
              {feature.description}
            </p>

            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
              Explore Feature
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
