"use client";

import React, { useState } from "react";
import { Ticket, Loader2, CheckCircle2, XCircle } from "lucide-react";
// আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী পাথটি নিশ্চিত করা হয়েছে
import { validateCoupon } from "@/app/services/coupon.service";
import { toast } from "sonner";

interface CouponInputProps {
  eventId: string;
  originalAmount: number;
  onApplySuccess: (data: { 
    discountAmount: number; 
    finalAmount: number; 
    couponId: string;
    couponCode: string; 
  }) => void;
}

export default function CouponInput({ eventId, originalAmount, onApplySuccess }: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    const trimmedCode = couponCode.trim();
    if (!trimmedCode) {
      setStatus("error");
      setMessage("Please enter a code");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await validateCoupon({
        code: trimmedCode,
        eventId,
        originalAmount,
      });

      if (response.success) {
        setStatus("success");
        setMessage(`Applied! Saved $${response.data.discountAmount}`);
        toast.success(`Coupon "${trimmedCode}" applied successfully!`);
        
        // সাকসেস মেসেজ দেখানোর জন্য সামান্য বিলম্ব
        setTimeout(() => {
          onApplySuccess(response.data);
          setCouponCode(""); // ইনপুট ক্লিয়ার করুন
        }, 1000);
      } else {
        setStatus("error");
        setMessage(response.message || "Invalid Coupon");
      }
    } catch (error: any) {
      setStatus("error");
      const errorMsg = error.response?.data?.message || "Invalid or Expired Coupon";
      setMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[2.5rem] space-y-4 shadow-2xl relative overflow-hidden group">
      {/* Background Subtle Glow */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl group-hover:bg-indigo-600/10 transition-all" />

      <div className="flex items-center gap-2 text-indigo-500 relative z-10">
        <Ticket size={14} className="animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
          Promo Terminal
        </span>
      </div>

      <div className="relative flex flex-col sm:flex-row gap-3 z-10">
        <input
          type="text"
          placeholder="ENTER CODE"
          value={couponCode}
          onChange={(e) => {
            setCouponCode(e.target.value.toUpperCase());
            if (status !== "idle") setStatus("idle");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 text-[11px] font-bold tracking-widest uppercase focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-gray-800 text-indigo-400"
        />
        <button
          onClick={handleApply}
          disabled={isLoading || !couponCode.trim()}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center min-w-[110px] shadow-lg shadow-indigo-600/10"
        >
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : "Apply"}
        </button>
      </div>

      {status !== "idle" && (
        <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-wider p-4 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-300 z-10 ${
          status === "success" 
            ? "text-emerald-500 bg-emerald-500/5 border-emerald-500/10" 
            : "text-rose-500 bg-rose-500/5 border-rose-500/10"
        }`}>
          {status === "success" ? (
            <CheckCircle2 size={14} className="shrink-0" />
          ) : (
            <XCircle size={14} className="shrink-0" />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}