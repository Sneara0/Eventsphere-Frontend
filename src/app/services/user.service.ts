import axios from "axios";

// .env থেকে ইউআরএল নেওয়া হচ্ছে
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const UserService = {
  /**
   * সব ইউজার নিয়ে আসা (Admin Management Page এর জন্য)
   * এপিআই পাথ: /api/v1/users
   */
  getAllUsers: async () => {
    try {
      const response = await apiClient.get("/users");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Users fetch failed!");
    }
  },

  /**
   * প্রোফাইল আপডেট করা
   * এপিআই পাথ: /api/v1/users/update-profile
   */
  updateProfile: async (payload: any) => {
    try {
      const response = await apiClient.patch("/users/update-profile", payload);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Update failed!");
    }
  },

  /**
   * ইউজার ডিলিট করা
   * এপিআই পাথ: /api/v1/users/:id
   */
  deleteUser: async (id: string) => {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Delete failed!");
    }
  }
};