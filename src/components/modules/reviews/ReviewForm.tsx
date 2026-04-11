"use client";

import React, { useState, useEffect } from "react";
import { Star, Send, Loader2, Lock, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client"; 
import Link from "next/link";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

export default function ReviewForm({ eventId, onSuccess }: { eventId: string; onSuccess: (newReview: any) => void }) {
  const [mounted, setMounted] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); 
  
  // সেশন ডাটা এবং লোডিং স্টেট
  const { data: session, isPending, error } = authClient.useSession();

  useEffect(() => { 
    setMounted(true); 
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return toast.error("Please login to share your experience.");
    
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, rating, comment }),
        credentials: "include", 
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Review posted successfully! 🚀");
        onSuccess(data.data);
        setComment("");
        setRating(5);
      } else {
        toast.error(data.message || "Failed to post review");
      }
    } catch (err) {
      toast.error("Transmission failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  // সেশন চেক চলাকালীন লোডার
  if (isPending) {
    return (
      <div className="h-40 flex flex-col items-center justify-center bg-white/[0.02] rounded-[2rem] border border-white/5 gap-3">
        <Loader2 className="animate-spin text-primary/40" size={24} />
        <span className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
          Syncing Orbit Session...
        </span>
      </div>
    );
  }

  // সেশন না থাকলে এই কার্ডটি দেখাবে
  if (!session) {
    return (
      <div className="bg-white/5 border border-dashed border-white/20 p-10 rounded-[2.5rem] flex flex-col items-center text-center gap-4 mb-10 group hover:border-primary/30 transition-all">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <Lock size={28} />
        </div>
        <div>
          <h3 className="text-xl font-black uppercase italic text-white tracking-tighter">Authentication Required</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Login to unlock the review terminal</p>
        </div>
        {/* encodeURIComponent ব্যবহার করা হয়েছে যাতে /events/123 এর মতো পাথ ঠিক থাকে */}
        <Link 
          href={`/login?callbackURL=${encodeURIComponent(pathname)}`} 
          className="mt-2 flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20"
        >
          Access Terminal <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  // সেশন থাকলে মূল ফর্ম
  return (
    <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-6 mb-12 backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/20 group-focus-within:bg-primary transition-colors" />
      
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Orbit Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} type="button" onClick={() => setRating(s)} className={`transition-all hover:scale-125 ${rating >= s ? "text-primary" : "text-slate-800"}`}>
              <Star size={28} fill={rating >= s ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="HOW WAS YOUR EXPERIENCE?"
        className="w-full bg-[#020617] border border-white/5 rounded-2xl p-6 text-sm text-white outline-none focus:border-primary/40 h-36 resize-none transition-all placeholder:text-slate-800 placeholder:italic placeholder:font-black"
        required
      />

      <button 
        disabled={loading || comment.length < 5} 
        className="w-full bg-white text-black py-5 rounded-xl font-black uppercase text-[11px] tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all shadow-xl disabled:opacity-20 disabled:grayscale"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <><Send size={16} strokeWidth={2.5} /> Transmit Feedback</>}
      </button>
    </form>
  );
}