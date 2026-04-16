import axiosInstance from "@/lib/axiosInstance";

/**
 * BookingService: ইভেন্ট বুকিং এবং পেমেন্ট সংক্রান্ত সকল এপিআই কল এখানে হ্যান্ডেল করা হয়েছে।
 */
export const BookingService = {
  
  /**
   * ১. নতুন বুকিং তৈরি করা
   * @param payload { eventId, quantity }
   */
  createBooking: async (payload: { eventId: string; quantity: number }) => {
    try {
      const { data } = await axiosInstance.post('/bookings/create-booking', payload);
      return data;
    } catch (error: any) {
      // আমরা সরাসরি error throw করছি যাতে catch ব্লকে বিস্তারিত তথ্য পাওয়া যায়
      throw error;
    }
  },

  /**
   * ২. নির্দিষ্ট একটি বুকিংয়ের বিস্তারিত তথ্য আনা
   * পেমেন্ট পেজে ডাটা দেখানোর জন্য এটি ব্যবহৃত হয়।
   */
  getSingleBooking: async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`/bookings/${id}`);
      return data; 
    } catch (error: any) {
      throw error;
    }
  },

  /**
   * ৩. পেমেন্ট সেশন তৈরি করা (Stripe Checkout)
   * NaN বা টাইপ এরর এড়াতে সব ডাটা ব্যাকএন্ডে পাঠানো হচ্ছে।
   */
  createPaymentSession: async (payload: { 
    bookingId: string;
    totalAmount: number; 
    userEmail: string; 
    eventName: string; 
    userId: string 
  }) => {
    try {
      const { data } = await axiosInstance.post('/payments/create-session', payload);
      return data;
    } catch (error: any) {
      throw error;
    }
  },

  /**
   * ৪. লগইন করা ইউজারের সকল বুকিং লিস্ট আনা
   * এটি আপনার ড্যাশবোর্ডের জন্য প্রধান এপিআই।
   */
  getMyBookings: async () => {
    try {
      // ব্যাকএন্ডে /bookings/my-bookings রাউটটি হিট করবে
      const { data } = await axiosInstance.get('/bookings/my-bookings');
      return data; 
    } catch (error: any) {
      throw error;
    }
  },

  /**
   * ৫. বুকিং ক্যান্সেল বা ডিলিট করা
   */
  deleteBooking: async (id: string) => {
    try {
      const { data } = await axiosInstance.delete(`/bookings/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
};