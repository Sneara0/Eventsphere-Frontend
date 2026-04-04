import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:5000", 
    basePath: "/api/v1/auth", // এটি অত্যন্ত জরুরি
    fetchOptions: {
        credentials: "include", 
    },
});

export const { useSession, signIn, signUp, signOut } = authClient;