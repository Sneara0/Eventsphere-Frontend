"use client"
import { EventService } from '@/app/services/event.service';
import AISuggestions from '@/components/ai/AISuggestions';
import { useEffect, useState } from 'react';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    EventService.getAdminStats().then(res => setStats(res.data.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-black italic mb-8">DASHBOARD</h1>
      
      <AISuggestions />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-8 bg-card border rounded-[3rem]">
          <p className="text-xs font-bold opacity-50 uppercase">Total Revenue</p>
          <h2 className="text-5xl font-black mt-2 text-primary">${stats?.totalRevenue || 0}</h2>
        </div>
        <div className="p-8 bg-card border rounded-[3rem]">
          <p className="text-xs font-bold opacity-50 uppercase">Active Events</p>
          <h2 className="text-5xl font-black mt-2">{stats?.totalEvents || 0}</h2>
        </div>
      </div>

      <div className="h-80 w-full bg-card border p-8 rounded-[3rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats?.chartData || []}>
            <XAxis dataKey="name" hide />
            <Tooltip />
            <Bar dataKey="value" fill="currentColor" className="fill-primary" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}