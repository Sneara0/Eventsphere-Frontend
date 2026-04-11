"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { Loader2, ShieldCheck, CreditCard } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { id: bookingId } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/${bookingId}`);
        if (res.data.success) {
          setBooking(res.data.data);
        }
      } catch (error) {
        toast.error("বুকিং ডিটেইলস লোড করা সম্ভব হয়নি!");
        router.push("/bookings");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchBookingDetails();
  }, [bookingId, router]);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // ব্যাকএন্ড থেকে পেমেন্ট সেশন তৈরি করা
      const response = await axiosInstance.post("/payment/create-payment-session", {
        bookingId: booking?.id,
        totalAmount: Number(booking?.totalPrice),
        userEmail: booking?.userEmail || booking?.user?.email,
        userId: booking?.userId,
        eventName: booking?.event?.title,
      });

      const { url } = response.data.data;

      if (url) {
        // Stripe-এর সিকিউর পেমেন্ট পেজে রিডাইরেক্ট করা
        window.location.href = url;
      } else {
        throw new Error("Payment URL not found!");
      }
    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || "পেমেন্ট শুরু করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="text-center space-y-4">
            <Loader2 className="animate-spin text-blue-500 h-12 w-12 mx-auto" />
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Loading Checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20 px-4 flex items-center">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        
        {/* বাম পাশ: অর্ডার সামারি */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2">
              Review <br /> <span className="text-blue-500 text-5xl">Your Order</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium">Please verify your booking details before proceeding to payment.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6 backdrop-blur-md">
            <div className="flex justify-between items-start border-b border-white/5 pb-6">
              <div>
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">Selected Event</span>
                <span className="font-bold text-lg text-white">{booking?.event?.title}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-6">
               <div>
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">Ticket Quantity</span>
                  <span className="font-bold text-white">{booking?.quantity} Tickets</span>
               </div>
               <div className="text-right">
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">Booking ID</span>
                  <span className="font-mono text-[10px] text-blue-400">#{booking?.id?.slice(0, 8)}</span>
               </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-blue-500 text-sm font-black uppercase italic tracking-wider">Grand Total</span>
              <span className="text-4xl font-black text-white tracking-tighter">
                BDT {booking?.totalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* ডান পাশ: পেমেন্ট গেটওয়ে */}
        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[400px]">
           {/* Decorative background element */}
           <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full" />

           <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-green-500/10 p-2 rounded-lg">
                    <ShieldCheck className="text-green-500" size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Secure Stripe Gateway</span>
              </div>
              
              <h3 className="text-xl font-bold mb-4">Payment Method</h3>
              <div className="bg-white/5 border-2 border-blue-600/50 p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <CreditCard className="text-blue-500" />
                    <span className="text-sm font-bold">Credit / Debit Card</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-6 h-4 bg-white/10 rounded-sm" />
                    <div className="w-6 h-4 bg-white/10 rounded-sm" />
                </div>
              </div>
              <p className="text-slate-500 text-[11px] mt-6 leading-relaxed italic">
                By clicking "Pay Now", you will be securely redirected to Stripe to finalize your transaction. Your data is encrypted and safe.
              </p>
           </div>
           
           <button 
             onClick={handlePayment}
             disabled={isProcessing}
             className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase italic tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
           >
             {isProcessing ? (
               <Loader2 className="animate-spin h-5 w-5" />
             ) : (
               <>
                 Pay Now
                 <span className="group-hover:translate-x-1 transition-transform">→</span>
               </>
             )}
           </button>
        </div>

      </div>
    </div>
  );
}