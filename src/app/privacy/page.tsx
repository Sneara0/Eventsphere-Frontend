"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Eye, Lock, FileText, CalendarClock, 
  ChevronRight, Scale, Info, Mail, X, Send, Loader2 
} from "lucide-react";

// Hydration fix
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;
  return <>{children}</>;
}

const timelineSections = [
  {
    icon: <CalendarClock size={20} />,
    title: "1. Update Chronicle",
    gradient: "from-blue-600 to-cyan-400",
    content: "This Privacy Policy was architected on April 9, 2026. As EventSphere evolves, we may update these terms."
  },
  {
    icon: <Eye size={20} />,
    title: "2. The Data Blueprint",
    gradient: "from-emerald-600 to-teal-400",
    content: "We collect information you explicitly provide: account details, event listings, and secure payment data via Stripe."
  },
  {
    icon: <Lock size={20} />,
    title: "3. The Fortress: Data Security",
    gradient: "from-rose-600 to-orange-400",
    content: "Your data is secured using TLS 1.3. Financial transactions never touch our servers directly."
  },
  {
    icon: <Scale size={20} />,
    title: "4. Sovereign Rights",
    gradient: "from-amber-600 to-yellow-400",
    content: "You retain full sovereignty. Access, correct, or request data erasure at any time."
  }
];

export default function PrivacyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // --- Real Email Sending Logic ---
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      // ✅ পাথ আপডেট করা হয়েছে: /api/v1/contact
      const response = await fetch("http://localhost:5000/api/v1/contact", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Success! Your inquiry has been sent to our Privacy Team.");
        setIsModalOpen(false);
      } else {
        alert(`Error: ${result.message || "Failed to send message"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Could not connect to the backend server. Make sure your backend is running!");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ClientOnly>
      <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 md:px-12 font-sans relative overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[130px] animate-pulse" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center mb-24 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-inner">
              <ShieldCheck size={14} fill="currentColor" /> Trust Charter
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic uppercase mb-8">
              Your <span className="text-primary">Privacy</span> <br className="hidden md:block"/> Is Our Code
            </h1>
          </div>

          {/* Timeline Cards */}
          <div className="relative border-l border-white/5 pl-10 ml-5 md:ml-10 space-y-16 py-10">
            {timelineSections.map((section, index) => (
              <div key={index} className="relative group">
                <div className={`absolute -left-[61px] top-0 w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} p-0.5 transition-transform group-hover:scale-110`}>
                   <div className="w-full h-full bg-[#020617] rounded-[10px] flex items-center justify-center text-white shadow-lg">
                      {section.icon}
                   </div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2rem] backdrop-blur-3xl hover:bg-white/[0.05] transition-all group-hover:border-white/10 group-hover:shadow-primary/5">
                   <h2 className={`text-2xl font-black italic uppercase tracking-tight mb-4 bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}>
                      {section.title}
                   </h2>
                   <p className="text-gray-400 text-sm leading-relaxed font-medium">{section.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Support Section */}
          <div className="mt-28 p-10 rounded-[3rem] bg-white/5 border border-dashed border-white/10 relative overflow-hidden backdrop-blur-lg">
            <Mail className="absolute -right-10 -bottom-10 text-white/[0.02]" size={200} />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center relative z-10">
               <div className="md:col-span-3">
                 <h3 className="text-white font-black uppercase text-xl italic tracking-tight mb-2">Still Have Questions?</h3>
                 <p className="text-gray-500 text-xs uppercase font-bold tracking-widest leading-relaxed">Our Trust & Safety team is ready to provide clarity.</p>
               </div>
               <div className="md:col-span-2 md:text-right">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] py-4 px-10 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95"
                  >
                     Contact Privacy Team
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* --- Contact Privacy Modal --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            
            <div className="relative w-full max-w-lg bg-[#0b1120] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Contact <span className="text-primary">Legal</span></h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Your Email</label>
                    <input name="email" type="email" required placeholder="name@example.com" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:border-primary/50 transition-all mt-2" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Subject</label>
                    <select name="subject" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:border-primary/50 transition-all mt-2 appearance-none">
                      <option value="Data Access Request" className="bg-[#0b1120]">Data Access Request</option>
                      <option value="Account Deletion" className="bg-[#0b1120]">Account Deletion</option>
                      <option value="General Privacy Inquiry" className="bg-[#0b1120]">General Privacy Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Message</label>
                    <textarea name="message" required rows={4} placeholder="How can our legal team help you?" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:border-primary/50 transition-all mt-2 resize-none" />
                  </div>
                  
                  <button 
                    disabled={isSending}
                    className="w-full bg-primary text-primary-foreground font-black uppercase text-[11px] tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all mt-4"
                  >
                    {isSending ? <Loader2 className="animate-spin" size={18} /> : <><Send size={16} /> Send Request</>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClientOnly>
  );
}