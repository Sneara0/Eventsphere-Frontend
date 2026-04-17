"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { 
  Loader2, Mail, Lock, User, Sparkles, 
  ArrowRight, Menu, X, Users, Briefcase 
} from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    role: "participant" 
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending: sessionLoading } = useSession();

  // --- ডিপ্লয়মেন্টের জন্য ইউআরএল সেটআপ ---
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  // ------------------------------------

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`, // এখানে ডাইনামিক ইউআরএল বসানো হয়েছে
        formData,
        { 
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.data) {
        toast.success("Registration successful! Check your email for OTP. 📧");
        
        setTimeout(() => {
          router.push(`/verify-otp?email=${formData.email}`);
        }, 1500);
      }

    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed. Try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({ 
        provider: "google", 
        callbackURL: "/dashboard" 
      });
    } catch (error: any) {
      toast.error("Google sign up failed.");
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 relative z-10" />
        </div>
      </div>
    );
  }

  if (session) return null;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020617] px-4 selection:bg-blue-500/30 text-left">
      
      <nav className="fixed top-0 w-full z-[100] bg-[#020617]/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-black tracking-tighter text-white uppercase italic">
              EVENT<span className="text-blue-500">.</span>SPHERE
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-blue-500 ${pathname === link.href ? "text-blue-500" : "text-slate-400"}`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/login" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
              Login
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#020617] border-b border-white/5 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-xs font-black uppercase tracking-widest text-slate-400 py-2" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <Link href="/login" className="text-blue-500 font-black uppercase text-xs tracking-widest py-2">Login Account</Link>
          </div>
        )}
      </nav>

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[420px] z-10 space-y-8 py-24">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-white mb-5 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white italic uppercase">
            EVENT<span className="text-blue-500">.</span>SPHERE
          </h1>
          <p className="text-slate-400 text-[10px] mt-3 font-bold tracking-[0.3em] uppercase">Join the experience</p>
        </div>

        <div className="border border-white/5 shadow-[0_0_50px_-12px_rgba(59,130,246,0.15)] rounded-[2.5rem] p-8 sm:p-10 bg-white/[0.03] backdrop-blur-3xl">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 p-1 bg-white/5 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "participant" })}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  formData.role === "participant" 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Users size={14} /> Participant
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "organizer" })}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  formData.role === "organizer" 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" 
                  : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Briefcase size={14} /> Organizer
              </button>
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin} 
              className="w-full h-12 flex items-center justify-center font-bold text-[10px] uppercase tracking-widest bg-white/5 text-white rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-[0.98] group cursor-pointer"
            >
              <svg className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center gap-4 text-[9px] font-black uppercase text-slate-600 tracking-[0.3em] my-2">
              <div className="h-[1px] flex-1 bg-white/5" /> OR EMAIL <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="FULL NAME" 
                  className="w-full h-12 pl-12 bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 transition-all rounded-2xl outline-none text-[11px] font-bold tracking-widest"
                  value={formData.name || ""} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full h-12 pl-12 bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 transition-all rounded-2xl outline-none text-[11px] font-bold tracking-widest"
                  value={formData.email || ""} 
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
                  value={formData.password || ""} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading} 
                className="relative w-full h-14 text-[10px] font-black uppercase tracking-[0.2em] text-white rounded-2xl overflow-hidden shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 group mt-4 cursor-pointer"
              >
                <div className={`absolute inset-0 transition-all duration-500 bg-gradient-to-r ${formData.role === 'organizer' ? 'from-purple-600 to-pink-600' : 'from-blue-600 to-indigo-600'}`} />
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Join as {formData.role} <ArrowRight size={14} /></>}
                </span>
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Already a member?{" "}
              <Link href="/login" className="text-white hover:text-blue-500 transition-all underline underline-offset-4 decoration-blue-500/30">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}