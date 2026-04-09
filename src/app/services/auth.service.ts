import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Better-Auth বা সেশন কুকির জন্য জরুরি
  headers: {
    "Content-Type": "application/json",
  },
});

// সরাসরি response.data রিটার্ন করার জন্য একটি ইন্টারসেপ্টর বা সহজ ফাংশন ব্যবহার করতে পারেন
// এতে করে কম্পোনেন্টে বারবার .data লিখতে হবে না
export const authService = {
  // 1. User Registration
  register: (data: any) => 
    apiClient.post("/register", data).then(res => res.data),
  
  // 2. User Login
  login: (data: any) => 
    apiClient.post("/login", data).then(res => res.data),
  
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