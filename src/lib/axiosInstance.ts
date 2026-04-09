import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // কুকি পাঠানোর জন্য এটি জরুরি
});

// রিকোয়েস্ট ইন্টারসেপ্টর
axiosInstance.interceptors.request.use(
  (config) => {
    // ১. প্রথমে কুকি থেকে টোকেন খোঁজা (এটি বেশি নিরাপদ)
    // ২. কুকি না থাকলে লোকাল স্টোরেজ চেক করা (ফলব্যাক)
    const token = Cookies.get('accessToken') || (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null);
    
    if (token) {
      // হেডার সেট করার সময় 'Authorization' বানান এবং 'Bearer' নিশ্চিত করা
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// রেসপন্স ইন্টারসেপ্টর (৪০১ এরর এবং টোকেন এক্সপায়ার হ্যান্ডেল করা)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // যদি সার্ভার ৪০১ (Unauthorized) পাঠায়
    if (error.response && error.response.status === 401) {
      
      // ডাবল চেক: যদি এটি লগইন রিকোয়েস্ট না হয় তবেই রিডাইরেক্ট করুন
      // (লগইন পেজেই ৪০১ খেলে বারবার রিফ্রেশ লুপ হতে পারে)
      const isLoginRequest = error.config.url?.includes('/auth/login');

      if (!isLoginRequest) {
        // টোকেনগুলো মুছে ফেলা
        Cookies.remove('accessToken');
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          
          // ইউজারকে জানানো (ঐচ্ছিক)
          console.error("Session expired. Please login again.");
          
          // লগইন পেজে পাঠিয়ে দেওয়া
          window.location.href = '/login'; 
        }
      }
    }
    return Promise.reject(error);
  }
);