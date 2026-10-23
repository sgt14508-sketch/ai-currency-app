import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { currencies } from "../data/mockData";

// Helper to generate realistic historical data
const generateData = (baseRate, range, currencyCode) => {
  const data = [];
  let points = 7;

  if (range === "1M") points = 30;
  if (range === "6M") points = 6;
  if (range === "1Y") points = 12;
  if (range === "5Y") points = 5;

  const now = new Date();
  const seed = currencyCode.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  for (let i = points - 1; i >= 0; i--) {
    let date = new Date(now);
    if (range === "1D") date.setHours(now.getHours() - i * 4);
    if (range === "1W") date.setDate(now.getDate() - i);
    if (range === "1M") date.setDate(now.getDate() - i);
    if (range === "6M") date.setMonth(now.getMonth() - i);
    if (range === "1Y") date.setMonth(now.getMonth() - i);
    if (range === "5Y") date.setFullYear(now.getFullYear() - i);

    const fluctuation = Math.sin((i + seed) * 0.5) * (baseRate * 0.02) + (Math.cos(i) * (baseRate * 0.01));
    
    let label = "";
    if (range === "1D") label = date.toLocaleTimeString("en-US", { hour: "numeric" });
    else if (range === "1W" || range === "1M") label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    else if (range === "6M" || range === "1Y") label = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    else if (range === "5Y") label = date.toLocaleDateString("en-US", { year: "numeric" });

    data.push({
      label,
      value: Number((baseRate + fluctuation).toFixed(3)),
    });
  }
  return data;
};

export default function RateChart({ selectedCurrency = "usd", setSelectedCurrency }) {
  const [timeRange, setTimeRange] = useState("1W");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const ranges = ["1D", "1W", "1M", "6M", "1Y", "5Y"];

  // Get the current currency
  const currentCurrency = currencies.find((c) => c.code === selectedCurrency) || currencies[0];
  const dynamicData = generateData(currentCurrency.rate, timeRange, currentCurrency.code);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-6 flex flex-col"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
        
        {/* LEFT SIDE: Currency Selector & Title */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <h3 className="text-white font-bold whitespace-nowrap flex items-center gap-2">
            {currentCurrency.code.toUpperCase()} Trend
          </h3>
          
          {/* New Dropdown for Chart */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-black/40 hover:bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 transition text-sm text-gray-300"
          >
            <img src={`https://flagcdn.com/w40/${currentCurrency.flagCode}.png`} alt="flag" className="w-4 h-4 rounded-full" />
            {currentCurrency.name}
            <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-48 bg-[#0d1424] border border-white/10 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto"
              >
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setSelectedCurrency(c.code);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition text-left ${
                      c.code === currentCurrency.code ? "bg-cyan-500/10 text-cyan-400" : "text-gray-300"
                    }`}
                  >
                    <img src={`https://flagcdn.com/w40/${c.flagCode}.png`} alt="flag" className="w-5 h-5 rounded-full" />
                    <span className="text-sm font-medium">{c.code.toUpperCase()}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* RIGHT SIDE: Time Range Selector */}
        <div className="flex bg-black/30 p-1 rounded-lg border border-white/10">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                timeRange === r
                  ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={dynamicData}>
          <defs>
            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis 
            dataKey="label" 
            stroke="#888" 
            fontSize={12}
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
            stroke="#888" 
            fontSize={12}
            tickLine={false} 
            axisLine={false}
            domain={['auto', 'auto']} 
          />
          <Tooltip
            contentStyle={{ background: "#0f172a", border: "1px solid #22d3ee55", borderRadius: "8px" }}
            labelStyle={{ color: "#22d3ee", marginBottom: "4px" }}
            formatter={(value) => [`${value} ${currentCurrency.code.toUpperCase()}`, "Rate"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#22d3ee"
            strokeWidth={3}
            fill="url(#colorRate)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}