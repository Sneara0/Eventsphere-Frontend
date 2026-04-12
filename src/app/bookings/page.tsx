// 📂 src/app/my-bookings/page.tsx
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { 
  Trash2, 
  Loader2, 
  Calendar, 
  MapPin, 
  Search, 
  ArrowRight, 
  Sparkles, 
  CreditCard,
  Tag 
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookingService } from "../services/booking.service";
import CouponInput from "@/components/modules/coupon/CouponInput";

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await BookingService.getMyBookings();
      setBookings(res.data || []);
    } catch (error: any) {
      toast.error("Failed to load bookings list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await BookingService.deleteBooking(id);
      if (res.success) {
        toast.success("Booking cancelled successfully");
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error cancelling booking");
    }
  };

  const handlePaymentRedirect = (bookingId: string) => {
    toast.loading("Preparing payment session...");
    router.push(`/payments?bookingId=${bookingId}`);
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#050505]">
      <Loader2 className="animate-spin text-indigo-500" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-[0.2em] uppercase text-xs">
              <Sparkles size={14} /> 
              <span>User Dashboard</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter">My <span className="text-indigo-500">Tickets</span></h1>
          </div>
          <Link href="/events" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black hover:bg-indigo-500 hover:text-white transition-all duration-500">
            Find More Events <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Bookings List */}
        <div className="grid gap-8">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="relative group bg-[#0f0f0f] border border-white/5 p-8 md:p-10 rounded-[3rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-700 shadow-2xl shadow-black">
                
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] group-hover:bg-indigo-600/20 transition-all duration-700" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  
                  {/* Left Section: Event Info & Coupon Input */}
                  <div className="flex-1 w-full space-y-6">
                    <div className="flex items-center gap-4">
                      <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${
                        booking.paymentStatus === 'PAID' 
                        ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                        : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                      <span className="text-gray-600 text-xs font-mono tracking-widest uppercase">SEC-ID: {booking.id.slice(-8).toUpperCase()}</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold tracking-tight text-white/90 leading-tight uppercase">
                      {booking.event.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-200 transition-colors">
                        <Calendar size={18} className="text-indigo-400" />
                        <span className="text-sm font-medium">
                          {new Date(booking.event.dateTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-200 transition-colors">
                        <MapPin size={18} className="text-indigo-400" />
                        <span className="text-sm font-medium">{booking.event.location}</span>
                      </div>
                    </div>

                    {/* Coupon Section */}
                    {booking.paymentStatus === 'UNPAID' && (
                      <div className="mt-6 pt-6 border-t border-white/5 max-w-sm">
                        {booking.discountAmount > 0 ? (
                          <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 w-fit px-4 py-2 rounded-xl">
                            <Tag size={14} className="text-indigo-400" />
                            <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">
                              Coupon Applied: -${booking.discountAmount}
                            </p>
                          </div>
                        ) : (
                          <CouponInput 
                            eventId={booking.event.id} 
                            originalAmount={booking.totalAmount}
                            onApplySuccess={(data) => {
                              // Local state update so the price reflects immediately
                              setBookings(prev => prev.map(b => 
                                b.id === booking.id 
                                ? { ...b, totalAmount: data.finalAmount, discountAmount: data.discountAmount } 
                                : b
                              ));
                              toast.success("Coupon applied to your ticket!");
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Section: Price & Actions */}
                  <div className="w-full md:w-auto flex flex-row md:flex-col lg:flex-row items-center gap-8 md:gap-12 pl-0 md:pl-10 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0">
                    
                    <div className="text-left md:text-center min-w-[100px]">
                      <p className="text-[10px] text-gray-600 font-black uppercase mb-1 tracking-widest">Payable</p>
                      <div className="flex flex-col">
                        {booking.discountAmount > 0 && (
                          <span className="text-sm text-gray-600 line-through font-bold opacity-50">
                            ${booking.totalAmount + booking.discountAmount}
                          </span>
                        )}
                        <p className="text-4xl font-black text-indigo-500 tracking-tighter italic">
                          ${booking.totalAmount}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 ml-auto md:ml-0">
                      {booking.paymentStatus === 'UNPAID' && (
                        <button 
                          onClick={() => handlePaymentRedirect(booking.id)}
                          className="flex items-center gap-3 bg-indigo-600 hover:bg-white hover:text-black text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20 active:scale-95 group/btn"
                        >
                          <CreditCard size={18} className="group-hover/btn:rotate-12 transition-transform" /> 
                          Pay Now
                        </button>
                      )}

                      <button 
                        onClick={() => handleDelete(booking.id)}
                        className="p-4 bg-white/5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all border border-white/5 hover:border-red-500/20"
                        title="Cancel Booking"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 bg-[#0a0a0a] rounded-[4rem] border-2 border-dashed border-white/5">
              <Search size={40} className="text-gray-800 mx-auto mb-6 opacity-20" />
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">No active tickets found</h3>
              <Link href="/events" className="inline-flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Browse Events <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}