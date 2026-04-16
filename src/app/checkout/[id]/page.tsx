"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import  axiosInstance  from "@/lib/axiosInstance";
import { Loader2, ShieldCheck, CreditCard, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

function CheckoutContent() {
  const { id: bookingId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/${bookingId}`);
        if (res.data.success) {
          setBooking(res.data.data);
          
          if (sessionId || res.data.data.status === "PAID") {
            setIsSuccess(true);
          }
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("বুকিং ডিটেইলস লোড করা সম্ভব হয়নি!");
        router.push("/bookings");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchBookingDetails();
  }, [bookingId, router, sessionId]);

  const handlePayment = async () => {
    // ১. ডাটা ভ্যালিডেশন
    // আপনার আগের এরর (Amount: null) এর প্রধান কারণ এই ভ্যালুটি ঠিকমতো না পাওয়া
    const finalAmount = booking?.totalPrice || booking?.totalAmount || 0;

    if (!finalAmount || finalAmount <= 0) {
      toast.error("পেমেন্ট অ্যামাউন্ট পাওয়া যায়নি। অনুগ্রহ করে পেজটি রিফ্রেশ দিন।");
      console.log("Current Booking Data:", booking); // ডিবাগিং এর জন্য
      return;
    }

    setIsProcessing(true);
    try {
      // ২. ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
      const response = await axiosInstance.post("/payments/create-session", {
        bookingId: booking?.id,
        totalAmount: Number(finalAmount), // ব্যাকএন্ডে এই নামেই (totalAmount) ডাটা পাঠানো হচ্ছে
        userEmail: booking?.userEmail || booking?.user?.email,
        userId: booking?.userId,
        eventName: booking?.event?.title || "Event Ticket",
      });

      const paymentUrl = response.data?.data?.url || response.data?.url;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        throw new Error("Stripe URL পাওয়া যায়নি!");
      }
    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || "পেমেন্ট শুরু করা যায়নি।");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-blue-500 h-12 w-12 mx-auto" />
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic tracking-tighter">Synchronizing Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20 px-4 flex items-center">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        
        {/* বাম পাশ: অর্ডার ইনফো */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2">
              {isSuccess ? "Booking" : "Review"} <br /> 
              <span className="text-blue-500 text-5xl">{isSuccess ? "Confirmed" : "Your Order"}</span>
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6 backdrop-blur-md relative overflow-hidden">
            {isSuccess && (
              <div className="absolute top-4 right-4 text-green-500 flex items-center gap-1 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                <CheckCircle2 size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Paid</span>
              </div>
            )}
            
            <div className="flex justify-between items-start border-b border-white/5 pb-6">
              <div>
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">Selected Event</span>
                <span className="font-bold text-lg text-white">{booking?.event?.title}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-blue-500 text-sm font-black uppercase italic tracking-wider">Grand Total</span>
              <span className="text-4xl font-black text-white tracking-tighter">
                BDT {booking?.totalPrice || booking?.totalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* ডান পাশ: পেমেন্ট গেটওয়ে */}
        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[400px]">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full" />

          {!isSuccess ? (
            <>
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <ShieldCheck className="text-green-500" size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Secure Stripe Payment</span>
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase italic">Payment Method</h3>
                <div className="bg-white/5 border-2 border-blue-600/50 p-5 rounded-2xl flex items-center gap-4">
                  <CreditCard className="text-blue-500" />
                  <span className="text-sm font-bold uppercase tracking-widest">Credit Card</span>
                </div>
              </div>
              
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase italic tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="animate-spin h-5 w-5" /> : "Pay Now →"}
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
              <CheckCircle2 size={48} className="text-green-500" />
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">Payment Received!</h3>
              <button 
                onClick={() => router.push("/bookings")}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em]"
              >
                Go to My Bookings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={40} /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}