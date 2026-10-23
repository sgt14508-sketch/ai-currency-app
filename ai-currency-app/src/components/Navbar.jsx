import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobeAmericas } from "react-icons/fa";
import { LogOut } from "lucide-react";

// A small component for the glowing network nodes
const NetworkNode = ({ delay, x, y, color = "bg-cyan-400" }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 1, 0.2] }}
    transition={{ duration: 2, repeat: Infinity, delay }}
    className={`absolute w-1.5 h-1.5 rounded-full ${color} shadow-[0_0_8px_rgba(34,211,238,0.8)]`}
    style={{ left: `${x}%`, top: `${y}%` }}
  />
);

export default function Navbar({ onLogout }) {
  const [isGlobeHovered, setIsGlobeHovered] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass sticky top-0 z-50 flex items-center justify-between px-8 py-4"
    >
      <div className="flex items-center gap-3">
        
        {/* INTERACTIVE GLOBE SECTION */}
        <div 
          className="relative flex items-center justify-center w-12 h-12 cursor-pointer"
          onMouseEnter={() => setIsGlobeHovered(true)}
          onMouseLeave={() => setIsGlobeHovered(false)}
        >
          {/* Outer glowing rings that appear on hover */}
          <AnimatePresence>
            {isGlobeHovered && (
              <>
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0.3 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute inset-0 border border-cyan-400 rounded-full"
                />
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 2, opacity: 0.1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute inset-0 border border-cyan-400 rounded-full"
                />
              </>
            )}
          </AnimatePresence>

          {/* The spinning globe */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: isGlobeHovered ? 3 : 6, repeat: Infinity, ease: "linear" }}
            className="relative z-10"
          >
            <FaGlobeAmericas className={`text-3xl transition-colors duration-300 ${isGlobeHovered ? "text-white" : "text-cyan-400"}`} />
          </motion.div>

          {/* The "Live Network" nodes that appear on hover */}
          <AnimatePresence>
            {isGlobeHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-0"
              >
                <NetworkNode x={10} y={10} delay={0} />
                <NetworkNode x={90} y={20} delay={0.3} color="bg-purple-400" />
                <NetworkNode x={20} y={80} delay={0.6} />
                <NetworkNode x={80} y={90} delay={0.9} color="bg-emerald-400" />
                <NetworkNode x={50} y={-10} delay={1.2} color="bg-blue-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h1 className="text-white text-xl font-bold tracking-wide ml-2">
          Currency <span className="text-cyan-400">Exchanger Pro</span>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Live Data Indicator */}
        <div className="hidden md:flex items-center gap-2">
          <motion.span
            className="w-2.5 h-2.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-emerald-400 text-sm font-medium">
            Live Market Data
          </span>
        </div>

        {/* Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        )}
      </div>
    </motion.nav>
  );
}