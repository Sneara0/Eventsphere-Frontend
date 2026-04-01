import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Mandatory for handling session cookies/Better-Auth tokens
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  // 1. User Registration
  register: (data: any) => apiClient.post("/register", data),
  
  // 2. User Login
  login: (data: any) => apiClient.post("/login", data),
  
  // 3. Email Verification (Updated to accept email and otp object)
  verifyEmail: (data: { email: string; otp: string }) => 
    apiClient.post("/verify-email", data),
  
  // 4. Forgot Password (Request OTP)
  forgetPassword: (email: string) => 
    apiClient.post("/forget-password", { email }),
  
  // 5. Reset Password (OTP, Email, and New Password)
  resetPassword: (data: { email: string; otp: string; password: string }) => 
    apiClient.post("/reset-password", data),
};