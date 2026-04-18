import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Fingerprint, Lock, Mail, ChevronRight, Activity, ShieldCheck, Zap } from "lucide-react";
import { useCrisisStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const login = useCrisisStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const success = await login(email, password);
    if (success) {
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setError("Invalid intelligence credentials. Access denied.");
      setIsLoading(false);
    }
  };

  const quickProfiles = [
    { email: "admin@crisisai.com", pass: "admin123", role: "Chief Commander", icon: ShieldCheck, color: "blue" },
    { email: "tactical@crisisai.com", pass: "guard123", role: "Tactical Lead", icon: Fingerprint, color: "emerald" },
    { email: "dispatch@crisisai.com", pass: "radio123", role: "Dispatch Officer", icon: Zap, color: "amber" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -z-10 h-full w-full">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-[0_32px_120px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden"
      >
        {/* Left Side: Branding */}
        <div className="p-12 md:p-16 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
                        <ShieldAlert className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-black font-outfit tracking-tight">CrisisAI</span>
                </div>
                
                <h1 className="text-4xl font-bold font-outfit leading-tight mb-6">
                    Unified Strategic <br/>
                    Intelligence Access.
                </h1>
                <p className="text-slate-400 font-medium mb-12 max-w-xs">
                    Access high-priority emergency response protocols and live tactical systems.
                </p>
            </div>

            <div className="relative z-10 pt-10 border-t border-white/10">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Status</p>
                        <p className="text-sm font-bold text-emerald-400">All Modules Safe</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-12 md:p-16 flex flex-col justify-center">
            <div className="mb-10">
                <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-2">Initialize Credentials</h2>
                <p className="text-sm text-slate-500 font-medium">Please enter your clearance level details below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Clearance ID (Email)</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="user@crisisai.com"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-400 transition-all outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Access Cipher (Password)</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-400 transition-all outline-none"
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold flex items-center gap-2"
                        >
                            <ShieldAlert className="w-4 h-4" />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/20 group"
                >
                    {isLoading ? "Authenticating..." : "Initialize Access"}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>

            <div className="mt-12">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 text-center">Protocol Select (Quick Access)</p>
                <div className="grid grid-cols-3 gap-3">
                    {quickProfiles.map((profile) => (
                        <button
                            key={profile.email}
                            onClick={() => { setEmail(profile.email); setPassword(profile.pass); }}
                            className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center gap-2 hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all group"
                        >
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", 
                                profile.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                profile.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                            )}>
                                <profile.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[9px] font-black uppercase text-slate-500 group-hover:text-slate-900 transition-colors text-center leading-tight">
                                {profile.role.split(' ')[0]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
