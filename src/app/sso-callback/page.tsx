"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  // এটি Clerk-এর একটি বিল্ট-ইন কম্পোনেন্ট যা সেশন হ্যান্ডেল করে রিডাইরেক্ট করে দেয়
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <AuthenticateWithRedirectCallback />
    </div>
  );
}