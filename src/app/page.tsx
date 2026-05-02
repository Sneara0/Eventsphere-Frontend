"use client"
import React, { useState, useEffect } from "react"
import { 
  Search, Repeat, PlaneTakeoff, Calendar, 
  Users, MapPin, ArrowRight 
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

// আগের তৈরি করা কম্পোনেন্টগুলো ইমপোর্ট করুন
import { ListingCard } from "@/components/home/listing-card"
import SkeletonCard from "@/components/home/skeleton-card"

// স্যাম্পল ডেটা (আপনার ফ্লাইটের তথ্য)
const SAMPLE_FLIGHTS = [
  { id: 1, title: "Luxury Sky-Suites", location: "Dubai Intl", rating: "5.0", price: "$2,450", date: "May 15", description: "Experience the ultimate comfort with private cabins and premium dining.", image: "https://images.unsplash.com/photo-1540339832862-4745a9805ad3?q=80&w=800" },
  { id: 2, title: "Nordic Explorer", location: "Oslo Garder", rating: "4.8", price: "$1,800", date: "May 20", description: "Direct routes to Scandinavia with scenic window views.", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=800" },
  { id: 3, title: "Pacific Business", location: "Singapore Changi", rating: "4.9", price: "$2,100", date: "June 01", description: "Top-tier business class service with high-speed inflight WiFi.", image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=800" },
  { id: 4, title: "Alpine Horizon", location: "Zurich Kloten", rating: "4.7", price: "$1,350", date: "June 10", description: "The fastest connection to the Swiss Alps with premium seating.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800" },
]

export default function LandingPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ২ সেকেন্ড পর ডেটা লোড হবে (Skeleton দেখার জন্য)
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="bg-white dark:bg-[#030303] min-h-screen pb-20">
      
      {/* --- ১. HERO SECTION --- */}
      <section className="relative min-h-[700px] lg:min-h-[850px] flex flex-col items-center justify-center text-white pt-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Flight background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent dark:from-black/80 dark:via-black/40" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 px-4 text-center lg:text-left mb-20">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 px-4 py-1.5 rounded-full mb-6">
              <PlaneTakeoff size={16} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Premium Flight Experience</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.9]">
              SKY IS NOT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">THE LIMIT.</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-80 max-w-xl font-medium italic">
              "Your next take-off awaits. Discover deals that take you further."
            </p>
          </motion.div>
        </div>

        {/* Floating Search Box */}
        <div className="container relative z-20 px-4 w-full">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] p-8 text-slate-800 border border-white/20"
          >
            <RadioGroup defaultValue="round" className="flex gap-8 mb-8 justify-center lg:justify-start">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <RadioGroupItem value="round" id="r1" className="border-blue-600 text-blue-600" />
                <Label htmlFor="r1" className="font-black uppercase tracking-widest text-xs cursor-pointer group-hover:text-blue-600 transition-colors dark:text-zinc-300">Round-trip</Label>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <RadioGroupItem value="one" id="r2" className="border-blue-600 text-blue-600" />
                <Label htmlFor="r2" className="font-black uppercase tracking-widest text-xs cursor-pointer group-hover:text-blue-600 transition-colors dark:text-zinc-300">One-way</Label>
              </div>
            </RadioGroup>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative group bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 transition-all">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Leaving from</p>
                <div className="flex items-center gap-3">
                   <PlaneTakeoff className="text-zinc-400" size={18} />
                   <Input className="border-0 p-0 h-8 font-black text-xl bg-transparent dark:text-white focus-visible:ring-0 shadow-none" placeholder="Dhaka" />
                </div>
                <div className="absolute right-[-14px] top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full p-2 cursor-pointer shadow-lg hover:rotate-180 transition-all duration-500 hover:bg-blue-600 hover:text-white">
                  <Repeat size={16} />
                </div>
              </div>

              <div className="group bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 transition-all">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Going to</p>
                <div className="flex items-center gap-3">
                   <MapPin className="text-zinc-400" size={18} />
                   <Input className="border-0 p-0 h-8 font-black text-xl bg-transparent dark:text-white focus-visible:ring-0 shadow-none" placeholder="Dubai" />
                </div>
              </div>

              <div className="group bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 transition-all">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Departure - Return</p>
                <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-100">
                   <Calendar className="text-zinc-400" size={18} />
                   <div className="font-black text-lg h-8 truncate">May 3 — May 15</div>
                </div>
              </div>

              <div className="group bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 transition-all">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Travelers & Class</p>
                <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-100">
                   <Users className="text-zinc-400" size={18} />
                   <div className="font-black text-lg h-8 truncate">1 Adult, Economy</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-8">
              <button className="text-zinc-500 dark:text-zinc-400 font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors">
                + Add Flight/Hotel
              </button>
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black px-12 py-7 rounded-2xl text-lg font-black transition-all group shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)]">
                <Search className="mr-3 group-hover:scale-125 transition-transform" /> SEARCH FLIGHTS
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ২. LISTING SECTION (আপনার নতুন সেকশন) --- */}
      <section className="py-32 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.4em]">Curated Routes</span>
            <h2 className="text-5xl lg:text-6xl font-black tracking-tighter uppercase italic dark:text-white mt-2">
              Trending <br/> Destinations
            </h2>
          </motion.div>
          
          <div className="hidden md:flex gap-4 mb-2">
             <button className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-blue-600 hover:text-white transition-all">
                <ArrowRight className="rotate-180" size={20}/>
             </button>
             <button className="p-4 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all">
                <ArrowRight size={20}/>
             </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            // লোডিং সময় ৪টি Skeleton দেখাবে
            Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            // ডেটা আসলে ListingCard দেখাবে
            SAMPLE_FLIGHTS.map((flight) => (
              <motion.div 
                key={flight.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: flight.id * 0.1 }}
              >
                <ListingCard item={flight} />
              </motion.div>
            ))
          )}
        </div>
      </section>

    </main>
  )
}