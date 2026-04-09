"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Camera, Save, Smartphone, Mail, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { updateProfile } from "@/app/services/user.service";

// এখানে আপনার ইউজার প্রোফাইল গেট করার সার্ভিস ইমপোর্ট করুন (যদি থাকে)
// import { getMyProfile } from "@/app/services/user.service"; 

export default function ProfileSettings() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // ডাটা লোড হওয়ার জন্য
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "", 
    phone: "",
    profileImage: "",
    email: "user@eventsphere.com", // ব্যাকএন্ড থেকে আসবে
  });

  // ১. পেজ লোড হওয়ার সময় ইউজারের বর্তমান ডাটা নিয়ে আসা
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // এখানে আপনার প্রোফাইল গেট করার API কল করুন
        // const res = await getMyProfile();
        // if (res?.data) {
        //   const user = res.data;
        //   setFormData({
        //     name: user.name || "",
        //     phone: user.participant?.contactNumber || user.organizer?.contactNumber || "",
        //     profileImage: user.image || user.participant?.profileImage || "",
        //     email: user.email
        //   });
        // }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setFetching(false);
      }
    };
    loadProfile();
  }, []);

  // ইমেজ আপলোড হ্যান্ডলার (Cloudinary)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image size must be less than 2MB!");
    }

    const toastId = toast.loading("Uploading to Cloudinary...", {
      style: { background: "#1a1a1a", color: "#fff", border: "1px solid rgba(255,255,255,0.05)" }
    });
    
    const cloudinaryData = new FormData();
    cloudinaryData.append("file", file);
    cloudinaryData.append("upload_preset", "eventsphere_preset"); 
    cloudinaryData.append("cloud_name", "dxmaoxp6b"); 

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dxmaoxp6b/image/upload`, {
        method: "POST",
        body: cloudinaryData,
      });
      
      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, profileImage: data.secure_url }));
        toast.success("Identity photo ready!", { id: toastId });
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image!", { id: toastId });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ২. ব্যাকএন্ডের প্রত্যাশিত ফরম্যাটে ডাটা সাজানো
    const payload = {
      name: formData.name,
      phone: formData.phone, // ব্যাকএন্ডে এটি contactNumber হিসেবে ম্যাপ হবে
      profileImage: formData.profileImage, // ব্যাকএন্ডে এটি image ও profileImage হিসেবে ম্যাপ হবে
    };

    try {
      await updateProfile(payload);
      toast.success("Profile sync complete!", {
        style: { background: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.2)" }
      });
    } catch (error: any) {
      // ৩. এরর অবজেক্ট হ্যান্ডলিং (খালি {} এরর ফিক্স)
      const errorMsg = error.response?.data?.message || error.message || "Update sync failed!";
      toast.error(errorMsg, {
        style: { background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)" }
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-indigo-500" size={40} />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-5xl mx-auto font-sans p-4"
    >
      <header className="mb-12">
        <div className="flex items-center gap-3">
            <Sparkles className="text-indigo-400" size={24}/>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
                Profile <span className="text-indigo-500 underline decoration-indigo-500/20 underline-offset-8">Settings</span>
            </h1>
        </div>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-4 ml-1">
            Identity, Security & Personal Preferences Control Center v3.5
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <div className="bg-[#0f0f0f] border border-white/[0.03] p-10 rounded-[3rem] text-center relative overflow-hidden group shadow-2xl shadow-indigo-500/5">
            <div className="relative w-36 h-36 mx-auto mb-8">
              <div className="w-full h-full bg-[#1a1a1a] rounded-full border-2 border-dashed border-white/5 flex items-center justify-center overflow-hidden group-hover:border-indigo-500/40 transition-all">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={54} className="text-gray-700" />
                )}
              </div>
              
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 p-3.5 bg-indigo-500 rounded-[1.2rem] hover:bg-indigo-600 transition-all shadow-xl"
              >
                <Camera size={18} className="text-white" />
              </button>
            </div>
            
            <h3 className="font-extrabold text-white uppercase tracking-tighter italic text-sm">Identity Photo</h3>
          </div>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleUpdate} className="bg-[#0f0f0f] border border-white/[0.03] p-12 rounded-[3.5rem] space-y-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1.5">Full Name</label>
                <div className="relative group/input">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within/input:text-indigo-400 transition-colors" size={18} />
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-2xl py-5 pl-14 pr-5 text-white outline-none focus:border-indigo-500/40 transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1.5">Contact Phone</label>
                <div className="relative group/input">
                  <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within/input:text-indigo-400 transition-colors" size={18} />
                  <input 
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-2xl py-5 pl-14 pr-5 text-white outline-none focus:border-indigo-500/40 transition-all"
                    placeholder="+880 1XXX XXX XXX"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1.5">System Email (Locked)</label>
              <div className="relative opacity-60 cursor-not-allowed">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
                <input 
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-white/[0.01] border border-white/5 rounded-2xl py-5 pl-14 pr-5 text-gray-500"
                />
              </div>
            </div>

            <div className="pt-6">
                <button 
                  disabled={loading}
                  className="w-full md:w-auto px-12 py-5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-700 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-3xl transition-all flex items-center justify-center gap-3.5"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Save Identity Changes
                </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}