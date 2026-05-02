import { MapPin, Calendar, Star } from 'lucide-react'

export const ListingCard = ({ item }: { item: any }) => (
  <div className="anti-gravity group flex flex-col h-[500px] w-full bg-white dark:bg-zinc-900/50 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-500 hover:shadow-2xl">
    {/* Image: Fixed Height */}
    <div className="relative h-60 w-full overflow-hidden">
      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
        <Star size={12} className="fill-yellow-500 text-yellow-500" />
        <span className="text-[10px] font-black">{item.rating}</span>
      </div>
    </div>

    {/* Content: Flex Grow ensures same layout */}
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-2 text-blue-600 mb-2">
        <MapPin size={14} />
        <span className="text-[10px] font-black uppercase tracking-widest">{item.location}</span>
      </div>

      <h3 className="text-xl font-black mb-2 line-clamp-1 uppercase italic">{item.title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mb-4">{item.description}</p>

      {/* Meta: Bottom Alignment */}
      <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
        <div>
          <p className="text-[9px] uppercase text-zinc-400 font-bold">Price</p>
          <p className="font-black text-lg">{item.price}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase text-zinc-400 font-bold">Date</p>
          <p className="font-bold text-xs italic">{item.date}</p>
        </div>
      </div>

      <button className="w-full mt-5 py-4 bg-zinc-950 dark:bg-white text-white dark:text-black rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all">
        View Details
      </button>
    </div>
  </div>
)