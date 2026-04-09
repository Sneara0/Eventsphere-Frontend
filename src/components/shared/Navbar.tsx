"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { 
  Zap, Menu, X, Search, LogIn, UserPlus, 
  Home, Ticket, LayoutDashboard, CreditCard, LogOut, Sparkles, 
  Loader2, PlusCircle, Settings, HelpCircle, User
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 
  const pathname = usePathname();
  const router = useRouter();

  // Better Auth Session Hook
  const { data: session, isPending } = authClient.useSession();
  
  // সেশন থাকলে ট্রু হবে
  const isLoggedIn = !!session;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsOpen(false);
            window.location.href = "/login";
          },
          onError: (ctx) => {
            console.error("Logout failed:", ctx.error);
            window.location.href = "/login";
          }
        },
      });
    } catch (error) {
      console.error("Unexpected logout error:", error);
      window.location.href = "/login";
    }
  };

  if (!mounted) return null; 

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} />, bg: "bg-blue-600/10 border-blue-500/20 text-blue-400" },
    { name: "Events", href: "/events", icon: <Sparkles size={18} />, bg: "bg-purple-600/10 border-purple-500/20 text-purple-400" },
    { name: "Bookings", href: "/bookings", icon: <Ticket size={18} />, bg: "bg-rose-600/10 border-rose-500/20 text-rose-400" },
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} />, bg: "bg-emerald-600/10 border-emerald-500/20 text-emerald-400" },
  ];

  return (
    <>
      {/* --- Main Header --- */}
      <header className="fixed top-0 left-0 w-full z-[1000] bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative z-[1001] group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg group-hover:rotate-6 transition-transform">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tighter italic uppercase text-white">
              Event<span className="text-primary">.</span>Sphere
            </span>
          </Link>

          <div className="flex items-center gap-3 relative z-[1001]">
            {/* Desktop Auth Section */}
            <div className="hidden sm:flex items-center gap-3">
              {isPending ? (
                <Loader2 className="animate-spin text-primary" size={18} />
              ) : (
                <div className="flex items-center gap-3">
                  {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                      {/* Host Event Button */}
                      <Link href="/create-event" className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl hover:bg-emerald-500 hover:text-white transition-all">
                        <PlusCircle size={14} /> Host Event
                      </Link>

                      {/* Active Identity Text & Profile */}
                      <div className="flex items-center gap-4 border-l border-white/10 pl-4">
                        <div className="flex flex-col items-end hidden lg:block">
                          <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] leading-none mb-1">Active Identity</span>
                          <p className="text-[11px] text-white font-black tracking-tight uppercase italic leading-none">
                            {session.user.name || "User"}
                          </p>
                        </div>
                        
                        <Link href="/dashboard" className="relative group/avatar">
                          <div className="w-10 h-10 rounded-2xl border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center group-hover/avatar:border-primary/50 transition-all shadow-xl shadow-primary/5">
                            {session.user.image ? (
                              <img 
                                src={session.user.image} 
                                className="w-full h-full object-cover" 
                                alt="Profile"
                                onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${session.user.name}&background=6366f1&color=fff`; }}
                              />
                            ) : (
                              <span className="text-primary font-black uppercase text-sm">
                                {session.user.name?.[0]}
                              </span>
                            )}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#020617] rounded-full shadow-lg"></div>
                        </Link>
                      </div>

                      {/* Sign Out Button */}
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all"
                      >
                        <LogOut size={14} /> <span className="hidden md:inline">Exit</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-5 mr-2">
                      <Link href="/login" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Login</Link>
                      <Link href="/register" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">Join Free</Link>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2.5 rounded-xl shadow-xl transition-all active:scale-90 ${isOpen ? 'bg-rose-600 text-white' : 'bg-primary text-primary-foreground'}`}
            >
              {isOpen ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- Fullscreen Mobile Menu --- */}
      <div className={`fixed inset-0 z-[999] transition-all duration-700 ease-[cubic-bezier(0.85, 0, 0.15, 1)] ${
          isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
        }`}>
        
        <div className="absolute inset-0 bg-[#020617]/98 backdrop-blur-3xl" onClick={() => setIsOpen(false)} />
        
        <div className="relative h-full flex flex-col p-8 pt-28 max-w-lg mx-auto overflow-y-auto">
          
          <div className="relative mb-8">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" size={16} />
             <input 
                type="text" 
                placeholder="Find events..." 
                className="w-full bg-white/5 border border-white/10 p-4 pl-11 rounded-2xl text-sm text-white placeholder:text-white/20 outline-none focus:border-primary/50 transition-all"
             />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`flex flex-col gap-4 p-6 rounded-[2rem] border transition-all duration-300 ${
                    isActive 
                    ? "bg-primary border-primary shadow-2xl shadow-primary/40 -translate-y-1" 
                    : `${link.bg} border-white/5`
                  }`}
                >
                  <div className={`w-fit p-2.5 rounded-xl ${isActive ? "bg-white/20" : "bg-white/10"}`}>
                    {link.icon}
                  </div>
                  <span className={`font-black text-[10px] tracking-[0.2em] uppercase italic ${isActive ? "text-white" : "text-white/60"}`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-3 mb-10">
            {[
              { name: "Payments", href: "/dashboard", icon: <CreditCard size={18} /> },
              { name: "Settings", href: "/dashboard", icon: <Settings size={18} /> },
              { name: "Help Support", href: "/help", icon: <HelpCircle size={18} /> }
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/10 hover:bg-white/10 group transition-all"
              >
                <div className="flex items-center gap-4 text-white/50 group-hover:text-white">
                  {item.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest italic">{item.name}</span>
                </div>
                <Sparkles size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          <div className="mt-auto pb-10 space-y-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] border border-white/10">
                {session.user.image ? (
                  <img 
                    src={session.user.image} 
                    className="w-14 h-14 rounded-2xl border-2 border-primary/30 object-cover" 
                    alt="Avatar"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl border-2 border-primary/30 bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                    {session.user.name?.[0]}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-white font-black text-sm truncate tracking-widest uppercase italic">{session.user.name}</h3>
                  <p className="text-primary text-[9px] font-bold uppercase tracking-[0.2em] mt-1">Verified Member</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-5 rounded-[1.5rem] bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest gap-2">
                  <LogIn size={16} /> Login
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-5 rounded-[1.5rem] bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20">
                  <UserPlus size={16} /> Join Free
                </Link>
              </div>
            )}

            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] bg-rose-600/20 border border-rose-600/30 text-rose-500 font-black text-[10px] tracking-[0.2em] uppercase hover:bg-rose-600 hover:text-white transition-all shadow-lg active:scale-95"
            >
              <LogOut size={16} /> Sign Out Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}