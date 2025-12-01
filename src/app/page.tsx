import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import Features from '@/components/Features';
import SampleWebsiteDemo from '@/components/SampleWebsiteDemo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "PerfectResumeScan | Turn Your Resume Into a Website Instantly (2025)",
  },
  description:
    "Convert your static resume into a stunning personal portfolio website in seconds. Get a shareable link, QR code, and professional hosting instantly.",
  keywords: [
    "resume to website",
    "portfolio builder",
    "personal website generator",
    "resume hosting",
    "digital resume",
    "resume qr code",
    "online resume builder",
  ],
  openGraph: {
    title: "Turn Your Resume Into a Website Instantly | PerfectResumeScan",
    description:
      "Upload your PDF resume and get a hosted, professional portfolio website in seconds. Stand out to recruiters with a digital presence.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PerfectResumeScan | Resume to Website Converter",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turn Your Resume Into a Website Instantly",
    description: "Upload your resume → Get a personal website in seconds",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Perfect Resume Scan',
    image: 'https://perfectresumescan.com/og-image.jpg',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://perfectresumescan.com', 
    description: 'AI-powered tool that converts static resumes into personal portfolio websites. Features include instant hosting, downloadable QR code cards, and PDF viewers.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Instant Resume-to-Website Conversion',
      'Personal Portfolio Hosting',
      'Downloadable QR Code Card',
      'PDF Resume Viewer',
      'Shareable Portfolio Link'
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
        <SampleWebsiteDemo/>
        <FAQ />
        <Features />
      </main>
    </>
  );
}
