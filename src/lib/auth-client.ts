import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // baseURL হবে আপনার ব্যাকএন্ডের রুট URL
    baseURL: "http://localhost:5000", 
    
    // basePath সাধারণত Better-Auth এর ডিফল্ট রাউট /api/auth হয়। 
    // যদি আপনি ব্যাকএন্ডে /api/v1/auth ব্যবহার করেন তবে সেটাই দিবেন।
    basePath: "/api/v1/auth", 

    fetchOptions: {
        // এই পার্টটি কুকি পাঠানোর জন্য সবচেয়ে গুরুত্বপূর্ণ
        credentials: "include", 
    },
});

// ডেসট্রাকচারিং করে এক্সপোর্ট করা
export const { useSession, signIn, signUp } = authClient;

// signOut মেথড
export const signOut = async () => {
    return await authClient.signOut();
};