"use client";

import React from "react";
import { MapPin, Calendar, ArrowUpRight, Plane, ShieldCheck, BaggageClaim, Clock, Activity } from "lucide-react";
import { IEvent } from "@/types/event";
import { getStatusColor } from "@/utils/getStatusColor";

// --- ইন্টারফেস আপডেট: onClick যোগ করা হয়েছে ---
interface EventCardProps {
  event: IEvent;
  onClick?: () => void; 
}

export default function EventCard({ event, onClick }: EventCardProps) {
  // ডাটা সেফটি চেক (যদি ডাটা না আসে তবে ক্রাশ করবে না)
  const availableSeats = event.availableSeats ?? 0;
  const totalSeats = event.totalSeats ?? 1;
  const isAvailable = availableSeats > 0;
  const progress = (availableSeats / totalSeats) * 100;

  return (
    <div 
      onClick={isAvailable ? onClick : undefined} 
      className={`group relative bg-[#030712] border border-white/5 rounded-[3rem] p-4 transition-all duration-700 hover:border-primary/40 hover:-translate-y-4 shadow-2xl hover:shadow-primary/10 ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
    >
      
      {/* --- Image Section --- */}
      <div className="relative h-72 w-full overflow-hidden rounded-[2.5rem]">
        <img 
          src={event.thumbnail || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05"} 
          alt={event.title}
          className="w-full h-full object-cover grayscale-[60%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
          <div className="bg-primary/90 backdrop-blur-xl px-5 py-2 rounded-2xl text-[9px] font-black text-primary-foreground uppercase tracking-[0.2em] italic shadow-2xl">
            {event.category}
          </div>

          <div className={`backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] italic flex items-center gap-1.5 ${getStatusColor(event.status)}`}>
            <Activity size={10} className="animate-pulse" />
            {event.status}
          </div>
        </div>

        {event.isRefundable && (
          <div className="absolute top-6 right-6 bg-emerald-500 text-black p-2 rounded-full shadow-2xl animate-pulse">
            <ShieldCheck size={16} />
          </div>
        )}
      </div>

      {/* --- Content Section --- */}
      <div className="p-6 pt-8">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] italic">
                <Calendar size={14} className="text-primary" />
                {event.dateTime ? new Date(event.dateTime).toDateString() : "TBA"}
            </div>
            {/* @ts-ignore */}
            {event.airlineName && (
                <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase italic">
                    <Plane size={14} />
                    {/* @ts-ignore */}
                    {event.airlineName}
                </div>
            )}
        </div>

        <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-3 leading-none group-hover:text-primary transition-colors line-clamp-1">
          {event.title}
        </h3>

        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest italic mb-6">
          <MapPin size={16} className="text-rose-600" />
          <span className="line-clamp-1">{event.venue}, {event.location}</span>
        </div>

        {/* Dynamic Seat Tracker */}
        <div className="mb-10 space-y-3">
           <div className="flex justify-between items-end">
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] italic">Availability</span>
              <span className={`text-[10px] font-black italic ${isAvailable ? 'text-emerald-500' : 'text-rose-500'}`}>
                {availableSeats} / {totalSeats} SEATS LEFT
              </span>
           </div>
           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[2px]">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${progress < 20 ? 'bg-rose-600' : 'bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]'}`}
                style={{ width: `${progress}%` }}
              />
           </div>
        </div>

        {/* --- Footer / CTA --- */}
        <div className="flex items-center justify-between border-t border-white/5 pt-8">
          <div>
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Ticket Price</p>
            <p className="text-3xl font-black text-white italic tracking-tighter">
              {event.ticketPrice === 0 ? "FREE" : `$${event.ticketPrice}`}
            </p>
          </div>

          <div 
            className={`h-16 px-6 rounded-[1.5rem] flex items-center gap-3 transition-all duration-500 shadow-2xl ${
              isAvailable 
              ? "bg-primary text-primary-foreground shadow-primary/30 hover:rotate-2 hover:scale-105 active:scale-95" 
              : "bg-slate-800 text-slate-500 opacity-50"
            }`}
          >
            <span className="text-[10px] font-black uppercase italic tracking-widest">
                {isAvailable ? "BOOK NOW" : "SOLD OUT"}
            </span>
            <ArrowUpRight size={24} strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
}