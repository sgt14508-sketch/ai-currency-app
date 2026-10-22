import { motion } from "framer-motion";
import { useState } from "react";

export default function CurrencyCard({ currency, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setFlipped(!flipped)}
      className="relative h-40 cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        <div
          className="absolute inset-0 glass rounded-2xl p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex justify-between items-center">
            <img
              src={`https://flagcdn.com/w80/${currency.flagCode}.png`}
              alt={currency.code}
              className="w-10 h-10 rounded-full object-cover border border-white/10"
            />
            <motion.span
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{currency.code}</h3>
            <p className="text-gray-400 text-xs">{currency.name}</p>
          </div>
          <p className="text-cyan-400 font-mono text-xl">
            {currency.rate.toFixed(3)}
          </p>
        </div>

        <div
          className="absolute inset-0 glass rounded-2xl p-5 flex flex-col justify-center items-center bg-cyan-500/10"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-white text-sm text-center">
            1 USD = <span className="text-cyan-400 font-bold">{currency.rate}</span> {currency.code}
          </p>
          <p className="text-gray-400 text-xs mt-2">Tap to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}