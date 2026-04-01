"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, X, Zap, Sparkles } from "lucide-react";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/types/event";
import { toast } from "sonner";

export default function EventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ডাটা লোড করা ---
  const loadData = async () => {
    setLoading(true);
    try {
      // URL এ 'events' এর পর কোনো স্ল্যাশ নেই, নিশ্চিত করুন ব্যাকএন্ডে এটি /api/v1/events এ হ্যান্ডেল হচ্ছে
      const { data } = await axios.get("http://localhost:5000/api/v1/events", {
        params: { searchTerm }
      });
      // আপনার ব্যাকএন্ড রেসপন্স স্ট্রাকচার অনুযায়ী data.data চেক করুন
      setEvents(data.data || []); 
    } catch (error) {
      console.error("API Fetch Error:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(loadData, 600);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // --- ইভেন্ট সাবমিট করা ---
  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    // আপনার ব্যাকএন্ডের কাঙ্ক্ষিত ফরম্যাটে ডাটা প্রসেস করা
    const eventPayload = {
      ...rawData,
      ticketPrice: Number(rawData.ticketPrice),
      totalSeats: Number(rawData.totalSeats),
      // তারিখ এবং সময়কে একীভূত করা বা সঠিক ISO ফরম্যাটে পাঠানো
      dateTime: new Date(`${rawData.dateTime}T${rawData.time}`).toISOString(), 
    };

    try {
      await axios.post("http://localhost:5000/api/v1/events/create-event", eventPayload, {
        withCredentials: true 
      });

      toast.success("Event Launched Successfully! 🚀");
      setIsModalOpen(false);
      loadData(); // নতুন ডাটা রিফ্রেশ করা
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-32 px-6 overflow-hidden relative text-white font-sans">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="relative">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 italic">
              <Zap size={14} fill="currentColor" /> Event Sphere Premiere
            </div>
            <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-10">
              Discover <br /> <span className="text-primary">Events.</span>
            </h1>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
            >
              <Plus size={20} strokeWidth={3} /> Host An Event
            </button>
          </div>

          {/* Luxury Search Bar */}
          <div className="relative w-full md:w-[500px] group">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-all duration-500" size={22} />
            <input 
              type="text" 
              placeholder="SEARCH EXPERIENCES..." 
              className="w-full bg-white/5 border border-white/10 p-7 pl-16 rounded-[2.5rem] outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-black italic text-xs tracking-[0.2em] placeholder:text-slate-700 shadow-2xl backdrop-blur-md"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- Content Area --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-48 gap-6">
            <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase text-slate-600 tracking-[0.8em] animate-pulse">Syncing Universe</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-48 border border-dashed border-white/10 rounded-[4rem] bg-white/[0.02]">
                <Sparkles size={60} className="mx-auto text-slate-800 mb-6" />
                <h3 className="text-slate-600 font-black uppercase italic tracking-[0.4em] text-sm">No Events Orbiting Right Now</h3>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- CREATE EVENT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80 animate-in fade-in duration-300">
          <div className="bg-[#0a0f1e] border border-white/10 w-full max-w-2xl rounded-[3rem] p-10 relative overflow-y-auto max-h-[90vh] shadow-2xl shadow-primary/5">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>

            <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-10 leading-none">
              Create <br /><span className="text-primary">Experience.</span>
            </h2>
            
            <form onSubmit={handleCreateEvent} className="grid grid-cols-2 gap-8">
              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3 block">Event Title</label>
                <input name="title" required className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all" placeholder="E.g. NEON VIBES NIGHT" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3 block">Category</label>
                <select name="category" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all appearance-none">
                  <option value="TECH">Technology</option>
                  <option value="MUSIC">Music</option>
                  <option value="BUSINESS">Business</option>
                  <option value="SPORTS">Sports</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3 block">City / Location</label>
                <input name="location" required className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all" placeholder="Dhaka" />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3 block">Venue Details</label>
                <input name="venue" required className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all" placeholder="E.g. ICCB Hall 4, Purbachal" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3 block">Event Date</label>
                <input type="date" name="dateTime" required className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3 block">Start Time</label>
                <input type="time" name="time" required className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3 block">Price ($)</label>
                <input type="number" name="ticketPrice" required className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all" placeholder="0 for Free" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3 block">Capacity (Seats)</label>
                <input type="number" name="totalSeats" required className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary/50 transition-all" placeholder="500" />
              </div>

              <div className="col-span-2 pt-4">
                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground py-6 rounded-2xl font-black uppercase italic tracking-[0.3em] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "TRANSMITTING TO ORBIT..." : "LAUNCH EXPERIENCE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}