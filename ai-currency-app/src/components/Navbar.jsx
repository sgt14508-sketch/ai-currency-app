import { motion } from "framer-motion";
import { FaGlobeAmericas } from "react-icons/fa";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass sticky top-0 z-50 flex items-center justify-between px-8 py-4"
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <FaGlobeAmericas className="text-cyan-400 text-3xl" />
        </motion.div>
        <h1 className="text-white text-xl font-bold tracking-wide">
          Nexa<span className="text-cyan-400">FX</span>
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <motion.span
          className="w-2.5 h-2.5 rounded-full bg-emerald-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-emerald-400 text-sm font-medium">
          Live Market Data
        </span>
      </div>
    </motion.nav>
  );
}
