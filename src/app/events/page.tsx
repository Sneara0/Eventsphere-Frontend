"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, X, Zap, Sparkles, MessageSquare } from "lucide-react";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/types/event";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ReviewSection from "@/components/modules/reviews/ReviewSection"; // আপনার তৈরি করা রিভিউ কম্পোনেন্ট

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/events", {
        params: { searchTerm },
        withCredentials: true,
      });
      setEvents(data.data || []);
    } catch (error) {
      console.error("API Fetch Error:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(loadData, 600);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const rawFormData = new FormData(form);

    const date = rawFormData.get("dateInput");
    const time = rawFormData.get("time");
    let dateTimeISO = "";
    if (date && time) {
      dateTimeISO = new Date(`${date}T${time}`).toISOString();
    }

    try {
      // ১. Cloudinary-তে ইমেজ আপলোড
      const imageFile = rawFormData.get("image") as File;
      let uploadedImageUrl = "";

      if (imageFile && imageFile.size > 0) {
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", imageFile);
        cloudinaryFormData.append("upload_preset", "eventsphere_preset"); 
        cloudinaryFormData.append("cloud_name", "dxmaoxp6b");

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dxmaoxp6b/image/upload",
          cloudinaryFormData
        );
        uploadedImageUrl = cloudRes.data.secure_url;
      }

      // ২. Payload Structure
      const finalPayload = {
        body: {
          title: rawFormData.get("title"),
          description: rawFormData.get("description") || `Premium flight to ${rawFormData.get("location")}`,
          category: "FLIGHT",
          dateTime: dateTimeISO,
          time: rawFormData.get("time"),
          venue: rawFormData.get("venue"),
          location: rawFormData.get("location"),
          ticketPrice: rawFormData.get("ticketPrice"),
          totalSeats: rawFormData.get("totalSeats"),
          thumbnail: uploadedImageUrl,
          airlineName: rawFormData.get("airlineName"),
          flightClass: "ECONOMY",
          isRefundable: "true",
        }
      };

      const response = await axios.post("http://localhost:5000/api/v1/events", finalPayload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        toast.success("Flight Launched Successfully! 🚀");
        setIsModalOpen(false);
        form.reset();
        loadData();

        const newEventId = response.data?.data?.id;
        if (newEventId) {
          router.push(`/events/${newEventId}`);
        }
      }
    } catch (error: any) {
      console.error("Critical Error:", error);
      const errorMsg = error.response?.data?.message || "Launch Failed!";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-32 px-6 overflow-hidden relative text-white font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div>
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 italic">
              <Zap size={14} fill="currentColor" /> Event Sphere Premiere
            </div>
            <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-10">
              Discover <br /> <span className="text-primary">Flights.</span>
            </h1>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
            >
              <Plus size={20} strokeWidth={3} /> Launch Flight
            </button>
          </div>

          <div className="relative w-full md:w-[500px] group">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-all duration-500" size={22} />
            <input
              type="text"
              placeholder="SEARCH DESTINATIONS..."
              className="w-full bg-white/5 border border-white/10 p-7 pl-16 rounded-[2.5rem] outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-black italic text-xs tracking-[0.2em] placeholder:text-slate-700 text-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- Main Content (Event Cards) --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-48 gap-6">
            <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase text-slate-600 tracking-[0.8em] animate-pulse">Syncing Universe</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-48 border border-dashed border-white/10 rounded-[4rem] bg-white/[0.02]">
                <Sparkles size={60} className="mx-auto text-slate-800 mb-6" />
                <h3 className="text-slate-600 font-black uppercase italic tracking-[0.4em] text-sm">No Flights Orbiting Right Now</h3>
              </div>
            )}
          </div>
        )}

        {/* --- Community & Reviews Section (Added Here) --- */}
        <div className="mt-40 border-t border-white/5 pt-20">
          <div className="grid lg:grid-cols-3 gap-20">
            <div className="lg:col-span-1">
              <div className="sticky top-40">
                <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                  <MessageSquare size={14} /> Passenger Testimonials
                </div>
                <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-6">
                  What They <br /> <span className="text-primary">Say.</span>
                </h2>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                  Real experiences from our elite travelers. Trust the journey, verify the flight.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-2 bg-white/[0.01] rounded-[3rem] p-1 border border-white/5">
              {/* নির্দিষ্ট ইভেন্টের বদলে এখানে ইভেন্ট লিস্টের প্রথমটির রিভিউ অথবা গ্লোবাল রিভিউ দেখাতে পারেন */}
              <ReviewSection eventId={events[0]?.id || "global"} />
            </div>
          </div>
        </div>
      </div>

      {/* --- Launch Flight Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80">
          <div className="bg-[#0a0f1e] border border-white/10 w-full max-w-2xl rounded-[3rem] p-10 relative overflow-y-auto max-h-[90vh] shadow-2xl custom-scrollbar">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
              <X size={28} />
            </button>

            <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-10 leading-none">
              Launch <br /><span className="text-primary">Flight.</span>
            </h2>

            <form onSubmit={handleCreateEvent} className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block">Flight Title</label>
                <input name="title" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-primary/50 text-white" />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block">Description</label>
                <textarea name="description" rows={3} required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-primary/50 text-white" />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block">Flight Poster (Image)</label>
                <input type="file" name="image" required accept="image/*" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl file:bg-primary file:text-white file:border-none file:rounded file:px-4 cursor-pointer" />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block">Airline Name</label>
                <input name="airlineName" placeholder="e.g. Emirates" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block">From</label>
                <input name="venue" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block">To</label>
                <input name="location" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block">Date</label>
                <input type="date" name="dateInput" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block">Time</label>
                <input type="time" name="time" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block">Price ($)</label>
                <input type="number" name="ticketPrice" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block">Total Seats</label>
                <input type="number" name="totalSeats" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>

              <div className="col-span-2 pt-6">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase italic tracking-[0.4em] disabled:opacity-50 transition-all hover:scale-[1.01] active:scale-95 shadow-xl shadow-primary/20"
                >
                  {isSubmitting ? "TRANSMITTING..." : "LAUNCH FLIGHT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}