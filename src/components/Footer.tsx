import React from 'react';
import { Target, Twitter, Linkedin, Facebook } from 'lucide-react';

interface FooterProps {
  scrollToUpload: () => void;
}

export default function Footer({ scrollToUpload }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs flex-shrink-0">
                <Target size={14} />
              </div>
              <span className="font-bold text-lg text-slate-900 whitespace-nowrap">
                Perfect<span className="text-blue-600">Resume</span>Scan
              </span>
            </div>
            <p className="text-slate-500 text-sm">Optimizing careers, one keyword at a time.</p>
          </div>
          
          {/* Navigation Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#faq" className="hover:text-blue-600 scroll-smooth">FAQ</a></li>
              <li><a href="#features" className="hover:text-blue-600 scroll-smooth">Features</a></li>
              <li><a href="#sample-resume" className="hover:text-blue-600 scroll-smooth">Sample Resume</a></li>
            </ul>
          </div>
          
          {/* Product/Action Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button onClick={scrollToUpload} className="hover:text-blue-600 text-left transition-colors">
                  Resume Scanner
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© 2025 PerfectResumeScan.com. All rights reserved.</p>
          <div className="flex gap-4 text-slate-400">
            <a href="#" className="hover:text-blue-600"><Twitter size={20} /></a>
            <a href="#" className="hover:text-blue-600"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-blue-600"><Facebook size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
