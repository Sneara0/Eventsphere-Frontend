"use client";

import { useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { BookingService } from "@/app/services/booking.service";

function PaymentFulfillment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  
  // Strict Mode-এ ডাবল কল আটকানোর জন্য useRef ব্যবহার
  const isInitiated = useRef(false);

  useEffect(() => {
    const initiatePayment = async () => {
      // ১. যদি বুকিং আইডি না থাকে তবে রিডাইরেক্ট
      if (!bookingId) {
        toast.error("Invalid booking information");
        router.replace("/bookings"); // নিশ্চিত করুন এই পাথটি আপনার প্রজেক্টে আছে
        return;
      }

      // ২. অলরেডি একবার শুরু হয়ে গেলে আর রান করবে না
      if (isInitiated.current) return;
      isInitiated.current = true;

      try {
        // ৩. প্রথমে ডাটাবেজ থেকে বুকিং ডিটেইলস নিয়ে আসা (যাতে NaN এরর না হয়)
        const bookingRes = await BookingService.getSingleBooking(bookingId);
        const booking = bookingRes.data;

        // ৪. সব তথ্যসহ পেমেন্ট সেশন তৈরি (টাইপস্ক্রিপ্ট এরর সমাধান)
        const res = await BookingService.createPaymentSession({ 
          bookingId: booking.id,
          totalAmount: Number(booking.totalAmount), // string হলে number এ কনভার্ট
          userEmail: booking.user.email,
          eventName: booking.event.title,
          userId: booking.userId
        });
        
        // ব্যাকএন্ডের রেসপন্স ফরম্যাট অনুযায়ী URL চেক
        const paymentUrl = res?.data?.url || res?.url;

        if (paymentUrl) {
          // ইউজারকে এনিমেশন দেখানোর জন্য সামান্য ডিলে
          setTimeout(() => {
            window.location.href = paymentUrl;
          }, 1500);
        } else {
          throw new Error("Stripe checkout link not found!");
        }
      } catch (error: any) {
        console.error("Payment Error:", error);
        toast.error(error?.message || "Something went wrong!");
        router.push("/bookings");
      }
    };

    initiatePayment();
  }, [bookingId, router]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 w-full max-w-md"
    >
      <div className="bg-[#0f0f0f] border border-white/5 rounded-[3rem] p-10 md:p-14 text-center shadow-2xl backdrop-blur-xl relative overflow-hidden">
        
        {/* Animated Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-b-full shadow-[0_0_20px_rgba(99,102,241,0.5)]" />

        {/* Loader Section */}
        <div className="relative flex justify-center mb-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-28 h-28 border-2 border-dashed border-indigo-500/30 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ShieldCheck className="text-indigo-500" size={56} strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 mb-10">
          <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
            Securing <br /> <span className="text-indigo-500">Transaction</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            <Loader2 size={12} className="animate-spin" /> Redirecting to Stripe
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
              <Lock className="text-indigo-400" size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-white font-black uppercase tracking-widest">End-to-End</p>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Encrypted</p>
            </div>
          </div>
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-[#0f0f0f]" />
            <div className="w-7 h-7 rounded-full bg-indigo-500/20 border-2 border-[#0f0f0f]" />
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-10 text-[8px] text-gray-600 font-bold uppercase tracking-[0.2em]">
          EventSphere v3.0 • Secure Gateway
        </p>
      </div>
    </motion.div>
  );
}

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 selection:bg-indigo-500/30 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <Suspense fallback={
        <div className="text-indigo-500 font-black italic animate-pulse tracking-tighter uppercase text-xl">
          Initializing Gateway...
        </div>
      }>
        <PaymentFulfillment />
      </Suspense>
    </div>
  );
}