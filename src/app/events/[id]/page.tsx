import { MapPin, Calendar, Users, ChevronLeft, ArrowRight, ShieldCheck, CreditCard, Zap } from "lucide-react";
import Link from "next/link";
import BookingForm from "@/components/Booking/BookingForm";

// এই ফাংশনটি আপনার API থেকে ডাটা নিয়ে আসবে
async function getEvent(id: string) {
  // আপনার রিয়েল API কল এখানে বসান
  return {
    id,
    title: "Dreamliner 787: Premium Sky Experience",
    description: "Experience the ultimate luxury in the sky with our premium flight event. Enjoy world-class amenities and breathtaking views from 35,000 feet.",
    ticketPrice: 299,
    availableSeats: 12,
    totalSeats: 50,
    location: "Dhaka International Airport",
    dateTime: "2026-05-20T10:00:00Z",
    thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
  };
}

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) return <div className="text-white text-center py-20">Event Not Found</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-40">
      
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent z-10" />
        <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-10 left-10 z-20">
          <Link href="/events" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
            <ChevronLeft size={14} /> Back
          </Link>
        </div>
        <div className="absolute bottom-10 left-10 z-20 max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">{event.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-12">
          {/* Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl">
              <Calendar className="text-indigo-500 mb-3" size={20} />
              <p className="text-[9px] font-bold text-slate-500 uppercase">Date</p>
              <p className="font-bold italic">{new Date(event.dateTime).toDateString()}</p>
            </div>
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl">
              <MapPin className="text-rose-500 mb-3" size={20} />
              <p className="text-[9px] font-bold text-slate-500 uppercase">Location</p>
              <p className="font-bold italic">{event.location}</p>
            </div>
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl">
              <Users className="text-emerald-500 mb-3" size={20} />
              <p className="text-[9px] font-bold text-slate-500 uppercase">Status</p>
              <p className="font-bold italic">{event.availableSeats} Seats Left</p>
            </div>
          </div>

          <div className="space-y-4">
             <h2 className="text-2xl font-black italic uppercase border-l-4 border-indigo-500 pl-4">Overview</h2>
             <p className="text-lg text-slate-400 leading-relaxed italic">{event.description}</p>
          </div>
        </div>

        {/* Right Side: Floating Booking Form */}
        <div className="lg:col-span-5 sticky top-10">
          <BookingForm event={event} />
        </div>
      </div>

      {/* 3. The "Secure My Pass" Fixed Bar */}
      <div className="fixed bottom-6 left-0 w-full z-[100] px-6 md:px-10 pointer-events-none">
        <div className="max-w-5xl mx-auto bg-black/80 backdrop-blur-3xl border border-white/10 p-6 rounded-[3.5rem] flex justify-between items-center pointer-events-auto shadow-2xl">
          <div className="flex flex-col">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic mb-1">Standard Fare</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black italic tracking-tighter">${event.ticketPrice}</span>
              <span className="text-indigo-400 text-xs font-bold">USD</span>
            </div>
          </div>

          {/* এই বাটনটিই এখন উপরের ফর্মটিকে ট্রিগার করবে */}
          <button 
            type="submit"
            form="event-booking-form" 
            className="group flex items-center gap-6 bg-white text-black px-10 py-5 rounded-full font-black uppercase italic tracking-widest text-[10px] transition-all hover:bg-indigo-600 hover:text-white hover:scale-[1.02] active:scale-95 shadow-xl"
          >
            <CreditCard size={18} />
            <span>{event.availableSeats === 0 ? "Sold Out" : "Secure My Pass"}</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}