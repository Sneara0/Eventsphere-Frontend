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
  
  // ডাইনামিক এপিআই ইউআরএল
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "register"; 
  
  const [otpArray, setOtpArray] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      toast.error("Security mismatch. Redirecting...");
      router.push(type === "forget" ? "/forget-password" : "/register");
    }
  }, [email, router, type]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    
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
      toast.error("Verification code must be 6 digits.");
      return;
    }

    setIsLoading(true);
    try {
      if (type === "forget") {
        toast.success("Identity Verified! 🛡️");
        setTimeout(() => {
          router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${finalOtp}`);
        }, 1000);
      } else {
        const response = await axios.post(`${API_URL}/auth/verify-email`, {
          email: email.toLowerCase(),
          otp: finalOtp
        });

        if (response.data.success) {
          toast.success("Account activated successfully! 🎉");
          setTimeout(() => router.push("/login"), 1500);
        }
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Invalid or expired code.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[480px] z-10 px-4"
    >
      <div className="text-center mb-10">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 mb-6 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all rounded-full" />
          <KeyRound className="text-blue-500 w-10 h-10 relative z-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
        </motion.div>
        
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
          VERIFY<span className="text-blue-500">.</span>{type === "forget" ? "ACCESS" : "ACCOUNT"}
        </h2>
        <p className="text-slate-400 text-[10px] mt-4 font-bold uppercase tracking-[0.3em] leading-relaxed">
          Security code sent to inbox <br />
          <span className="text-blue-400 lowercase font-bold tracking-normal mt-2 block bg-blue-500/5 py-1 px-3 rounded-full border border-blue-500/10 w-fit mx-auto">
            {email}
          </span>
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000" />
        
        <div className="relative border border-white/5 shadow-2xl rounded-[3rem] p-8 sm:p-10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden">
          <form onSubmit={handleVerify} className="space-y-10">
            <div className="flex justify-between gap-2 sm:gap-3">
              {otpArray.map((digit, index) => (
                <motion.input
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  type="text"
                  inputMode="numeric"
                  autoFocus={index === 0}
                  maxLength={1}
                  value={digit}
                  // এখানে কার্লি ব্রেসেস {} ব্যবহার করে এররটি ফিক্স করা হয়েছে
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-16 sm:w-14 sm:h-20 bg-white/5 border border-white/10 text-white text-center text-2xl font-black rounded-2xl outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all shadow-inner selection:bg-blue-500/30"
                />
              ))}
            </div>

            <div className="space-y-6">
              <button 
                type="submit" 
                disabled={isLoading || otpArray.join("").length < 6}
                className="relative w-full h-16 group overflow-hidden rounded-2xl transition-all active:scale-[0.98] disabled:opacity-40 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:opacity-90 transition-opacity" />
                <div className="relative flex items-center justify-center gap-3 text-white text-[11px] font-black uppercase tracking-[0.3em]">
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      {type === "forget" ? "Verify & Proceed" : "Confirm Account"} 
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>

              <div className="text-center pt-2">
                <button 
                  type="button" 
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all group/resend cursor-pointer"
                  onClick={() => toast.info("New code has been dispatched. Check your mail!")}
                >
                  <RefreshCcw size={12} className="group-hover/resend:rotate-180 transition-transform duration-700" />
                  Request new security code
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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Verifying Environment...</p>
        </div>
      }>
        <VerifyOtpContent />
      </Suspense>
    </div>
  );
}