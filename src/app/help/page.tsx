"use client";

import React from "react";
import { HelpCircle, MessageCircle, Book, ShieldQuestion, ArrowRight, Zap, Mail, LifeBuoy, Plane } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function HelpPage() {
  const faqs = [
    { q: "How do I book an event on EventSphere?", a: "Navigate to the 'Events' section, select your desired event, and click the 'Book Ticket' button. Follow the on-screen instructions to complete your booking." },
    { q: "What payment methods are supported?", a: "We support all major credit/debit cards, net banking, and popular digital wallets. All transactions are securely processed." },
    { q: "How can I host my own event?", a: "Click on 'Host Event' in the navbar (desktop) or menu (mobile). You'll need an Organizer account to fill out the event details and submit it for review." },
    { q: "Can I cancel or get a refund for a ticket?", a: "Refund policies vary by event organizer. Please check the specific event's terms and conditions or contact the organizer directly through their profile." },
  ];

  // প্রিমিয়াম এভিয়েটর গ্যালারির ছবিসমূহ
  const aviationImages = [
    { src: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=600&auto=format&fit=crop", title: "Luxury Cabin" },
    { src: "https://images.unsplash.com/photo-1540339832862-47452993c66b?q=80&w=600&auto=format&fit=crop", title: "Organizer Lounge" },
    { src: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=600&auto=format&fit=crop", title: "Corporate Suite" },
    { src: "https://images.unsplash.com/photo-1506012733851-46297839fa41?q=80&w=600&auto=format&fit=crop", title: "Premium Desk" },
  ];

  // Animation variants with explicit Typescript Variants interface
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  const galleryVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  return (
    <motion.div 
      className="min-h-screen bg-[#020617] text-white pt-36 pb-20 px-4 md:px-8 font-sans overflow-hidden relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <motion.header className="mb-16 border-b border-white/[0.04] pb-10" variants={itemVariants}>
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="p-5 bg-[#0f172a] rounded-[2rem] border border-white/[0.05] shadow-inner shadow-indigo-500/5 w-fit">
              <HelpCircle size={48} className="text-indigo-400 stroke-[1.5]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <LifeBuoy className="text-indigo-500/50" size={18} />
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Support Hub v2.1</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                Help <span className="text-indigo-500 underline decoration-indigo-500/20 underline-offset-8">Center</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-base max-w-xl pt-2 leading-relaxed">
                Welcome to the EventSphere Support Hub. Find answers, explore guides, or connect with our specialized team for personalized assistance.
              </p>
            </div>
          </div>
        </motion.header>

        {/* --- Quick Support Cards --- */}
        <motion.section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" variants={containerVariants}>
          {[
            { icon: MessageCircle, label: "Live Chat Support", desc: "Connect with a support specialist now.", action: "Start Chat" },
            { icon: Book, label: "Knowledge Base", desc: "Explore step-by-step tutorials & guides.", action: "View Guides" },
            { icon: ShieldQuestion, label: "Community FAQs", desc: "Common questions answered by the community.", action: "See FAQs" },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              className="p-8 md:p-10 rounded-[2.5rem] bg-[#0f172a]/50 border border-white/[0.03] hover:border-indigo-500/30 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm shadow-2xl shadow-indigo-500/5"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-indigo-600/20 transition-all" />
              
              <div className="w-fit p-4 bg-[#0f0f0f] rounded-xl border border-white/5 text-indigo-400 mb-8 group-hover:scale-110 transition-transform shadow-lg group-hover:text-indigo-300">
                <item.icon size={26} strokeWidth={1.5} />
              </div>
              
              <h3 className="font-extrabold text-lg text-white mb-2 tracking-tight">{item.label}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">{item.desc}</p>
              
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 group-hover:text-indigo-300 flex items-center gap-2 group-hover:gap-3 transition-all leading-none">
                 {item.action} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </motion.section>

        {/* --- ADDED: Premium Aviator Gallery Section --- */}
        <motion.section className="mb-24" variants={galleryVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div className="flex items-center gap-3 mb-10 border-l-4 border-gray-700 pl-5" variants={itemVariants}>
            <Plane size={20} className="text-gray-500" />
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white">
              Event<span className="text-indigo-500">Sphere</span> <span className="text-slate-600">Aviation Aesthetics</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {aviationImages.map((image, i) => (
              <motion.div 
                key={i} 
                className="relative h-60 md:h-72 rounded-3xl overflow-hidden border border-white/[0.03] group shadow-xl shadow-black/20"
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <img 
                  src={image.src} 
                  alt={image.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                   <div className="flex items-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      <Zap size={13} className="text-indigo-400" />
                      <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">{image.title}</span>
                   </div>
                </div>
                {/* Overlay Glow */}
                <div className="absolute inset-0 bg-indigo-600/5 group-hover:bg-indigo-600/10 transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- FAQ Section --- */}
        <motion.section className="mb-20" variants={containerVariants}>
          <motion.div className="flex items-center gap-3 mb-12 border-l-4 border-indigo-500 pl-5" variants={itemVariants}>
            <Zap size={20} className="text-indigo-400" />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
              Common <span className="text-gray-600">Queries</span>
            </h2>
          </motion.div>
          
          <div className="space-y-6 max-w-5xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                className="p-8 rounded-3xl bg-[#0f172a]/80 border border-white/[0.03] hover:border-white/[0.06] transition-all duration-300 relative group shadow-lg"
                variants={itemVariants}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0 group-hover:h-3/5 w-1 bg-indigo-500/50 rounded-r-full transition-all duration-300" />
                
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                   <div className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-500/10 px-4 py-1.5 rounded-full w-fit mt-0.5">
                     Q{i+1}
                   </div>
                   <div className="flex-1 space-y-3 pt-0.5">
                      <h4 className="font-bold text-white tracking-tight text-lg group-hover:text-indigo-300 transition-colors">
                        {faq.q}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-4xl">
                        {faq.a}
                      </p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Final Call to Action --- */}
        <motion.section 
          className="p-10 md:p-14 rounded-[3.5rem] bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#0f172a] border border-indigo-500/20 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/10"
          variants={itemVariants}
          whileHover={{ borderColor: "rgba(99, 102, 241, 0.4)" }}
        >
          <div className="absolute inset-0 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Mail className="text-indigo-400 mx-auto mb-6 opacity-60" size={36} strokeWidth={1} />
            
            <h3 className="text-3xl font-black uppercase italic mb-3 tracking-tighter text-white">
              Still Need <span className="text-indigo-500">Human</span> Assistance?
            </h3>
            <p className="text-slate-400 text-sm md:text-base mb-10 leading-relaxed">
              Can't find what you're looking for? Our dedicated support protocol is active 24/7. Connect with a verified human agent for complex issues or personalized guidance.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-fit mx-auto"
            >
              <Link 
                href="mailto:protocol.support@eventsphere.io" 
                className="inline-flex items-center gap-3 px-12 py-5 bg-indigo-500 hover:bg-indigo-600 text-white font-black uppercase text-[11px] tracking-[0.25em] rounded-2xl transition-all shadow-xl shadow-indigo-500/20 group"
              >
                <Zap size={16} className="text-white/80 group-hover:animate-pulse" />
                Initiate Support Protocol
              </Link>
            </motion.div>
          </div>
        </motion.section>

      </div>
    </motion.div>
  );
}