"use client";

import React, { useState, useEffect } from "react";
import { 
  Plane, Search, Calendar, MapPin, ArrowRightLeft, 
  ChevronRight, Loader2, Star, Filter 
} from "lucide-react";

// স্যাম্পল ডাটাবেস (বাস্তব প্রোজেক্টে এটি API থেকে আসবে)
const allFlights = [
  { id: 1, from: "Dhaka", to: "New York", price: "850", date: "2026-05-12", time: "10:30 AM", type: "Non-stop" },
  { id: 2, from: "Dhaka", to: "London", price: "720", date: "2026-05-15", time: "02:15 PM", type: "1 Stop" },
  { id: 3, from: "Dubai", to: "Tokyo", price: "640", date: "2026-05-20", time: "11:00 PM", type: "Non-stop" },
  { id: 4, from: "Chittagong", to: "Dubai", price: "450", date: "2026-06-05", time: "08:00 AM", type: "Non-stop" },
  { id: 5, from: "Dhaka", to: "Dubai", price: "500", date: "2026-05-12", time: "09:30 PM", type: "Non-stop" },
];

export default function FlightsPage() {
  const [mounted, setMounted] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState(allFlights);
  const [isSearching, setIsSearching] = useState(false);

  // Client-side rendering hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    
    // প্রিমিয়াম ফিল দেওয়ার জন্য ছোট একটি ডিলে
    setTimeout(() => {
      const filtered = allFlights.filter(flight => {
        const matchFrom = from === "" || flight.from.toLowerCase().includes(from.toLowerCase());
        const matchTo = to === "" || flight.to.toLowerCase().includes(to.toLowerCase());
        const matchDate = date === "" || flight.date === date;
        return matchFrom && matchTo && matchDate;
      });
      
      setResults(filtered);
      setIsSearching(false);
    }, 800);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 md:px-12 font-sans selection:bg-primary selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Plane size={12} fill="currentColor" className="rotate-45" /> Travel Support
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-none">
            Find Your <span className="text-primary">Next Flight</span>
          </h1>
          <p className="mt-6 text-gray-500 text-sm max-w-xl font-medium">
            Search and book flights for your upcoming events worldwide. Exclusive rates for EventSphere members.
          </p>
        </div>

        {/* --- Search Engine Card --- */}
        <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-2xl mb-16 shadow-2xl shadow-black/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Origin Input */}
            <div className="group space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">From</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input 
                  type="text" 
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Departure City" 
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-primary/50 outline-none transition-all placeholder:text-gray-700" 
                />
              </div>
            </div>

            {/* Destination Input */}
            <div className="group space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-emerald-500 transition-colors">To</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                <input 
                  type="text" 
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Arrival City" 
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-emerald-500/50 outline-none transition-all placeholder:text-gray-700" 
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="group space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-blue-400 transition-colors">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-blue-500/50 outline-none transition-all [color-scheme:dark]" 
                />
              </div>
            </div>

            {/* Search Action */}
            <div className="flex items-end">
              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-primary text-primary-foreground font-black uppercase text-[11px] tracking-[0.2em] py-4 rounded-2xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-primary/10"
              >
                {isSearching ? <Loader2 className="animate-spin" size={20} /> : <><Search size={20} strokeWidth={3} /> Search</>}
              </button>
            </div>
          </div>
        </div>

        {/* --- Results Section --- */}
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-white font-black uppercase text-xs tracking-[0.3em] flex items-center gap-2">
            <Filter size={14} className="text-primary" /> 
            Available Flights ({results.length})
          </h2>
          <div className="h-px flex-grow mx-8 bg-white/5 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {results.length > 0 ? (
            results.map((flight) => (
              <div key={flight.id} className="group bg-white/5 border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/[0.08] transition-all relative overflow-hidden">
                <div className="flex justify-between items-start mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                      <Plane size={24} className="group-hover:rotate-12 transition-transform" />
                    </div>
                    <div>
                      <span className="text-white font-black text-lg italic uppercase">{flight.from}</span>
                      <p className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">Departure</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 opacity-20">
                     <div className="w-16 h-[2px] bg-white" />
                     <span className="text-[8px] font-black text-white uppercase">{flight.type}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-black text-lg italic uppercase">{flight.to}</span>
                    <p className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">Destination</p>
                  </div>
                </div>

                <div className="flex items-end justify-between pt-6 border-t border-white/5">
                  <div className="space-y-1">
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest">{flight.date} • {flight.time}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white italic">${flight.price}</span>
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">/ seat</span>
                    </div>
                  </div>
                  <button className="bg-white text-black p-4 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-lg group-hover:translate-x-1">
                    <ChevronRight size={24} strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 bg-white/5 rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Plane size={32} className="text-gray-700 -rotate-45" />
              </div>
              <h3 className="text-white font-black uppercase italic tracking-tighter text-xl">No Flights Found</h3>
              <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Try changing your search destination or date.</p>
              <button onClick={() => setResults(allFlights)} className="mt-8 text-primary font-black text-[10px] uppercase tracking-widest border-b border-primary/30 pb-1">Show All Flights</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}