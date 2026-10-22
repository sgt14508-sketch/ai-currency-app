import { motion } from "framer-motion";
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
