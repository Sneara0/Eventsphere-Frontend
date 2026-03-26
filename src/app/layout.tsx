import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        {/* এখানে পরে আমরা Navbar এবং Redux Provider যোগ করব */}
        {children}
      </body>
    </html>
  );
}