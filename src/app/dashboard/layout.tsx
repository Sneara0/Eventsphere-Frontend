"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Ticket, User, Settings, LogOut, Bell, Loader2 } from "lucide-react";
import { toast } from "sonner";
// import { logoutUser } from "@/app/services/auth.service"; // আপনার লগআউট সার্ভিস

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ১. Protected Route Check (লগইন করা আছে কি না দেখা)
  useEffect(() => {
    const checkAuth = async () => {
      // এখানে আপনার অউথ চেকিং লজিক (যেমন কুকি বা লোকাল স্টোরেজ চেক)
      const isLoggedIn = true; // এটি আপনার auth state থেকে আসবে
      
      if (!isLoggedIn) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  // ২. Logout Functionality
  const handleLogout = async () => {
    try {
      // await logoutUser(); // ব্যাকএন্ড থেকে সেশন ক্লিয়ার করা
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="text-indigo-500 animate-spin" size={40} />
      </div>
    );
  }

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
    { name: "My Bookings", icon: <Ticket size={20} />, href: "/dashboard/bookings" },
    { name: "Profile Settings", icon: <User size={20} />, href: "/dashboard/profile" },
    { name: "Security", icon: <Settings size={20} />, href: "/dashboard/security" },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      {/* Sidebar - Desktop */}
      <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] hidden md:flex flex-col p-6 fixed h-full z-50">
        <div className="mb-10 px-2 text-2xl font-black italic tracking-tighter uppercase text-indigo-500">
          EventSphere
        </div>
        
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition-all text-gray-400 hover:text-white group"
            >
              <span className="group-hover:text-indigo-500 transition-colors">{item.icon}</span>
              <span className="font-bold text-[11px] uppercase tracking-[0.2em]">{item.name}</span>
            </Link>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/5 rounded-2xl transition-all font-black text-[11px] uppercase tracking-[0.2em] mt-auto border border-transparent hover:border-red-500/10"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-10 bg-[#0f0f0f]/50 backdrop-blur-md p-5 rounded-[2.5rem] border border-white/5 sticky top-4 z-40">
          <div className="pl-2">
            <h2 className="text-xl font-black uppercase italic leading-none">
              Welcome back, <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-4">Sneara</span>
            </h2>
            <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em] mt-2 opacity-60">
              Control Center v3.1 • Active Session
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification */}
            <button className="relative p-3 bg-white/5 rounded-2xl hover:bg-indigo-500/10 text-gray-400 hover:text-indigo-500 transition-all border border-white/5">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full animate-pulse border border-[#050505]" />
            </button>
            
            {/* User Avatar */}
            <div className="group relative cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-[1px]">
                <div className="w-full h-full bg-[#0f0f0f] rounded-[15px] flex items-center justify-center font-black text-white group-hover:bg-transparent transition-all">
                  S
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="min-h-[calc(100vh-200px)]">
          {children}
        </div>
      </main>
    </div>
  );
}