import { motion } from "framer-motion";

const symbols = ["$", "€", "¥", "£", "₹", "₩", "₽", "฿"];

export default function FloatingBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {symbols.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-cyan-400/10 font-bold select-none"
          style={{
            fontSize: `${40 + i * 10}px`,
            top: `${(i * 13) % 90}%`,
            left: `${(i * 23) % 90}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.08, 0.2, 0.08],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s}
        </motion.div>
      ))}

      <div className="absolute top-1/2 left-1/2 w-2 h-2">
        <div className="absolute w-3 h-3 bg-cyan-400 rounded-full animate-orbit shadow-[0_0_20px_cyan]" />
        <div className="absolute w-2 h-2 bg-purple-400 rounded-full animate-orbitReverse shadow-[0_0_20px_violet]" />
      </div>
    </div>
  );
}
