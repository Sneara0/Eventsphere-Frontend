import { axiosInstance } from "@/lib/axiosInstance";

export const BookingService = {
  // এই মেথডটি মিসিং ছিল, এটি যোগ করুন
  createBooking: async (payload: { eventId: string; quantity: number }) => {
    const { data } = await axiosInstance.post('/bookings/create-booking', payload);
    return data;
  },

  getMyBookings: async () => {
    const { data } = await axiosInstance.get('/bookings/my-bookings');
    return data;
  },

  deleteBooking: async (id: string) => {
    const { data } = await axiosInstance.delete(`/bookings/${id}`);
    return data;
  }
};