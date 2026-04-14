"use client";

import { useState } from "react";
import { Ticket, ArrowRight, X, ShieldCheck } from "lucide-react";
import BookingForm from "./BookingForm"; // আপনার বর্তমান ফর্ম

export default function BookingWrapper({ event }: { event: any }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-10 left-0 w-full z-50 px-6 md:px-10 pointer-events-none">
        <div className="max-w-7xl mx-auto bg-black/80 backdrop-blur-3xl border border-white/20 p-6 md:p-10 rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col md:flex-row justify-between items-center gap-6 pointer-events-auto">
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic text-center md:text-left">Standard Fare</p>
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-6xl font-black text-white italic tracking-tighter">${event.ticketPrice}</span>
                <span className="text-primary text-[10px] font-black italic tracking-[0.3em] uppercase">Per Seat</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-4 italic animate-pulse flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full" /> SSL SECURED TRANSACTION
            </p>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="group relative inline-flex items-center gap-6 bg-white text-black px-12 py-7 rounded-full font-black uppercase italic tracking-[0.3em] transition-all hover:bg-primary hover:text-white hover:scale-[1.02] active:scale-95 shadow-2xl shadow-white/5"
            >
              <Ticket size={20} className="group-hover:rotate-12 transition-transform" />
              <span>{event.availableSeats === 0 ? "Fleet Full" : "Secure My Pass"}</span>
              <ArrowRight size={20} className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated Fullscreen Modal for BookingForm */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-all" onClick={() => setIsFormOpen(false)} />
          
          <div className="relative w-full max-w-2xl bg-[#0a0f1e] border border-white/10 rounded-[4rem] p-10 md:p-16 shadow-[0_0_100px_rgba(180,31,64,0.2)] animate-in fade-in zoom-in duration-300">
            <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
            >
                <X size={32} />
            </button>

            <div className="space-y-8">
                <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-xs italic">
                    <ShieldCheck size={18} /> Confirm Manifest Details
                </div>
                <h3 className="text-5xl font-black italic uppercase tracking-tighter text-white">Secure Your Seat</h3>
                
                {/* আপনার অরিজিনাল BookingForm এখানে কল করা হয়েছে */}
                <div className="pt-6">
                    <BookingForm event={event} />
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}