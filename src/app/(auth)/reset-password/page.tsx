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
  
  // ডাইনামিক এপিআই ইউআরএল
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  
  const email = searchParams.get("email")?.trim();
  const otpFromUrl = searchParams.get("otp")?.trim();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        email: email.toLowerCase(), 
        otp: String(otpFromUrl),    
        newPassword: formData.password,
      });

      if (response.data.success) {
        toast.success("Password updated successfully! 🔐");
        setIsSuccess(true);
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
      className="w-full max-w-[440px] z-10 px-4"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 mb-6 shadow-2xl">
          {isSuccess ? (
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          ) : (
            <ShieldCheck className="w-10 h-10 text-blue-500" />
          )}
        </div>
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
          NEW<span className="text-blue-500">.</span>KEYS
        </h1>
        <p className="text-slate-500 text-[10px] mt-2 font-bold tracking-[0.3em] uppercase"> Secure Multi-Role Access </p>
      </div>

      <div className="border border-white/5 rounded-[2.5rem] p-8 sm:p-10 bg-white/[0.03] backdrop-blur-3xl shadow-2xl">
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
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase ml-2">New Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    className="w-full h-14 pl-12 pr-12 bg-white/5 border border-white/10 text-white rounded-2xl outline-none focus:border-blue-500/50 transition-all text-[11px] font-bold tracking-widest"
                    placeholder="••••••••"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase ml-2">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="password"
                    value={formData.confirmPassword}
                    className="w-full h-14 pl-12 bg-white/5 border border-white/10 text-white rounded-2xl outline-none focus:border-blue-500/50 transition-all text-[11px] font-bold tracking-widest"
                    placeholder="••••••••"
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading} 
                className="relative w-full h-14 text-[10px] font-black uppercase tracking-[0.2em] text-white rounded-2xl overflow-hidden shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 group mt-4 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:opacity-90 transition-all" />
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    <>Update Password <ArrowRight size={14} /></>
                  )}
                </span>
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="success-message"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-6 text-center"
            >
              <div className="text-green-400 font-bold uppercase tracking-[0.2em] text-sm mb-3">
                 Success! 🔐
              </div>
              <p className="text-slate-400 text-[10px] font-medium leading-relaxed uppercase tracking-widest">
                Your password has been reset successfully.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="h-1 w-20 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                    className="h-full bg-blue-500"
                  />
                </div>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                  Redirecting to login <Loader2 className="animate-spin h-3 w-3" />
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020617] relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ইফেক্টস */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Initialising Secure Vault...</p>
        </div>
      }>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}