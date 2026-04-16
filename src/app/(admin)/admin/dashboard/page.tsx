"use client";

import { Ticket, Users, Calendar, DollarSign, ArrowUpRight, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";

const stats = [
  { label: "Total Revenue", value: "$12,450", icon: DollarSign, color: "text-green-500" },
  { label: "Total Users", value: "1,200", icon: Users, color: "text-blue-500" },
  { label: "Active Events", value: "45", icon: Calendar, color: "text-purple-500" },
  { label: "Coupons Used", value: "150", icon: Ticket, color: "text-orange-500" },
];

export default function AdminDashboard() {
  const router = useRouter();

  // সরাসরি সাইন আউট ফাংশন
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
      // Fail-safe: API কাজ না করলেও জোর করে রিডাইরেক্ট করা
      router.push("/login");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Simple Logout Button */}
      <div className="flex justify-between items-center bg-white/[0.02] p-6 rounded-3xl border border-white/5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">
            Dashboard <span className="text-blue-500">Overview</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            Platform Metrics
          </p>
        </div>

        {/* Normal Logout Button */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          <LogOut size={16} /> 
          LOGOUT
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] group transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <ArrowUpRight className="text-slate-600 group-hover:text-blue-500" size={18} />
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 overflow-hidden">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-left text-slate-400">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-600 text-[10px] uppercase tracking-widest border-b border-white/5">
                <th className="pb-4 px-2">User</th>
                <th className="pb-4 px-2">Code</th>
                <th className="pb-4 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-[11px]">
              {[1, 2, 3].map((_, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-4 px-2 text-slate-300">user_{i}@example.com</td>
                  <td className="py-4 px-2 text-blue-500 font-mono">WELCOME10</td>
                  <td className="py-4 px-2">
                    <span className="text-green-500 text-[9px] font-bold">● SUCCESS</span>
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