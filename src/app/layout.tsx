import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { GlobalStateProvider } from "@/components/providers/GlobalStateProvider";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bosco Hotel | Premium Booking",
  description: "A luxury hotel booking experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50 text-stone-900`}
      >
        <GlobalStateProvider>
          <Preloader>
            {children}
            <Footer />
          </Preloader>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
