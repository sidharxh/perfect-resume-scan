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
     <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 min-h-screen">
       {/* Loading skeleton or just blank */}
     </section>
  );

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 min-h-[800px]">
      {/* Soft radial gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-blue-200/60 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 w-96 h-96 rounded-full bg-purple-200/60 blur-3xl" />
      </div>

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="h-full w-full bg-[linear-gradient(to_right,_rgba(148,163,184,0.5)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(148,163,184,0.35)_1px,_transparent_1px)] bg-[size:38px_38px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Only show headline if we are NOT viewing a result (optional, cleaner UI) */}
        {!portfolioResult && (
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Instant Portfolio Generator
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Turn Your Resume Into <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                 A Personal Website
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Upload your PDF resume and get a professionally designed, SEO-friendly portfolio website in seconds. No coding required.
            </p>
          </div>
        )}

        {/* CONDITIONAL RENDERING */}
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

        {/* Social Proof - Hide when viewing result to minimize noise */}
        {!portfolioResult && (
          <div className="mt-16 pt-8 border-t border-slate-200/80">
            <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Trusted by developers & professionals
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-6">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-slate-900">2,400+</p>
                <p className="text-xs md:text-sm text-slate-500">Portfolios Generated</p>
              </div>
              <div className="h-10 w-px bg-slate-200 hidden md:block" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-slate-900">&lt; 30s</p>
                <p className="text-xs md:text-sm text-slate-500">Average Build Time</p>
              </div>
              <div className="h-10 w-px bg-slate-200 hidden md:block" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-slate-900">100%</p>
                <p className="text-xs md:text-sm text-slate-500">Free to Use</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
