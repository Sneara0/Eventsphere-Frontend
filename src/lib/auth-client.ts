// @/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:5000", 
    basePath: "/api/v1/auth", // আপনার ব্যাকএন্ড রাউট অনুযায়ী
    fetchOptions: {
        credentials: "include", // কুকি আদান-প্রদানের জন্য জরুরি
    },
});

// সরাসরি মেথডগুলো এক্সপোর্ট করার চেয়ে authClient থেকে ব্যবহার করা বেশি নিরাপদ
// তবে আপনি যদি এভাবেই চান, তবে নিচের স্টাইলটি ফলো করুন:
export const { useSession, signIn, signUp } = authClient;

// signOut কে আলাদাভাবে এক্সপোর্ট না করে সরাসরি মেথড হিসেবে ব্যবহার করা ভালো
// অথবা একটি কাস্টম র‍্যাপার ফাংশন দিতে পারেন যা নিশ্চিতভাবে কাজ করবে
export const signOut = async () => {
    return await authClient.signOut();
};