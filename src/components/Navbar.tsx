import { Target } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Target size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Perfect<span className="text-blue-600">Resume</span>Scan
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            
            <Link href="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition">
              Blog
            </Link>

            <a href="/#faq" className="text-slate-600 hover:text-blue-600 font-medium transition">
              FAQ
            </a>
            <a href="/#features" className="text-slate-600 hover:text-blue-600 font-medium transition">
              Features
            </a>
            <a href="/#sample-resume" className="text-slate-600 hover:text-blue-600 font-medium transition">
              Sample Resume
            </a>
            
            <a
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition shadow-lg shadow-blue-500/30"
            >
              Start Scan
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
