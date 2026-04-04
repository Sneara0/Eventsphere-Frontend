"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { 
  Minus, 
  Plus, 
  CreditCard, 
  Loader2, 
  ShieldCheck, 
  Ticket, 
  Info,
  Sparkles
} from "lucide-react";
import { BookingService } from "@/app/services/booking.service";

// ইন্টারফেসটি আরও শক্তিশালী করা হয়েছে
interface IEvent {
  id: string;
  title: string;
  ticketPrice: number;
  availableSeats?: number;
  totalSeats?: number;
}

export default function BookingForm({ event }: { event: IEvent }) {
  // availableSeats না থাকলে totalSeats ব্যবহার করবে, তাও না থাকলে ০
  const actualAvailableSeats = event.availableSeats ?? event.totalSeats ?? 0;
  
  const [quantity, setQuantity] = useState(actualAvailableSeats > 0 ? 1 : 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!event) return null;

  const totalPrice = (event.ticketPrice || 0) * quantity;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (actualAvailableSeats === 0) {
      return toast.error("Sold Out! No seats available.");
    }

    if (quantity < 1) {
      return toast.error("Please select at least 1 ticket.");
    }

    setIsSubmitting(true);
    try {
      const res = await BookingService.createBooking({ 
        eventId: event.id, 
        quantity 
      });
      
      if (res?.success) {
        toast.success("Booking confirmed! Redirecting...");
        
        // পেমেন্ট ইউআরএল থাকলে সরাসরি সেখানে যাবে, নাহলে চেকআউট পেজে
        if (res.data?.paymentUrl) {
          window.location.href = res.data.paymentUrl;
        } else if (res.data?.id) {
          router.push(`/checkout/${res.data.id}`);
        }
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in zoom-in duration-500">
      <div className="bg-[#0a0a0a] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden relative">
        
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]" />

        <div className="bg-gradient-to-br from-[#111] to-[#050505] p-8 border-b border-white/5 relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em] italic">
              <Sparkles size={14} className="animate-pulse" />
              <span>Priority Boarding</span>
            </div>
            <span className={`text-[10px] font-black px-4 py-1.5 rounded-full border tracking-widest italic ${
              actualAvailableSeats < 5 
              ? 'text-red-500 bg-red-500/10 border-red-500/20' 
              : 'text-primary bg-primary/10 border-primary/20'
            }`}>
              {actualAvailableSeats === 0 ? "SOLD OUT" : `${actualAvailableSeats} SEATS LEFT`}
            </span>
          </div>
          
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2 line-clamp-1">
            {event.title}
          </h2>
          
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white tracking-tighter italic">
              ${event.ticketPrice}
            </span>
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">/ Ticket</span>
          </div>
        </div>

        <form onSubmit={handleBooking} className="p-8 relative z-10">
          <div className="mb-8">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-[2.5rem] border border-white/10 focus-within:border-primary/40 transition-all">
              <button 
                type="button"
                disabled={quantity <= 1}
                onClick={() => setQuantity(prev => prev - 1)}
                className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all border border-white/5 disabled:opacity-10"
              >
                <Minus size={20} strokeWidth={3} />
              </button>
              
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-white tracking-tighter italic">{quantity}</span>
                <span className="text-[8px] font-black text-primary uppercase tracking-widest">Quantity</span>
              </div>

              <button 
                type="button"
                disabled={quantity >= actualAvailableSeats}
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all border border-white/5 disabled:opacity-10"
              >
                <Plus size={20} strokeWidth={3} />
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-8 bg-white/[0.03] p-6 rounded-[2rem] border border-white/5">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-black text-xs uppercase tracking-tighter italic">Total Amount</span>
              <span className="text-4xl font-black text-primary tracking-tighter italic">${totalPrice}</span>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting || actualAvailableSeats === 0}
            className="group w-full bg-white text-black hover:bg-primary hover:text-white font-black py-6 rounded-[2rem] flex items-center justify-center gap-4 transition-all duration-500 shadow-2xl active:scale-[0.98] disabled:bg-slate-900 disabled:text-slate-600 uppercase italic tracking-widest"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <CreditCard size={20} className="group-hover:rotate-12 transition-transform" />
                <span>{actualAvailableSeats === 0 ? "NO SEATS" : "Confirm Booking"}</span>
              </>
            )}
          </button>

          <div className="mt-8 flex items-center justify-center gap-8 text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-primary/50" />
              <span className="text-[9px] font-black uppercase tracking-widest">SSL Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket size={14} className="text-primary/50" />
              <span className="text-[9px] font-black uppercase tracking-widest">Instant Ticket</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}