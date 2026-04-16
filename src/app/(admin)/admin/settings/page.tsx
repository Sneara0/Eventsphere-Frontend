"use client";

import React, { useState } from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Globe, 
  Save, 
  LogOut 
} from "lucide-react";

const AdminSettingsPage = () => {
  // 1. Define state to track the active tab
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${
                activeTab === "profile" 
                ? "bg-blue-600/20 text-blue-500 border border-blue-500/20 shadow-lg" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <User size={20} /> Profile Information
            </button>

            <button 
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${
                activeTab === "security" 
                ? "bg-blue-600/20 text-blue-500 border border-blue-500/20 shadow-lg" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Lock size={20} /> Security & Password
            </button>

            <button 
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${
                activeTab === "notifications" 
                ? "bg-blue-600/20 text-blue-500 border border-blue-500/20 shadow-lg" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Bell size={20} /> Notifications
            </button>

            <button 
              onClick={() => setActiveTab("system")}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${
                activeTab === "system" 
                ? "bg-blue-600/20 text-blue-500 border border-blue-500/20 shadow-lg" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Globe size={20} /> System Settings
            </button>
          </nav>
          
          <div className="pt-6 mt-6 border-t border-gray-800">
            <button className="flex items-center gap-3 px-5 py-4 w-full text-red-500 hover:bg-red-500/10 rounded-2xl font-bold transition-all">
              <LogOut size={20} /> Sign Out
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 shadow-2xl animate-in fade-in duration-300">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Shield size={22} className="text-blue-500" /> General Information
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  <Input label="Full Name" placeholder="Your Name" defaultValue="Sneara Parvin" />
                  <Input label="Email Address" placeholder="email@example.com" defaultValue="snearaparvin.cse1@gmail.com" />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold uppercase text-gray-400 ml-1">Biography</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about yourself..." 
                    className="w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 shadow-2xl animate-in fade-in duration-300">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Lock size={22} className="text-blue-500" /> Change Password
              </h2>
              <div className="space-y-6 text-left">
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••" />
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 shadow-2xl animate-in fade-in duration-300">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Bell size={22} className="text-blue-500" /> Notifications
              </h2>
              <div className="p-4 bg-blue-600/5 rounded-2xl border border-blue-600/10 text-gray-400 text-sm">
                Configuration for email alerts will appear here.
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="px-8 py-4 rounded-2xl border border-gray-800 text-gray-400 font-bold hover:bg-white/5 transition-all">
              Cancel
            </button>
            <button 
              className="flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all shadow-xl shadow-blue-600/20"
            >
              <Save size={20} /> SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, type = "text", placeholder, defaultValue }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-gray-400 uppercase ml-1">{label}</label>
    <input 
      type={type} 
      defaultValue={defaultValue}
      placeholder={placeholder} 
      className="w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all font-medium" 
    />
  </div>
);

export default AdminSettingsPage;