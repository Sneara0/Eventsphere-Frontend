// 📂 src/app/payment/success/page.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Ticket, ArrowRight, Download, Home } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function PaymentSuccess() {
  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#6366f1", "#a855f7"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#6366f1", "#a855f7"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 selection:bg-indigo-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)]"
            >
              <Check className="text-white" size={48} strokeWidth={3} />
            </motion.div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4 uppercase">
              Booking <span className="text-indigo-500 text-stroke-white">Confirmed</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-xs mx-auto">
              Your flight to the event is ready. We&apos;ve sent the invoice to your inbox.
            </p>
          </div>

          {/* Ticket Card Summary */}
          <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 mb-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Ticket size={80} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Reservation Status</p>
                  <p className="text-lg text-white font-bold italic uppercase">Verified & Active</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Access Pass</p>
                  <p className="text-lg text-indigo-400 font-mono font-bold italic">#ES-SUCCESS</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <Link 
              href="/my-bookings" 
              className="flex-1 bg-white text-black h-16 rounded-2xl flex items-center justify-center gap-3 font-black uppercase italic tracking-widest text-xs hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
            >
              My Bookings <ArrowRight size={18} />
            </Link>
            <Link 
              href="/" 
              className="flex-1 bg-white/5 text-white h-16 rounded-2xl flex items-center justify-center gap-3 font-black uppercase italic tracking-widest text-xs border border-white/10 hover:bg-white/10 transition-all active:scale-95"
            >
              <Home size={18} /> Home
            </Link>
          </div>
          
          <p className="mt-8 text-center text-[9px] text-gray-600 font-bold uppercase tracking-[0.4em]">
            EventSphere Secure Checkout System v3.0
          </p>
        </div>
      </motion.div>
    </div>
  );
}