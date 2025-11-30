'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  RefreshCw, Zap, CheckCircle, Trash2, ExternalLink 
} from 'lucide-react';

// --- IMPORT THE REUSABLE TEMPLATE ---
import PortfolioTemplate from '@/components/portfolio-template/template';

// --- TYPES ---
interface PortfolioData {
  slug: string;
  status?: 'draft' | 'published' | 'deleted';
  personalInfo: {
    fullName: string;
    title: string;
    bio: string;
    location: string;
    email: string;
    socialLinks: { platform: string; url: string }[];
  };
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  projects: {
    title: string;
    description: string;
    techStack: string[];
    link?: string;
  }[];
  skills: string[];
  meta?: {
    originalResumeUrl?: string;
    createdAt?: string;
  };
}

interface ResultCardProps {
  scanResult?: PortfolioData | null;
  file?: File | null;
  onReset: () => void;
}

export default function ResultCard({ scanResult, file, onReset }: ResultCardProps) {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Load Data
  useEffect(() => {
    setMounted(true);
    if (scanResult) {
      setData(scanResult);
    } else {
      // Fallback to LocalStorage
      try {
        const stored = localStorage.getItem("portfolioData");
        if (stored) setData(JSON.parse(stored));
      } catch (e) { console.error(e); }
    }
  }, [scanResult]);

  // Lock Body Scroll
  useEffect(() => {
    if (data) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [data]);

  // --- ACTIONS ---
  const handlePublish = async () => {
    if (!data) return;
    setIsPublishing(true);
    try {
      const res = await fetch('/api/publish-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: data.slug })
      });
      
      if (!res.ok) throw new Error("Failed");
      
      const newData = { ...data, status: 'published' as const };
      setData(newData);
      localStorage.setItem("portfolioData", JSON.stringify(newData));
      
    } catch (err) {
      alert("Publish failed. Please try again.");
      console.error(err);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDiscard = async () => {
    if (!confirm("Are you sure you want to discard this portfolio?")) return;
    
    const slugToDelete = data?.slug;
    localStorage.removeItem("portfolioData");
    onReset(); 
    
    if (slugToDelete) {
      try {
        await fetch('/api/delete-portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: slugToDelete })
        });
      } catch (e) { console.error(e); }
    }
  };

  if (!data || !mounted) return null;

  const isPublished = data.status === 'published';

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-[#0a0f1e] flex flex-col font-sans animate-fade-in">
      
      {/* --- PREVIEW HEADER (Admin Controls Only) --- */}
      <div className="h-16 shrink-0 bg-[#0a0f1e]/95 border-b border-white/10 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-50 shadow-2xl">
        
        {/* Left: Title & Status */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
               <Zap size={18} className="text-blue-400" fill="currentColor" />
            </div>
            <h2 className="text-white font-bold text-lg">
              {isPublished ? "Portfolio Live" : "Draft Preview"}
            </h2>
          </div>
          
          {isPublished && (
             <a 
               href={`/portfolio/${data.slug}`}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-mono bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 transition-colors"
             >
               <span>/{data.slug}</span>
               <ExternalLink size={12} />
             </a>
          )}
        </div>

        {/* Right: Publish / Discard Actions */}
        <div className="flex items-center gap-3">
           {!isPublished ? (
             <>
               <button 
                 onClick={handleDiscard}
                 className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-sm font-medium"
               >
                 <Trash2 size={18} />
                 <span className="hidden sm:inline">Discard</span>
               </button>
               
               <button 
                 onClick={handlePublish}
                 disabled={isPublishing}
                 className={`flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-green-500/20 hover:scale-105 ${isPublishing ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                 {isPublishing ? <RefreshCw size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                 <span>{isPublishing ? "Publishing..." : "Publish Site"}</span>
               </button>
             </>
           ) : (
             <button 
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-lg text-sm font-bold transition-all"
             >
                <RefreshCw size={16} />
                Create New Scan
             </button>
           )}
        </div>
      </div>

      {/* --- MAIN VIEW AREA --- */}
      <div className="flex-1 overflow-y-auto relative bg-[#0a0f1e] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
         <PortfolioTemplate data={data} />
      </div>

    </div>,
    document.body
  );
}
