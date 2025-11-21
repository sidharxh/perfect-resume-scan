import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PerfectResumeScan - ATS Resume Scanner & Optimizer",
  description: "Get instant ATS score, keyword analysis, and actionable feedback to land more interviews."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-slate-800 antialiased overflow-x-hidden bg-slate-50 selection:bg-blue-200 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
