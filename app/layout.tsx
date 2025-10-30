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

export const metadata = {
  title: "Delivery Idol — Vote for Your Favorite Robot!",
  description: "Vote, watch, and celebrate your favorite robots on Delivery Idol.",
  keywords: ["Delivery Idol", "robot voting", "Next.js", "interactive competition"],
  openGraph: {
    title: "Delivery Idol",
    description: "Vote for your favorite robot live!",
    url: "https://deliveryidol.net",
    siteName: "Delivery Idol",
    images: [
      {
        url: "https://deliveryidol.net/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
