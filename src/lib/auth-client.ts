import { createAuthClient } from "better-auth/react";

/**
 * Better Auth Client Setup
 * baseURL: আপনার ব্যাকএন্ড এপিআই ইউআরএল (যেমন: http://localhost:5000/api/v1)
 * এটি ফ্রন্টএন্ড থেকে সেশন ম্যানেজ করার জন্য ব্যবহৃত হয়।
 */
export const authClient = createAuthClient({
    // .env ফাইল থেকে ইউআরএল নিচ্ছে, না থাকলে ডিফল্ট লোকালহোস্ট
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
    
    // যদি আপনার ব্যাকএন্ডে কাস্টম সেশন কনফিগারেশন থাকে তবে এখানে যোগ করতে পারেন
    fetchOptions: {
        // সেশন কুকি আদান-প্রদানের জন্য credentials include করা ভালো
        credentials: "include", 
    },
});

// সরাসরি ইউজার সেশন পাওয়ার জন্য হুকগুলো এখান থেকেই এক্সপোর্ট হয়
export const { useSession, signIn, signUp, signOut } = authClient;