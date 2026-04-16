"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { User, Mail, Shield, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const AdminUsersPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // withCredentials: true নিশ্চিত করে যে আপনার লগইন কুকি ব্যাকএন্ডে যাচ্ছে
      const response = await axios.get(`${API_URL}/users`, { withCredentials: true });
      console.log("API Response:", response.data); // এটি দিয়ে ডাটা চেক করুন
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  // যদি এপিআই কল ফেইল করে (যেমন ৪0৪ বা ৪0১ এরর)
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#0a0a0a] text-red-500">
        <AlertCircle size={48} className="mb-4" />
        <p className="text-xl font-bold">Failed to load users</p>
        <p className="text-sm text-gray-500">{(error as any)?.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-[#0a0a0a] text-white">
      <h1 className="text-3xl font-extrabold mb-8">Users Management</h1>
      
      <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-[#1a1a1a] border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">User</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Role</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {/* এখানে ডাটাবেসের ফিল্ডের নামগুলো (name, email) ছোট হাতের কি না নিশ্চিত করুন */}
            {data?.data?.length > 0 ? (
              data.data.map((user: any) => (
                <tr key={user.id} className="hover:bg-[#161616] transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex justify-center items-center text-blue-500">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{user.name || "Unknown"}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-gray-400">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-[10px] font-bold">
                      {user.status || "ACTIVE"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                  No users found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;