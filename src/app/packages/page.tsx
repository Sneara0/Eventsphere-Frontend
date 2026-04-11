"use client";

import React from "react";
import { Check, Zap, Crown, Rocket, Star, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const packages = [
  {
    id: "price_starter_free", // আপনার Stripe Price ID এখানে বসবে
    name: "Starter",
    price: "0",
    description: "Perfect for small personal events and testing our platform.",
    features: ["Up to 2 Events", "100 Attendees per event", "Basic Analytics", "Community Support"],
    icon: <Rocket className="text-blue-400" size={24} />,
    color: "border-blue-500/20",
    buttonText: "Start for Free",
    popular: false
  },
  {
    id: "price_pro_monthly", // আপনার Stripe Price ID এখানে বসবে
    name: "Pro",
    price: "49",
    description: "Best for professional event planners and growing businesses.",
    features: ["Unlimited Events", "1000 Attendees per event", "Advanced Analytics", "Priority Support", "Custom Branding"],
    icon: <Zap className="text-emerald-400" size={24} />,
    color: "border-emerald-500/30",
    buttonText: "Upgrade to Pro",
    popular: true
  },
  {
    id: "price_enterprise",
    name: "Enterprise",
    price: "Custom",
    description: "Full-scale solutions for large organizations and stadiums.",
    features: ["Everything in Pro", "Unlimited Attendees", "White-label Solution", "Dedicated Manager", "API Access"],
    icon: <Crown className="text-amber-400" size={24} />,
    color: "border-amber-500/20",
    buttonText: "Contact Sales",
    popular: false
  }
];

export default function PackagesPage() {
  const router = useRouter();
  const { data: session, isPending: authPending } = authClient.useSession();
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleSubscription = async (pkgId: string, pkgName: string) => {
    // ১. লগইন করা না থাকলে লগইন পেজে পাঠান
    if (!session) {
      router.push("/login");
      return;
    }

    // ২. এন্টারপ্রাইজ হলে কন্টাক্ট পেজে পাঠান
    if (pkgName === "Enterprise") {
      router.push("/contact");
      return;
    }

    // ৩. ফ্রি বা প্রো প্যাকেজের জন্য প্রসেস
    setLoadingId(pkgId);
    
    try {
      // এখানে আপনার Stripe Backend এ কল যাবে
      // উদাহরণস্বরূপ:
      /*
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        body: JSON.stringify({ priceId: pkgId }),
      });
      const data = await res.json();
      window.location.href = data.url; 
      */
      
      console.log(`Processing ${pkgName}...`);
      // আপাতত ড্যাশবোর্ডে পাঠিয়ে দিচ্ছি টেস্টিংয়ের জন্য
      setTimeout(() => {
        router.push("/dashboard");
        setLoadingId(null);
      }, 1500);

    } catch (error) {
      console.error("Payment failed", error);
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 sm:px-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <Star size={12} fill="currentColor" /> Premium Plans
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase mb-6">
            Choose Your <span className="text-primary">Package</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Scale your events with our flexible pricing plans tailored for your needs.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.name}
              className={`relative group bg-white/5 border ${pkg.color} p-8 rounded-[2.5rem] flex flex-col transition-all duration-500 hover:-translate-y-2 ${pkg.popular ? 'ring-2 ring-primary shadow-2xl shadow-primary/20' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest italic shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                  {pkg.icon}
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white italic">
                    {pkg.price !== "Custom" ? `$${pkg.price}` : "Custom"}
                  </span>
                  {pkg.price !== "Custom" && <span className="text-gray-500 font-bold uppercase text-[9px] tracking-widest">/month</span>}
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="text-emerald-500" size={14} />
                    <span className="text-gray-300 text-xs font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSubscription(pkg.id, pkg.name)}
                disabled={loadingId === pkg.id}
                className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                  pkg.popular 
                  ? 'bg-primary text-primary-foreground hover:opacity-90' 
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black'
                } disabled:opacity-50`}
              >
                {loadingId === pkg.id ? <Loader2 className="animate-spin" size={16} /> : pkg.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}