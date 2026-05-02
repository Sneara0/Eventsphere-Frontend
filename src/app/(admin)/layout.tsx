"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Ticket, Users, Settings, 
  LogOut, Sparkles, Bell, Search, Menu, X 
} from "lucide-react";
import ChatBot from "@/components/ai/ChatBot"; // গ্লোবাল চ্যাটবট

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/admin/dashboard" },
    { icon: Ticket, label: "Coupons", href: "/admin/coupons" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      
      {/* --- ১. গ্লোবাল সাইডবার --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white/[0.02] backdrop-blur-2xl border-r border-white/5 p-6 transition-transform duration-300
        md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <Sparkles className="text-blue-500 w-6 h-6" />
            <span className="font-black italic tracking-tighter text-xl">EVENT.SPHERE</span>
          </div>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}><X /></button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-[11px] uppercase tracking-widest ${
                pathname === item.href 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-slate-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="absolute bottom-10 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-500 font-bold text-[11px] uppercase tracking-widest hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* কন্টেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* --- ২. গ্লোবাল টপ হেডার --- */}
        <header className="h-20 border-b border-white/5 bg-[#020617]/50 backdrop-blur-md flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 bg-white/5 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search analytics or events..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs outline-none focus:ring-1 ring-blue-500 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#020617]"></span>
            </button>
            
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <div className="text-right hidden xs:block">
                <p className="text-[10px] font-bold text-white uppercase">Admin Name</p>
                <p className="text-[9px] text-blue-500 font-medium uppercase tracking-widest">Verified</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-sm shadow-inner">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* --- ৩. মেইন পেজ কন্টেন্ট --- */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative custom-scrollbar">
          {children}

          {/* --- ৪. ফ্লোটিং এআই চ্যাটবট (গ্লোবাল) --- */}
          <ChatBot />
        </main>
      </div>

      {/* মোবাইল সাইডবার ওভারলে */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}