'use client' // Required for useState

import { useState } from 'react';
import { Target, Menu, X } from 'lucide-react'; // Import Menu and X icons
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Target size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Perfect<span className="text-blue-600">Resume</span>Scan
            </span>
          </Link>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition">Blog</Link>
            <a href="/#faq" className="text-slate-600 hover:text-blue-600 font-medium transition">FAQ</a>
            <a href="/#features" className="text-slate-600 hover:text-blue-600 font-medium transition">Features</a>
            <a href="/#sample-resume" className="text-slate-600 hover:text-blue-600 font-medium transition">Sample Resume</a>
            <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition shadow-lg shadow-blue-500/30">Start Scan</a>
          </div>

          {/* Mobile Menu Button (Visible ONLY on Mobile) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
            <Link 
              href="/blog" 
              className="block px-3 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <a 
              href="/#faq" 
              className="block px-3 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </a>
            <a 
              href="/#features" 
              className="block px-3 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a 
              href="/#sample-resume" 
              className="block px-3 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              Sample Resume
            </a>
            <div className="pt-4">
              <a
                href="/"
                className="block w-full text-center bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                onClick={() => setIsOpen(false)}
              >
                Start Scan
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
