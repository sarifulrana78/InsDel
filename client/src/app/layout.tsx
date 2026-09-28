import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import GlobalSOS from "../components/GlobalSOS";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ushol Mama | ঢাকা'র ১ম কমিউটার ক্রাউড-শিপিং প্ল্যাটফর্ম",
  description: "মেট্রোরেল বা বাসে যাতায়াতের পথে ছোট পার্সেল নিয়ে নিজের ভাড়া উসুল করুন। ১০০% NID ভেরিফাইড ও সুরক্ষিত এসক্রো পেমেন্ট।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
        <AppProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 w-full">
              {children}
            </main>
            <GlobalSOS />
          </CartProvider>
        </AppProvider>
      </body>
    </html>
  );
}
