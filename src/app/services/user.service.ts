import axios from "axios";

// .env থেকে ইউআরএল নেওয়া হচ্ছে, না থাকলে লোকালহোস্ট
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // এটি কুকি বা সেশন পাঠানোর জন্য অপরিহার্য
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * ইউজার প্রোফাইল আপডেট করার সার্ভিস
 */
export const updateProfile = async (payload: any) => {
  try {
    // /api/v1/users/update-profile এন্ডপয়েন্টে হিট করবে
    const response = await apiClient.patch("/users/update-profile", payload);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      console.error("❌ NETWORK ERROR: সার্ভার কানেকশন নেই অথবা CORS ব্লক করছে।");
      throw new Error("Server is unreachable. Please check your backend.");
    } else {
      console.error("📋 Backend Error:", error.response.data);
      // ব্যাকএন্ড থেকে আসা নির্দিষ্ট এরর মেসেজটি থ্রো করা
      throw new Error(error.response.data.message || "Update failed!");
    }
  }
};