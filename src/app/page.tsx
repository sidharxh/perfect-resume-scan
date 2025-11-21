import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import Features from '@/components/Features';
import SampleATSResume from '@/components/SampleATSResume';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <SampleATSResume/>
      <FAQ />
      <Features />
      <Footer/>
    </>
  );
}
