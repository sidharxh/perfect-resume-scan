'use client';

import React, { useState, useEffect } from 'react';
import { 
  Github, Linkedin, Mail, ExternalLink, Code2, 
  Briefcase, User, Globe, Terminal, Download, 
  Eye, X, FileText, ChevronDown, Twitter, Instagram, QrCode, Check, Copy
} from 'lucide-react';
import { PortfolioData } from '@/types';

// --- HELPER: URL Fixer ---
const formatUrl = (url: string) => {
  if (!url) return '#';
  if (url.startsWith('http') || url.startsWith('mailto:')) return url;
  return `https://${url}`;
};

// --- COMPONENTS ---

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode; icon: any }) => (
  <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
      {Icon && <Icon size={28} />}
    </div>
    <h2 className="text-3xl font-mono text-gray-200 tracking-tight">{children}</h2>
    <div className="h-px bg-gray-800 flex-grow ml-4"></div>
  </div>
);

// --- WIREFRAME CAGE ---
const WireframeCage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative group w-full h-full">
      <div className="absolute -inset-[20px] z-0 pointer-events-none hidden sm:block">
        <svg className="w-full h-full text-gray-700" width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
           <path 
             d="M 40 0 L 360 0 Q 400 0 400 40 L 400 560 Q 400 600 360 600 L 40 600 Q 0 600 0 560 L 0 40 Q 0 0 40 0" 
             fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"
           />
           <line x1="40" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
           <line x1="360" y1="0" x2="400" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
           <line x1="0" y1="560" x2="40" y2="600" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
           <line x1="400" y1="560" x2="360" y2="600" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
           <line x1="150" y1="0" x2="180" y2="-10" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
           <line x1="250" y1="600" x2="220" y2="610" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>
      <div className="absolute inset-0 border border-gray-800 rounded-3xl sm:hidden pointer-events-none"></div>
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

interface PortfolioTemplateProps {
  data: PortfolioData | null;
}

