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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function Features() {
  return (
    <section id="features" className="py-32 px-4 relative max-w-7xl mx-auto bg-white/50">
      <div className="text-center mb-24">
        <motion.div
           initial={{ opacity: 0, scale: 0.5 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="w-16 h-1 bg-blue-600 mx-auto mb-8 rounded-full"
        />
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold font-outfit mb-6 text-slate-900 leading-tight"
        >
          Everything You Need, <br/>
          <span className="text-gradient">In One Precise Interface.</span>
        </motion.h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ 
                y: -10,
                perspective: 1000,
                rotateX: 2,
                rotateY: -2
            }}
            className="group relative bg-white rounded-[3rem] p-12 border border-slate-100 hover:border-blue-500/20 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 cursor-pointer overflow-hidden"
          >
            {/* Unique Pattern Background */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-500">
                <feature.icon className="w-40 h-40 -mr-10 -mt-10" />
            </div>
            
            <div className={`w-20 h-20 rounded-3xl ${feature.color} flex items-center justify-center mb-10 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-current/20 group-hover:scale-110`}>
              <feature.icon className="w-10 h-10" />
            </div>

            <h3 className="text-3xl font-bold mb-6 font-outfit text-slate-900 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
              {feature.description}
            </p>

            <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-900">
              <span className="h-px w-12 bg-slate-200 group-hover:w-20 group-hover:bg-blue-600 transition-all duration-500" />
              Explore Capability
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
