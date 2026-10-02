import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalSOS from "../components/GlobalSOS";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Ushol Mama | Commuter Crowd-Shipping Network",
  description: "মেট্রোরেল বা বাসে যাতায়াতের পথে ছোট পার্সেল নিয়ে নিজের ভাড়া উসুল করুন। ১০০% NID ভেরিফাইড ও সুরক্ষিত এসক্রো পেমেন্ট।",
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
        <AppProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
            <GlobalSOS />
          </CartProvider>
        </AppProvider>
      </body>
    </html>
  );
}
