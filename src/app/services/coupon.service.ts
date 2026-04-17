// 📂 src/app/services/coupon.service.ts
import axiosInstance from "@/lib/axiosInstance";

// ১. কুপন ভ্যালিডেশন পে-লোড এর টাইপ ইন্টারফেস
interface ValidateCouponParams {
  code: string;
  eventId: string;
  originalAmount: number;
}

/**
 * ২. validateCoupon ফাংশন (Named Export)
 * এটি এখন অবজেক্ট রিসিভ করবে যা আপনার CouponInput কম্পোনেন্টের সাথে মিলবে।
 */
export const validateCoupon = async (payload: ValidateCouponParams) => {
  // আপনার ব্যাকএন্ড এন্ডপয়েন্ট অনুযায়ী POST রিকোয়েস্ট পাঠানো হচ্ছে
  const { data } = await axiosInstance.post(`/coupons/validate`, payload);
  return data;
};

// ৩. CouponService অবজেক্ট (অন্যান্য মেথড সহ)
export const CouponService = {
  // সব কুপন নিয়ে আসা
  getAllCoupons: async () => {
    const { data } = await axiosInstance.get('/coupons');
    return data;
  },

  // কুপন তৈরি করা
  createCoupon: async (payload: any) => {
    const { data } = await axiosInstance.post('/coupons', payload);
    return data;
  },

  // কুপন আপডেট করা
  updateCoupon: async (id: string, payload: any) => {
    const { data } = await axiosInstance.patch(`/coupons/${id}`, payload);
    return data;
  },

  // কুপন ডিলিট করা
  deleteCoupon: async (id: string) => {
    const { data } = await axiosInstance.delete(`/coupons/${id}`);
    return data;
  },

  // অবজেক্টের ভেতর রেফারেন্স রাখা হলো
  validateCoupon,
};