export default function PortfolioTemplate({ data }: PortfolioTemplateProps) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  // --- TYPE SAFE DESTRUCTURING ---
  const safeData = data || {};
  const slug = (safeData as any).slug; 

  const { 
    personalInfo = { 
      fullName: 'Bobby Newmark', 
      title: 'ASTRAL PROJECTOR', 
      bio: 'Felis eget velit sed lorem sagittis tempus sed amet purus nisl nunc mattis.', 
      location: '', 
      email: 'bobby@example.com', 
      socialLinks: [] 
    }, 
    experience = [], 
    projects = [], 
    skills = [], 
    meta = { originalResumeUrl: '' }
  } = safeData as PortfolioData;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const finalUrl = slug ? `${origin}/portfolio/${slug}` : window.location.href;
      setShareUrl(finalUrl);
    }
  }, [slug]);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const displayName = personalInfo.fullName || "User";
  const displayTitle = personalInfo.title || "Professional";
  const resumeUrl = meta?.originalResumeUrl;
  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(resumeUrl || '')}&embedded=true`;
  
  // QR Code (Themed: Dark BG, Purple FG)
  const qrCodeImageUrl = shareUrl 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(shareUrl)}&bgcolor=1f1f24&color=b07bf7&margin=10&format=png`
    : '';

  // --- DOWNLOAD CARD LOGIC (Canvas) ---
  const handleDownloadCard = async () => {
    if (!qrCodeImageUrl) return;
    setIsDownloading(true);

    try {
      // 1. Create Canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Card Dimensions
      const width = 600;
      const height = 800;
      canvas.width = width;
      canvas.height = height;

      // 2. Draw Background (Cyberpunk Dark)
      ctx.fillStyle = '#1f1f24';
      ctx.fillRect(0, 0, width, height);

      // 3. Draw Border/Accent
      ctx.strokeStyle = '#b07bf7';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, width - 40, height - 40);

      // 4. Draw Text
      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 40px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SCAN TO VIEW', width / 2, 120);

      // Subtitle
      ctx.fillStyle = '#9ca3af';
      ctx.font = '20px monospace';
      ctx.fillText('DIGITAL PORTFOLIO', width / 2, 160);

      // Name
      ctx.fillStyle = '#b07bf7';
      ctx.font = 'bold 32px monospace';
      ctx.fillText(displayName.toUpperCase(), width / 2, height - 120);

      // URL
      ctx.fillStyle = '#6b7280';
      ctx.font = '16px monospace';
      ctx.fillText(shareUrl.replace('https://', ''), width / 2, height - 80);

      // 5. Draw QR Code
      // We need to fetch the image first to avoid taint issues if possible, 
      // though crossOrigin anon usually works with public APIs
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = qrCodeImageUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Draw QR Centered
      const qrSize = 350;
      ctx.drawImage(img, (width - qrSize) / 2, (height - qrSize) / 2 - 20, qrSize, qrSize);

      // 6. Trigger Download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${displayName.replace(/\s+/g, '_')}_Portfolio_QR.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Failed to generate card', error);
      alert('Could not generate image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#18181b] text-gray-300 font-mono selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden relative flex flex-col">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .font-mono { font-family: 'Space Mono', monospace; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; transform: translateY(20px); }
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* --- 1. BACKGROUND: Spaced Out Dots --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div 
           className="absolute inset-0"
           style={{
             backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)',
             backgroundSize: '60px 60px',
             opacity: 0.25 
           }}
         />
      </div>

      <main className="relative z-10 flex-grow flex flex-col items-center pt-12 sm:pt-24 pb-20 px-4">
        
        {/* --- MAIN CARD SECTION --- */}
        <div className="w-full max-w-[600px] animate-fade-in-up">
            <WireframeCage>
              <div className="bg-[#1f1f24] rounded-[32px] p-8 sm:p-16 shadow-2xl relative overflow-hidden border border-white/5 h-full flex flex-col items-center text-center">
                
                {/* Avatar */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 mb-10 rounded-full bg-[#2a2a30] border border-gray-600 flex items-center justify-center relative overflow-hidden self-center">
                   <div className="absolute inset-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full stroke-gray-600 stroke-1 opacity-50">
                         <line x1="0" y1="0" x2="100" y2="100" />
                         <line x1="100" y1="0" x2="0" y2="100" />
                      </svg>
                   </div>
                   <span className="text-3xl sm:text-4xl font-bold text-gray-500 relative z-10">
                      {displayName.charAt(0)}
                   </span>
                </div>

                {/* Title & Name */}
                <h3 className="text-sm tracking-[0.25em] font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#ffae75] to-[#b07bf7] mb-4">
                  {displayTitle}
                </h3>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-8 tracking-tight break-words w-full leading-tight">
                  {displayName}
                </h1>

                {/* Bio */}
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-12 max-w-md mx-auto">
                  {personalInfo.bio}
                </p>

                {/* --- ACTION BUTTONS --- */}
                <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
                    
                    {/* ROW 1: Resume Button */}
                    {resumeUrl && (
                        <button 
                        onClick={() => setShowResumeModal(true)}
                        className="group flex items-center gap-4 pl-2 pr-6 py-2 bg-white/5 border border-white/10 rounded-full hover:border-[#b07bf7]/50 transition-all w-full"
                        >
                            <div className="w-12 h-12 flex items-center justify-center rounded-full text-white shrink-0 shadow-lg" style={{ background: 'linear-gradient(135deg, #ffae75, #b07bf7)' }}>
                                <Eye size={20} />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] text-gray-500 uppercase tracking-wider leading-none mb-1">Document</span>
                                <span className="text-lg font-bold text-gray-200 group-hover:text-white">View Resume</span>
                            </div>
                        </button>
                    )}

                    {/* ROW 2: QR + Email */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        
                        {/* QR Code */}
                        <button 
                        onClick={() => setShowQRModal(true)}
                        className="group flex-1 flex items-center gap-3 pl-2 pr-4 py-2 bg-white/5 border border-white/10 rounded-full hover:border-[#ffae75]/50 transition-all"
                        >
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full text-gray-300 group-hover:text-white shrink-0">
                                <QrCode size={18} />
                            </div>
                            <div className="flex flex-col items-start overflow-hidden">
                                <span className="text-[9px] text-gray-500 uppercase tracking-wider leading-none mb-0.5">Share</span>
                                <span className="text-sm font-bold text-gray-300 group-hover:text-white">QR Code</span>
                            </div>
                        </button>

                        {/* Email */}
                        {personalInfo.email && (
                            <button 
                            onClick={() => handleCopyEmail(personalInfo.email)}
                            className="group flex-1 flex items-center gap-3 pl-2 pr-4 py-2 bg-white/5 border border-white/10 rounded-full hover:border-[#ffae75]/50 transition-all overflow-hidden"
                            >
                                <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full text-gray-300 group-hover:text-white shrink-0">
                                    {emailCopied ? <Check size={18} className="text-green-400"/> : <Copy size={18} />}
                                </div>
                                <div className="flex flex-col items-start min-w-0 w-full">
                                    <span className="text-[9px] text-gray-500 uppercase tracking-wider leading-none mb-0.5">
                                        {emailCopied ? 'Copied!' : 'Email'}
                                    </span>
                                    <span className="text-sm font-mono text-gray-300 group-hover:text-white truncate w-full text-left">
                                        {personalInfo.email}
                                    </span>
                                </div>
                            </button>
                        )}
                    </div>
                </div>

                {/* --- SOCIAL ICONS --- */}
                {personalInfo.socialLinks.length > 0 && (
                  <>
                    <div className="w-full h-px bg-white/10 mt-16 mb-10"></div>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      {personalInfo.socialLinks.map((social, idx) => {
                        const lowerUrl = social.url.toLowerCase();
                        let Icon = Globe;
                        let label = "WEBSITE";

                        if (lowerUrl.includes('github')) { Icon = Github; label = 'GITHUB'; }
                        else if (lowerUrl.includes('linkedin')) { Icon = Linkedin; label = 'LINKEDIN'; }
                        else if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) { Icon = Twitter; label = 'X / TWITTER'; }
                        else if (lowerUrl.includes('instagram')) { Icon = Instagram; label = 'INSTAGRAM'; }
                        else if (social.platform) { label = social.platform.toUpperCase(); }

                        return (
                          <a 
                            key={idx} 
                            href={formatUrl(social.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 pl-3 pr-5 py-2 bg-white/5 border border-white/10 rounded-full hover:border-[#b07bf7]/50 transition-all hover:scale-105"
                          >
                            <Icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                            <span className="text-xs font-bold text-gray-400 group-hover:text-white tracking-wider">
                              {label}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </>
                )}

              </div>
            </WireframeCage>
        </div>

        <div className="mt-20 animate-bounce opacity-30 text-gray-500">
          <ChevronDown size={32} />
        </div>

        {/* --- SECTIONS --- */}
        <div className="w-full max-w-5xl mt-24 space-y-32">
          
          {skills.length > 0 && (
              <section>
                <SectionTitle icon={Terminal}>Technical Arsenal</SectionTitle>
                <div className="border border-gray-800 bg-[#1f1f24] p-8 rounded-2xl relative">
                    <div className="flex flex-wrap gap-4">
                    {skills.map((skill, idx) => (
                        <span key={idx} className="px-4 py-2 bg-[#2a2a30] text-gray-300 text-sm font-bold uppercase tracking-wider rounded-lg border border-gray-700 hover:border-gray-500 transition-colors cursor-default">
                        {skill}
                        </span>
                    ))}
                    </div>
                </div>
              </section>
          )}

          {projects.length > 0 && (
              <section>
                <SectionTitle icon={Code2}>Selected Works</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                    <div key={idx} className="group bg-[#1f1f24] border border-gray-800 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                         <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xl font-bold text-gray-100 group-hover:text-[#b07bf7] transition-colors">{project.title}</h3>
                            {project.link && (
                                <a href={formatUrl(project.link)} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-white transition-colors">
                                    <ExternalLink size={20} />
                                </a>
                            )}
                         </div>
                         <p className="text-gray-400 text-base mb-8 leading-relaxed">{project.description}</p>
                         <div className="flex flex-wrap gap-3 mt-auto">
                            {project.techStack?.slice(0,4).map((tag, tIdx) => (
                                <span key={tIdx} className="text-xs font-bold uppercase text-purple-400/80 bg-purple-900/10 px-3 py-1.5 rounded">{tag}</span>
                            ))}
                         </div>
                    </div>
                ))}
                </div>
              </section>
          )}

          {/* --- EXPERIENCE SECTION (Wrapped in Box) --- */}
          {experience.length > 0 && (
              <section>
                <SectionTitle icon={Briefcase}>Experience</SectionTitle>
                <div className="border border-gray-800 bg-[#1f1f24] p-8 rounded-2xl relative">
                    <div className="border-l border-gray-800 ml-2 space-y-12">
                        {experience.map((job, idx) => (
                            <div key={idx} className="relative pl-10 group">
                                <div className="absolute left-[-6px] top-2.5 w-3 h-3 rounded-full bg-[#18181b] border-2 border-gray-600 group-hover:border-[#ffae75] transition-colors"></div>
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
                                    <h3 className="text-2xl font-bold text-gray-100">{job.title}</h3>
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{job.period}</span>
                                </div>
                                <div className="text-[#b07bf7] font-bold text-base mb-4">{job.company}</div>
                                <p className="text-gray-400 leading-relaxed text-base">{job.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
              </section>
          )}

        </div>

        <footer className="mt-40 border-t border-gray-800/50 pt-16 text-center w-full">
          <p className="text-gray-600 text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} {displayName}. All rights reserved.
          </p>
        </footer>

      </main>

      {/* --- RESUME MODAL --- */}
      {resumeUrl && (
        <div 
          className={`fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 transition-all duration-300 ${
            showResumeModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className={`bg-[#1f1f24] w-full max-w-5xl h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-gray-700 transition-all duration-300 transform ${
              showResumeModal ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
            }`}
          >
            <div className="px-6 py-4 border-b border-white/5 bg-[#18181b] flex items-center justify-between shrink-0 h-[72px]">
              <div className="flex items-center gap-3 overflow-hidden">
                  <FileText size={20} className="text-[#b07bf7] shrink-0" />
                  <h3 className="font-bold text-gray-200 text-lg tracking-tight truncate max-w-[200px] sm:max-w-none">
                    <span className="text-white">{displayName}</span> 
                    <span className="text-gray-600 mx-2 hidden sm:inline">//</span> 
                    <span className="text-[#ffae75] hidden sm:inline">{displayTitle}</span>
                  </h3>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a 
                  href={resumeUrl} 
                  download 
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                  style={{ background: 'linear-gradient(90deg, #ffae75 0%, #b07bf7 100%)' }}
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button 
                  onClick={() => setShowResumeModal(false)} 
                  className="p-2 hover:bg-white/10 rounded-full text-gray-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="flex-1 relative w-full bg-[#2a2a30] overflow-hidden">
              <iframe 
                 src={viewerUrl} 
                 className={`absolute inset-0 w-full h-full border-0 block ${showResumeModal ? 'visible' : 'invisible'}`}
                 title="Resume Preview"
                 loading="eager"
              />
            </div>
          </div>
        </div>
      )}

      {/* --- QR CODE MODAL (Updated) --- */}
      <div 
          className={`fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 ${
            showQRModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className={`bg-[#1f1f24] w-full max-w-sm rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl border border-gray-700 transition-all duration-300 transform ${
              showQRModal ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-[#2a2a30] flex items-center justify-center mb-6 border border-white/10">
                <QrCode size={32} className="text-[#b07bf7]" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Scan to Share</h3>
            <p className="text-gray-400 text-xs mb-8 px-4">
                Share this portfolio instantly by scanning the code below.
            </p>

            {/* QR Container: Transparent/Dark background (No white box) */}
            <div className="p-2 bg-[#2a2a30] border border-white/5 rounded-2xl mb-8 min-h-[240px] flex items-center justify-center">
                {shareUrl ? (
                    <img 
                        src={qrCodeImageUrl} 
                        alt="Portfolio QR Code" 
                        className="w-56 h-56"
                    />
                ) : (
                    <div className="w-48 h-48 flex items-center justify-center text-gray-400 animate-pulse">
                        Loading...
                    </div>
                )}
            </div>

            <div className="w-full flex flex-col gap-3">
                {/* DOWNLOAD BUTTON (Button Shape) */}
                <button 
                    onClick={handleDownloadCard}
                    disabled={isDownloading}
                    className="w-full py-3 rounded-full font-bold text-white text-sm transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(90deg, #ffae75 0%, #b07bf7 100%)' }}
                >
                    {isDownloading ? 'Generating...' : (
                      <>
                        <Download size={16} />
                        Download Card
                      </>
                    )}
                </button>

                {/* CLOSE BUTTON (Button Shape, Different Color) */}
                <button 
                    onClick={() => setShowQRModal(false)}
                    className="w-full py-3 rounded-full font-bold text-gray-300 text-sm transition-all hover:bg-white/10 border border-white/10 flex items-center justify-center"
                >
                    Close Window
                </button>
            </div>
          </div>
      </div>

    </div>
  );
}
