"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Lock, ShieldCheck, ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ResetPasswordContent() {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL থেকে ইমেইল এবং ওটিপি নেওয়া এবং ট্রিম করা
  const email = searchParams.get("email")?.trim();
  const otpFromUrl = searchParams.get("otp")?.trim();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // ১. ফ্রন্টএন্ড ভ্যালিডেশন
    if (!email || !otpFromUrl) {
      return toast.error("Invalid reset link! Please request a new one. ⚠️");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match! ❌");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters long! 🔒");
    }

    setIsLoading(true);
    try {
      // ২. ব্যাকএন্ড এপিআই কল
      const response = await axios.post("http://localhost:5000/api/v1/auth/reset-password", {
        email: email.toLowerCase(), 
        otp: String(otpFromUrl),    
        newPassword: formData.password,
      });

      if (response.data.success) {
        toast.success("Password updated successfully! 🔐");
        setIsSuccess(true);
        // ৩. ৩ সেকেন্ড পর লগইন পেজে পাঠানো
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Request failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="w-full max-w-[440px] z-10 px-4 text-center"
    >
      {/* হেডার সেকশন */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mb-6">
          {isSuccess ? (
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          ) : (
            <ShieldCheck className="w-10 h-10 text-blue-500" />
          )}
        </div>
        <h1 className="text-4xl font-black text-white italic uppercase">
          New<span className="text-blue-500">.</span>Keys
        </h1>
        <p className="text-slate-500 text-sm mt-2 font-medium"> Secure your account with a new password </p>
      </div>

      {/* ফরম কার্ড */}
      <div className="border border-white/10 rounded-[2.5rem] p-8 bg-black/40 backdrop-blur-2xl shadow-2xl">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              key="reset-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleResetPassword} 
              className="space-y-5 text-left"
            >
              {/* নিউ পাসওয়ার্ড ফিল্ড */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase ml-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    className="w-full h-14 pl-12 pr-12 bg-white/5 border border-white/10 text-white rounded-2xl outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-xs font-bold"
                    placeholder="••••••••"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* কনফার্ম পাসওয়ার্ড ফিল্ড */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase ml-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input 
                    type="password"
                    className="w-full h-14 pl-12 bg-white/5 border border-white/10 text-white rounded-2xl outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-xs font-bold"
                    placeholder="••••••••"
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required 
                  />
                </div>
              </div>

              {/* সাবমিট বাটন */}
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full h-14 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-black uppercase rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>Update Password <ArrowRight size={16} /></>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="success-message"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-10 text-center"
            >
              <div className="text-green-400 font-bold uppercase tracking-widest text-sm mb-2">
                 Success! 🔐
              </div>
              <p className="text-slate-400 text-xs">Your password has been reset.</p>
              <p className="text-slate-500 text-[10px] mt-4 flex items-center justify-center gap-2">
                Redirecting to login <Loader2 className="animate-spin h-3 w-3" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="text-slate-500 text-xs font-bold uppercase tracking-tighter">Loading secure page...</p>
        </div>
      }>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}