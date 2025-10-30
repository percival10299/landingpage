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
  metadataBase: new URL("https://deliveryidol.net"),
  openGraph: {
    title: "Delivery Idol",
    description: "Vote for your favorite robot live!",
    url: "https://deliveryidol.net",
    siteName: "Delivery Idol",
    images: [
      {
        url: "https://deliveryidol.net/og-image.png", // solid background, not transparent
        width: 1024,
        height: 1024,
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
