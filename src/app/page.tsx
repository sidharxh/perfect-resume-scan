import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import Features from '@/components/Features';
import SampleATSResume from '@/components/SampleATSResume';


export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Perfect Resume Scan',
    image: 'https://perfectresumescan.com/og-image.jpg',
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
    softwareRequirements: 'Modern Web Browser (Chrome, Safari, Edge)',
    screenshot: 'https://perfectresumescan.com/og-image.jpg',
    author: {
      '@type': 'Organization',
      name: 'Perfect Resume Scan',
      url: 'https://perfectresumescan.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://perfectresumescan.com/logo.svg'
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
