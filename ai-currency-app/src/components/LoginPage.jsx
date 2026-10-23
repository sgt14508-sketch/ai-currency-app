import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, AlertCircle, UserPlus, ShieldCheck } from "lucide-react";

export default function LoginPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    // Check if this is the very first time the app is opened
    const users = JSON.parse(localStorage.getItem("app_users")) || {};
    if (Object.keys(users).length === 0) {
      setIsFirstTime(true);
      setIsRegister(true); // Force sign up for the first admin
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("app_users")) || {};

      // REGISTRATION LOGIC
      if (isRegister) {
        if (users[email]) {
          setError("An account with this email already exists.");
          setIsLoading(false);
          return;
        }
        // If it's the very first user, make them the Admin
        const role = isFirstTime ? "admin" : "user";
        users[email] = { password, role };
        localStorage.setItem("app_users", JSON.stringify(users));
        
        // Auto-login after registration
        localStorage.setItem("current_user", email);
        setIsLoading(false);
        onLogin();
      } 
      // LOGIN LOGIC
      else {
        if (!users[email]) {
          setError("Account not found. Please sign up.");
          setIsLoading(false);
          return;
        }
        if (users[email].password !== password) {
          setError("Incorrect password.");
          setIsLoading(false);
          return;
        }
        // Success
        localStorage.setItem("current_user", email);
        setIsLoading(false);
        onLogin();
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050914] flex items-center justify-center p-4 relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* Ambient Background */}
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 18, repeat: Infinity, delay: 2 }} className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="bg-[#0a1122]/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(34,211,238,0.2)]">
          
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-cyan-400/30 border-t-cyan-400" />
              <div className="absolute inset-2 bg-[#050914] rounded-full flex items-center justify-center border border-white/5">
                <span className="text-2xl font-black bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent">C</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              {isFirstTime ? "Create Admin Account" : isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-slate-400 text-sm text-center">
              {isRegister ? "Sign up to access Currency Exchanger Pro" : "Sign in to your AI dashboard"}
            </p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-cyan-400" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400/50" required />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-cyan-400" />
              <input type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400/50" required />
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 mt-2 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : isRegister ? <><UserPlus className="w-5 h-5" /> Sign Up</> : <><ArrowRight className="w-5 h-5" /> Sign In</>}
            </motion.button>
          </form>

          {!isFirstTime && (
            <div className="mt-6 text-center">
              <button onClick={() => { setIsRegister(!isRegister); setError(""); }} className="text-sm text-slate-400 hover:text-cyan-400 transition">
                {isRegister ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}