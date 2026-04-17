"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; // শুধুমাত্র ক্লাউডিনারি আপলোডের জন্য
 // আপনার সঠিক পাথ অনুযায়ী ইম্পোর্ট করুন
import { Search, Plus, X, Zap, Sparkles, MessageSquare } from "lucide-react";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/types/event";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ReviewSection from "@/components/modules/reviews/ReviewSection";
import axiosInstance from "@/lib/axiosInstance";

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ১. ডাটা লোড করার ফাংশন (axiosInstance ব্যবহার করা হয়েছে)
  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/events", {
        params: { searchTerm },
      });
      // MongoDB _id এবং id এর সামঞ্জস্য বজায় রাখা
      const formattedEvents = (data.data || []).map((ev: any) => ({
        ...ev,
        id: ev.id || ev._id,
      }));
      setEvents(formattedEvents);
    } catch (error: any) {
      console.error("API Fetch Error:", error);
      toast.error("Failed to load events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(loadData, 600);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // ২. ইভেন্ট ক্রিয়েট করার ফাংশন
  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const rawFormData = new FormData(form);

    // DateTime logic
    const date = rawFormData.get("dateInput");
    const time = rawFormData.get("time");
    let dateTimeISO = "";
    if (date && time) {
      dateTimeISO = new Date(`${date}T${time}`).toISOString();
    }

    try {
      // Step A: Cloudinary Image Upload (সরাসরি axios দিয়ে থার্ড পার্টি কল)
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

      // Step B: Final Payload
      const finalPayload = {
        title: rawFormData.get("title"),
        description: rawFormData.get("description") || `Flight to ${rawFormData.get("location")}`,
        category: "FLIGHT",
        dateTime: dateTimeISO,
        time: rawFormData.get("time"),
        venue: rawFormData.get("venue"),
        location: rawFormData.get("location"),
        ticketPrice: Number(rawFormData.get("ticketPrice")),
        totalSeats: Number(rawFormData.get("totalSeats")),
        availableSeats: Number(rawFormData.get("totalSeats")),
        thumbnail: uploadedImageUrl,
        airlineName: rawFormData.get("airlineName"),
        flightClass: "ECONOMY",
        isRefundable: true,
        status: "UPCOMING",
      };

      // Step C: Server Request (axiosInstance ব্যবহার করা হয়েছে যা টোকেন বহন করবে)
      const response = await axiosInstance.post("/events", finalPayload);

      if (response.data.success) {
        toast.success("Flight Launched Successfully! 🚀");
        setIsModalOpen(false);
        form.reset();
        loadData();

        const newEventId = response.data?.data?.id || response.data?.data?._id;
        if (newEventId) {
          router.push(`/events/${newEventId}`);
        }
      }
    } catch (error: any) {
      console.error("Submission Error:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || "Launch Failed! You might need to login again.";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-32 px-6 overflow-hidden relative text-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div>
            <div className="flex items-center gap-3 text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 italic">
              <Zap size={14} fill="currentColor" /> Event Sphere Premiere
            </div>
            <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-10">
              Discover <br /> <span className="text-blue-500">Flights.</span>
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
            >
              <Plus size={20} strokeWidth={3} /> Launch Flight
            </button>
          </div>

          <div className="relative w-full md:w-[500px] group">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-all duration-500" size={22} />
            <input
              type="text"
              placeholder="SEARCH DESTINATIONS..."
              className="w-full bg-white/5 border border-white/10 p-7 pl-16 rounded-[2.5rem] outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-black italic text-xs tracking-[0.2em] placeholder:text-slate-700 text-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-48 gap-6">
            <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase text-slate-600 tracking-[0.8em]">Syncing Universe</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event.id || event._id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-48 border border-dashed border-white/10 rounded-[4rem] bg-white/[0.02]">
                <Sparkles size={60} className="mx-auto text-slate-800 mb-6" />
                <h3 className="text-slate-600 font-black uppercase italic tracking-[0.4em] text-sm">No Flights Orbiting</h3>
              </div>
            )}
          </div>
        )}

        {/* Review Section */}
        <div className="mt-40 border-t border-white/5 pt-20">
          <div className="grid lg:grid-cols-3 gap-20">
            <div className="lg:col-span-1">
              <div className="sticky top-40">
                <div className="flex items-center gap-3 text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                  <MessageSquare size={14} /> Passenger Testimonials
                </div>
                <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-6">
                  What They <br /> <span className="text-blue-500">Say.</span>
                </h2>
              </div>
            </div>
            <div className="lg:col-span-2 bg-white/[0.01] rounded-[3rem] p-1 border border-white/5">
              <ReviewSection eventId={events[0]?.id || "global"} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80">
          <div className="bg-[#0a0f1e] border border-white/10 w-full max-w-2xl rounded-[3rem] p-10 relative overflow-y-auto max-h-[90vh] shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
              <X size={28} />
            </button>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-10 leading-none">
              Launch <br /><span className="text-blue-500">Flight.</span>
            </h2>
            <form onSubmit={handleCreateEvent} className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block ml-1">Flight Title</label>
                <input name="title" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500/50 text-white" />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block ml-1">Description</label>
                <textarea name="description" rows={3} required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500/50 text-white" />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block ml-1">Poster Image</label>
                <input type="file" name="image" required accept="image/*" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-[10px] text-slate-400 file:bg-blue-600 file:border-none file:px-4 file:py-2 file:rounded-lg file:text-white" />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block ml-1">Airline Name</label>
                <input name="airlineName" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white focus:border-blue-500/50" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block ml-1">Departure (From)</label>
                <input name="venue" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block ml-1">Destination (To)</label>
                <input name="location" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block ml-1">Date</label>
                <input type="date" name="dateInput" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block ml-1">Time</label>
                <input type="time" name="time" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block ml-1">Ticket Price ($)</label>
                <input type="number" name="ticketPrice" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block ml-1">Capacity (Seats)</label>
                <input type="number" name="totalSeats" required className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white" />
              </div>

              <div className="col-span-2 pt-6">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase italic tracking-[0.4em] shadow-xl hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
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