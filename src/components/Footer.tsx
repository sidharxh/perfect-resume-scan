// components/Footer.jsx
import Link from 'next/link';
import { Target, Twitter, Linkedin, Mail, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#121212] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Brand Column */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            
            {/* Logo + Blog Pill */}
            <div className="flex items-center gap-3 group mb-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
                  <div className="absolute inset-0 bg-purple-500 blur-md opacity-20 group-hover:opacity-50 transition-opacity" />
                  <div className="relative z-10 w-full h-full bg-[#1a1a1a] border border-white/10 rounded-sm flex items-center justify-center text-white group-hover:text-purple-400 transition-colors">
                    <Target size={16} />
                  </div>
                </div>
                
                <span className="font-mono font-bold text-lg tracking-widest text-white uppercase">
                  Perfect<span className="text-purple-400">Resume</span>Scan
                </span>
              </Link>

              {/* Vertical Divider */}
              <span className="hidden sm:inline-block text-gray-600">|</span>

              {/* BLOG pill */}
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-mono uppercase tracking-widest text-gray-300 hover:text-white hover:border-purple-500/50 bg-white/5 hover:bg-purple-500/10 transition-colors"
              >
                <BookOpen size={12} className="text-purple-400" />
                <span>BLOG</span>
              </Link>
            </div>

            <p className="text-gray-500 font-mono text-sm max-w-xs mx-auto md:mx-0">
              // Compiling static resumes into dynamic portfolios. System operational.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6">
            <a 
              href="https://twitter.com/sidharxhh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors transform hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/sidharth-singh-867189160/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:sid.cse19@gmail.com" 
              className="text-gray-500 hover:text-white transition-colors transform hover:scale-110"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Copyright / Legal Links */}
        <div className="border-t border-white/5 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="text-[10px] md:text-xs font-mono text-gray-600 uppercase tracking-wider text-center md:text-left">
            © 2025 PerfectResumeScan. ALL_RIGHTS_RESERVED.
          </p>
          
          {/* REQUIRED RAZORPAY LINKS */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] md:text-xs font-mono text-gray-600 uppercase tracking-wider">
            <Link href="/legal/privacy-policy" className="hover:text-white transition-colors">
              Privacy_Policy
            </Link>
            <Link href="/legal/terms-and-conditions" className="hover:text-white transition-colors">
              Terms_&_Conditions
            </Link>
            <Link href="/legal/refund-policy" className="hover:text-white transition-colors">
              Refund_Policy
            </Link>
             <Link href="/legal/shipping-policy" className="hover:text-white transition-colors">
              Shipping
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact_Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
