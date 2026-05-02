import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/shared/Navbar"; 
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs"; 
import ChatBot from "@/components/ai/ChatBot"; // ১. চ্যাটবট ইম্পোর্ট করুন

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventFlow | AI-Powered Platform",
  description: "Professional event management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        // এটি অত্যন্ত গুরুত্বপূর্ণ, যা সার্ভার এবং ক্লায়েন্টের HTML অমিল এড়িয়ে যায়
        suppressHydrationWarning 
        className={cn(geistSans.variable, geistMono.variable, "h-full antialiased")}
      >
        <body className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar /> 
            <main className="flex-1 w-full">
              {children}
            </main>

            {/* ২. চ্যাটবট এখানে যুক্ত করা হলো যাতে এটি সব পেজে শো করে */}
            <ChatBot /> 
            
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}