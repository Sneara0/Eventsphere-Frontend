"use client";

import React from "react";
import { 
  Ticket, 
  Users, 
  Calendar, 
  DollarSign, 
  ArrowUpRight, 
  LogOut 
} from "lucide-react";
import { useRouter } from "next/navigation";

const stats = [
  { label: "Total Revenue", value: "$12,450", icon: DollarSign, color: "text-green-500" },
  { label: "Total Users", value: "1,200", icon: Users, color: "text-blue-500" },
  { label: "Active Events", value: "45", icon: Calendar, color: "text-purple-500" },
  { label: "Coupons Used", value: "150", icon: Ticket, color: "text-orange-500" },
];

export default function AdminDashboard() {
  const router = useRouter();

  // --- DIRECT LOGOUT FUNCTION (No API Dependency) ---
  const handleLogout = () => {
    // 1. Manually expire the Better-Auth session cookie
    document.cookie = "better-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // 2. Clear any local storage/session storage
    localStorage.clear();
    sessionStorage.clear();

    // 3. Instant Redirect to login
    router.push("/login");
    
    // 4. Force a refresh to reset the App State
    router.refresh();
  };

  return (
    <div className="space-y-8 p-6 lg:p-10 min-h-screen bg-[#0a0a0a] text-white">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-6 rounded-[2rem]">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">
            Dashboard <span className="text-blue-500">Overview</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
            Real-time platform metrics
          </p>
        </div>

        {/* LOGOUT BUTTON */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 cursor-pointer shadow-lg shadow-red-600/20"
        >
          <LogOut size={16} /> 
          Logout
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] hover:border-blue-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight className="text-slate-600 group-hover:text-blue-500 transition-colors" size={20} />
            </div>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8">
        <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-left">Recent Coupon Redemptions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                <th className="pb-4 px-4 font-black">User</th>
                <th className="pb-4 px-4 font-black">Coupon Code</th>
                <th className="pb-4 px-4 font-black">Discount</th>
                <th className="pb-4 px-4 font-black">Status</th>
              </tr>
            </thead>
            <tbody className="text-[11px] font-bold">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                  <td className="py-4 px-4">user_{i}@example.com</td>
                  <td className="py-4 px-4 text-blue-500 font-mono tracking-tighter">WELCOME10</td>
                  <td className="py-4 px-4">$10.00</td>
                  <td className="py-4 px-4">
                    <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[9px]">SUCCESS</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}