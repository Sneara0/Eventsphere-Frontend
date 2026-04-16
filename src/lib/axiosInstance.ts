import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

// রিকোয়েস্ট পাঠানোর আগে টোকেন অ্যাড করা
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // এই লাইনটি খুবই গুরুত্বপূর্ণ
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;