import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import Features from '@/components/Features';
import SampleATSResume from '@/components/SampleATSResume';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "PerfectResumeScan | Free ATS Resume Checker & Optimizer (2025)",
  },
  description:
    "Free instant ATS resume scanner. Get your compatibility score, missing keywords, and AI-powered bullet fixes in seconds - no signup required.",
  keywords: [
    "ATS resume checker",
    "free ATS scanner",
    "resume ATS test",
    "ATS friendly resume",
    "resume keyword scanner",
    "beat ATS",
    "ATS resume optimizer",
  ],
  openGraph: {
    title: "Free ATS Resume Checker — PerfectResumeScan",
    description:
      "Check if your resume beats Applicant Tracking Systems in seconds. Instant score + fixes.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "PerfectResumeScan - Free ATS Resume Checker",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ATS Resume Checker - Instant Score & Fixes",
    description: "Upload your resume → see if it passes ATS in seconds",
    images: ["/opengraph-image.jpg"],
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Perfect Resume Scan',
    image: 'https://perfectresumescan.com/opengraph-image.jpg',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://perfectresumescan.com', 
    description: 'AI-powered ATS resume scanner and optimizer. Get an instant ATS score, keyword analysis, and actionable feedback to land more interviews.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Instant ATS Score',
      'Keyword Gap Analysis',
      'Action Verb Enhancer',
      'PDF & DOCX Support',
      'Detailed Resume Optimization Plan'
    ],
    author: {
      '@type': 'Organization',
      name: 'Perfect Resume Scan',
      url: 'https://perfectresumescan.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://perfectresumescan.com/icon.svg'
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero/>
        <SampleATSResume/>
        <FAQ />
        <Features />
      </main>
    </>
  );
}
