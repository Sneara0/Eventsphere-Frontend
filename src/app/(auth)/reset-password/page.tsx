"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authService } from "@/app/services/auth.service";
import { toast } from "sonner";
import { Loader2, Lock, KeyRound } from "lucide-react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailFromQuery = searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    email: emailFromQuery,
    otp: "",
    password: "" // Backend expects this key
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Axios API Call: Sending { email, otp, password }
      const res = await authService.resetPassword(formData);
      
      if (res.data?.success) {
        toast.success("Password updated! Please login again. 🚀");
        router.push("/login");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Invalid OTP or session expired!";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <div className="w-full max-w-[400px] p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Set New Password</h2>

        <form onSubmit={handleReset} className="space-y-5">
          <input 
            type="email" 
            value={formData.email} 
            disabled 
            className="w-full h-12 px-4 bg-white/5 border border-white/5 text-slate-500 rounded-2xl cursor-not-allowed outline-none" 
          />
          
          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Enter 6-digit OTP" 
              maxLength={6}
              className="w-full h-12 pl-12 bg-white/5 border border-white/10 text-white rounded-2xl outline-none focus:border-blue-500 transition-all"
              onChange={(e) => setFormData({...formData, otp: e.target.value})}
              required 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="password" 
              placeholder="New Secure Password" 
              className="w-full h-12 pl-12 bg-white/5 border border-white/10 text-white rounded-2xl outline-none focus:border-blue-500 transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-2xl active:scale-95 transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin mx-auto h-5 w-5" /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}