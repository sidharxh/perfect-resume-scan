'use client';

import React, { useState, useEffect } from 'react';
import { Target, Menu, X } from 'lucide-react';

interface NavbarProps {
  scrollToUpload: () => void;
}

export default function Navbar({ scrollToUpload }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-slate-200' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Target size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Perfect<span className="text-blue-600">Resume</span>Scan
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 font-medium transition scroll-smooth">How it Works</a>
            <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium transition scroll-smooth">Features</a>
            <a href="#pricing" className="text-slate-600 hover:text-blue-600 font-medium transition scroll-smooth">Pricing</a>
            <button 
              onClick={scrollToUpload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition shadow-lg shadow-blue-500/30"
            >
              Start Scan
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-slate-900 focus:outline-none">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md scroll-smooth">How it Works</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md scroll-smooth">Features</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md scroll-smooth">Pricing</a>
            <div className="border-t border-slate-100 my-2"></div>
            <button 
              onClick={() => { scrollToUpload(); setIsMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-blue-600 font-bold hover:bg-slate-50 rounded-md"
            >
              Start Scan
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
