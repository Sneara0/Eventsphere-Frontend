"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { 
  Menu, X, Sparkles, Home, Ticket, LayoutDashboard, 
  CreditCard, LogOut, Loader2, PlusCircle, Settings, HelpCircle 
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const handleLogout = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      setIsOpen(false);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
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
      <header className="fixed top-0 left-0 w-full z-[1000] bg-[#020617]/85 backdrop-blur-2xl border-b border-white/[0.03] py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 relative z-[1001] group">
              {/* --- ADVANCED PREDIUM LOGO DESIGN --- */}
              <div className="relative w-11 h-11 flex items-center justify-center">
                
                {/* 1. কসমিক গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড রিং (animated) */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-500 to-purple-600 rounded-2xl opacity-80 blur-[2px] group-hover:opacity-100 group-hover:rotate-180 transition-all duration-1000 ease-in-out" />
                
                {/* 2. ইনার কন্টেইনার (লোগো হোল্ডার) */}
                <div className="absolute inset-[2.5px] bg-[#020617] rounded-[13px] z-10 flex items-center justify-center overflow-hidden border border-white/5">
                  
                  {/* লোগো ইমেজ উইথ ডাইনামিক অ্যানিমেশন */}
                  <img 
                    src="/event logo.png" 
                    alt="EventSphere" 
                    className="w-[85%] h-[85%] object-contain relative z-20 
                               transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                               group-hover:scale-110 group-hover:rotate-[-10deg]" 
                  />

                  {/* হালকা ওভারলে গ্রেডিয়েন্ট */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-15" />
                </div>

                {/* 3. নিয়ন গ্লো ইফেক্ট (পেছনে) - মাউস নিলে পালস করবে */}
                <div className="absolute -inset-1.5 bg-primary/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 z-0" />
              </div>
              
              {/* টেক্সট লোগো - আরও স্টাইলিশ */}
              <span className="text-2xl font-black tracking-tighter italic uppercase text-white group-hover:text-primary transition-colors">
                Event<span className="text-primary group-hover:text-white transition-colors">.</span>Sphere
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    pathname === link.href ? "bg-primary text-primary-foreground shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 relative z-[1001]">
            <div className="hidden sm:flex items-center gap-3">
              {isPending ? (
                <Loader2 className="animate-spin text-primary" size={18} />
              ) : isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <Link href="/create-event" className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl hover:bg-emerald-500 hover:text-white transition-all">
                    <PlusCircle size={14} /> Host Event
                  </Link>

                  <div className="flex items-center gap-4 border-l border-white/10 pl-4">
                    <Link href="/dashboard" className="relative group/avatar text-white">
                      <div className="w-10 h-10 rounded-2xl border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center">
                        {session.user.image ? (
                          <img src={session.user.image} className="w-full h-full object-cover" alt="Profile" />
                        ) : (
                          <span className="text-primary font-black uppercase text-sm">{session.user.name?.[0]}</span>
                        )}
                      </div>
                    </Link>
                  </div>

                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <LogOut size={14} /> Exit
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-5 mr-2">
                  <Link href="/login" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Login</Link>
                  <Link href="/register" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20">Join Free</Link>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`md:hidden p-2.5 rounded-xl transition-all active:scale-90 ${isOpen ? 'bg-rose-600 text-white' : 'bg-primary text-primary-foreground'}`}
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
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={`flex flex-col gap-4 p-6 rounded-[2rem] border transition-all ${
                  pathname === link.href ? "bg-primary border-primary shadow-2xl" : `${link.bg} border-white/5`
                }`}
              >
                <div className="w-fit p-2.5 rounded-xl bg-white/10">{link.icon}</div>
                <span className="font-black text-[10px] tracking-[0.2em] uppercase italic text-white">{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="space-y-3 mb-8">
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
                <div className="flex items-center gap-4 text-white/50 group-hover:text-white transition-colors">
                  {item.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest italic">{item.name}</span>
                </div>
                <Sparkles size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            ))}
          </div>

          <div className="mt-auto pb-10 space-y-4">
            {isLoggedIn && (
              <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] border border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-black text-xl">{session.user.name?.[0]}</div>
                <div className="min-w-0">
                  <h3 className="text-white font-black text-sm truncate uppercase italic">{session.user.name}</h3>
                  <p className="text-primary text-[9px] font-bold uppercase tracking-widest mt-1">Verified Member</p>
                </div>
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] bg-rose-600/20 border border-rose-600/30 text-rose-500 font-black text-[10px] tracking-[0.2em] uppercase hover:bg-rose-600 hover:text-white transition-all"
            >
              <LogOut size={16} /> Sign Out Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}