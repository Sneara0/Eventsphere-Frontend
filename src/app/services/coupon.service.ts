// 📂 src/app/services/coupon.service.ts
import axiosInstance from "@/lib/axiosInstance";

/**
 * ১. কুপন ভ্যালিডেশন ফাংশন (আলাদা এক্সপোর্ট)
 * এটি করার ফলে আপনি অন্য ফাইলে { validateCoupon } হিসেবে ইমপোর্ট করতে পারবেন।
 */
export const validateCoupon = async (code: string) => {
  const { data } = await axiosInstance.get(`/coupons/validate/${code}`);
  return data;
};

export const CouponService = {
  // ২. সব কুপন নিয়ে আসা
  getAllCoupons: async () => {
    const { data } = await axiosInstance.get('/coupons');
    return data;
  },

  // ৩. নতুন কুপন তৈরি করা
  createCoupon: async (payload: any) => {
    const { data } = await axiosInstance.post('/coupons', payload);
    return data;
  },

  // ৪. কুপন আপডেট করা
  updateCoupon: async (id: string, payload: any) => {
    const { data } = await axiosInstance.patch(`/coupons/${id}`, payload);
    return data;
  },

  // ৫. কুপন ডিলিট করা
  deleteCoupon: async (id: string) => {
    const { data } = await axiosInstance.delete(`/coupons/${id}`);
    return data;
  },

  // অবজেক্টের ভেতর রেফারেন্স হিসেবে রাখা হলো
  validateCoupon,
};