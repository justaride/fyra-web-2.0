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

export const metadata: Metadata = {
  title: {
    default: "Fyra Circular Platform | Nordic Circular Construction",
    template: "%s | Fyra Circular Platform",
  },
  description:
    "Your guide to circular economy in Nordic hospitality. Find verified suppliers, consultants, and case studies for sustainable hotel construction and renovation.",
  keywords: [
    "circular economy",
    "sustainable construction",
    "Nordic hospitality",
    "hotel renovation",
    "reused materials",
    "circular design",
    "Sweden",
    "Denmark",
    "Norway",
  ],
  authors: [{ name: "Fyra" }],
  creator: "Fyra",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Fyra Circular Platform",
    title: "Fyra Circular Platform | Nordic Circular Construction",
    description:
      "Your guide to circular economy in Nordic hospitality. Find verified suppliers, consultants, and case studies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fyra Circular Platform",
    description: "Nordic circular construction for hospitality",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
