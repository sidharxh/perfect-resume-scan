'use client'

import { useState } from 'react'
import { Linkedin, TrendingUp, Sparkles, Check, Copy, Terminal } from 'lucide-react'

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
    <div className="w-full">
      <div className="group relative bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#0077b5]/50 hover:shadow-lg hover:shadow-[#0077b5]/10">
        
        {/* Top Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#0077b5] to-purple-600"></div>
        
        <div className="p-5">
          
          {/* Header Badge */}
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2.5">
              <div className="bg-[#0077b5]/10 p-1.5 rounded-md border border-[#0077b5]/20">
                <Linkedin className="text-[#0077b5] w-3.5 h-3.5" />
              </div>
              <span className="font-mono font-bold text-gray-200 text-xs uppercase tracking-wider">Network_Share</span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded">
              <TrendingUp className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-widest">
                {config.badgeLabel || "INSIGHT"}
              </span>
            </div>
          </div>

          {/* Quote Box - Terminal Style */}
          <div className="bg-black/40 rounded-lg p-4 mb-5 border border-white/5 relative group-hover:border-white/10 transition-colors">
            <div className="absolute top-3 right-3 opacity-50">
               <Sparkles className="text-[#0077b5] w-3 h-3" />
            </div>
            <div className="text-[10px] text-gray-500 font-mono mb-2 flex items-center gap-1">
               <Terminal size={10} />
               <span>console.log(insight)</span>
            </div>
            <p className="text-sm font-medium text-gray-300 leading-relaxed font-mono line-clamp-3 border-l-2 border-[#0077b5] pl-3">
              "{config.visualQuote}"
            </p>
          </div>

          {/* Compact Button */}
          <button 
            onClick={handleShare}
            className={`w-full font-mono font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider border
              ${copiedShare 
                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                : 'bg-[#0077b5] hover:bg-[#006097] text-white border-transparent hover:shadow-lg hover:shadow-[#0077b5]/20'
              } active:scale-[0.98]`}
          >
            {copiedShare ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedShare ? 'COPIED_TO_CLIPBOARD' : 'SHARE_ON_LINKEDIN'}</span>
          </button>

        </div>
      </div>
    </div>
  )
}
