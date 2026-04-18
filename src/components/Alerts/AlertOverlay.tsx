import { motion, AnimatePresence } from "framer-motion";
import { useCrisisStore } from "@/lib/store";
import { Flame, ShieldAlert, X, BellRing } from "lucide-react";
import { useEffect, useState } from "react";
import FullscreenAlert from "./FullscreenAlert";

export default function AlertOverlay() {
  const { incidents, updateIncidentStatus } = useCrisisStore();
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [activeFullscreen, setActiveFullscreen] = useState<{ type: string, location: string } | null>(null);

  const criticalAlerts = incidents
    .filter((i) => i.severity === "critical" && i.status === "detected" && !dismissed.includes(i.id))
    .slice(0, 3);

  useEffect(() => {
    if (criticalAlerts.length > 0) {
      const latest = criticalAlerts[0];
      
      // Trigger Fullscreen Cinematic for 4 seconds
      setActiveFullscreen({ type: latest.type, location: latest.location });
      setTimeout(() => setActiveFullscreen(null), 4000);

      // Audio Ping
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } catch (e) {
        console.warn("Audio Context failed to initialize", e);
      }

      // AI Voice Announcement
      try {
        const utterance = new SpeechSynthesisUtterance(
          `Alert. ${latest.type} detected in ${latest.location}.`
        );
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
         console.warn("Speech Synthesis failed", e);
      }
    }
  }, [criticalAlerts.length]);

  return (
    <>
      <FullscreenAlert 
        active={!!activeFullscreen} 
        type={activeFullscreen?.type || ""} 
        location={activeFullscreen?.location || ""} 
      />

      <div className="fixed top-8 right-8 z-[100] flex flex-col gap-4 max-w-sm w-full">
        <AnimatePresence>
          {criticalAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-red-500 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="relative flex items-start gap-5">
                <div className="p-3.5 rounded-2xl bg-red-600 shadow-lg shadow-red-500/20 relative">
                  <BellRing className="w-6 h-6 text-white animate-bounce" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-red-100 text-[10px] font-black text-red-600 rounded-lg uppercase tracking-widest animate-pulse">
                       Critical Alert
                    </span>
                  </div>
                  <p className="font-bold text-slate-900 text-lg font-outfit leading-tight mb-1 uppercase tracking-tight">{alert.type}</p>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-red-500 uppercase tracking-widest">
                     <ShieldAlert className="w-3.5 h-3.5" />
                     {alert.location}
                  </div>
                </div>
                
                <button
                  onClick={() => setDismissed((prev) => [...prev, alert.id])}
                  className="p-2 rounded-xl hover:bg-slate-50 text-slate-300 hover:text-slate-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <motion.button 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => updateIncidentStatus(alert.id, "responding")}
                 className="mt-6 w-full py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all border-b-4 border-slate-700"
              >
                 Acknowledge & Deploy
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
