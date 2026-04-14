"use client";
import React, { useEffect, useState } from "react";
import { BookingService } from "@/app/services/booking.service";
import { 
  CreditCard, 
  CalendarDays, 
  CheckCircle2, 
  MapPin, 
  Download, 
  ShieldCheck, 
  ArrowUpRight,
  Loader2 
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { PaymentService } from "../services/payment.service";

export default function DashboardOverview() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // ১. সরাসরি লোকাল স্টোরেজ থেকে টোকেন নিন
        const savedToken = localStorage.getItem("accessToken"); 
        if (!savedToken) {
          toast.error("Session expired. Please login again.");
          return;
        }
        setToken(savedToken);

        // ২. ডাটা ফেচ করুন
        const res = await BookingService.getMyBookings();
        setBookings(res.data || []);
      } catch (error: any) {
        console.error("Fetch error:", error);
        if (error.response?.status === 401) {
           toast.error("Unauthorized! Please login again.");
        } else {
           toast.error("Failed to load bookings");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // ইনভয়েস/টিকিট ডাউনলোড হ্যান্ডলার
  const handleDownload = async (bookingId: string) => {
    try {
      toast.loading("Generating your receipt...", { id: "download" });
      
      // পেমেন্ট সার্ভিস থেকে ডাউনলোড মেথড কল করুন
      await PaymentService.downloadInvoice(bookingId, token);
      
      toast.success("Receipt downloaded successfully!", { id: "download" });
    } catch (error) {
      toast.error("Could not download invoice.", { id: "download" });
    }
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-indigo-500" size={40} />
    </div>
  );

  const totalSpent = bookings.reduce((acc, curr: any) => 
    acc + (curr.paymentStatus === "PAID" ? curr.totalAmount : 0), 0
  );

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: <CalendarDays />, color: "text-blue-500" },
    { label: "Confirmed Events", value: bookings.filter((b: any) => b.paymentStatus === "PAID").length, icon: <CheckCircle2 />, color: "text-green-500" },
    { label: "Total Spent", value: `৳${totalSpent}`, icon: <CreditCard />, color: "text-indigo-500" },
  ];

  return (
    <div className="space-y-10">
      {/* ১. স্ট্যাটাস কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={stat.label} className="bg-[#0f0f0f] border border-white/5 p-6 rounded-[2rem] hover:border-indigo-500/30 transition-all group">
            <div className={`p-3 w-fit rounded-2xl bg-white/5 mb-4 ${stat.color} group-hover:scale-110 transition-transform`}>{stat.icon}</div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* ২. সিকিউরিটি সেকশন */}
      <Link href="/dashboard/security">
        <div className="bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/20 p-6 rounded-[2rem] flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-tighter italic">Security Center</h4>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Manage your credentials</p>
            </div>
          </div>
          <ArrowUpRight className="text-gray-600 group-hover:text-indigo-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>
      </Link>

      {/* ৩. বুকিং লিস্ট সেকশন */}
      <section>
        <h3 className="text-lg font-bold uppercase tracking-widest text-gray-400 mb-6 px-2">Your Activities</h3>
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-20 bg-[#0f0f0f] rounded-[3rem] border border-dashed border-white/5">
              <p className="text-gray-600 font-bold uppercase tracking-widest italic">No bookings found</p>
            </div>
          ) : (
            bookings.map((booking: any) => (
              <div key={booking.id} className="bg-[#0f0f0f] border border-white/5 p-5 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 hover:bg-[#121212] transition-all group">
                
                {/* Event Image */}
                <div className="w-full md:w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center shrink-0 overflow-hidden border border-white/5">
                  {booking.event?.image ? 
                    <img src={booking.event.image} alt="event" className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500" /> 
                    : <CalendarDays className="text-gray-700" size={32}/>
                  }
                </div>

                {/* Event Details */}
                <div className="flex-1 space-y-1 text-center md:text-left">
                  <h4 className="text-xl font-bold uppercase italic leading-none text-white">{booking.event?.title}</h4>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1 text-indigo-400"><MapPin size={12}/> {booking.event?.location}</span>
                    <span>{new Date(booking.event?.dateTime).toDateString()}</span>
                  </div>
                </div>

                {/* Actions: Status & Receipt Download */}
                <div className="flex flex-row items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                     <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Status</p>
                     <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${
                       booking.paymentStatus === 'PAID' 
                       ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                       : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                     }`}>
                      {booking.paymentStatus}
                     </span>
                  </div>
                  
                  {/* শুধুমাত্র PAID স্ট্যাটাস থাকলে রিসিট বাটন দেখাবে */}
                  {booking.paymentStatus === 'PAID' && (
                    <button 
                      onClick={() => handleDownload(booking.id)}
                      className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-indigo-600 text-white rounded-[1.5rem] transition-all border border-white/10 hover:border-indigo-400 group/btn shadow-xl"
                      title="Download Receipt"
                    >
                      <Download size={18} className="group-hover/btn:scale-110 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Receipt</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}