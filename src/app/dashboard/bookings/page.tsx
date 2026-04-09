"use client";
import React, { useEffect, useState } from "react";
import { BookingService } from "@/app/services/booking.service";
import { Calendar, MapPin, Download, Ticket } from "lucide-react";
import { motion } from "framer-motion";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await BookingService.getMyBookings();
      setBookings(res.data || []);
    };
    fetch();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">
          My <span className="text-indigo-500">Bookings</span>
        </h1>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-2">Manage all your event reservations</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-[#0f0f0f] rounded-[3rem] border border-dashed border-white/5">
             <Ticket className="mx-auto text-gray-800 mb-4" size={48} />
             <p className="text-gray-600 font-bold uppercase tracking-widest italic text-sm">No events booked yet.</p>
          </div>
        ) : (
          bookings.map((booking: any) => (
            <div key={booking.id} className="bg-[#0f0f0f] border border-white/5 p-6 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 hover:border-indigo-500/20 transition-all group">
              <div className="w-full md:w-32 h-32 bg-white/5 rounded-2xl overflow-hidden shrink-0">
                {booking.event?.image && <img src={booking.event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold uppercase italic text-white mb-2">{booking.event?.title}</h3>
                <div className="space-y-1 text-gray-500 text-xs font-bold uppercase tracking-widest">
                  <p className="flex items-center gap-2"><Calendar size={14} className="text-indigo-500"/> {new Date(booking.event?.dateTime).toDateString()}</p>
                  <p className="flex items-center gap-2"><MapPin size={14} className="text-indigo-500"/> {booking.event?.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                <div className="text-right flex-1 md:flex-none">
                  <p className="text-[10px] text-gray-500 font-black uppercase">Amount Paid</p>
                  <p className="text-xl font-black text-white">৳{booking.totalAmount}</p>
                </div>
                {booking.paymentStatus === "PAID" && (
                  <button className="p-4 bg-indigo-500 hover:bg-indigo-600 rounded-2xl transition-all shadow-lg shadow-indigo-500/20">
                    <Download size={20} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}