import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import { aiMessages } from "../data/mockData";

export default function AIInsights() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < aiMessages[index].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + aiMessages[index][charIndex]);
        setCharIndex((c) => c + 1);
      }, 25);
      return () => clearTimeout(timeout);
    } else {
      const pause = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setIndex((i) => (i + 1) % aiMessages.length);
      }, 2500);
      return () => clearTimeout(pause);
    }
  }, [charIndex, index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-float" />
      
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center"
        >
          <FaRobot className="text-white" />
        </motion.div>
        <div>
          <h3 className="text-white font-bold">AI Market Assistant</h3>
          <p className="text-xs text-gray-400">Analyzing global trends...</p>
        </div>
      </div>

      <div className="min-h-[60px] bg-black/20 rounded-xl p-4 border border-cyan-400/20">
        <p className="text-cyan-100 text-sm leading-relaxed">
          {displayText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-cyan-400 ml-1"
          />
        </p>
      </div>
    </motion.div>
  );
}
