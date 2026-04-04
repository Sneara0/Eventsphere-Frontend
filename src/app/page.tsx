"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { 
  Plane, CalendarDays, MapPin, Globe, Search, 
  Zap, Star, Quote, Loader2, ArrowRight, UserPlus, Sparkles, Target,
  Shield, Crown, Rocket, Nfc, CheckCircle2
} from "lucide-react"; // Note: Change to "lucide-react" if it was a typo in your setup
import { 
  Plane as PlaneIcon, 
  CalendarDays as CalendarIcon, 
  MapPin as MapIcon, 
  Globe as GlobeIcon, 
  Search as SearchIcon, 
  Zap as ZapIcon, 
  Star as StarIcon, 
  Quote as QuoteIcon, 
  Loader2 as LoaderIcon, 
  ArrowRight as ArrowIcon, 
  UserPlus as UserIcon, 
  Sparkles as SparklesIcon, 
  Target as TargetIcon,
  Shield as ShieldIcon, 
  Crown as CrownIcon, 
  Rocket as RocketIcon, 
  Nfc as NfcIcon, 
  CheckCircle2 as CheckIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// --- Mock Data ---
const travelClasses = [
  { id: "economy", name: "Economy", desc: "Essential comfort for smart travelers.", icon: <RocketIcon size={16} />, price: "৳০" },
  { id: "business", name: "Business", desc: "Elite workspace with premium dining.", icon: <ShieldIcon size={16} />, price: "+৳১৫,০০০" },
  { id: "first", name: "First Class", desc: "The pinnacle of luxury and privacy.", icon: <CrownIcon size={16} />, price: "+৳৩৫,০০০" },
];

const featuredEvents = [
  { id: 1, title: "Cox's Bazar Beach Carnival", location: "DAC ➔ CXB", date: "15-18 MAY", price: "৳৯,৫০০", img: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=600" },
  { id: 2, title: "Dubai Shopping Festival", location: "DAC ➔ DXB", date: "20-25 MAY", price: "৳৫৫,০০০", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600" },
  { id: 3, title: "Sylhet Tea Garden Tour", location: "DAC ➔ ZYL", date: "01-03 JUNE", price: "৳৮,৮০০", img: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=600" },
];

const liveFlights = [
  { id: 1, route: "Dhaka ➔ Dubai", code: "EK-585", time: "10:30 AM", status: "Boarding", price: "৳৪৫,০০০", color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 2, route: "Dhaka ➔ Cox's Bazar", code: "VQ-921", time: "11:15 AM", status: "On Time", price: "৳৪,৫০০", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: 3, route: "Dhaka ➔ Kolkata", code: "AI-230", time: "12:00 PM", status: "Delayed", price: "৳৮,২০০", color: "text-orange-500", bg: "bg-orange-500/10" },
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
    <div className="min-h-screen bg-[#020406] text-slate-300 antialiased font-sans selection:bg-blue-500/30 tracking-tight">
      <Navbar />

      {/* --- 1. LUXURY HERO & SMART SEARCH --- */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full -z-10 animate-pulse" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
             <SparklesIcon size={12} className="text-blue-400" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 italic">Aviation v2.0 • Premium Access</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-12 uppercase italic leading-[0.9]">
            FLY BEYOND <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-indigo-600 drop-shadow-2xl">THE HORIZON.</span>
          </motion.h1>

          {/* --- ANIMATED ATM CARD (BOARDING PASS) --- */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -15, 0] }}
            transition={{ 
                opacity: { duration: 0.8 }, 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
            }}
            whileHover={{ 
                rotateY: 15, 
                rotateX: -5, 
                scale: 1.05,
                boxShadow: "0px 0px 40px rgba(37, 99, 235, 0.2)"
            }}
            className="w-full max-w-[420px] h-[250px] rounded-[32px] bg-gradient-to-br from-slate-900 via-[#0A0C10] to-[#121418] p-9 shadow-2xl border border-white/10 overflow-hidden relative group cursor-pointer mb-16 transition-all duration-500"
            style={{ perspective: "1000px" }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000"><GlobeIcon size={130} /></div>
            
            <div className="flex justify-between items-start mb-10 relative z-10">
              <div className="w-14 h-9 bg-slate-500/20 rounded-lg border border-white/10 shadow-inner flex items-center justify-center">
                <NfcIcon size={18} className="text-blue-500 group-hover:animate-pulse" />
              </div>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] italic">Priority Pass</span>
            </div>

            <div className="flex justify-between items-center mb-10 relative z-10">
              <div className="text-left leading-tight">
                <h2 className="text-3xl font-black text-white italic tracking-tighter">DAC</h2>
                <p className="text-[9px] font-bold text-slate-600 tracking-widest uppercase">Dhaka</p>
              </div>
              <div className="flex-1 px-8 relative">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <motion.div 
                    animate={{ x: [-20, 20, -20] }} 
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute left-1/2 -top-2"
                >
                    <PlaneIcon size={16} className="text-blue-500 -rotate-45" />
                </motion.div>
              </div>
              <div className="text-right leading-tight">
                <h2 className="text-3xl font-black text-white italic tracking-tighter">DXB</h2>
                <p className="text-[9px] font-bold text-slate-600 tracking-widest uppercase">Dubai</p>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-white/10 pt-7 relative z-10">
              <div>
                <p className="text-[7px] text-slate-600 uppercase font-black tracking-[0.2em] mb-1">Elite Passenger</p>
                <p className="text-[11px] text-white font-black uppercase italic tracking-widest">SNEARA / DEV</p>
              </div>
              <div className="text-right">
                <p className="text-[7px] text-slate-600 uppercase font-black tracking-[0.2em] mb-1">Status</p>
                {/* FIXED: Changed <p> to <div> and optimized animation */}
                <div className="text-[11px] text-blue-500 font-black uppercase italic tracking-widest flex items-center gap-2 justify-end">
                  ONLINE 
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto text-slate-500 text-xs md:text-sm mb-12 italic leading-relaxed font-medium">
            Experience Dhaka's premier flight engine. Engineered for low-latency bookings, secured with <span className="text-white">BetterAuth</span>, and optimized for 2026.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-16">
             <Link href="/register" className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all flex items-center gap-2.5 group">
                <UserIcon size={14} className="text-blue-500 group-hover:scale-110 transition-transform" /> Create Account
             </Link>
          </motion.div>

          {/* SEARCH WIDGET */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl mx-auto relative mb-24">
            <div className="bg-[#080A0E]/60 border border-white/10 p-3 rounded-[32px] backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] group">
              <div className="grid grid-cols-1 md:grid-cols-10 gap-2">
                <div className="md:col-span-3 flex items-center gap-4 px-6 py-4 bg-white/[0.03] rounded-[24px] border border-white/5 focus-within:border-blue-500/40 transition-all text-left">
                  <MapIcon size={18} className="text-blue-500" />
                  <div className="flex-1">
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Departure</p>
                    <input type="text" placeholder="Dhaka (DAC)" onChange={(e)=>setForm({...form, from: e.target.value})} className="bg-transparent border-none outline-none text-xs font-black text-white w-full placeholder:text-slate-800" />
                  </div>
                </div>
                <div className="md:col-span-3 flex items-center gap-4 px-6 py-4 bg-white/[0.03] rounded-[24px] border border-white/5 focus-within:border-indigo-500/40 transition-all text-left">
                  <TargetIcon size={18} className="text-indigo-500" />
                  <div className="flex-1">
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Destination</p>
                    <input type="text" placeholder="Destination" onChange={(e)=>setForm({...form, to: e.target.value})} className="bg-transparent border-none outline-none text-xs font-black text-white w-full placeholder:text-slate-800" />
                  </div>
                </div>
                <div className="md:col-span-2 flex items-center gap-4 px-6 py-4 bg-white/[0.03] rounded-[24px] border border-white/5 focus-within:border-blue-500/40 transition-all text-left">
                  <CalendarIcon size={18} className="text-blue-400" />
                  <div className="flex-1">
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Date</p>
                    <input type="date" onChange={(e)=>setForm({...form, date: e.target.value})} className="bg-transparent border-none outline-none text-[11px] font-bold text-white w-full [color-scheme:dark]" />
                  </div>
                </div>
                <button onClick={handleSearch} disabled={isSearching} className="md:col-span-2 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 py-5 md:py-0">
                  {isSearching ? <LoaderIcon size={18} className="animate-spin" /> : <>Search <SearchIcon size={16} /></>}
                </button>
              </div>
            </div>
          </motion.div>

          {/* --- TRAVEL CLASSES --- */}
          <div className="w-full max-w-5xl mb-12">
              <div className="flex flex-col md:flex-row gap-6 items-stretch">
                <div className="flex-[2.5] grid grid-cols-1 gap-3">
                  {travelClasses.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedClass(item.id)}
                      className={`relative group flex items-center justify-between p-5 rounded-[24px] border transition-all duration-300 cursor-pointer ${selectedClass === item.id ? 'bg-blue-600/5 border-blue-500/40 shadow-lg' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedClass === item.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-600'}`}>{item.icon}</div>
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-[11px] font-black uppercase tracking-wider ${selectedClass === item.id ? 'text-white' : 'text-slate-500'}`}>{item.name}</h4>
                            {selectedClass === item.id && <CheckIcon size={12} className="text-blue-500" />}
                          </div>
                          <p className="text-[9px] text-slate-600 font-bold italic mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <span className="text-[11px] font-black text-white italic tracking-tight">{item.price}</span>
                        <button 
                          onClick={(e) => handleBooking(e, item.name)}
                          className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedClass === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'bg-white/5 text-slate-500 group-hover:bg-white/10 group-hover:text-white'}`}
                        >
                          Book {item.name}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* --- 2. EXCLUSIVE VOYAGES --- */}
      <section className="py-24 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12 text-left">
            <div>
              <p className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.4em] mb-2 italic">Seasonal</p>
              <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none">Exclusive Voyages</h2>
            </div>
            <Link href="/events" className="group flex items-center gap-2 text-[8px] font-black uppercase text-slate-500 hover:text-white transition-all tracking-widest">
              View All <ArrowIcon size={12} className="-rotate-45 text-blue-500" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
             {featuredEvents.map((event) => (
                <motion.div whileHover={{ y: -10 }} key={event.id} className="group bg-[#0A0C10] border border-white/5 rounded-[32px] overflow-hidden hover:border-blue-500/30 transition-all duration-500">
                    <div className="h-48 relative overflow-hidden">
                        <img src={event.img} alt={event.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl font-black text-[9px] text-white italic tracking-widest">{event.date}</div>
                    </div>
                    <div className="p-8">
                        <h4 className="text-base font-black text-white italic uppercase tracking-tight mb-3 group-hover:text-blue-500 transition-colors leading-tight">{event.title}</h4>
                        <p className="text-[10px] font-bold text-slate-600 uppercase mb-6 flex items-center gap-2"><MapIcon size={12}/> {event.location}</p>
                        <div className="flex justify-between items-center border-t border-white/5 pt-6">
                            <p className="text-xl font-black italic text-white tracking-tighter">{event.price}</p>
                            <button onClick={(e) => handleBooking(e, event.title)} className="bg-white/5 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest border border-white/5 transition-all">Explore</button>
                        </div>
                    </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* --- 3. LIVE TERMINAL --- */}
      <section className="py-24 px-6 bg-[#030508]">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 mb-10 border-b border-white/5 pb-5 italic">
            <ZapIcon size={14} className="text-blue-500" /> Live Terminal Status
          </h2>
          <div className="grid gap-3">
            {liveFlights.map((f) => (
              <div key={f.id} className="group bg-[#0A0C10] border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.03] transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-blue-500 transition-all shrink-0">
                    <PlaneIcon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-sm font-black text-white italic uppercase tracking-tight">{f.route}</h4>
                      <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-full ${f.bg} ${f.color}`}>{f.status}</span>
                    </div>
                    <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest italic">{f.code} • {f.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-base font-black text-white italic tracking-tighter">{f.price}</span>
                  <button onClick={(e) => handleBooking(e, f.route)} className="bg-white/5 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest border border-white/5 transition-all">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. TESTIMONIALS --- */}
      <section className="py-24 px-6 bg-[#020406]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter mb-16">Global Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-[#0A0C10] border border-white/5 p-8 rounded-[32px] relative text-left group">
                <QuoteIcon className="absolute top-6 right-8 text-white/5" size={40} />
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => <StarIcon key={i} size={12} className="text-yellow-500 fill-yellow-500" />)}
                </div>
                <p className="text-slate-400 text-[13px] italic leading-relaxed mb-8">"{t.comment}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-black text-white">{t.name.charAt(0)}</div>
                  <div><h4 className="text-[11px] font-black text-white uppercase">{t.name}</h4><p className="text-[9px] text-slate-600 font-bold uppercase mt-1">{t.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. PREMIUM FOOTER --- */}
      <footer className="pt-24 pb-12 bg-black border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 md:text-left">
            <div className="md:col-span-1 leading-tight">
              <span className="text-2xl font-black italic uppercase tracking-[0.2em] text-white">Air<span className="text-blue-600">.</span>Sphere</span>
              <p className="mt-5 text-[11px] text-slate-500 font-bold uppercase leading-relaxed italic">The next standard for aviation technology in Bangladesh.</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8">Navigation</h4>
              <ul className="space-y-4">
                {["Flights", "Events", "Packages"].map((link) => (
                  <li key={link}><Link href={`/${link.toLowerCase()}`} className="text-[10px] font-bold text-slate-600 uppercase hover:text-blue-500 transition-colors tracking-widest italic">{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8">Account</h4>
              <ul className="space-y-4">
                {["Login", "Register", "Privacy"].map((link) => (
                  <li key={link}><Link href={`/${link.toLowerCase()}`} className="text-[10px] font-bold text-slate-600 uppercase hover:text-blue-500 transition-colors tracking-widest italic">{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8">Status</h4>
              <div className="flex flex-col gap-4 items-center md:items-start">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Systems Operational</span>
                </div>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic leading-none">support@airsphere.dhaka</p>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.3em] mb-1 italic">© 2026 AirSphere Inc.</p>
              <p className="text-[9px] font-bold uppercase text-slate-800 tracking-[0.2em]">Designed & Built in Dhaka by Sneara</p>
            </div>
            <div className="flex gap-3">
              {["TS", "STRIPE", "PRISMA"].map(t => <span key={t} className="px-3 py-1 border border-white/5 rounded-lg text-[8px] font-black text-slate-800 uppercase hover:text-slate-500 transition-colors">{t}</span>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}