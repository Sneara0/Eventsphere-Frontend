"use client";
import { authService } from "@/app/services/auth.service";
import { useState } from "react";

import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await authService.forgetPassword(email);
      if (res.data?.success) {
        toast.success("OTP sent to your email!");
        // ইমেইলটি ইউআরএল প্যারামিটার হিসেবে পাঠিয়ে রিসেট পেজে যাওয়া
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "User not found!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <div className="w-full max-w-[400px] p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full h-12 pl-12 bg-white/5 border border-white/10 text-white rounded-2xl outline-none focus:border-blue-500 transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <button type="submit" disabled={isLoading} className="w-full h-12 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 active:scale-95 transition-all">
            {isLoading ? <Loader2 className="animate-spin mx-auto h-5 w-5" /> : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}