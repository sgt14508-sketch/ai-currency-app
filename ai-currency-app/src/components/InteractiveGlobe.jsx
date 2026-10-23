import { motion } from "framer-motion";

export default function InteractiveGlobe() {
  // Generate random points for the "data nodes"
  const nodes = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
  }));

  return (
    <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
      {/* Ambient Glow behind the globe */}
      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />

      {/* The Globe Container */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="relative w-[80%] h-[80%] rounded-full border border-emerald-500/30"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Inner Rings for depth */}
        <div className="absolute inset-4 rounded-full border border-emerald-500/20" />
        <div className="absolute inset-12 rounded-full border border-emerald-500/10" />
        
        {/* Horizontal Lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-emerald-500/20" />
        <div className="absolute top-2/4 left-0 right-0 h-px bg-emerald-500/30" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-emerald-500/20" />

        {/* Vertical Lines */}
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-emerald-500/20" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-emerald-500/30" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-emerald-500/20" />

        {/* Glowing Data Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: node.delay }}
            className="absolute w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]"
            style={{ top: node.top, left: node.left }}
          />
        ))}
      </motion.div>

      {/* Floating Orbiting Badge */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-0 bg-[#0a1122]/80 backdrop-blur-md border border-emerald-500/30 px-4 py-2 rounded-full text-xs text-emerald-400 font-mono flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        AI Processing 1.2M Data Points...
      </motion.div>
    </div>
  );
}