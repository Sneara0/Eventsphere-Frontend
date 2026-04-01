import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider"; // নিশ্চিত করুন এই পাথটি সঠিক

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventSphere | Host & Discover Events",
  description: "A professional platform for secure event ticketing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased`} suppressHydrationWarning>
        
        {/* TanStack Query Provider দিয়ে পুরো অ্যাপকে র্যাপ করা হলো */}
        <QueryProvider>
          {/* ১. গ্লোবাল নেভবার */}
          <Navbar />

          {/* ২. মেইন কন্টেন্ট */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* ৩. টোস্ট নোটিফিকেশন */}
          <Toaster 
            position="top-center" 
            richColors 
            closeButton
            toastOptions={{
              style: { background: '#020617', border: '1px solid #1e293b', color: '#fff' },
            }}
          />
        </QueryProvider>

      </body>
    </html>
  );
}