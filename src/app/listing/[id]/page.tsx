"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Star, MapPin, Calendar, Users, 
  ShieldCheck, Share2, Heart, ArrowLeft, 
  CheckCircle2, Clock, Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ListingCard } from "@/components/home/listing-card"
import Link from "next/link"

export default function ListingDetailsPage() {
  const [activeImg, setActiveImg] = useState(0)

  const flightDetail = {
    images: [
      "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=1200",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800",
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800"
    ],
    title: "Luxury Sky-Suites | Dubai Intl",
    location: "Emirates Terminal 3, Dubai",
    price: "$2,450",
    rating: 4.9,
    reviews: 128,
    specs: [
      { label: "Duration", value: "7h 30m", icon: Clock },
      { label: "Class", value: "First Class", icon: Zap },
      { label: "Capacity", value: "2 Travelers", icon: Users },
      { label: "Refund", value: "Available", icon: ShieldCheck },
    ]
  }

  return (
    <main className="bg-zinc-50 dark:bg-[#050505] min-h-screen pb-20 transition-colors duration-300">
      
      {/* --- ১. Media Gallery Section --- */}
      <section className="container mx-auto px-4 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-8 relative aspect-video rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-white/10"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={flightDetail.images[activeImg]} 
                className="w-full h-full object-cover" 
                alt="Main listing"
              />
            </AnimatePresence>
            <div className="absolute top-6 left-6">
              <Link href="/explore">
                <Button size="icon" variant="secondary" className="rounded-full shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-0 text-zinc-900 dark:text-white">
                  <ArrowLeft size={20} />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Side Thumbnails */}
          <div className="lg:col-span-4 flex lg:flex-col gap-4">
            {flightDetail.images.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveImg(index)}
                className={`relative flex-1 rounded-[1.5rem] overflow-hidden cursor-pointer border-2 transition-all ${
                  activeImg === index ? "border-blue-600" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} className="w-full h-full object-cover aspect-video lg:aspect-auto" alt="thumb" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ২. Content Section --- */}
      <section className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Side: Info */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic leading-tight">
                  {flightDetail.title}
                </h1>
                <div className="flex items-center gap-4 mt-4 text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1"><MapPin size={16}/> {flightDetail.location}</span>
                  <span className="flex items-center gap-1 font-bold text-orange-500"><Star size={16} fill="currentColor"/> {flightDetail.rating} ({flightDetail.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full border-zinc-200 dark:border-white/10 dark:text-white"><Share2 size={18}/></Button>
                <Button variant="outline" size="icon" className="rounded-full border-zinc-200 dark:border-white/10 dark:text-white text-rose-500"><Heart size={18}/></Button>
              </div>
            </div>

            <hr className="my-10 border-zinc-100 dark:border-white/5" />

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-transparent border-b border-zinc-100 dark:border-white/5 w-full justify-start rounded-none h-auto p-0 gap-8">
                <TabsTrigger value="overview" className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none px-0 pb-4 bg-transparent font-bold uppercase tracking-widest text-xs text-zinc-500 dark:text-zinc-400">Overview</TabsTrigger>
                <TabsTrigger value="specs" className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none px-0 pb-4 bg-transparent font-bold uppercase tracking-widest text-xs text-zinc-500 dark:text-zinc-400">Specs</TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none px-0 pb-4 bg-transparent font-bold uppercase tracking-widest text-xs text-zinc-500 dark:text-zinc-400">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="py-8 animate-in fade-in duration-500">
                <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                  Experience travel like never before. Our Sky-Suites offer a sanctuary in the clouds, featuring 
                  fully flat beds, personalized gourmet dining, and an exclusive lounge access.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Champagne on arrival", "Private chauffeur", "High-speed WiFi", "Luxury Amenity Kit"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-200 font-medium p-4 rounded-2xl bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/5">
                      <CheckCircle2 size={18} className="text-blue-600" /> {item}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="specs" className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in duration-500">
                {flightDetail.specs.map((spec) => (
                  <div key={spec.label} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/5 shadow-sm">
                    <spec.icon className="text-blue-600 mb-4" size={24} />
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">{spec.label}</p>
                    <p className="font-bold text-lg text-zinc-900 dark:text-white">{spec.value}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Side: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-xl dark:shadow-none">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Price starting at</p>
                  <h2 className="text-4xl font-black text-zinc-900 dark:text-white">{flightDetail.price}</h2>
                </div>
                <span className="text-zinc-500 font-medium">/ person</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100"><Calendar size={18} className="text-blue-600"/> <span className="font-bold">May 15, 2024</span></div>
                  <Button variant="ghost" size="sm" className="text-blue-600 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20">Edit</Button>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100"><Users size={18} className="text-blue-600"/> <span className="font-bold">2 Travelers</span></div>
                  <Button variant="ghost" size="sm" className="text-blue-600 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20">Edit</Button>
                </div>
              </div>

              <Button className="w-full py-8 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-lg font-black transition-all shadow-lg shadow-blue-500/25">
                BOOK NOW
              </Button>
              <p className="text-center text-[10px] text-zinc-500 mt-6 uppercase tracking-widest font-bold">No hidden fees • Instant Confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ৩. Related Items Section --- */}
      <section className="container mx-auto px-4 mt-32 border-t border-zinc-100 dark:border-white/5 pt-20">
        <h3 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter mb-12">
          You might also <span className="text-blue-600">Like</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ListingCard item={{ id: 9, title: "Nordic Explorer", location: "Oslo", rating: "4.8", price: "$1,800", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=800" }} />
          {/* Additional cards here */}
        </div>
      </section>
    </main>
  )
}