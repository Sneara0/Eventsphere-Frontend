// 📂 src/app/payment/cancel/page.tsx
"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#0f0f0f] border border-red-500/10 rounded-[3rem] p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Animated Background Pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-pulse" />

          <div className="relative z-10">
            <div className="inline-flex p-5 bg-red-500/10 rounded-full mb-8">
              <AlertTriangle className="text-red-500" size={48} />
            </div>

            <h2 className="text-3xl font-black text-white italic tracking-tighter mb-4 uppercase">
              ABORTED
            </h2>
            <p className="text-gray-500 text-sm font-medium mb-10 leading-relaxed">
              The transaction was interrupted. No credits have been deducted from your account.
            </p>

            <div className="space-y-4">
              <button 
                onClick={() => window.history.back()}
                className="w-full h-16 bg-white text-black rounded-2xl flex items-center justify-center gap-3 font-black uppercase italic tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all active:scale-95"
              >
                <RefreshCcw size={18} /> Resume Payment
              </button>
              
              <Link 
                href="/" 
                className="w-full h-16 flex items-center justify-center gap-3 font-black text-gray-500 uppercase italic tracking-widest text-[10px] hover:text-white transition-colors"
              >
                <ArrowLeft size={16} /> Exit to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}