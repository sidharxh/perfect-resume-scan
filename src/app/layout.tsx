// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "PerfectResumeScan — Free ATS Resume Checker & Optimizer (2025)",
    template: "%s | PerfectResumeScan",
  },
  description:
    "Free instant ATS resume scanner. Get your compatibility score, missing keywords, and AI-powered bullet fixes in seconds — no signup required.",
  keywords:
    "ATS resume checker, free ATS scanner, resume ATS test, ATS friendly resume, resume keyword scanner, beat ATS, ATS resume optimizer",
  
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  alternates: {
    canonical: "https://www.perfectresumescan.com",
  },

  openGraph: {
    title: "Free ATS Resume Checker — PerfectResumeScan",
    description: "Check if your resume beats Applicant Tracking Systems in seconds. Instant score + fixes.",
    url: "https://www.perfectresumescan.com",
    siteName: "PerfectResumeScan",
    images: [
      {
        url: "https://www.perfectresumescan.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PerfectResumeScan — Free ATS Resume Checker",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Free ATS Resume Checker — Instant Score & Fixes",
    description: "Upload your resume → see if it passes ATS in seconds",
    images: [
      {
        url: "https://www.perfectresumescan.com/og-image.jpg",
        alt: "PerfectResumeScan — Free ATS Resume Checker",
      },
    ],
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-slate-800 antialiased overflow-x-hidden bg-slate-50 selection:bg-blue-200 selection:text-blue-900">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}