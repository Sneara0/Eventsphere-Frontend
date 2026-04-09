"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { Loader2, CreditCard, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { id: bookingId } = useParams();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/${bookingId}`);
        if (res.data.success) {
          setBooking(res.data.data);
        }
      } catch (error) {
        toast.error("Failed to load booking details!");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <Loader2 className="animate-spin text-blue-500 h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* বাম পাশ: বুকিং সামারি */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">Order Summary</h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Event</span>
              <span className="font-bold text-sm">{booking?.event?.title}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Quantity</span>
              <span className="font-bold text-sm">{booking?.quantity} Tickets</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-blue-500 text-sm font-black uppercase italic">Total Amount</span>
              <span className="text-2xl font-black text-white">${booking?.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* ডান পাশ: পেমেন্ট ফর্ম (এখানে আপনার Stripe Elements থাকবে) */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
           <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="text-green-500" size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Secure Stripe Checkout</span>
           </div>
           
           {/* আপনার স্ট্রাইপ কম্পোনেন্ট এখানে কল করবেন */}
           <div className="space-y-6">
              <div className="h-12 bg-white/5 border border-white/10 rounded-xl flex items-center px-4 text-slate-500 text-xs italic">
                Card details input will be here...
              </div>
              
              <button className="w-full h-14 bg-blue-600 rounded-2xl font-black uppercase italic tracking-widest text-xs hover:bg-blue-700 transition-all">
                Pay Now
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}