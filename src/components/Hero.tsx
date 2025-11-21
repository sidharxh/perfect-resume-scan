'use client';

import React, { RefObject } from 'react';
import UploadArea from './UploadArea';

interface HeroProps {
  uploadRef: RefObject<HTMLDivElement>;
}

export default function Hero({ uploadRef }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-300 filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-80 h-80 rounded-full bg-purple-300 filter blur-3xl opacity-40 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Over 500 resumes scanned this week
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Is your resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ATS-Proof?</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
            Stop getting rejected by bots. Get an instant score, keyword analysis, and actionable feedback to land more interviews.
          </p>
        </div>

        <div ref={uploadRef}>
          <UploadArea id="upload-area" />
        </div>

        {/* Social Proof */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Trusted by job seekers from</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <span className="flex items-center font-bold text-xl text-slate-700"><span className="text-blue-500">G</span>oogle</span>
            <span className="flex items-center font-bold text-xl text-slate-700"><span className="text-orange-500">a</span>mazon</span>
            <span className="flex items-center font-bold text-xl text-slate-700"><span className="text-cyan-500">M</span>icrosoft</span>
            <span className="flex items-center font-bold text-xl text-slate-700"><span className="text-green-500">S</span>potify</span>
          </div>
        </div>
      </div>
    </section>
  );
}
