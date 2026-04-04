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


interface IEvent {
  id: string;
  title: string;
  ticketPrice: number;
  availableSeats: number;
}

export default function BookingForm({ event }: { event: IEvent }) {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const totalPrice = event.ticketPrice * quantity;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // ভ্যালিডেশন: সিট খালি আছে কি না
    if (quantity > event.availableSeats) {
      return toast.error(`Only ${event.availableSeats} seats available!`);
    }

    setIsSubmitting(true);
    try {
      const res = await BookingService.createBooking({ 
        eventId: event.id, 
        quantity 
      });
      
      if (res.success) {
        toast.success("Reservation confirmed! Proceeding to checkout.");
        // বুকিং আইডি দিয়ে চেকআউট পেজে পাঠিয়ে দেওয়া
        router.push(`/checkout/${res.data.id}`);
      }
    } catch (error: any) {
      // ব্যাকএন্ড থেকে আসা এরর মেসেজ হ্যান্ডেল করা
      const errorMsg = error.response?.data?.message || "Something went wrong during booking";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-[#0f0f0f] rounded-[3rem] border border-white/5 shadow-2xl shadow-black overflow-hidden relative">
        
        {/* Decorative Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-[60px]" />

        {/* Pricing Header */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-10 border-b border-white/5 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em]">
              <Sparkles size={12} />
              <span>Premium Access</span>
            </div>
            <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${
              event.availableSeats < 5 
              ? 'text-red-500 bg-red-500/10 border-red-500/20' 
              : 'text-amber-500 bg-amber-500/10 border-amber-500/20'
            }`}>
              {event.availableSeats === 0 ? "OUT OF STOCK" : `${event.availableSeats} SEATS LEFT`}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white tracking-tighter">${event.ticketPrice}</span>
            <span className="text-gray-500 text-sm font-medium">/ per ticket</span>
          </div>
        </div>

        <form onSubmit={handleBooking} className="p-10 relative z-10">
          {/* Quantity Selector */}
          <div className="mb-10">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6 block">
              Select Tickets
            </label>
            
            <div className="flex items-center justify-between p-2 bg-white/5 rounded-[2rem] border border-white/10 focus-within:border-indigo-500/50 transition-all">
              <button 
                type="button"
                disabled={quantity <= 1}
                onClick={() => setQuantity(prev => prev - 1)}
                className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all border border-white/5 disabled:opacity-20"
              >
                <Minus size={20} />
              </button>
              
              <span className="text-4xl font-black text-white tracking-tighter">{quantity}</span>

              <button 
                type="button"
                disabled={quantity >= event.availableSeats}
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all border border-white/5 disabled:opacity-20"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="space-y-4 mb-10 bg-white/[0.02] p-6 rounded-[2rem] border border-white/5">
            <div className="flex justify-between text-gray-500 text-xs font-bold uppercase tracking-widest">
              <span>Subtotal</span>
              <span className="text-white">${totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-xs font-bold uppercase tracking-widest">
              <span>Platform Fee</span>
              <span className="text-indigo-400">INCLUDED</span>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-gray-400 font-black text-xs uppercase tracking-[0.2em]">Total Amount</span>
              <span className="text-4xl font-black text-indigo-500 tracking-tighter">${totalPrice}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isSubmitting || event.availableSeats === 0}
            className="group w-full bg-white text-black hover:bg-indigo-600 hover:text-white font-black py-6 rounded-[2rem] flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl shadow-black active:scale-[0.98] disabled:bg-gray-800 disabled:text-gray-500"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <CreditCard size={20} className="group-hover:rotate-12 transition-transform" />
                <span>{event.availableSeats === 0 ? "SOLD OUT" : "SECURE MY PASS"}</span>
              </>
            )}
          </button>

          {/* Trust Badges */}
          <div className="mt-8 flex items-center justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-indigo-500/50" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket size={14} className="text-indigo-500/50" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Instant E-Ticket</span>
            </div>
          </div>
        </form>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-6 flex items-start gap-3 px-6 text-gray-600">
        <Info size={14} className="mt-1 flex-shrink-0 text-indigo-500/30" />
        <p className="text-[10px] leading-relaxed uppercase tracking-widest font-bold">
          Transactions are encrypted via Stripe. Please review our 24h cancellation policy before booking.
        </p>
      </div>
    </div>
  );
}