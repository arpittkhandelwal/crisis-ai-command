import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, AlertCircle } from "lucide-react";

export default function FullscreenAlert({ type, location, active }: { type: string, location: string, active: boolean }) {
    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center bg-white/10 backdrop-blur-md"
                >
                    {/* Pulsing Red Backdrop */}
                    <motion.div 
                        animate={{ 
                            backgroundColor: ["rgba(239, 68, 68, 0)", "rgba(239, 68, 68, 0.05)", "rgba(239, 68, 68, 0)"] 
                        }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="absolute inset-0"
                    />

                    {/* Central Professional UI */}
                    <div className="relative flex flex-col items-center p-12 md:p-20 bg-white/90 rounded-[4rem] border border-red-100 shadow-2xl">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                            className="w-24 h-24 rounded-3xl bg-red-600 flex items-center justify-center shadow-2xl shadow-red-500/40 mb-10"
                        >
                            <ShieldAlert className="w-12 h-12 text-white" />
                        </motion.div>

                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-center"
                        >
                            <h2 className="text-5xl md:text-7xl font-bold font-outfit text-slate-900 tracking-tight mb-4">
                                CRITICAL ALERT
                            </h2>
                            <div className="inline-flex items-center gap-4 bg-red-600 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-lg md:text-2xl shadow-xl shadow-red-500/20">
                                {type} // {location}
                            </div>
                        </motion.div>

                        <div className="mt-12 flex gap-3">
                             {[1,2,3].map(i => (
                                 <motion.div 
                                    key={i}
                                    animate={{ scaleX: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                    className="w-12 h-1 bg-red-600 rounded-full"
                                 />
                             ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
