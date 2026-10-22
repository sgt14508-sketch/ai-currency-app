import { useState } from "react";
import { currencies } from "../data/mockData";
import CurrencyCard from "./CurrencyCard";
import AIInsights from "./AIInsights";
import RateChart from "./RateChart";
import CurrencyConverter from "./CurrencyConverter";
import TransactionHistory from "./TransactionHistory";
import useCountUp from "../hooks/useCountUp";
import { motion } from "framer-motion";

export default function Dashboard() {
  const portfolioValue = useCountUp(128450.75, 2000, 2);
  
  // NEW: State to track which currency is clicked
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

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
          ${portfolioValue}
        </h1>
        <p className="text-emerald-400 text-sm">▲ +2.4% today — AI predicts stable growth</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currencies.map((c, i) => (
          <CurrencyCard 
            key={c.code} 
            currency={c} 
            index={i} 
            onClick={() => setSelectedCurrency(c.code)}
            isSelected={selectedCurrency === c.code}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Pass the selected currency to the chart */}
          <RateChart selectedCurrency={selectedCurrency} />
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