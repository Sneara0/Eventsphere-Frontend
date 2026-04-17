"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Camera, Save, Smartphone, Mail, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

// ১. সঠিক ইমপোর্ট (UserService অবজেক্ট হিসেবে আসবে)
import { UserService } from "@/app/services/user.service";

export default function ProfileSettings() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "", 
    phone: "",
    profileImage: "",
    email: "", 
  });

  // ২. প্রোফাইল ডাটা লোড করা (UserService ব্যবহার করে)
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // এখানে আপনার সব ইউজার বা স্পেসিফিক ইউজার গেট করার এপিআই কল হবে
        // আপাতত UserService.getAllUsers() এর উদাহরণ দিচ্ছি
        const res = await UserService.getAllUsers();
        if (res?.data) {
          // আপনার ব্যাকএন্ড ডাটা স্ট্রাকচার অনুযায়ী সেট করুন
          const user = res.data;
          setFormData({
            name: user.name || "",
            phone: user.contactNumber || "",
            profileImage: user.profileImage || user.image || "",
            email: user.email || "",
          });
        }
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

    const toastId = toast.loading("Uploading to Cloudinary...");
    
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

    // ৩. ব্যাকএন্ডের প্রত্যাশিত পেলোড (Payload)
    const payload = {
      name: formData.name,
      contactNumber: formData.phone, // সার্ভিস অনুযায়ী contactNumber
      profileImage: formData.profileImage,
    };

    try {
      // ৪. UserService.updateProfile কল করা হয়েছে
      await UserService.updateProfile(payload);
      toast.success("Profile sync complete!", {
        style: { background: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.2)" }
      });
    } catch (error: any) {
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
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-4"
    >
      <header className="mb-12">
        <div className="flex items-center gap-3">
            <Sparkles className="text-indigo-400" size={24}/>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                Profile <span className="text-indigo-500 underline decoration-indigo-500/20 underline-offset-8">Settings</span>
            </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Image Upload */}
        <div className="lg:col-span-1">
          <div className="bg-[#0f0f0f] border border-white/5 p-10 rounded-[3rem] text-center shadow-2xl">
            <div className="relative w-36 h-36 mx-auto mb-8">
              <div className="w-full h-full bg-[#1a1a1a] rounded-full border-2 border-dashed border-white/5 flex items-center justify-center overflow-hidden">
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
                className="absolute bottom-1 right-1 p-3.5 bg-indigo-500 rounded-[1.2rem] hover:bg-indigo-600 transition-all cursor-pointer"
              >
                <Camera size={18} className="text-white" />
              </button>
            </div>
            <h3 className="font-extrabold text-white uppercase italic text-sm">Identity Photo</h3>
          </div>
        </div>

        {/* Main Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleUpdate} className="bg-[#0f0f0f] border border-white/5 p-12 rounded-[3.5rem] space-y-8 shadow-2xl text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-2xl py-5 pl-14 pr-5 text-white outline-none focus:border-indigo-500/40 transition-all"
                    placeholder="Enter name"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1.5">Contact Phone</label>
                <div className="relative">
                  <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
                  <input 
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-2xl py-5 pl-14 pr-5 text-white outline-none focus:border-indigo-500/40 transition-all"
                    placeholder="+880..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1.5">Email (Fixed)</label>
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
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-12 py-5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-700 text-white font-black uppercase tracking-widest text-[11px] rounded-3xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-indigo-500/20"
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