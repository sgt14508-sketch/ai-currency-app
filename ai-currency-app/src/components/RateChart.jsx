import {
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
