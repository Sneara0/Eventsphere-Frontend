import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/shared/Navbar"; 
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs"; 
import ChatBot from "@/components/ai/ChatBot";
import Providers from "@/providers/Providers"; // ১. নতুন প্রোভাইডার ইম্পোর্ট করুন

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
        suppressHydrationWarning 
        className={cn(geistSans.variable, geistMono.variable, "h-full antialiased")}
      >
        <body className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
          {/* ২. Providers (QueryClient) দিয়ে সবকিছু র‍্যাপ করা হলো */}
          <Providers>
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

              <ChatBot /> 
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}