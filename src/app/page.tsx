'use client';

import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  const uploadRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <Navbar scrollToUpload={scrollToUpload} />
      <Hero uploadRef={uploadRef} />
      <HowItWorks />
      <Features />
      <Pricing scrollToUpload={scrollToUpload} />
      <Footer scrollToUpload={scrollToUpload} />
    </>
  );
}
