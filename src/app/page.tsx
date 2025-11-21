'use client';

import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import Features from '@/components/Features';
import SampleATSResume from '@/components/SampleATSResume';
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
      <SampleATSResume scrollToUpload={scrollToUpload} />
      <FAQ />
      <Features />
      <Footer scrollToUpload={scrollToUpload} />
    </>
  );
}
