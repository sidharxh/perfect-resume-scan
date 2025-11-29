'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, ExternalLink, Download, FileText, Briefcase, 
  Code2, User, Globe, Cpu, RefreshCw, Zap, CheckCircle, Trash2, Palette 
} from 'lucide-react';

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
  };
}

interface ResultCardProps {
  scanResult?: PortfolioData | null;
  file?: File | null;
  onReset: () => void;
}

// --- THEMES CONFIG ---
const THEMES = {
  FUTURISTIC: 'futuristic',
  MINIMAL: 'minimal',
  CREATIVE: 'creative',
} as const;

type Theme = typeof THEMES[keyof typeof THEMES];

const getThemeStyles = (theme: Theme) => {
  switch (theme) {
    case THEMES.MINIMAL:
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-900',
        cardBg: 'bg-white border border-slate-200 shadow-sm',
        headerBg: 'bg-white/80 border-b border-slate-200',
        accent: 'text-blue-600',
        accentBg: 'bg-blue-600',
        secondaryText: 'text-slate-500',
        buttonSecondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
      };
    case THEMES.CREATIVE:
      return {
        bg: 'bg-[#1a1a1a]',
        text: 'text-white',
        cardBg: 'bg-[#252525] border border-white/10 hover:border-purple-500/50 transition-colors',
        headerBg: 'bg-[#1a1a1a]/90 border-b border-white/10',
        accent: 'text-purple-400',
        accentBg: 'bg-purple-600',
        secondaryText: 'text-gray-400',
        buttonSecondary: 'bg-white/10 text-white hover:bg-white/20',
      };
    case THEMES.FUTURISTIC:
    default:
      return {
        bg: 'bg-[#0a0f1e]',
        text: 'text-white',
        cardBg: 'bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20',
        headerBg: 'bg-[#0a0f1e]/90 border-b border-white/10',
        accent: 'text-blue-400',
        accentBg: 'bg-blue-600',
        secondaryText: 'text-gray-400',
        buttonSecondary: 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5',
      };
  }
};

