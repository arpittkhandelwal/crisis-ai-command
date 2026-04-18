import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Cpu, Zap, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const AI_LOG_POOL = [
    "EXTRACTING_FEATURE_VECTOR_0x44",
    "TENSOR_WEIGHT_ADJUSTMENT: 0.982",
    "SIGMOID_ACTIVATION_L3: SUCCESS",
    "ANOMALY_CONFIDENCE_THRESHOLD: 0.85",
    "BBOX_COORDINATES_LOCKED_SEC_A",
    "NEURAL_SIG_MATCH_CONFIRMED: 99.1%",
    "RECURSIVE_PATTERN_SCAN: ONGOING",
    "OBJECT_CLASS_MAPPING: THERMAL_SPIKE",
    "VELOCITY_GRADIENT_MAPPING: ANOMALOUS",
    "TEMPORAL_RESOLUTION_STABLE",
    "SPATIAL_AWARENESS_VECTOR: OPTIMAL"
];

export default function NeuralHub() {
    const [logs, setLogs] = useState<string[]>(["SYSTEM_READY", "INITIALIZING_NEURAL_MODELS..."]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = AI_LOG_POOL[Math.floor(Math.random() * AI_LOG_POOL.length)];
            const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setLogs(prev => [...prev.slice(-15), `[${timestamp}] ${newLog}`]);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden group/neural min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Cpu className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold font-outfit text-slate-900 tracking-tight">Neural Stream</h3>
                        <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest">Tensor Processing v4.2</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Active Inference</span>
                </div>
            </div>

            <div 
                ref={scrollRef}
                className="flex-1 font-mono text-[10px] overflow-hidden space-y-2 bg-slate-50 p-6 rounded-2xl border border-slate-100 relative"
            >
                <AnimatePresence initial={false}>
                    {logs.map((log, i) => (
                        <motion.div
                            key={`${i}-${log}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-4 py-1 border-b border-slate-200/50 group/log"
                        >
                            <span className="text-slate-300 font-bold shrink-0">{log.slice(0, 10)}</span>
                            <span className={cn(
                                "font-black uppercase tracking-wider shrink-0 w-24 text-slate-400"
                            )}>
                                INFERENCE
                            </span>
                            <span className={cn(
                                "font-medium",
                                log.includes("SUCCESS") || log.includes("OPTIMAL") ? "text-emerald-600" : "text-slate-600"
                            )}>
                                {log.slice(10)}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-between relative z-10">
                <div className="flex gap-4">
                    <div className="text-center">
                        <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">Queue Load</p>
                        <p className="text-xs font-bold text-slate-900">12.4%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">Confidence</p>
                        <p className="text-xs font-bold text-slate-900">0.999</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Optimizing Node_04</span>
                </div>
            </div>
        </div>
    );
}
