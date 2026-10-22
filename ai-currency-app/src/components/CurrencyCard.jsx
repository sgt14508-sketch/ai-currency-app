import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CurrencyCard({ currency, index, onClick, isSelected }) {
  const ref = useRef(null);

  // Motion values for tracking mouse position (normalized from -0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth 3D rotation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Transform mouse position into rotation degrees (max 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Transform for the glare effect position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the card
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Enables 3D children
      }}
      className={`glass rounded-2xl p-5 cursor-pointer relative transition-colors duration-300 ${
        isSelected 
          ? "ring-2 ring-cyan-400 bg-cyan-400/5 shadow-[0_0_30px_rgba(34,211,238,0.3)] z-10" 
          : "hover:bg-white/5 border border-white/5 z-0"
      }`}
    >
      {/* Dynamic Glare Effect (Follows the mouse) */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          zIndex: 20
        }}
      />

      {/* Card Content (Pushed forward in 3D space) */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 pointer-events-none">
        
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-lg">
            <img
              src={`https://flagcdn.com/w80/${currency.flagCode}.png`}
              alt={currency.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs font-semibold text-gray-300 bg-black/40 px-2 py-1 rounded-full backdrop-blur-md">
            {currency.code.toUpperCase()}
          </span>
        </div>

        <div>
          <p className="text-gray-400 text-sm mb-1">{currency.name}</p>
          <p className="text-2xl font-bold text-white font-mono tracking-tight">
            {currency.rate.toFixed(3)}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span className="text-emerald-400 flex items-center gap-0.5 bg-emerald-400/10 px-2 py-1 rounded-md">
            ▲ {(Math.random() * 0.5 + 0.01).toFixed(2)}%
          </span>
          <span className="text-gray-500">24h</span>
        </div>
      </div>

      {/* Decorative Background Sphere (Also pushed forward) */}
      <div 
        style={{ transform: "translateZ(10px)" }}
        className="absolute bottom-0 right-0 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl -mr-10 -mb-10 pointer-events-none"
      />
    </motion.div>
  );
}