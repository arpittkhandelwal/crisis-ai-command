import { motion } from "framer-motion";
import { FileText, X, CheckCircle2, Shield, Clock, Download } from "lucide-react";
import { Incident } from "@/lib/store";

export default function IncidentReportModal({ 
    incident, 
    onClose 
}: { 
    incident: Incident; 
    onClose: () => void;
}) {
    const reportId = `REP-${Math.floor(Math.random() * 90000) + 10000}`;
    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
        >
            <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 relative"
            >
                <div className="p-10 md:p-12">
                    <div className="flex justify-between items-start mb-10">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/10">
                                <FileText className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold font-outfit text-slate-900 tracking-tight">Technical Debrief</h2>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Intelligence // Resolution lock</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-10">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Reference ID</span>
                            <span className="font-mono text-xs font-bold text-slate-900 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 block">{reportId}</span>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Operational Result</span>
                            <div className="flex items-center gap-2.5 text-emerald-600 font-bold text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Stabilized</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                        <section>
                            <h4 className="flex items-center gap-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                                <Shield className="w-4 h-4" />
                                Incident Analysis
                            </h4>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 leading-relaxed text-sm font-medium text-slate-600">
                                Stabilization protocol for <strong>{incident.type}</strong> at <strong>{incident.location}</strong> completed successfully. 
                                Telemetry verified at {incident.timestamp.toLocaleTimeString()}. Tactical coordination achieved containment within 4.2 minutes of detection.
                            </div>
                        </section>

                        <section>
                            <h4 className="flex items-center gap-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                                <Clock className="w-4 h-4" />
                                Event Timeline
                            </h4>
                            <div className="space-y-3">
                                <TimelineItem time="T+00m" action="Detection Cluster" status="done" />
                                <TimelineItem time="T+12s" action="Severity Classified" status="done" />
                                <TimelineItem time="T+45s" action="Units Deployed" status="done" />
                                <TimelineItem time="T+04m" action="Resolved" status="done" />
                            </div>
                        </section>

                        <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100 relative overflow-hidden">
                            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">AI Intelligence</h4>
                            <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-wider">
                                Recommendation: proactive sweep of Sector {incident.location.slice(-2)} within 48 hours to minimize recurrence risk.
                            </p>
                        </section>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <button className="flex-1 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 border-b-4 border-slate-700">
                            <Download className="w-4 h-4" />
                            PDF Export
                        </button>
                        <button 
                            onClick={onClose}
                            className="px-8 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function TimelineItem({ time, action, status }: any) {
    return (
        <div className="flex items-center gap-4 group">
            <span className="w-12 text-[10px] font-bold text-blue-600 tabular-nums">{time}</span>
            <div className="relative flex-1 py-3 px-5 bg-white border border-slate-100 rounded-xl text-[9px] font-black text-slate-500 group-hover:bg-slate-50 transition-all uppercase tracking-widest">
                {action}
            </div>
        </div>
    );
}
