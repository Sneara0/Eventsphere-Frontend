"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Mail, ArrowLeft, Send } from "lucide-react";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/forget-password", { 
        email: email.toLowerCase() 
      });

      if (response.data.success) {
        toast.success("OTP code sent to your email! 📧");
        setTimeout(() => {
          // 'type=forget' যোগ করা হয়েছে যাতে OTP পেজ গন্তব্য বুঝতে পারে
          router.push(`/verify-otp?email=${encodeURIComponent(email)}&type=forget`);
        }, 1500);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#020617] px-4">
      <div className="w-full max-w-[420px] z-10 space-y-8">
        <div className="text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-all mb-6">
            <ArrowLeft size={14} /> Back to Login
          </Link>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Recover<span className="text-blue-500">.</span>Access</h1>
        </div>
        <div className="border border-white/5 shadow-2xl rounded-[2.5rem] p-8 bg-white/[0.03] backdrop-blur-3xl">
          <form onSubmit={handleForgetPassword} className="space-y-6">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="email" 
                placeholder="REGISTERED EMAIL" 
                className="w-full h-12 pl-12 bg-white/5 border border-white/10 text-white rounded-2xl outline-none text-[11px] font-bold tracking-widest focus:border-blue-500/50 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <button type="submit" disabled={isLoading} className="relative w-full h-14 text-[10px] font-black uppercase tracking-[0.2em] text-white rounded-2xl overflow-hidden active:scale-[0.98] transition-all disabled:opacity-50">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send OTP Code <Send size={14} /></>}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}