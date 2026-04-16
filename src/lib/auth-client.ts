// 📂 src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    basePath: "/api/v1/auth",
    fetchOptions: {
        credentials: "include",
    },
});

export const { useSession, signIn, signUp } = authClient;

/**
 * টাইপ-সেফ সেশন রিফ্রেশ
 * force এর বদলে শুধু getSession কল করলেই সেশন রিফ্রেশ হওয়ার কথা, 
 * অথবা সরাসরি এপিআই রিফ্রেশ কল করা যায়।
 */
export const refreshSession = async () => {
    // Better-Auth এ এটি সেশন আপডেট করার স্ট্যান্ডার্ড উপায়
    return await authClient.getSession();
};

export const handleSignOut = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                window.location.href = "/login";
            },
        },
    });
};