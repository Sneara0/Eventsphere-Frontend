"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ১. সঠিক ইমপোর্ট (UserService অবজেক্ট ইমপোর্ট করা হয়েছে)
import { UserService } from "@/app/services/user.service";
import { authClient } from "@/lib/auth-client";

interface ExtendedUser {
  name?: string;
  email?: string;
  contactNumber?: string;
  address?: string;
  bio?: string;
  organizationName?: string;
}

const settingsSchema = z.object({
  name: z.string().min(2, "Name is too short").optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  organizationName: z.string().optional(),
});

type SettingsValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  
  const user = session?.user as ExtendedUser | undefined;

  const { register, handleSubmit, formState: { isDirty, errors }, reset } = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
  });

  // ২. মিউটেশন লজিক আপডেট (UserService.updateProfile ব্যবহার করা হয়েছে)
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SettingsValues) => UserService.updateProfile(data),
    onSuccess: () => {
      toast.success("Profile Updated! 🚀", { 
        style: { background: "#065f46", color: "#fff", border: "none" } 
      });
      // সেশন এবং প্রোফাইল ডাটা রিফ্রেশ করা
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      reset(undefined, { keepValues: true });
    },
    onError: (err: any) => {
      toast.error(err.message || "Update failed! Check connection.");
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        contactNumber: user.contactNumber || "",
        address: user.address || "",
        bio: user.bio || "",
        organizationName: user.organizationName || "",
      });
    }
  }, [user, reset]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-24 md:pt-32 pb-12 px-4 text-left">
      <div className="w-full max-w-3xl bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0f172a] p-8 text-white flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-black uppercase italic tracking-tighter text-emerald-400">Settings Center</h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Update your identity</p>
          </div>
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck size={14} /> Secure Access
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit((data) => mutate(data))} className="p-6 md:p-12 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Public Name</label>
              <input {...register("name")} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-emerald-500 transition-all font-bold text-slate-800" placeholder="Your Name" />
              {errors.name && <p className="text-red-500 text-[10px] ml-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Contact Number</label>
              <input {...register("contactNumber")} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-emerald-500 transition-all font-bold text-slate-800" placeholder="+880..." />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Biography</label>
              <textarea {...register("bio")} rows={4} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-emerald-500 transition-all font-bold text-slate-800 resize-none" placeholder="Tell us about yourself..." />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Organization</label>
              <input {...register("organizationName")} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-emerald-500 transition-all font-bold text-slate-800" placeholder="Company Name" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Location</label>
              <input {...register("address")} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-emerald-500 transition-all font-bold text-slate-800" placeholder="City, Country" />
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50">
            <button 
              type="submit" 
              disabled={isPending || !isDirty}
              className="w-full py-5 bg-black text-[#10b981] rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:grayscale border-2 border-transparent hover:border-emerald-400 active:scale-[0.98] cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Save size={20} />
              )}
              {isPending ? "Synchronizing..." : "Submit Identity Now"}
            </button>
            
            <div className="mt-4 flex justify-center">
              <button 
                type="button" 
                onClick={() => reset()} 
                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors cursor-pointer"
              >
                Discard Changes
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}