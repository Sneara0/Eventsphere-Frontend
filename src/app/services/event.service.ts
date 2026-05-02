import axios from 'axios';

// ১. 'export' কীওয়ার্ডটি যোগ করুন
export const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

// টোকেন ইন্টারসেপ্টর যোগ করা ভালো (যদি লগইন সিস্টেম থাকে)
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const EventService = {
  getAdminStats: () => api.get('/events/admin/stats'),

  getEvents: (page = 1, search = "") => 
    api.get(`/events?page=${page}&search=${search}`),

  getAISuggestions: () => api.get('/events/ai-suggestions'),

  // চ্যাটবটের জন্য নতুন ফাংশন যোগ করুন
  askChatBot: (prompt: string) => api.post('/events/ai-chat', { prompt }),

  deleteEvent: (id: string) => api.delete(`/events/${id}`),
};