import type { Metadata } from "next";
import React, { ReactNode } from "react";
import { Be_Vietnam_Pro, Oswald } from "next/font/google";
import "./globals.css";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

const oswald = Oswald({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HideDevBadge } from "@/components/hide-dev-badge";
import { ScrollToTop } from "@/components/scroll-to-top";

export const metadata: Metadata = {
  title: "RoPhim - Xem phim chất lượng cao",
  description: "Clone Project Rophim.com.mx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${beVietnamPro.variable} ${oswald.variable} antialiased bg-black text-white font-sans`}>
        <HideDevBadge />
        <Navbar />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
