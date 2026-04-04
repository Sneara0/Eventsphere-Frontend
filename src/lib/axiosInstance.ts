import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // http://localhost:5000/api/v1
  headers: {
    'Content-Type': 'application/json',
  },
});

// প্রতিবার রিকোয়েস্টের সাথে অটোমেটিক টোকেন পাঠাবে
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem('accessToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);