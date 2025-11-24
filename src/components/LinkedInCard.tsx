'use client'

import { useState } from 'react'
import { Linkedin, TrendingUp, Sparkles, Check, Copy } from 'lucide-react'

interface CardConfig {
  text: string;
  visualQuote: string;
  badgeLabel?: string;
}

export default function LinkedInCard({ config, url }: { config: CardConfig, url: string }) {
  const [copiedShare, setCopiedShare] = useState(false)

  const handleShare = () => {
    const shareText = config.text
    navigator.clipboard.writeText(shareText)
    setCopiedShare(true)
    window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`, '_blank')
    setTimeout(() => setCopiedShare(false), 3000)
  }

  return (
    <div className="w-full"> {/* Removed fixed widths/margins for responsiveness */}
      <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-100 overflow-hidden transition-all duration-300">
        {/* Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0077b5] to-blue-400"></div>
        
        <div className="p-5"> {/* Reduced padding for sidebar fit */}
          
          {/* Header Badge */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 p-1.5 rounded-lg">
                <Linkedin className="text-[#0077b5] w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-xs">Pro Insight</span>
            </div>
            
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3 text-amber-600" />
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">
                {config.badgeLabel || "Hot"}
              </span>
            </div>
          </div>

          {/* Quote Box */}
          <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-200/60 relative">
            <Sparkles className="absolute top-3 right-3 text-amber-400 w-3 h-3 opacity-80" />
            <p className="text-sm font-medium font-serif italic text-slate-700 leading-relaxed line-clamp-3">
              "{config.visualQuote}"
            </p>
          </div>

          {/* Compact Button */}
          <button 
            onClick={handleShare}
            className={`w-full font-bold py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-sm
              ${copiedShare 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-[#0077b5] hover:bg-[#006097] text-white shadow-blue-500/20'
              } active:scale-[0.98]`}
          >
            {copiedShare ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedShare ? 'Copied & Opened!' : 'Post this on LinkedIn'}</span>
          </button>

        </div>
      </div>
    </div>
  )
}
