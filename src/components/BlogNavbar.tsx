'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Bot, Check, Terminal } from 'lucide-react'

export default function BlogNavbar({ title, content }: { title: string, content: string }) {
  const [copiedAi, setCopiedAi] = useState(false)

  const handleAiRead = () => {
    // Limit content length to prevent massive clipboards
    const truncatedContent = content.slice(0, 4000); 
    const prompt = `Summarize this article titled "${title}":\n\n${truncatedContent}...`
    navigator.clipboard.writeText(prompt)
    setCopiedAi(true)
    window.open('https://chatgpt.com/', '_blank')
    setTimeout(() => setCopiedAi(false), 3000)
  }

  return (
    <nav className="sticky top-0 z-40 bg-[#121212]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 h-16 flex items-center justify-between transition-all">
      
      <Link href="/blog" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
        <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all">
           <ArrowLeft size={14} />
        </div>
        <span>Back_To_Index</span>
      </Link>

      <button 
        onClick={handleAiRead}
        className={`flex items-center gap-2 px-4 py-2 rounded border text-xs font-mono font-bold uppercase tracking-wider transition-all active:scale-95
          ${copiedAi 
            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
            : 'bg-white/5 text-gray-300 border-white/10 hover:bg-purple-500/10 hover:text-purple-300 hover:border-purple-500/30'
          }`}
      >
        {copiedAi ? <Check size={14} /> : <Bot size={14} />}
        <span>{copiedAi ? 'PROMPT_COPIED' : 'AI_SUMMARIZE'}</span>
      </button>
    </nav>
  )
}