const styleSheet = `
  @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
  @keyframes orbit { from { transform: rotate(0deg) translateX(140px) rotate(0deg); } to { transform: rotate(360deg) translateX(140px) rotate(-360deg); } }
  @keyframes orbit-reverse { from { transform: rotate(360deg) translateX(90px) rotate(-360deg); } to { transform: rotate(0deg) translateX(90px) rotate(0deg); } }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;

export default function ResultCard({ scanResult, file, onReset }: ResultCardProps) {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES.FUTURISTIC);
  
  // Action States
  const [isPublishing, setIsPublishing] = useState(false);

  // Load Data
  useEffect(() => {
    setMounted(true);
    if (scanResult) {
      setData(scanResult);
    } else {
      // Fallback to LocalStorage (useful for refreshes)
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

  const toggleTheme = () => {
    if (currentTheme === THEMES.FUTURISTIC) setCurrentTheme(THEMES.MINIMAL);
    else if (currentTheme === THEMES.MINIMAL) setCurrentTheme(THEMES.CREATIVE);
    else setCurrentTheme(THEMES.FUTURISTIC);
  };

  // --- PUBLISH ACTION ---
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

  // --- DISCARD ACTION ---
  const handleDiscard = async () => {
    if (!confirm("Are you sure you want to discard this portfolio?")) return;
    
    const slugToDelete = data?.slug;
    
    // 1. Clear UI Immediately
    localStorage.removeItem("portfolioData");
    onReset(); 
    
    // 2. Sync with Backend (Background)
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

  const styles = getThemeStyles(currentTheme);
  const isPublished = data.status === 'published';
  
  // Resume Preview Logic: Prefer published URL, fallback to local blob if draft
  const resumePreviewUrl = isPublished && data.meta?.originalResumeUrl 
    ? data.meta.originalResumeUrl 
    : (file ? URL.createObjectURL(file) : null);

  return createPortal(
    <div className={`fixed inset-0 z-[9999] ${styles.bg} ${styles.text} overflow-hidden font-sans transition-colors duration-500`}>
      <style>{styleSheet}</style>

      {/* --- BACKGROUND EFFECTS --- */}
      {currentTheme === THEMES.FUTURISTIC && (
        <>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}
      {currentTheme === THEMES.CREATIVE && (
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      )}

      {/* --- HEADER --- */}
      <div className={`absolute top-0 left-0 right-0 h-20 ${styles.headerBg} backdrop-blur-md z-50 flex items-center justify-between px-6 md:px-10 transition-colors duration-500`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${styles.accentBg} rounded-xl flex items-center justify-center shadow-lg`}>
            <Zap className="text-white w-6 h-6" fill="currentColor" />
          </div>
          <div className="hidden md:block">
            <h1 className={`font-bold text-lg tracking-tight leading-none ${styles.text}`}>
              {isPublished ? "Portfolio Live" : "Draft Preview"}
            </h1>
            <p className={`text-[10px] ${styles.secondaryText} uppercase tracking-widest`}>
               {isPublished ? "Publicly Accessible" : "Not Saved Yet"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
           {/* Theme Switcher */}
           <button 
             onClick={toggleTheme} 
             className={`p-2.5 ${styles.buttonSecondary} rounded-xl transition-all hover:scale-105`}
             title="Switch Theme"
           >
             <Palette size={18} />
           </button>

           {/* Action Buttons */}
           {!isPublished ? (
             <>
               <button 
                 onClick={handleDiscard}
                 className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl text-sm font-medium transition-all border border-red-500/20"
               >
                 <Trash2 size={16} />
                 <span className="hidden sm:inline">Discard</span>
               </button>
               
               <button 
                 onClick={handlePublish}
                 disabled={isPublishing}
                 className={`flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg hover:scale-105 ${isPublishing ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                 {isPublishing ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                 <span>{isPublishing ? "Publishing..." : "Publish Website"}</span>
               </button>
             </>
           ) : (
             <>
                <button 
                    onClick={onReset}
                    className={`flex items-center gap-2 px-4 py-2.5 ${styles.buttonSecondary} rounded-xl text-sm font-medium`}
                >
                    <RefreshCw size={16} />
                    <span className="hidden sm:inline">New Scan</span>
                </button>
                <a 
                    href={`/portfolio/${data.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-6 py-2.5 ${styles.accentBg} text-white hover:opacity-90 rounded-xl text-sm font-bold transition-all shadow-lg hover:scale-105`}
                >
                    <span>Visit Live Site</span>
                    <ExternalLink size={16} />
                </a>
             </>
           )}
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="absolute top-20 bottom-0 left-0 right-0 overflow-y-auto scrollbar-hide p-6 md:p-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`${styles.cardBg} rounded-3xl p-8 relative overflow-hidden group`}>
              <div className="relative z-10">
                <div className={`w-20 h-20 ${styles.accentBg} rounded-2xl mb-6 flex items-center justify-center shadow-xl`}>
                  <span className="text-3xl font-bold text-white">{data.personalInfo.fullName.charAt(0)}</span>
                </div>
                <h1 className={`text-3xl font-bold ${styles.text} mb-2 leading-tight`}>{data.personalInfo.fullName}</h1>
                <p className={`text-lg ${styles.accent} font-medium mb-6`}>{data.personalInfo.title}</p>
                <p className={`${styles.secondaryText} text-sm leading-relaxed mb-8 line-clamp-4`}>{data.personalInfo.bio}</p>
                
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setShowResumeModal(true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 ${styles.buttonSecondary} rounded-xl text-sm font-semibold transition-all`}
                  >
                    <FileText size={16} />
                    Original Resume
                  </button>
                  {data.personalInfo.socialLinks.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" className={`p-3 ${styles.buttonSecondary} rounded-xl transition-all hover:text-blue-400`}>
                       <Globe size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Skill Chart */}
            <div className={`${styles.cardBg} rounded-3xl p-6 relative overflow-hidden`}>
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <Cpu size={18} className={styles.accent} />
                  <h3 className={`font-bold ${styles.text}`}>Skill Analysis</h3>
               </div>
               <div className="relative h-48 w-full flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                     <polygon points="50,5 95,27 95,72 50,95 5,72 5,27" fill="none" stroke={currentTheme === THEMES.MINIMAL ? '#cbd5e1' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />
                     <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke={currentTheme === THEMES.MINIMAL ? '#cbd5e1' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />
                     <polygon points="50,10 90,30 85,70 50,85 15,60 30,30" fill={currentTheme === THEMES.MINIMAL ? 'rgba(37,99,235,0.1)' : 'rgba(139, 92, 246, 0.3)'} stroke={currentTheme === THEMES.MINIMAL ? '#2563eb' : '#8b5cf6'} strokeWidth="2" className="animate-float" />
                  </svg>
               </div>
            </div>
          </div>

          {/* CENTER COLUMN */}
          <div className="lg:col-span-5 space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-6">
                 <div className={`p-2 ${styles.accentBg} bg-opacity-20 rounded-lg`}>
                   <Briefcase size={20} className={styles.accent} />
                 </div>
                 <h2 className={`text-xl font-bold ${styles.text}`}>Experience</h2>
              </div>
              <div className={`space-y-6 relative pl-4 border-l ${currentTheme === THEMES.MINIMAL ? 'border-slate-200' : 'border-white/10'}`}>
                {data.experience.map((job, i) => (
                  <div key={i} className="relative group">
                    <div className={`absolute -left-[21px] top-0 w-3 h-3 ${styles.accentBg} rounded-full ring-4 ${currentTheme === THEMES.MINIMAL ? 'ring-white' : 'ring-[#0a0f1e]'} group-hover:scale-125 transition-transform duration-300`} />
                    <div className={`${styles.cardBg} rounded-2xl p-6 transition-all hover:translate-x-1`}>
                      <h3 className={`text-lg font-bold ${styles.text}`}>{job.title}</h3>
                      <div className={`flex justify-between text-sm ${styles.accent} mt-1 mb-3 font-medium`}>
                        <span>{job.company}</span>
                        <span>{job.period}</span>
                      </div>
                      <p className={`text-sm ${styles.secondaryText} leading-relaxed`}>{job.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                 <div className={`p-2 ${styles.accentBg} bg-opacity-20 rounded-lg`}>
                   <Code2 size={20} className={styles.accent} />
                 </div>
                 <h2 className={`text-xl font-bold ${styles.text}`}>Projects</h2>
              </div>
              <div className="grid gap-4">
                {data.projects.map((project, i) => (
                  <div key={i} className={`${styles.cardBg} rounded-2xl p-6 transition-all hover:translate-y-[-2px]`}>
                    <div className="flex justify-between items-start mb-2">
                       <h3 className={`text-lg font-bold ${styles.text}`}>{project.title}</h3>
                       {project.link && (
                         <a href={project.link} target="_blank" className={`${styles.secondaryText} hover:${styles.accent}`}>
                           <ExternalLink size={14} />
                         </a>
                       )}
                    </div>
                    <p className={`text-sm ${styles.secondaryText} mb-4 line-clamp-2`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech, t) => (
                        <span key={t} className={`px-2 py-1 ${currentTheme === THEMES.MINIMAL ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-black/30 border-white/5 text-gray-300'} rounded text-xs font-mono border`}>{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN (Interactive Visuals) */}
          <div className="lg:col-span-3 relative min-h-[400px] lg:min-h-auto hidden lg:block">
            <div className="sticky top-8 flex flex-col justify-center items-center">
              <div className="relative w-[300px] h-[300px] flex items-center justify-center scale-90 lg:scale-100">
                <div className={`absolute w-24 h-24 ${styles.accentBg} rounded-full blur-[30px] opacity-60 animate-pulse`} />
                <div className={`absolute w-20 h-20 ${currentTheme === THEMES.MINIMAL ? 'bg-white border-slate-200' : 'bg-[#0a0f1e] border-white/20'} border rounded-full flex items-center justify-center z-10 shadow-2xl`}>
                   <User size={32} className={currentTheme === THEMES.MINIMAL ? 'text-slate-700' : 'text-white'} />
                </div>
                
                <div className={`absolute w-[280px] h-[280px] border ${currentTheme === THEMES.MINIMAL ? 'border-slate-200' : 'border-white/5'} rounded-full`} />
                
                {/* Rotating Skills */}
                <div className="absolute inset-0 animate-[orbit_25s_linear_infinite]">
                   {data.skills.slice(0, 5).map((skill, i) => {
                     const angle = (i / 5) * 360;
                     return (
                       <div key={i} className="absolute top-1/2 left-1/2 -ml-4 -mt-4" style={{ transform: `rotate(${angle}deg) translateX(140px) rotate(-${angle}deg)` }}>
                         <div className={`px-3 py-1.5 ${currentTheme === THEMES.MINIMAL ? 'bg-white border-slate-200 text-slate-700' : 'bg-[#0a0f1e]/80 border-blue-500/30 text-blue-200'} backdrop-blur-md border rounded-full text-[10px] font-bold whitespace-nowrap shadow-sm`}>
                           {skill}
                         </div>
                       </div>
                     );
                   })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- RESUME MODAL --- */}
       {showResumeModal && (
        <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-float relative">
            <div className="px-6 py-4 border-b flex items-center justify-between bg-slate-50 text-slate-900">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <FileText size={20} className="text-blue-600" />
                  Original Resume
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {data.meta?.originalResumeUrl && (
                  <a href={data.meta.originalResumeUrl} download className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-lg text-sm font-semibold transition-colors">
                    <Download size={16} />
                    Download
                  </a>
                )}
                <button onClick={() => setShowResumeModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={24} className="text-slate-500" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-200 relative">
              {resumePreviewUrl ? (
                <iframe 
                   src={
                     (resumePreviewUrl.endsWith('.pdf') || resumePreviewUrl.startsWith('blob:'))
                       ? `${resumePreviewUrl}#toolbar=0` 
                       : `https://docs.google.com/gview?url=${encodeURIComponent(resumePreviewUrl)}&embedded=true`
                   } 
                   className="w-full h-full border-0" 
                   title="Document Viewer" 
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">Resume file not available.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
