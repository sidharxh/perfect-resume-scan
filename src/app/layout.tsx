import "./globals.css";
import type { Metadata, Viewport } from "next";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { GoogleAnalytics } from '@next/third-parties/google'


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};


const baseUrl = "https://www.perfectresumescan.com";


export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "PerfectResumeScan",
    template: "%s | PerfectResumeScan", 
  },

  description: "AI-powered resume optimization and ATS compatibility tool.",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "./",
  },

  openGraph: {
    siteName: "PerfectResumeScan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "PerfectResumeScan - AI-powered resume optimization",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body className="font-sans text-slate-800 antialiased overflow-x-hidden bg-slate-50 selection:bg-blue-200 selection:text-blue-900">
        <Navbar/>
        {children}
        <Footer/>
        <GoogleAnalytics gaId="G-SEBMHM7GEN" />
      </body>
    </html>
  );
}
