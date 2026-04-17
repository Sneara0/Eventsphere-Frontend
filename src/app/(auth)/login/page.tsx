"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios"; 
import { authClient, useSession } from "@/lib/auth-client"; 
import { toast } from "sonner";
import { Loader2, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import Cookies from "js-cookie";

const SUPER_ADMIN_EMAIL = "admin@eventsphere.com";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const { data: session, isPending: sessionLoading } = useSession();

  // --- এনভায়রনমেন্ট ভেরিয়েবল সেটআপ ---
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const redirectUser = useCallback((email: string | undefined, role: string | undefined) => {
    const userRole = role?.toUpperCase();
    
    if (email === SUPER_ADMIN_EMAIL || userRole === "SUPER_ADMIN" || userRole === "ADMIN") {
      window.location.href = "/admin/dashboard";
    } else if (userRole === "ORGANIZER") {
      window.location.href = "/organizer/dashboard";
    } else {
      window.location.href = "/dashboard";
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && session && !sessionLoading) {
      redirectUser(session.user?.email, (session.user as any)?.role);
    }
  }, [mounted, session, sessionLoading, redirectUser]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");

      const response = await axios.post(
        `${API_URL}/auth/login`, // ডাইনামিক ইউআরএল ব্যবহার করা হয়েছে
        formData,
        { withCredentials: true } 
      );

      if (response.data && response.data.success) {
        const token = response.data.token || 
                      response.data.accessToken || 
                      response.data.data?.accessToken;
        
        const user = response.data.data?.user || response.data.user;

        if (token) {
          localStorage.setItem("accessToken", token);
          Cookies.set("accessToken", token, { expires: 7, path: '/' });
          
          toast.success("Login Successful! 🚀");

          setTimeout(() => {
            redirectUser(formData.email, user?.role);
          }, 500);
        }
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Invalid credentials";
      toast.error(errorMsg);
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
      toast.error("Google login failed.");
    }
  };

  if (!mounted) return null;

  if (sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (session) return null;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617] px-4 selection:bg-blue-500/30 text-left">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[420px] z-10 space-y-8 py-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-white mb-5 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white italic uppercase">
            EVENT<span className="text-blue-500">.</span>SPHERE
          </h1>
          <p className="text-slate-400 text-[10px] mt-3 font-bold tracking-[0.3em] uppercase">Secure Multi-Role Access</p>
        </div>

        <div className="border border-white/5 shadow-2xl rounded-[2.5rem] p-8 sm:p-10 bg-white/[0.03] backdrop-blur-3xl">
          <div className="grid gap-6">
            <button 
              type="button" 
              onClick={handleGoogleLogin} 
              className="w-full h-12 flex items-center justify-center font-bold text-[10px] uppercase tracking-widest bg-white/5 text-white rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-[0.98] cursor-pointer"
            >
              Login with Google
            </button>

            <div className="relative flex items-center gap-4 text-[9px] font-black uppercase text-slate-600 tracking-[0.3em]">
              <div className="h-[1px] flex-1 bg-white/5" /> OR EMAIL <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full h-12 pl-12 bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 transition-all rounded-2xl outline-none text-[11px] font-bold tracking-widest"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="password" 
                  placeholder="PASSWORD"
                  className="w-full h-12 pl-12 bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 transition-all rounded-2xl outline-none text-[11px] font-bold tracking-widest"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading} 
                className="relative w-full h-14 text-[10px] font-black uppercase tracking-[0.2em] text-white rounded-2xl overflow-hidden shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 group mt-2 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:opacity-90 transition-all" />
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Access Dashboard <ArrowRight size={14} /></>}
                </span>
              </button>
            </form>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-white/5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-white hover:text-blue-500 transition-all underline underline-offset-4 decoration-blue-500/30">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}