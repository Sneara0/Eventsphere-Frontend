"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authService } from "@/app/services/auth.service";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Mail } from "lucide-react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API call to verify OTP
      const res = await authService.verifyEmail({ email, otp });
      
      if (res.data?.success) {
        toast.success("Email verified successfully! 🎉");
        router.push("/login"); // অথবা ড্যাশবোর্ডে রিডাইরেক্ট করুন
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Invalid OTP. Please try again.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <div className="w-full max-w-[400px] p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
            <ShieldCheck className="text-blue-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Verify Your Email</h2>
          <p className="text-slate-400 text-sm mt-2">
            Enter the 6-digit code sent to <br />
            <span className="text-blue-400 font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="0 0 0 0 0 0" 
              maxLength={6}
              className="w-full h-14 bg-white/5 border border-white/10 text-white text-center text-2xl font-bold tracking-[10px] rounded-2xl outline-none focus:border-blue-500 transition-all placeholder:tracking-normal placeholder:text-slate-700"
              onChange={(e) => setOtp(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading || otp.length < 6}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
          >
            {isLoading ? <Loader2 className="animate-spin mx-auto h-5 w-5" /> : "Verify Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Didn't receive the code?{" "}
          <button className="text-blue-400 hover:underline">Resend OTP</button>
        </p>
      </div>
    </div>
  );
}