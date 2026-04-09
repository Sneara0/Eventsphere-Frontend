"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { 
  Minus, Plus, CreditCard, Loader2, Sparkles 
} from "lucide-react";
import { BookingService } from "@/app/services/booking.service"; // সার্ভিস ইম্পোর্ট নিশ্চিত করুন

interface IEvent {
  id: string;
  title: string;
  ticketPrice: number;
  availableSeats?: number;
  totalSeats?: number;
}

export default function BookingForm({ event }: { event: IEvent }) {
  const actualAvailableSeats = event?.availableSeats ?? event?.totalSeats ?? 0;
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (actualAvailableSeats > 0) {
      setQuantity(1);
    } else {
      setQuantity(0);
    }
  }, [actualAvailableSeats]);

  if (!event || !event.id) return null;

  const totalPrice = (event?.ticketPrice || 0) * quantity;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // ১. ক্লায়েন্ট সাইড ভ্যালিডেশন
    if (actualAvailableSeats === 0) {
      return toast.error("Sold Out! No seats available.");
    }

    if (quantity < 1) {
      return toast.error("Please select at least 1 ticket.");
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Processing your reservation...");

    try {
      // ২. এপিআই কল (BookingService ব্যবহার করে)
      const res = await BookingService.createBooking({ 
        eventId: event.id, 
        quantity 
      });
      
      if (res?.success) {
        toast.success("Flight reserved! Redirecting to payment...", { id: toastId });
        
        // ৩. পেমেন্ট ইউআরএল-এ রিডাইরেক্ট (Stripe/External Gateway)
        const redirectUrl = res.data?.paymentUrl || res.data?.url;
        
        if (redirectUrl) {
          // এটি একটি এক্সটার্নাল ইউআরএল হবে (যেমন: checkout.stripe.com)
          window.location.href = redirectUrl;
        } else {
          // যদি সরাসরি ইউআরএল না থাকে, তবে ইন্টারনাল চেকআউট পেইজে পাঠান
          router.push(`/checkout/${res.data?.id}`);
        }
      }
    } catch (error: any) {
      const status = error.response?.status;
      const errorMsg = error.response?.data?.message || error.message || "Booking failed!";
      
      toast.error(errorMsg, { id: toastId });

      // ৪. অথেনটিকেশন এরর হ্যান্ডলিং (401 হলে লগইন এ পাঠানো)
      if (status === 401) {
        // Better-Auth বা আপনার সিস্টেম অনুযায়ী লগইন রিডাইরেক্ট
        router.push("/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in zoom-in duration-500">
      <div className="bg-[#0f0f0f] rounded-[3rem] border border-white/5 shadow-2xl shadow-black overflow-hidden relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-[60px]" />

        {/* প্রাইস ডিসপ্লে */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-10 border-b border-white/5 relative z-10 text-center">
            <div className="flex justify-center items-baseline gap-2">
              <span className="text-5xl font-black text-white italic tracking-tighter">${event.ticketPrice}</span>
              <span className="text-gray-500 text-xs font-bold">USD</span>
            </div>
        </div>

        <form id="event-booking-form" onSubmit={handleBooking} className="p-10 relative z-10">
          {/* কোয়ান্টিটি সিলেক্টর */}
          <div className="mb-10">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6 block text-center">
              Select Tickets ({actualAvailableSeats} available)
            </label>
            <div className="flex items-center justify-between p-2 bg-white/5 rounded-[2rem] border border-white/10">
              <button 
                type="button" 
                disabled={quantity <= 1 || isSubmitting} 
                onClick={() => setQuantity(prev => prev - 1)} 
                className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-white/5 disabled:opacity-20"
              >
                <Minus size={20} />
              </button>
              
              <span className="text-4xl font-black text-white tracking-tighter">{quantity}</span>
              
              <button 
                type="button" 
                disabled={quantity >= actualAvailableSeats || isSubmitting} 
                onClick={() => setQuantity(prev => prev + 1)} 
                className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-white/5 disabled:opacity-20"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* টোটাল ক্যালকুলেশন */}
          <div className="mb-10 bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 flex justify-between items-center">
            <span className="text-gray-400 font-black text-xs uppercase tracking-[0.2em]">Total Pay</span>
            <span className="text-4xl font-black text-indigo-500 tracking-tighter italic">${totalPrice.toFixed(2)}</span>
          </div>

          {/* সাবমিট বাটন */}
          <button 
            type="submit" 
            disabled={isSubmitting || actualAvailableSeats === 0} 
            className="w-full bg-white text-black font-black py-6 rounded-[2rem] flex items-center justify-center gap-3 hover:bg-indigo-600 hover:text-white transition-all uppercase italic tracking-widest text-xs shadow-xl active:scale-95 disabled:bg-gray-800 disabled:text-gray-500"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <CreditCard size={20} /> 
                {actualAvailableSeats === 0 ? "Sold Out" : "Secure My Pass"}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}