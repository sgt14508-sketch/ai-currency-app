const fs = require("fs");
const path = require("path");

const files = {
  "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(140px) rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(34,211,238,0.6)' },
          '50%': { boxShadow: '0 0 25px rgba(34,211,238,0.9)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        orbit: 'orbit 12s linear infinite',
        orbitReverse: 'orbit 18s linear infinite reverse',
        float: 'float 6s ease-in-out infinite',
        glowPulse: 'glowPulse 2s ease-in-out infinite',
        gradientShift: 'gradientShift 8s ease infinite',
        ticker: 'ticker 25s linear infinite',
      },
    },
  },
  plugins: [],
}
`,

  "src/index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: #0a0e1a;
  overflow-x: hidden;
}

.gradient-bg {
  background: linear-gradient(-45deg, #0a0e1a, #111827, #0f172a, #1e1b4b);
  background-size: 400% 400%;
  animation: gradientShift 10s ease infinite;
}

.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-thumb { background: #22d3ee55; border-radius: 10px; }
`,

  "src/main.jsx": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,

  "src/App.jsx": `import Navbar from "./components/Navbar";
import LiveTicker from "./components/LiveTicker";
import FloatingBackground from "./components/FloatingBackground";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="gradient-bg min-h-screen relative">
      <FloatingBackground />
      <Navbar />
      <LiveTicker />
      <Dashboard />
    </div>
  );
}

export default App;
`,

  "src/hooks/useCountUp.js": `import { useEffect, useState, useRef } from "react";

export default function useCountUp(end, duration = 1500, decimals = 2) {
  const [value, setValue] = useState(0);
  const startTime = useRef(null);

  useEffect(() => {
    startTime.current = null;
    let frame;
    const step = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  return value.toFixed(decimals);
}
`,

  "src/data/mockData.js": `export const currencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", rate: 1 },
  { code: "EUR", name: "Euro", flag: "🇪🇺", rate: 0.92 },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", rate: 0.78 },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳", rate: 83.12 },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", rate: 149.5 },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", rate: 1.52 },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", rate: 1.36 },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", rate: 7.24 },
];

export const chartData = [
  { time: "Mon", rate: 82.9 },
  { time: "Tue", rate: 83.1 },
  { time: "Wed", rate: 82.7 },
  { time: "Thu", rate: 83.4 },
  { time: "Fri", rate: 83.6 },
  { time: "Sat", rate: 83.2 },
  { time: "Sun", rate: 83.12 },
];

export const aiMessages = [
  "📈 USD/INR likely to rise 0.4% in next 48 hours based on bond yield trends.",
  "⚠️ High volatility detected in GBP due to upcoming policy announcement.",
  "💡 Best time to convert EUR→USD: within next 3 hours (rate dip predicted).",
  "🔒 No fraud patterns detected in your last 10 transactions.",
  "🌐 JPY showing bullish momentum — consider holding before converting.",
];

export const transactions = [
  { id: 1, from: "USD", to: "INR", amount: 500, result: 41560, time: "2 min ago" },
  { id: 2, from: "EUR", to: "GBP", amount: 200, result: 169.2, time: "15 min ago" },
  { id: 3, from: "GBP", to: "USD", amount: 150, result: 192.3, time: "1 hr ago" },
  { id: 4, from: "INR", to: "USD", amount: 10000, result: 120.3, time: "3 hr ago" },
];
`,

  "src/components/FloatingBackground.jsx": `import { motion } from "framer-motion";

const symbols = ["$", "€", "¥", "£", "₹", "₩", "₽", "฿"];

export default function FloatingBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {symbols.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-cyan-400/10 font-bold select-none"
          style={{
            fontSize: \`\${40 + i * 10}px\`,
            top: \`\${(i * 13) % 90}%\`,
            left: \`\${(i * 23) % 90}%\`,
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
`,

  "src/components/Navbar.jsx": `import { motion } from "framer-motion";
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
`,

  "src/components/LiveTicker.jsx": `import { currencies } from "../data/mockData";

export default function LiveTicker() {
  const list = [...currencies, ...currencies];

  return (
    <div className="relative w-full overflow-hidden glass border-y border-cyan-400/20 py-3">
      <div className="flex w-max animate-ticker">
        {list.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-6 text-sm text-gray-300 whitespace-nowrap"
          >
            <span className="text-lg">{c.flag}</span>
            <span className="font-semibold text-white">{c.code}</span>
            <span className="text-cyan-400">{c.rate.toFixed(2)}</span>
            <span className="text-emerald-400 text-xs">▲ 0.0{i % 5}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,

  "src/components/CurrencyCard.jsx": `import { motion } from "framer-motion";
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
            <span className="text-3xl">{currency.flag}</span>
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
`,

  "src/components/AIInsights.jsx": `import { useState, useEffect } from "react";
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
`,

  "src/components/RateChart.jsx": `import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { chartData } from "../data/mockData";

export default function RateChart() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-white font-bold mb-4">USD → INR (7 Day Trend)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{ background: "#0f172a", border: "1px solid #22d3ee55" }}
            labelStyle={{ color: "#22d3ee" }}
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#22d3ee"
            strokeWidth={3}
            fill="url(#colorRate)"
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
`,

  "src/components/CurrencyConverter.jsx": `import { useState } from "react";
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
`,

  "src/components/TransactionHistory.jsx": `import { motion } from "framer-motion";
import { transactions } from "../data/mockData";
import { FaArrowRight } from "react-icons/fa";

export default function TransactionHistory() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-white font-bold mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {transactions.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ x: 5, backgroundColor: "rgba(34,211,238,0.05)" }}
            className="flex items-center justify-between p-3 rounded-xl border border-white/5"
          >
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <span className="font-bold text-white">{t.from}</span>
              <FaArrowRight className="text-cyan-400" />
              <span className="font-bold text-white">{t.to}</span>
            </div>
            <div className="text-right">
              <p className="text-white text-sm font-mono">{t.amount} → {t.result}</p>
              <p className="text-gray-500 text-xs">{t.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
`,

  "src/components/Dashboard.jsx": `import { currencies } from "../data/mockData";
import CurrencyCard from "./CurrencyCard";
import AIInsights from "./AIInsights";
import RateChart from "./RateChart";
import CurrencyConverter from "./CurrencyConverter";
import TransactionHistory from "./TransactionHistory";
import useCountUp from "../hooks/useCountUp";
import { motion } from "framer-motion";

export default function Dashboard() {
  const portfolioValue = useCountUp(128450.75, 2000, 2);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <p className="text-gray-400 text-sm tracking-widest uppercase">
          Total Portfolio Value
        </p>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          \${portfolioValue}
        </h1>
        <p className="text-emerald-400 text-sm">▲ +2.4% today — AI predicts stable growth</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currencies.map((c, i) => (
          <CurrencyCard key={c.code} currency={c} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RateChart />
          <TransactionHistory />
        </div>
        <div className="space-y-6">
          <CurrencyConverter />
          <AIInsights />
        </div>
      </div>
    </div>
  );
}
`,
};

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  const dir = path.dirname(fullPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("✅ Created:", filePath);
});

console.log("\n🎉 All files created successfully! Run: npm run dev");