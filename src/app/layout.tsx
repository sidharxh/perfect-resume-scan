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
    default: "PerfectResumeScan - Turn Your Resume into a Website Instantly",
    template: "%s | PerfectResumeScan", 
  },

  description: "Convert your static PDF resume into a stunning, shareable portfolio website in seconds using AI. Impress recruiters with a dynamic online presence.",

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
    title: "PerfectResumeScan - Turn Your Resume into a Website",
    description: "Upload your resume and get a professional portfolio website instantly. Stand out from the stack with AI-powered personal branding.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PerfectResumeScan - Resume to Website Converter",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PerfectResumeScan - Turn Your Resume into a Website",
    description: "Upload your resume and get a professional portfolio website instantly.",
    images: ["/og-image.jpg"],
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
