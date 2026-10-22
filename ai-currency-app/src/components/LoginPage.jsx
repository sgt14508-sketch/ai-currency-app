import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    // Fake loading delay for the cinematic feel
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#050914] flex items-center justify-center p-4 relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* Ambient Moving Background (Scrolltide vibe) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Main Glass Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0a1122]/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(34,211,238,0.2)]">
          
          {/* Logo Area */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              {/* Outer spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-cyan-400/30 border-t-cyan-400"
              />
              {/* Inner glowing orb */}
              <div className="absolute inset-2 bg-[#050914] rounded-full flex items-center justify-center border border-white/5 shadow-inner">
                <span className="text-3xl font-black bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                  C
                </span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Currency Exchanger Pro
            </h2>
            <p className="text-slate-400 text-sm">
              Sign in to access your AI dashboard
            </p>
          </motion.div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants} className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                required
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center text-xs text-slate-500 uppercase tracking-widest">
            <span className="w-full border-t border-white/10"></span>
            <span className="px-4 shrink-0">Or</span>
            <span className="w-full border-t border-white/10"></span>
          </motion.div>

          {/* Google Button */}
          <motion.button
            variants={itemVariants}
            onClick={onLogin}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Continue with Google
          </motion.button>

        </div>
      </motion.div>
    </div>
  );
}