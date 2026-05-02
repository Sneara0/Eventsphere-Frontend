"use client"
import { useEffect, useState } from 'react';

import { Sparkles } from 'lucide-react';
import { EventService } from '@/app/services/event.service';


export default function AISuggestions() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    EventService.getAISuggestions()
      .then(res => setItems(res.data.data))
      .catch(() => console.log("AI items loading failed"));
  }, []);

  return (
    <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-[2.5rem] mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-purple-500" />
        <h3 className="text-xs font-bold uppercase tracking-tighter">AI Smart Insights</h3>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item: any) => (
          <div key={item.id} className="min-w-[200px] p-4 bg-background border rounded-2xl">
            <p className="font-bold text-xs">{item.title}</p>
            <span className="text-[10px] text-purple-500 font-black uppercase">Trending</span>
          </div>
        ))}
      </div>
    </div>
  );
}