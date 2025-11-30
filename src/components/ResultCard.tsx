'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  RefreshCw, Zap, CheckCircle, Trash2, ExternalLink, Copy, Check
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
  const [copied, setCopied] = useState(false);

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

  const handleCopyUrl = () => {
    if (!data?.slug) return;
    const url = `${window.location.origin}/portfolio/${data.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data || !mounted) return null;

  const isPublished = data.status === 'published';

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-[#0a0f1e] flex flex-col font-sans animate-fade-in">

      {/* --- HEADER SECTION (Updated Theme & UX) --- */}
      <div className="h-auto min-h-[64px] shrink-0 bg-[#121212] border-b border-white/10 shadow-2xl px-4 py-3 md:px-6 md:py-0 z-50">
        <div className="h-full flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">

          {/* Left: Status & Info */}
          <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md border ${isPublished ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-purple-500/10 border-purple-500/20 text-purple-400'}`}>
                {isPublished ? <CheckCircle size={18} /> : <Zap size={18} />}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">System Status</span>
                <span className="text-sm md:text-base font-bold text-white">
                  {isPublished ? "LIVE_DEPLOYMENT" : "PREVIEW_MODE"}
                </span>
              </div>
            </div>

            {/* Mobile Only: Close Button (Discard) for easy exit */}
            {!isPublished && (
              <button
                onClick={handleDiscard}
                className="md:hidden p-2 text-gray-400 hover:text-red-400 transition-colors"
                title="Discard"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          {/* Right: Actions (Responsive) */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">

            {!isPublished ? (
              // DRAFT STATE ACTIONS
              <>
                <button
                  onClick={handleDiscard}
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all text-sm font-mono"
                >
                  <Trash2 size={16} />
                  <span>DISCARD</span>
                </button>

                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black rounded-lg font-mono font-bold text-sm transition-all hover:bg-gray-200 active:scale-95 ${isPublishing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isPublishing ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                  <span>{isPublishing ? "DEPLOYING..." : "PUBLISH_SITE"}</span>
                </button>
              </>
            ) : (
              // PUBLISHED STATE ACTIONS
              <div className="flex flex-col sm:flex-row w-full gap-2 md:gap-3">

                {/* Copy URL Button */}
                <button
                  onClick={handleCopyUrl}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-white/10 hover:border-purple-500/50 text-gray-300 hover:text-white rounded-lg transition-all text-sm font-mono group"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  <span>{copied ? "COPIED!" : "COPY_URL"}</span>
                </button>

                {/* Visit Site Button */}
                <a
                  href={`/portfolio/${data.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg shadow-lg shadow-purple-500/20 font-mono font-bold text-sm transition-transform hover:-translate-y-0.5 active:scale-95"
                >
                  <span>VISIT_SITE</span>
                  <ExternalLink size={14} />
                </a>

                {/* Create New Button (Redesigned) */}
                <button
                  onClick={onReset}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-transparent border border-white/20 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all text-sm font-mono group"
                >
                  <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                  <span>NEW_SCAN</span>
                </button>

              </div>
            )}
          </div>
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
