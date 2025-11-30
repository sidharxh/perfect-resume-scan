'use client'

import { Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-[#121212]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* Logo - Neon Glow Style (Matches Footer) */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-1"
          >
            <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
              <div className="absolute inset-0 bg-purple-500 blur-md opacity-20 group-hover:opacity-50 transition-opacity" />
              <div className="relative z-10 w-full h-full bg-[#1a1a1a] border border-white/10 rounded-sm flex items-center justify-center text-white group-hover:text-purple-400 transition-colors">
                <Target size={16} />
              </div>
            </div>
            <span className="font-mono font-bold text-sm sm:text-lg tracking-widest text-white uppercase truncate">
              Perfect<span className="text-purple-400">Resume</span>Scan
            </span>
          </Link>

          {/* Right Side Button - never shrinks */}
          <div className="shrink-0">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <span>BUILD_WEBSITE</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
