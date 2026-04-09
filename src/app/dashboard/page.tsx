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
  ArrowUpRight 
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

export default function DashboardOverview() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await BookingService.getMyBookings();
        setBookings(res.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // ১. টিকিট ডাউনলোড ফাংশন
  const handleDownloadTicket = async (bookingId: string) => {
    try {
      toast.loading("Generating your digital ticket...", { id: "download" });
      
      // আপনার ব্যাকএন্ড এন্ডপয়েন্ট অনুযায়ী ইউআরএল (যেমন: /api/v1/bookings/ticket/:id)
      const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/bookings/ticket/${bookingId}`;
      
      // সরাসরি নতুন ট্যাবে ওপেন হবে যা PDF ডাউনলোড ট্রিগার করবে
      window.open(downloadUrl, "_blank");
      
      toast.success("Ticket downloaded successfully!", { id: "download" });
    } catch (error) {
      toast.error("Failed to generate ticket. Try again later.", { id: "download" });
    }
  };

  // Summary logic
  const totalSpent = bookings.reduce((acc, curr: any) => acc + (curr.paymentStatus === "PAID" ? curr.totalAmount : 0), 0);

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: <CalendarDays />, color: "text-blue-500" },
    { label: "Upcoming Events", value: bookings.filter((b: any) => b.paymentStatus === "PAID").length, icon: <CheckCircle2 />, color: "text-green-500" },
    { label: "Total Spent", value: `৳${totalSpent}`, icon: <CreditCard />, color: "text-indigo-500" },
  ];

  return (
    <div className="space-y-10">
      {/* ১. স্ট্যাটাস ওভারভিউ (Summary Cards) */}
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

      {/* ২. পাসওয়ার্ড/সিকিউরিটি কুইক অ্যাক্সেস কার্ড */}
      <Link href="/dashboard/security">
        <div className="mt-8 bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/20 p-6 rounded-[2rem] flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-tighter italic">Privacy & Security</h4>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Update your password and secure your account</p>
            </div>
          </div>
          <ArrowUpRight className="text-gray-600 group-hover:text-indigo-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>
      </Link>

      {/* ৩. বুকিং ম্যানেজমেন্ট (My Bookings) */}
      <section>
        <h3 className="text-lg font-bold uppercase tracking-widest text-gray-400 mb-6 px-2">Recent Activities</h3>
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

                {/* Event Info */}
                <div className="flex-1 space-y-1 text-center md:text-left">
                  <h4 className="text-xl font-bold uppercase italic leading-none text-white">{booking.event?.title}</h4>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1 text-indigo-400"><MapPin size={12}/> {booking.event?.location}</span>
                    <span>{new Date(booking.event?.dateTime).toDateString()}</span>
                  </div>
                </div>

                {/* Status & Download */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                     <p className="text-[10px] text-gray-500 font-bold uppercase">Status</p>
                     <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${booking.paymentStatus === 'PAID' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                      {booking.paymentStatus}
                     </span>
                  </div>
                  
                  {/* ডাউনলোড বাটন - শুধুমাত্র PAID হলে দেখাবে */}
                  {booking.paymentStatus === 'PAID' && (
                    <button 
                      onClick={() => handleDownloadTicket(booking.id)}
                      className="p-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl transition-all shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95"
                      title="Download Ticket"
                    >
                      <Download size={18} />
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