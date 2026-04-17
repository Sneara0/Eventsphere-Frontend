"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { 
  Plane, CalendarDays, MapPin, Globe, Search, 
  Zap, Star, Quote, Loader2, ArrowRight, UserPlus, Sparkles, Target,
  Shield, Crown, Rocket, Nfc, CheckCircle2
} from "lucide-react"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data ---
const travelClasses = [
  { id: "economy", name: "Economy", desc: "Smart & Essential", icon: <Rocket size={18} />, price: "৳০" },
  { id: "business", name: "Business", desc: "Premium Workspace", icon: <Shield size={18} />, price: "+৳১৫,০০০" },
  { id: "first", name: "First Class", desc: "Ultimate Luxury", icon: <Crown size={18} />, price: "+৳৩৫,০০০" },
];

const featuredEvents = [
  { id: 1, title: "Cox's Bazar Beach Carnival", location: "DAC ➔ CXB", date: "15-18 MAY", price: "৳৯,৫০০", img: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=600" },
  { id: 2, title: "Dubai Shopping Festival", location: "DAC ➔ DXB", date: "20-25 MAY", price: "৳৫৫,০০০", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600" },
  { id: 3, title: "Sylhet Tea Garden Tour", location: "DAC ➔ ZYL", date: "01-03 JUNE", price: "৳৮,৮০০", img: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=600" },
];

const liveFlights = [
  { id: 1, route: "Dhaka ➔ Dubai", code: "EK-585", time: "10:30 AM", status: "Boarding", price: "৳৪৫,০০০", color: "text-blue-400", bg: "bg-blue-400/10" },
  { id: 2, route: "Dhaka ➔ Cox's Bazar", code: "VQ-921", time: "11:15 AM", status: "On Time", price: "৳৪,৫০০", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { id: 3, route: "Dhaka ➔ Kolkata", code: "AI-230", time: "12:00 PM", status: "Delayed", price: "৳৮,২০৩", color: "text-amber-400", bg: "bg-amber-400/10" },
];

const testimonials = [
  { id: 1, name: "Ariful Islam", role: "Business Traveler", comment: "The booking process was incredibly fast. Next.js 16 speed is real!", rating: 5 },
  { id: 2, name: "Nusrat Jahan", role: "Solo Explorer", comment: "Safe, secure, and very reliable. Best ticketing platform in Dhaka.", rating: 5 },
];

export default function HomePage() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [form, setForm] = useState({ from: "", to: "", date: "" });
  const [selectedClass, setSelectedClass] = useState("economy");

  const handleSearch = () => {
    if (!form.from || !form.to || !form.date) return alert("Please fill all search fields!");
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      router.push("/bookings"); 
    }, 2000);
  };

  const handleBooking = (e: React.MouseEvent, itemName: string) => {
    e.stopPropagation(); 
    router.push("/bookings"); 
  };

  return (
    <div className="min-h-screen bg-[#020408] text-slate-300 antialiased font-sans selection:bg-blue-500/30 tracking-tight overflow-x-hidden">
      <Navbar />

      {/* --- 1. LUXURY HERO & SMART SEARCH --- */}
      <section className="relative pt-44 pb-32 px-6">
        {/* Deep Atmosphere Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] pointer-events-none -z-10">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/15 blur-[160px] rounded-full animate-pulse" />
           <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[140px] rounded-full" />
        </div>
        
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="group cursor-default inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-10 backdrop-blur-md hover:border-blue-500/30 transition-colors"
          >
             <Sparkles size={14} className="text-blue-400 group-hover:rotate-12 transition-transform" />
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Next-Gen Aviation Engine</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-14 uppercase leading-[0.85] italic"
          >
            Elevate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-500/50">Your Journey.</span>
          </motion.h1>

          {/* --- ANIMATED BOARDING PASS --- */}
          <motion.div 
            initial={{ opacity: 0, rotateX: 20 }}
            animate={{ opacity: 1, rotateX: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="w-full max-w-[440px] h-[260px] rounded-[38px] bg-gradient-to-br from-slate-900/80 via-[#0A0C10] to-black p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/10 relative group cursor-pointer mb-20 backdrop-blur-sm overflow-hidden"
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -top-24 -right-24 p-8 opacity-[0.03] group-hover:opacity-10 transition-all duration-1000 group-hover:scale-110">
              <Globe size={300} />
            </div>
            
            <div className="flex justify-between items-start mb-12 relative z-10">
              <div className="w-14 h-9 bg-blue-500/10 rounded-xl border border-blue-500/20 flex items-center justify-center">
                <Nfc size={18} className="text-blue-500" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] italic">Member Card</span>
                <span className="text-[10px] font-bold text-slate-500">2026 Edition</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-10 relative z-10">
              <div className="text-left">
                <h2 className="text-4xl font-black text-white italic tracking-tighter">DAC</h2>
                <p className="text-[10px] font-bold text-slate-600 tracking-widest uppercase mt-1">Dhaka</p>
              </div>
              <div className="flex-1 px-10 relative flex items-center justify-center">
                <div className="w-full h-[1px] bg-white/10" />
                <motion.div 
                    animate={{ x: [-30, 30, -30], rotate: [-45, -45, -45] }} 
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute"
                >
                    <Plane size={18} className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                </motion.div>
              </div>
              <div className="text-right">
                <h2 className="text-4xl font-black text-white italic tracking-tighter">DXB</h2>
                <p className="text-[10px] font-bold text-slate-600 tracking-widest uppercase mt-1">Dubai</p>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-white/5 pt-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-[10px] font-bold text-blue-400">S</div>
                <div>
                  <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest">Passenger</p>
                  <p className="text-[11px] text-white font-black uppercase italic tracking-widest">SNEARA / DEV</p>
                </div>
              </div>
              <div className="text-right">
                 <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[9px] text-blue-400 font-black tracking-widest">ENROLLED</span>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* SEARCH WIDGET */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="w-full max-w-5xl mx-auto relative mb-28"
          >
            <div className="bg-[#0A0C10]/80 border border-white/10 p-3 rounded-[40px] backdrop-blur-3xl shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-10 gap-2">
                <div className="md:col-span-3 flex items-center gap-4 px-8 py-5 bg-white/[0.02] rounded-[32px] border border-white/5 focus-within:border-blue-500/30 transition-all text-left group">
                  <MapPin size={20} className="text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">From</p>
                    <input type="text" placeholder="Origin City" onChange={(e)=>setForm({...form, from: e.target.value})} className="bg-transparent border-none outline-none text-[13px] font-black text-white w-full placeholder:text-slate-700" />
                  </div>
                </div>
                <div className="md:col-span-3 flex items-center gap-4 px-8 py-5 bg-white/[0.02] rounded-[32px] border border-white/5 focus-within:border-blue-500/30 transition-all text-left group">
                  <Target size={20} className="text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">To</p>
                    <input type="text" placeholder="Destination" onChange={(e)=>setForm({...form, to: e.target.value})} className="bg-transparent border-none outline-none text-[13px] font-black text-white w-full placeholder:text-slate-700" />
                  </div>
                </div>
                <div className="md:col-span-2 flex items-center gap-4 px-8 py-5 bg-white/[0.02] rounded-[32px] border border-white/5 focus-within:border-blue-500/30 transition-all text-left group">
                  <CalendarDays size={20} className="text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">When</p>
                    <input type="date" onChange={(e)=>setForm({...form, date: e.target.value})} className="bg-transparent border-none outline-none text-[12px] font-bold text-white w-full [color-scheme:dark]" />
                  </div>
                </div>
                <button 
                  onClick={handleSearch} 
                  disabled={isSearching} 
                  className="md:col-span-2 bg-blue-600 hover:bg-blue-500 text-white rounded-[32px] font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 py-6 md:py-0 shadow-lg shadow-blue-600/20"
                >
                  {isSearching ? <Loader2 size={20} className="animate-spin" /> : <>Search <ArrowRight size={18} /></>}
                </button>
              </div>
            </div>
          </motion.div>

          {/* --- TRAVEL CLASSES --- */}
          <div className="w-full max-w-5xl mb-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {travelClasses.map((item) => (
                  <motion.div 
                    key={item.id}
                    onClick={() => setSelectedClass(item.id)}
                    whileHover={{ y: -5 }}
                    className={`relative overflow-hidden p-6 rounded-[32px] border transition-all duration-500 cursor-pointer ${selectedClass === item.id ? 'bg-blue-600 border-blue-400 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)]' : 'bg-white/[0.03] border-white/5 hover:border-white/10 hover:bg-white/[0.05]'}`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${selectedClass === item.id ? 'bg-white text-blue-600' : 'bg-white/5 text-slate-400'}`}>
                        {item.icon}
                      </div>
                      <h4 className={`text-sm font-black uppercase tracking-widest mb-2 ${selectedClass === item.id ? 'text-white' : 'text-slate-300'}`}>{item.name}</h4>
                      <p className={`text-[10px] font-bold italic mb-6 ${selectedClass === item.id ? 'text-blue-100' : 'text-slate-600'}`}>{item.desc}</p>
                      
                      <div className="w-full pt-6 border-t border-white/10 flex items-center justify-between">
                        <span className={`text-sm font-black italic ${selectedClass === item.id ? 'text-white' : 'text-blue-500'}`}>{item.price}</span>
                        <button 
                          onClick={(e) => handleBooking(e, item.name)}
                          className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all ${selectedClass === item.id ? 'bg-black text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* --- 2. EXCLUSIVE VOYAGES --- */}
      <section className="py-32 px-6 bg-white/[0.01] relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-[1px] bg-blue-500" />
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em] italic">Limited Edition</p>
              </div>
              <h2 className="text-5xl font-black italic uppercase text-white tracking-tighter leading-none">Curated <br /> Experiences</h2>
            </div>
            <Link href="/events" className="group flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase text-white hover:bg-white/10 transition-all tracking-widest">
              Browse Collections <ArrowRight size={14} className="-rotate-45 text-blue-500 group-hover:rotate-0 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {featuredEvents.map((event) => (
                <motion.div 
                  whileHover={{ y: -12 }} 
                  key={event.id} 
                  className="group bg-[#0A0C10] border border-white/5 rounded-[40px] overflow-hidden hover:border-blue-500/40 transition-all duration-700"
                >
                    <div className="h-64 relative overflow-hidden">
                        <img src={event.img} alt={event.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent opacity-60" />
                        <div className="absolute top-6 left-6 bg-blue-600 px-4 py-2 rounded-2xl font-black text-[10px] text-white italic tracking-widest shadow-xl">{event.date}</div>
                    </div>
                    <div className="p-10 text-left relative mt-[-40px] bg-gradient-to-b from-transparent via-[#0A0C10] to-[#0A0C10]">
                        <h4 className="text-xl font-black text-white italic uppercase tracking-tighter mb-4 group-hover:text-blue-500 transition-colors leading-tight">{event.title}</h4>
                        <div className="flex items-center gap-2 mb-8">
                           <MapPin size={14} className="text-blue-500" />
                           <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{event.location}</p>
                        </div>
                        <div className="flex justify-between items-center border-t border-white/5 pt-8">
                            <div>
                               <p className="text-[8px] text-slate-600 font-black uppercase mb-1">Starting From</p>
                               <p className="text-2xl font-black italic text-white tracking-tighter">{event.price}</p>
                            </div>
                            <button onClick={(e) => handleBooking(e, event.title)} className="bg-white/5 hover:bg-blue-600 text-white px-7 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/5 transition-all shadow-lg">Reserve</button>
                        </div>
                    </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* --- 3. LIVE TERMINAL --- */}
      <section className="py-32 px-6 bg-[#030508] relative overflow-hidden">
        {/* Radar Effect background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-500/5 rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
            <h2 className="text-[12px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-3 italic">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              Live Network
            </h2>
            <p className="text-[10px] font-bold text-slate-600 uppercase">Updates every 30s</p>
          </div>
          
          <div className="space-y-4">
            {liveFlights.map((f) => (
              <motion.div 
                key={f.id} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group bg-white/[0.02] border border-white/5 p-7 rounded-[28px] flex flex-col md:flex-row items-center justify-between hover:bg-white/[0.04] hover:border-blue-500/20 transition-all"
              >
                <div className="flex items-center gap-7 mb-4 md:mb-0 w-full md:w-auto">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 shadow-inner">
                    <Plane size={24} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-4 mb-2">
                      <h4 className="text-lg font-black text-white italic uppercase tracking-tighter">{f.route}</h4>
                      <span className={`text-[8px] font-black uppercase px-3 py-1 rounded-full border border-current/20 ${f.bg} ${f.color}`}>{f.status}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] italic">{f.code} • Scheduled: {f.time}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-10 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <span className="text-2xl font-black text-white italic tracking-tighter">{f.price}</span>
                  <button onClick={(e) => handleBooking(e, f.route)} className="bg-white/5 hover:bg-white text-black hover:text-black bg-white/5 border border-white/10 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Book</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. TESTIMONIALS --- */}
      <section className="py-32 px-6 bg-[#020408]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter mb-4">Elite Voices</h2>
             <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 p-10 rounded-[44px] relative text-left group hover:border-blue-500/20 transition-colors">
                <Quote className="absolute top-10 right-10 text-blue-500/10" size={60} />
                <div className="flex gap-1.5 mb-8">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} className="text-blue-500 fill-blue-500" />)}
                </div>
                <p className="text-slate-400 text-lg italic leading-relaxed mb-10 font-medium tracking-tight">"{t.comment}"</p>
                <div className="flex items-center gap-5 border-t border-white/5 pt-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-xs font-black text-white shadow-lg">{t.name.charAt(0)}</div>
                  <div>
                    <h4 className="text-[13px] font-black text-white uppercase tracking-wider">{t.name}</h4>
                    <p className="text-[10px] text-blue-500 font-bold uppercase mt-1 tracking-widest italic">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. PREMIUM FOOTER --- */}
      <footer className="pt-32 pb-16 bg-black border-t border-white/5 relative overflow-hidden">
        {/* Background brand mark */}
        <div className="absolute -bottom-20 -left-20 text-[20vw] font-black text-white/[0.02] italic select-none pointer-events-none uppercase">Sphere</div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-28 md:text-left">
            <div className="md:col-span-1">
              <span className="text-3xl font-black italic uppercase tracking-tighter text-white">Air<span className="text-blue-600">.</span>Sphere</span>
              <p className="mt-8 text-[12px] text-slate-600 font-bold uppercase leading-relaxed italic max-w-xs">Redefining the standard of aviation technology and luxury travel within Bangladesh and beyond.</p>
            </div>
            <div>
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-10 text-blue-500">Navigation</h4>
              <ul className="space-y-5">
                {["Flights", "Events", "Packages", "Fleet"].map((link) => (
                  <li key={link}><Link href={`/${link.toLowerCase()}`} className="text-[11px] font-bold text-slate-500 uppercase hover:text-white transition-colors tracking-[0.2em] italic">{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-10 text-blue-500">Resources</h4>
              <ul className="space-y-5">
                {["Login", "Support", "Safety", "Terms"].map((link) => (
                  <li key={link}><Link href={`/${link.toLowerCase()}`} className="text-[11px] font-bold text-slate-500 uppercase hover:text-white transition-colors tracking-[0.2em] italic">{link}</Link></li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-10 text-blue-500">Connect</h4>
              <div className="bg-white/[0.03] border border-white/10 p-6 rounded-[32px] w-full text-center md:text-left">
                 <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Ops Online</span>
                 </div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic leading-relaxed">support@airsphere.dhaka</p>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic mt-2">+880 1700 000000</p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black uppercase text-slate-700 tracking-[0.4em] mb-2 italic">© 2026 AirSphere Aviation Group.</p>
              <p className="text-[9px] font-bold uppercase text-slate-800 tracking-[0.2em]">Designed with Precision by <span className="text-slate-600 hover:text-blue-500 transition-colors cursor-pointer">Sneara</span></p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {["TYPESCRIPT", "TAILWIND", "FRAMER", "PRISMA"].map(t => (
                <span key={t} className="px-4 py-1.5 border border-white/5 rounded-full text-[9px] font-black text-slate-700 uppercase tracking-widest hover:border-blue-500/20 hover:text-slate-500 transition-all cursor-default">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}