"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, Loader2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
// import { updatePassword } from "@/app/services/user.service"; // এই সার্ভিসটি পরে বানিয়ে নেবেন

export default function SecuritySettings() {
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("New passwords do not match!");
    }
    
    setLoading(true);
    try {
      // await updatePassword(passwords); 
      toast.success("Password updated successfully!");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
      <div className="bg-[#0f0f0f] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <ShieldCheck size={120} className="text-indigo-500" />
        </div>

        <h2 className="text-2xl font-black italic uppercase text-white mb-2">Security <span className="text-indigo-500">Center</span></h2>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-10">Manage your account credentials</p>

        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div className="space-y-4">
            {/* Old Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="password"
                  required
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-indigo-500/50 outline-none transition-all"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">New Password</label>
              <div className="relative">
                <RefreshCcw className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="password"
                  required
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-indigo-500/50 outline-none transition-all"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">Confirm New Password</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="password"
                  required
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-indigo-500/50 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/20"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Update Credentials"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}