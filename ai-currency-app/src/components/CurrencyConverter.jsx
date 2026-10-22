import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRightLeft } from "lucide-react";
import { currencies } from "../data/mockData";
import useCountUp from "../hooks/useCountUp";

function FlagIcon({ flagCode, className = "w-7 h-7" }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${flagCode}.png`}
      alt={flagCode}
      className={`${className} rounded-full object-cover shrink-0 border border-white/10`}
    />
  );
}

function CurrencyDropdown({ selected, onSelect, align = "left" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-black/30 border border-cyan-400/30 rounded-xl px-3 py-2.5 hover:border-cyan-400/60 transition"
      >
        <FlagIcon flagCode={selected.flagCode} className="w-6 h-6" />
        <span className="text-white font-semibold text-sm">{selected.code}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 mt-2 w-56 max-h-64 overflow-y-auto rounded-xl border border-cyan-400/20 shadow-2xl p-1.5 bg-[#0d1424] ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  onSelect(c);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-cyan-400/10 transition ${
                  c.code === selected.code ? "bg-cyan-400/10" : ""
                }`}
              >
                <FlagIcon flagCode={c.flagCode} className="w-7 h-7" />
                <div>
                  <p className="text-white text-sm font-semibold">{c.code}</p>
                  <p className="text-gray-400 text-xs">{c.name}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CurrencyConverter() {
  const [from, setFrom] = useState(currencies[0]);
  const [to, setTo] = useState(currencies[3]);
  const [amount, setAmount] = useState(100);
  const [rotated, setRotated] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const availableBalance = 16058.94;
  const result = (amount / from.rate) * to.rate;
  const animatedResult = useCountUp(showResult ? result : 0, 1200, 2);

  const handleSwap = () => {
    setRotated(!rotated);
    const temp = from;
    setFrom(to);
    setTo(temp);
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
      className="glass rounded-2xl p-6 relative"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-bold flex items-center gap-2">
          ⚡ Instant AI Converter
        </h3>
        <span className="text-xs text-gray-400 hover:text-cyan-400 cursor-pointer transition">
          Currencies
        </span>
      </div>

      <div className="relative flex items-center justify-between gap-2 bg-black/20 border border-white/5 rounded-xl p-3 mb-6">
        <CurrencyDropdown selected={from} onSelect={setFrom} align="left" />

        <motion.button
          onClick={handleSwap}
          animate={{ rotate: rotated ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-cyan-400/15 border border-cyan-400/40 text-cyan-400"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </motion.button>

        <CurrencyDropdown selected={to} onSelect={setTo} align="right" />
      </div>

      <div className="text-center mb-5">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full bg-transparent text-center text-5xl font-extrabold text-white outline-none tracking-tight"
        />
        <p className="text-gray-400 text-sm mt-2">
          Available:{" "}
          <span className="text-cyan-400 font-semibold">
            {availableBalance.toLocaleString("en-US", {
              style: "currency",
              currency: from.code,
            })}
          </span>
        </p>
      </div>

      <div className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-center text-sm text-gray-300 mb-5">
        1 {from.code} = {(to.rate / from.rate).toFixed(4)} {to.code}
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
            className="mt-4 text-center bg-black/30 rounded-xl p-4 border border-emerald-400/30"
          >
            <p className="text-gray-400 text-xs">Converted Amount</p>
            <p className="text-emerald-400 text-2xl font-bold font-mono">
              {animatedResult} {to.code}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}