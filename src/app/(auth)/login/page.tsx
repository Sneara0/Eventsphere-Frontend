"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs"; 
import axios from "axios"; 
import { toast } from "sonner";
import { 
  Loader2, Mail, Lock, Sparkles, ArrowRight, 
  UserCheck, ShieldCheck 
} from "lucide-react";
import Cookies from "js-cookie";

// Admin Credentials
const SUPER_ADMIN_EMAIL = "admin@eventsphere.com";
const SUPER_ADMIN_PASSWORD = "admin_sneara_342";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState<string | null>(null);
  
  const { isLoaded, signIn, setActive } = useSignIn() as any; 
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    setMounted(true);
  }, []);

  const redirectUser = useCallback((email: string | undefined) => {
    if (email === SUPER_ADMIN_EMAIL) {
      router.push("/admin/dashboard");
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  const performBackendSync = async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/sync-session`, { email });
      if (response.data?.success) {
        const token = response.data.token;
        localStorage.setItem("accessToken", token);
        Cookies.set("accessToken", token, { expires: 7 });
      }
    } catch (error) {
      console.error("Backend sync failed:", error);
    }
  };

  const handleSocialLogin = async (strategy: string) => {
    if (!isLoaded || !signIn) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (error: any) {
      console.error("Social login error:", error);
      toast.error("Social login failed. Please try again.");
    }
  };

  const handleLogin = async (email: string, password?: string) => {
    if (!isLoaded || !signIn) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        await performBackendSync(email); 
        
        toast.success("Welcome back! 🚀");
        setTimeout(() => redirectUser(email), 500);
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      toast.error(error.errors?.[0]?.message || "Invalid email or password");
    }
  };

  const handleQuickDemo = async (role: 'ADMIN' | 'USER') => {
    setIsDemoLoading(role);
    const email = role === 'ADMIN' ? SUPER_ADMIN_EMAIL : "user@demo.com";
    const password = role === 'ADMIN' ? SUPER_ADMIN_PASSWORD : "password123";
    await handleLogin(email, password);
    setIsDemoLoading(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await handleLogin(formData.email, formData.password);
    setIsLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617] px-4 text-white">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[420px] z-10 space-y-6 py-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-white mb-5 shadow-2xl rotate-3">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter italic uppercase">
            EVENT<span className="text-blue-500">.</span>SPHERE
          </h1>
        </div>

        <div className="border border-white/5 shadow-2xl rounded-[2.5rem] p-8 sm:p-10 bg-white/[0.03] backdrop-blur-3xl">
          
          {/* Quick Demo Section */}
          <div className="space-y-3 mb-8">
            <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] text-center mb-4">Quick Demo Access</p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                disabled={!!isDemoLoading || isLoading}
                onClick={() => handleQuickDemo('ADMIN')}
                className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-all cursor-pointer disabled:opacity-50"
              >
                {isDemoLoading === 'ADMIN' ? <Loader2 className="animate-spin text-blue-500 mb-2" size={20} /> : <ShieldCheck className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" size={20} />}
                <span className="text-[9px] font-black uppercase tracking-widest">Admin</span>
              </button>

              <button 
                type="button"
                disabled={!!isDemoLoading || isLoading}
                onClick={() => handleQuickDemo('USER')}
                className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 hover:bg-purple-500/10 transition-all cursor-pointer disabled:opacity-50"
              >
                {isDemoLoading === 'USER' ? <Loader2 className="animate-spin text-purple-500 mb-2" size={20} /> : <UserCheck className="text-purple-500 mb-2 group-hover:scale-110 transition-transform" size={20} />}
                <span className="text-[9px] font-black uppercase tracking-widest">User</span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center gap-4 text-[9px] font-black uppercase text-slate-700 tracking-[0.3em] mb-6">
            <div className="h-[1px] flex-1 bg-white/5" /> EMAIL ACCESS <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
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
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
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
              disabled={isLoading || !!isDemoLoading || !isLoaded} 
              className="relative w-full h-14 text-[10px] font-black uppercase tracking-[0.2em] text-white rounded-2xl overflow-hidden shadow-xl active:scale-[0.95] transition-all disabled:opacity-50 group mt-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:opacity-90 transition-all" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Access Dashboard <ArrowRight size={14} /></>}
              </span>
            </button>
          </form>

          {/* Social Login Section */}
          <div className="mt-6 space-y-3">
            <button 
              type="button" 
              disabled={!isLoaded}
              onClick={() => handleSocialLogin('oauth_google')} 
              className="w-full h-12 flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-widest bg-white/5 text-white rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
              Continue with Google
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                disabled={!isLoaded}
                onClick={() => handleSocialLogin('oauth_github')} 
                className="h-12 flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest bg-white/5 text-white rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              >
                {/* Manual GitHub SVG to avoid build error */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                GitHub
              </button>
              
              <button 
                type="button" 
                disabled={!isLoaded}
                onClick={() => handleSocialLogin('oauth_facebook')} 
                className="h-12 flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest bg-[#1877F2]/10 text-[#1877F2] rounded-2xl border border-[#1877F2]/20 hover:bg-[#1877F2]/20 transition-all cursor-pointer"
              >
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-4 h-4" alt="FB" />
                Facebook
              </button>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-white/5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              New here?{" "}
              <Link href="/register" className="text-white hover:text-blue-500 transition-all underline underline-offset-4 decoration-blue-500/30">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}