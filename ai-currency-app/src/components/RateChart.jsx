import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";
import { currencies } from "../data/mockData";

// Helper to generate realistic historical data based on time range
const generateData = (baseRate, range, currencyCode) => {
  const data = [];
  let points = 7;

  if (range === "1M") points = 30;
  if (range === "6M") points = 6;
  if (range === "1Y") points = 12;
  if (range === "5Y") points = 5;

  const now = new Date();
  // Create a seed based on currency code so the shape stays consistent per currency
  const seed = currencyCode.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  for (let i = points - 1; i >= 0; i--) {
    let date = new Date(now);
    
    if (range === "1D") date.setHours(now.getHours() - i * 4);
    if (range === "1W") date.setDate(now.getDate() - i);
    if (range === "1M") date.setDate(now.getDate() - i);
    if (range === "6M") date.setMonth(now.getMonth() - i);
    if (range === "1Y") date.setMonth(now.getMonth() - i);
    if (range === "5Y") date.setFullYear(now.getFullYear() - i);

    // Create realistic market fluctuations
    const fluctuation = Math.sin((i + seed) * 0.5) * (baseRate * 0.02) + (Math.cos(i) * (baseRate * 0.01));
    
    // Format the date label for the X-Axis
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

export default function RateChart({ selectedCurrency = "usd" }) {
  const [timeRange, setTimeRange] = useState("1W");
  const ranges = ["1D", "1W", "1M", "6M", "1Y", "5Y"];

  // Get the current currency to display correct name and base rate
  const currentCurrency = currencies.find((c) => c.code === selectedCurrency) || currencies[0];
  
  // Generate the data
  const dynamicData = generateData(currentCurrency.rate, timeRange, currentCurrency.code);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-6 flex flex-col"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h3 className="text-white font-bold">
          {currentCurrency.code.toUpperCase()} ({currentCurrency.name}) Trend
        </h3>
        
        {/* Time Range Selector */}
        <div className="flex bg-black/30 p-1 rounded-lg border border-white/10">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                timeRange === r
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
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