import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  // State to track which passwords are currently visible
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("app_users")) || {};
    const userList = Object.keys(savedUsers).map((email) => ({
      email,
      password: savedUsers[email].password,
      role: savedUsers[email].role,
    }));
    setUsers(userList);
  }, []);

  const togglePassword = (email) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [email]: !prev[email],
    }));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 mb-8 border border-emerald-500/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold flex items-center gap-2 text-xl">
          <ShieldCheck className="text-emerald-400" /> Admin Control Panel
        </h3>
        <span className="bg-emerald-400/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
          <Users className="w-4 h-4" /> {users.length} Total Users
        </span>
      </div>

      <div className="bg-black/30 rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-white/5 text-gray-400 border-b border-white/10">
            <tr>
              <th className="px-6 py-3 font-medium">Email Address</th>
              <th className="px-6 py-3 font-medium">Password</th>
              <th className="px-6 py-3 font-medium">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((u, i) => (
              <tr key={i} className="hover:bg-white/5 transition">
                <td className="px-6 py-4 text-white">{u.email}</td>
                
                {/* SECURE PASSWORD CELL */}
                <td className="px-6 py-4 font-mono text-cyan-400 flex items-center gap-3">
                  <span className="w-24">
                    {visiblePasswords[u.email] ? u.password : "••••••••"}
                  </span>
                  <button 
                    onClick={() => togglePassword(u.email)}
                    className="text-gray-500 hover:text-white transition"
                    title="Toggle Password Visibility"
                  >
                    {visiblePasswords[u.email] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </td>

                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-4 text-center">Note: Passwords are stored locally for demo purposes.</p>
    </motion.div>
  );
}