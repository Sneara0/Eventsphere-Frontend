import axios from "axios";

export const validateCoupon = async (payload: { 
  code: string; 
  eventId: string; 
  originalAmount: number 
}) => {
  // আপনার ব্যাকএন্ড URL অনুযায়ী পাথ ঠিক করে নিন
  const response = await axios.post("http://localhost:5000/api/v1/coupon/validate", payload, {
    withCredentials: true,
  });
  return response.data;
};