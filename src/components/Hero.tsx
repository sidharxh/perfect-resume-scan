'use client';

import { useEffect, useState, useCallback } from 'react';
import UploadArea from './UploadArea';
import ResultCard from './ResultCard'; 


// Define local type matching your API response
interface PortfolioResult {
  ok: boolean;
  slug: string;
  status: 'draft' | 'published' | 'deleted';
  personalInfo: {
    fullName: string;
    title: string;
    bio: string;
    location: string;
    email: string;
    socialLinks: any[];
  };
  experience: any[];
  projects: any[];
  skills: string[];
}


export default function Hero() {
  const [portfolioResult, setPortfolioResult] = useState<PortfolioResult | null>(null);
  const [isClient, setIsClient] = useState(false);


  // 1. On Mount: Check for existing result in localStorage
  useEffect(() => {
    setIsClient(true);
    try {
      const raw = localStorage.getItem('portfolioData'); 
      if (raw) {
        const parsed = JSON.parse(raw);
        // Only restore if it has a valid slug and hasn't been deleted
        if (parsed && parsed.slug && parsed.status !== 'deleted') {
           setPortfolioResult(parsed);
        } else {
           localStorage.removeItem('portfolioData');
        }
      }
    } catch (err) {
      console.error('Failed to load portfolio result:', err);
      localStorage.removeItem('portfolioData');
    }
  }, []);


  // 2. Callback: Called when UploadArea successfully finishes
  const handleScanComplete = useCallback((result: any) => {
    setPortfolioResult(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  // 3. Callback: Reset
  const handleReset = useCallback(() => {
    setPortfolioResult(null);
    localStorage.removeItem('portfolioData'); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  // Prevent hydration mismatch by not rendering sensitive storage content on server
  if (!isClient) return (
     <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#121212] min-h-screen">
       {/* Loading skeleton or just blank */}
     </section>
  );


  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#121212] min-h-[800px]">
      
      {/* --- NEW BACKGROUND --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      {/* --- END NEW BACKGROUND --- */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Only show headline if we are NOT viewing a result */}
        {!portfolioResult && (
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            
            {/* Badge - Minimalist Dark Theme */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-8 backdrop-blur-sm">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500" />
              </span>
              V2.0 System Ready
            </div>
            
            {/* Main Heading - Monospace & Clean */}
            <h1 className="text-4xl md:text-5xl font-mono text-white mb-6 leading-tight">
              Turn Your Resume Into <br className="hidden md:block" />
              <span 
                className="text-transparent bg-clip-text font-bold"
                style={{
                   backgroundImage: 'linear-gradient(90deg, #FFA585 0%, #B185FF 100%)'
                }}
              >
                 A Personal Website
              </span>
            </h1>


            {/* Subtitle - Muted Gray Monospace */}
            <p className="text-sm md:text-base font-mono text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              // Upload your PDF resume below. <br />
              // We compile a professional portfolio site in seconds. No code required.
            </p>
          </div>
        )}


        {/* CONDITIONAL RENDERING - Container kept neutral for children */}
        <div id="upload" className="transition-all duration-500">
          {portfolioResult ? (
            <ResultCard 
              scanResult={portfolioResult as any} 
              onReset={handleReset} 
            />
          ) : (
            <UploadArea 
              id="upload-area" 
              onScanComplete={handleScanComplete}
            />
          )}
        </div>


        {/* Social Proof - Minimalist Stats */}
        {!portfolioResult && (
          <div className="mt-24 pt-8 border-t border-white/10">
            <p className="text-center text-xs font-mono text-gray-500 uppercase tracking-widest mb-8">
              System Metrics
            </p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-mono font-bold text-white">150+</p>
                <p className="text-[10px] md:text-xs font-mono text-gray-500 mt-1">GENERATED_SITES</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-mono font-bold text-white">&lt; 30s</p>
                <p className="text-[10px] md:text-xs font-mono text-gray-500 mt-1">EXECUTION_TIME</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-mono font-bold text-white">99%</p>
                <p className="text-[10px] md:text-xs font-mono text-gray-500 mt-1">Parsing_Accuracy</p>
              </div>
            </div>
          </div>
        )}


      </div>
    </section>
  );
}
