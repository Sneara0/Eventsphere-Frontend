import { axiosInstance } from "@/lib/axiosInstance";

export const BookingService = {
  /**
   * ১. নতুন বুকিং তৈরি করা (ইভেন্ট ডিটেইলস পেজ থেকে)
   */
  createBooking: async (payload: { eventId: string; quantity: number }) => {
    try {
      const { data } = await axiosInstance.post('/bookings/create-booking', payload);
      return data;
    } catch (error: any) {
      throw error.response?.data?.message || "বুকিং করা সম্ভব হয়নি। আবার চেষ্টা করুন।";
    }
  },

  /**
   * ২. নির্দিষ্ট একটি বুকিংয়ের তথ্য আনা (পেমেন্ট পেজের জন্য খুবই জরুরি)
   * এটি পেমেন্ট পেজে (/payments) অ্যামাউন্ট ও ইভেন্টের নাম দেখানোর জন্য এবং ব্যাকএন্ডে পাঠানোর জন্য লাগবে।
   */
  getSingleBooking: async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`/bookings/${id}`);
      return data; // এটি { success: true, data: { id, totalAmount, event: { title }, user: { email } } } রিটার্ন করবে
    } catch (error: any) {
      throw error.response?.data?.message || "বুকিং তথ্য পাওয়া যায়নি।";
    }
  },

  /**
   * ৩. পেমেন্ট সেশন তৈরি করা (Stripe Checkout) 🚀
   * এখানে আমরা সব ডাটা (Payload) ব্যাকএন্ডে পাঠাচ্ছি যাতে NaN এরর না আসে।
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
      return data; // ব্যাকএন্ড থেকে { success: true, data: { url: 'stripe_url' } } আসবে
    } catch (error: any) {
      throw error.response?.data?.message || "পেমেন্ট গেটওয়ে লোড করতে সমস্যা হচ্ছে।";
    }
  },

  /**
   * ৪. লগইন করা ইউজারের সব বুকিং লিস্ট নিয়ে আসা (My Bookings পেজের জন্য)
   */
  getMyBookings: async () => {
    try {
      const { data } = await axiosInstance.get('/bookings/my-bookings');
      return data;
    } catch (error: any) {
      throw error.response?.data?.message || "বুকিং লিস্ট পাওয়া যায়নি।";
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
      throw error.response?.data?.message || "বুকিং ক্যান্সেল করা যায়নি।";
    }
  }
};