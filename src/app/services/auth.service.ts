import axios from "axios";

// ১. এনভায়রনমেন্ট ভ্যারিয়েবল ব্যবহার করুন
// প্রোডাকশনে এটি আপনার ভেরসেল ইউআরএল নিবে, লোকালে লোকালহোস্ট
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// ২. অথ এর জন্য এন্ডপয়েন্ট সেট করুন
const AUTH_API_URL = `${BASE_URL}/auth`;

const apiClient = axios.create({
  baseURL: AUTH_API_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  // 1. User Registration
  register: (data: any) => 
    apiClient.post("/sign-up", data).then(res => res.data), // Better-Auth এ সাধারণত sign-up হয়
  
  // 2. User Login
  login: (data: any) => 
    apiClient.post("/sign-in", data).then(res => res.data), // Better-Auth এ সাধারণত sign-in হয়
  
  // 3. Email Verification
  verifyEmail: (data: { email: string; otp: string }) => 
    apiClient.post("/verify-email", data).then(res => res.data),
  
  // 4. Forgot Password
  forgetPassword: (email: string) => 
    apiClient.post("/forget-password", { email }).then(res => res.data),
  
  // 5. Reset Password
  resetPassword: (data: { email: string; otp: string; password: string }) => 
    apiClient.post("/reset-password", data).then(res => res.data),
};