import { motion } from "framer-motion";
import RealisticEarth from "./RealisticEarth";
import { ArrowRight } from "lucide-react";

export default function Hero({ onEnterApp }) {
  return (
    <div className="relative min-h-screen bg-[#050914] flex items-center justify-center overflow-hidden pt-20">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text & CTAs */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Next-Gen Currency Intelligence
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
            Superior data <br />
            analysis using <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              AI technology
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-lg">
            Empowering businesses with advanced currency analytics, real-time market tracking, and predictive AI insights.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button 
              onClick={onEnterApp}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              Start trial <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Right Side: 3D Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[600px] w-full flex items-center justify-center"
        >
          <RealisticEarth />
        </motion.div>
      </div>
    </div>
  );
}