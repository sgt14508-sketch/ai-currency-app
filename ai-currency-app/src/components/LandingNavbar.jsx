import { motion } from "framer-motion";
import { FaGlobeAmericas } from "react-icons/fa";

export default function LandingNavbar({ onEnterApp }) {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full flex items-center justify-between px-6 py-6 z-50 bg-[#050914]/80 backdrop-blur-lg border-b border-white/5"
    >
      <div className="flex items-center gap-2">
        <FaGlobeAmericas className="text-emerald-400 text-2xl" />
        <span className="text-white font-bold text-xl tracking-tight">VividMotion AI</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#" className="hover:text-white transition">Product</a>
        <a href="#" className="hover:text-white transition">Solutions</a>
        <a href="#" className="hover:text-white transition">Pricing</a>
        <a href="#" className="hover:text-white transition">Case Studies</a>
      </div>

      <button 
        onClick={onEnterApp}
        className="bg-white text-black px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-emerald-400 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
      >
        Get in touch
      </button>
    </motion.nav>
  );
}