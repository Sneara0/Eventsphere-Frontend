"use client"
import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, SlidersHorizontal, Plane, ArrowUpDown } from "lucide-react"

// UI Components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select"

// Custom Components
import { ListingCard } from "@/components/home/listing-card"
import SkeletonCard from "@/components/home/skeleton-card"

export default function ExplorePage() {
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("default")

  const [data, setData] = useState([
    { id: 1, title: "Skyline Luxury", location: "London", category: "luxury", price: 1200, rating: "5.0", image: "https://images.unsplash.com/photo-1540339832862-4745a9805ad3?q=80&w=800" },
    { id: 2, title: "Business Elite", location: "New York", category: "business", price: 950, rating: "4.9", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=800" },
    { id: 3, title: "Eco Traveler", location: "Bali", category: "economy", price: 450, rating: "4.7", image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=800" },
  ])

  const filteredData = useMemo(() => {
    let result = [...data].filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (category !== "all") {
      result = result.filter(item => item.category === category)
    }

    if (sortBy === "low-high") result.sort((a, b) => a.price - b.price)
    if (sortBy === "high-low") result.sort((a, b) => b.price - a.price)

    return result
  }, [searchQuery, category, sortBy, data])

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#050505] pt-32 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* হেডার */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-zinc-900 dark:text-white"
          >
            Find <span className="text-blue-600">Flight</span>
          </motion.h1>
        </div>

        {/* সার্চ এবং ফিল্টার বার */}
        <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <Input 
              placeholder="Where are you going?" 
              className="h-14 pl-14 border-0 bg-transparent text-lg font-bold focus-visible:ring-0 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Category Select */}
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-[150px] h-14 rounded-2xl border-0 bg-zinc-100 dark:bg-white/5 font-bold uppercase text-[10px] tracking-widest text-zinc-900 dark:text-zinc-100 focus:ring-0">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="dark:bg-zinc-900 dark:border-white/10">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="economy">Economy</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Select */}
            <Select onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] h-14 rounded-2xl border-0 bg-zinc-100 dark:bg-white/5 font-bold uppercase text-[10px] tracking-widest text-zinc-900 dark:text-zinc-100 focus:ring-0">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="dark:bg-zinc-900 dark:border-white/10">
                <SelectItem value="default">Newest</SelectItem>
                <SelectItem value="low-high">Price: Low to High</SelectItem>
                <SelectItem value="high-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* লিস্টিং গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {loading ? (
              Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ListingCard item={{...item, price: `$${item.price}`}} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-40 text-center">
                <Plane className="mx-auto text-zinc-200 dark:text-zinc-800 mb-6 rotate-45" size={60} />
                <h2 className="text-2xl font-black uppercase text-zinc-900 dark:text-white">No Results Found</h2>
                <p className="text-zinc-500 font-medium">Try adjusting your filters or search query.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </main>
  )
}