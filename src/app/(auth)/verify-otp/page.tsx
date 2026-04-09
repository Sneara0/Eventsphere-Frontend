"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, KeyRound, ArrowRight, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "register"; 
  
  const [otpArray, setOtpArray] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Redirecting...");
      router.push(type === "forget" ? "/forget-password" : "/register");
    }
  }, [email, router, type]);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otpArray];
    newOtp[index] = value.substring(value.length - 1);
    setOtpArray(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otpArray.join("");
    
    if (finalOtp.length < 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }

    setIsLoading(true);

    try {
      if (type === "forget") {
        // পাসওয়ার্ড রিসেটের ক্ষেত্রে আমরা ওটিপি সহ সরাসরি রিসেট পেজে পাঠাবো
        // কারণ রিসেট পাসওয়ার্ড এপিআই একসাথেই ওটিপি চেক করবে
        toast.success("Identity Verified! 🛡️");
        setTimeout(() => {
          router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${finalOtp}`);
        }, 1000);
      } else {
        // রেজিস্ট্রেশন ভেরিফিকেশন
        const response = await axios.post("http://localhost:5000/api/v1/auth/verify-email", {
          email: email.toLowerCase(),
          otp: finalOtp
        });

        if (response.data.success) {
          toast.success("Email Verified! Please login. 🎉");
          setTimeout(() => router.push("/login"), 1500);
        }
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Invalid OTP. Try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[480px] z-10 px-4"
    >
      <div className="text-center mb-10">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="relative inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 mb-6 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all rounded-full" />
          <KeyRound className="text-blue-500 w-10 h-10 relative z-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </motion.div>
        
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tight">
          Verify<span className="text-blue-500">.</span>{type === "forget" ? "Access" : "Account"}
        </h2>
        <p className="text-slate-400 text-[10px] mt-4 font-bold uppercase tracking-[0.3em] opacity-70 leading-relaxed">
          Security code sent to <br />
          <span className="text-blue-400 lowercase font-medium tracking-normal mt-1 block">{email}</span>
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
        
        <div className="relative border border-white/10 shadow-2xl rounded-[3rem] p-10 bg-black/40 backdrop-blur-3xl overflow-hidden">
          <form onSubmit={handleVerify} className="space-y-10">
            <div className="flex justify-between gap-2 sm:gap-3">
              {otpArray.map((digit, index) => (
                <motion.input
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el) as any}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-16 sm:w-14 sm:h-20 bg-white/5 border border-white/10 text-white text-center text-2xl font-black rounded-2xl outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all shadow-inner"
                />
              ))}
            </div>

            <div className="space-y-6">
              <button 
                type="submit" 
                disabled={isLoading || otpArray.join("").length < 6}
                className="relative w-full h-16 group overflow-hidden rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:scale-105 transition-transform duration-500" />
                <div className="relative flex items-center justify-center gap-3 text-white text-[11px] font-black uppercase tracking-[0.3em]">
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <>{type === "forget" ? "Verify & Proceed" : "Confirm Account"} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </div>
              </button>

              <div className="text-center">
                <button 
                  type="button" 
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors group/resend"
                  onClick={() => toast.info("Check your inbox again...")}
                >
                  <RefreshCcw size={12} className="group-hover/resend:rotate-180 transition-transform duration-500" />
                  Didn't receive code? Resend
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default function VerifyOtpPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[120px]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <Suspense fallback={<Loader2 className="h-10 w-10 animate-spin text-blue-500" />}>
        <VerifyOtpContent />
      </Suspense>
    </div>
  );
}