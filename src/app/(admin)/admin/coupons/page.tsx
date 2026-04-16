"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Ticket, Trash2, Loader2, X } from "lucide-react";
import { CouponService } from "@/app/services/coupon.service";
import { toast } from "sonner";

const AdminCouponsPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ১. সব কুপন নিয়ে আসা
  const { data, isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => CouponService.getAllCoupons(),
  });

  // ২. নতুন কুপন তৈরি করার মিউটেশন
  const createMutation = useMutation({
    mutationFn: (newCoupon: any) => CouponService.createCoupon(newCoupon),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("নতুন কুপন সফলভাবে তৈরি হয়েছে!");
      setIsModalOpen(false); 
    },
    onError: (error: any) => {
      toast.error(error?.message || "কুপন তৈরি করা সম্ভব হয়নি।");
    },
  });

  // ৩. ডিলিট মিউটেশন
  const deleteMutation = useMutation({
    mutationFn: (id: string) => CouponService.deleteCoupon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("Coupon deleted successfully!");
    },
    onError: () => toast.error("Failed to delete coupon"),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      code: formData.get("code"),
      discountValue: Number(formData.get("discountValue")),
      discountType: formData.get("discountType"),
      expiryDate: new Date(formData.get("expiryDate") as string).toISOString(),
    };

    createMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-[#0a0a0a] text-white">
      {/* হেডার সেকশন */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Coupons Management</h1>
          <p className="text-sm text-gray-400 mt-1">Create and manage your event promotion codes</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20"
        >
          <Plus size={20} /> Add New Coupon
        </button>
      </div>

      {/* কুপন লিস্ট */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.data?.map((coupon: any) => (
          <div key={coupon.id} className="group bg-[#111] border border-gray-800 p-6 rounded-3xl relative overflow-hidden transition-all hover:border-blue-500/50">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
                <Ticket size={28} />
              </div>
              <button 
                onClick={() => deleteMutation.mutate(coupon.id)}
                className="text-gray-600 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest">Coupon Code</h3>
              <p className="text-2xl font-black text-white">{coupon.code}</p>
              <div className="pt-4">
                 <span className="text-4xl font-bold text-blue-500">
                    {coupon.discountType === "PERCENTAGE" ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                 </span>
                 <span className="text-lg text-gray-400 ml-2 font-medium">OFF</span>
              </div>
              
              <div className="pt-6 flex items-center justify-between border-t border-gray-800/50 mt-4">
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
                  Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                </div>
                <div className="bg-green-500/10 text-green-500 text-[10px] px-2 py-1 rounded-md font-bold uppercase">
                  {coupon.status || "Active"}
                </div>
              </div>
            </div>
            
            {/* Ticket Decorative Cutouts */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0a0a0a] rounded-full border-r border-gray-800"></div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0a0a0a] rounded-full border-l border-gray-800"></div>
          </div>
        ))}
      </div>

      {/* --- ADD NEW COUPON MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="bg-[#111] border border-gray-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>

            <h2 className="text-2xl font-bold mb-2 text-white">Create Coupon</h2>
            <p className="text-gray-400 text-sm mb-8">Fill in the details to generate a new code</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Coupon Code</label>
                <input 
                  name="code" 
                  required 
                  placeholder="e.g. SUMMER2026"
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3.5 text-white placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Discount Value</label>
                  <input 
                    name="discountValue" 
                    type="number" 
                    required 
                    placeholder="20"
                    className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3.5 text-white outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Type</label>
                  <select 
                    name="discountType" 
                    className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3.5 text-white outline-none focus:border-blue-500 transition-all appearance-none"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed Amount ($)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Expiry Date</label>
                <input 
                  name="expiryDate" 
                  type="date" 
                  required 
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3.5 text-white outline-none focus:border-blue-500 transition-all [color-scheme:dark]"
                />
              </div>

              <button 
                disabled={createMutation.isPending}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl mt-6 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Processing...</span>
                  </>
                ) : (
                  "Create Coupon"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCouponsPage;