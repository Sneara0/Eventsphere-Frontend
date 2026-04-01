"use client";

import React from "react";
import { MapPin, Calendar, Users, ArrowUpRight, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { IEvent } from "@/types/event";


export default function EventCard({ event }: { event: IEvent }) {
  const isAvailable = event.availableSeats > 0;
  const progress = (event.availableSeats / event.totalSeats) * 100;

  return (
    <div className="group relative bg-[#030712] border border-white/5 rounded-[3rem] p-4 transition-all duration-700 hover:border-primary/40 hover:-translate-y-4 shadow-2xl hover:shadow-primary/10">
      
      {/* --- Image Section --- */}
      <div className="relative h-72 w-full overflow-hidden rounded-[2.5rem]">
        <img 
          src={event.thumbnail || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"} 
          alt={event.title}
          className="w-full h-full object-cover grayscale-[60%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-6 left-6 flex gap-2">
          <div className="bg-primary/90 backdrop-blur-xl px-5 py-2 rounded-2xl text-[9px] font-black text-primary-foreground uppercase tracking-[0.2em] italic shadow-2xl">
            {event.category}
          </div>
          <div className={`backdrop-blur-xl border px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] italic shadow-2xl ${
            event.status === 'UPCOMING' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
          }`}>
            {event.status}
          </div>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-6 pt-8">
        <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 italic">
          <Calendar size={16} className="text-primary" />
          {new Date(event.dateTime).toDateString()} <span className="text-white/20">|</span> {event.time}
        </div>

        <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-3 leading-none group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest italic mb-8">
          <MapPin size={16} className="text-rose-600 animate-pulse" />
          <span className="line-clamp-1">{event.venue}, {event.location}</span>
        </div>

        {/* Dynamic Seat Tracker */}
        <div className="mb-10 space-y-3">
           <div className="flex justify-between items-end">
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] italic">Availability</span>
              <span className={`text-[10px] font-black italic ${isAvailable ? 'text-emerald-500' : 'text-rose-500'}`}>
                {event.availableSeats} / {event.totalSeats} SEATS LEFT
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
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Ticket Starting From</p>
            <p className="text-3xl font-black text-white italic tracking-tighter">
              {event.ticketPrice === 0 ? "FREE" : `$${event.ticketPrice}`}
            </p>
          </div>

          <Link 
            href={`/events/${event.id}`} 
            className={`h-16 w-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 shadow-2xl ${
              isAvailable 
              ? "bg-primary text-primary-foreground shadow-primary/30 hover:rotate-12 hover:scale-110 active:scale-90" 
              : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
            }`}
          >
            <ArrowUpRight size={32} strokeWidth={3} />
          </Link>
        </div>
      </div>
    </div>
  );
}