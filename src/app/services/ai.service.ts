import axios from 'axios';

// ১. API ইনস্ট্যান্স তৈরি (যাতে বারবার baseURL না লিখতে হয়)
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', 
});

// ২. অথেন্টিকেশন টোকেন পাঠানোর জন্য ইন্টারসেপ্টর
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ৩. AI সার্ভিস অবজেক্ট
export const AIService = {
  /**
   * চ্যাটবটের মেসেজ পাঠানোর জন্য (Feature 1)
   * @param message - ইউজারের ইনপুট করা টেক্সট
   */
  askChatBot: (message: string) => 
    api.post('/events/ai-chat', { prompt: message }),
  
  /**
   * স্মার্ট সাজেশন পাওয়ার জন্য (Feature 2)
   */
  getSuggestions: () => 
    api.get('/events/ai-suggestions'),
};

// ৪. যদি অন্য কোথাও সরাসরি 'api' ব্যবহার করতে চান
export default api;