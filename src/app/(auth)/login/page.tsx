"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios"; 
import { authClient, useSession } from "@/lib/auth-client"; 
import { toast } from "sonner";
import { Loader2, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const { data: session, isPending: sessionLoading } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login", 
        formData,
        { withCredentials: true } 
      );

      // ব্যাকএন্ড যদি success: true পাঠায়
      if (response.data) {
        toast.success("Welcome back! 🚀");
        setTimeout(() => {
          window.location.href = "/dashboard"; 
        }, 500);
      }
    } catch (error: any) {
      // এরর হ্যান্ডলিং উন্নত করা হয়েছে যাতে {} না দেখায়
      const backendError = error.response?.data;
      const errorMsg = backendError?.message || "Invalid email or password.";
      
      toast.error(errorMsg);
      
      console.error("Login Error Details:", {
        status: error.response?.status,
        message: errorMsg,
        data: backendError
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error: any) {
      toast.error("Google login failed. Please try again.");
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <div className="relative flex items-center justify-center">
           <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
           <Loader2 className="h-12 w-12 animate-spin text-blue-500 relative z-10" />
        </div>
      </div>
    );
  }

  if (session) return null;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617] px-4 selection:bg-blue-500/30 selection:text-blue-200">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse delay-700 pointer-events-none" />

      <div className="w-full max-w-[420px] z-10 space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-white mb-5 shadow-2xl shadow-blue-500/20 rotate-3 hover:rotate-0 transition-all duration-500">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white italic uppercase">
            EVENT<span className="text-blue-500">.</span>SPHERE
          </h1>
          <p className="text-slate-400 text-xs mt-3 font-medium tracking-widest uppercase">Secure Professional Access</p>
        </div>

        <div className="border border-white/5 shadow-[0_0_50px_-12px_rgba(59,130,246,0.15)] rounded-[2.5rem] p-8 sm:p-10 bg-white/[0.03] backdrop-blur-3xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">Sign In</h2>
          </div>
          
          <div className="grid gap-6">
            <button 
              type="button" 
              onClick={handleGoogleLogin} 
              className="w-full h-12 flex items-center justify-center font-bold text-sm bg-white/5 text-white rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-[0.98] group"
            >
              {/* Google Icon SVG */}
              <svg className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            <div className="relative flex items-center gap-4 text-[10px] font-black uppercase text-slate-600 tracking-widest">
              <div className="h-[1px] flex-1 bg-white/5" />
              OR
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider ml-2">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full h-12 pl-12 bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all rounded-2xl outline-none text-sm"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between px-2">
                  <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Password</label>
                  {/* tabIndex={-1} এখানে ফিক্স করা হয়েছে */}
                  <Link href="/forget-password" tabIndex={-1} className="text-[10px] font-bold text-blue-500/70 hover:text-blue-400 transition-colors">
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full h-12 pl-12 bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all rounded-2xl outline-none text-sm"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading} 
                className="relative w-full h-12 text-xs font-black uppercase tracking-[0.2em] text-white rounded-2xl overflow-hidden shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 group mt-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:opacity-90" />
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Login <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></>}
                </span>
              </button>
            </form>
          </div>
          
          <div className="text-center mt-10">
            <p className="text-xs text-slate-500 font-medium">
              New to Event Sphere?{" "}
              <Link href="/register" className="font-bold text-white hover:text-blue-500 transition-all underline underline-offset-4 decoration-white/10">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}