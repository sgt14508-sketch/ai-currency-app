import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExchangeAlt } from "react-icons/fa";
import { currencies } from "../data/mockData";
import useCountUp from "../hooks/useCountUp";

export default function CurrencyConverter() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amount, setAmount] = useState(100);
  const [rotated, setRotated] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const fromRate = currencies.find((c) => c.code === from)?.rate || 1;
  const toRate = currencies.find((c) => c.code === to)?.rate || 1;
  const result = (amount / fromRate) * toRate;
  const animatedResult = useCountUp(showResult ? result : 0, 1200, 2);

  const handleSwap = () => {
    setRotated(!rotated);
    setFrom(to);
    setTo(from);
  };

  const handleConvert = () => {
    setShowResult(false);
    setTimeout(() => setShowResult(true), 50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-white font-bold mb-5">⚡ Instant AI Converter</h3>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-400">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-black/30 border border-cyan-400/30 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 bg-black/30 border border-cyan-400/30 rounded-xl px-3 py-3 text-white outline-none"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
            ))}
          </select>

          <motion.button
            onClick={handleSwap}
            animate={{ rotate: rotated ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-400/20 border border-cyan-400 text-cyan-400"
          >
            <FaExchangeAlt />
          </motion.button>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 bg-black/30 border border-cyan-400/30 rounded-xl px-3 py-3 text-white outline-none"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
            ))}
          </select>
        </div>

        <motion.button
          onClick={handleConvert}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-lg animate-glowPulse"
        >
          Convert Now
        </motion.button>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center bg-black/30 rounded-xl p-4 border border-emerald-400/30"
            >
              <p className="text-gray-400 text-xs">Converted Amount</p>
              <p className="text-emerald-400 text-2xl font-bold font-mono">
                {animatedResult} {to}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
