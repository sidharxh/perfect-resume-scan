'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Bot, Check } from 'lucide-react'

export default function BlogNavbar({ title, content }: { title: string, content: string }) {
  const [copiedAi, setCopiedAi] = useState(false)

  const handleAiRead = () => {
    const prompt = `Summarize this: "${title}"\n\n${content}`
    navigator.clipboard.writeText(prompt)
    setCopiedAi(true)
    window.open('https://chatgpt.com/', '_blank')
    setTimeout(() => setCopiedAi(false), 3000)
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-slate-200/60 px-6 h-16 flex items-center justify-between transition-all">
      <Link href="/blog" className="group flex items-center text-slate-500 hover:text-slate-900 transition-colors text-sm font-bold tracking-wide">
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 group-hover:bg-slate-200 transition-colors">
           <ArrowLeft size={16} />
        </div>
        Back
      </Link>
      <button 
        onClick={handleAiRead}
        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-slate-500/20 active:scale-95"
      >
        {copiedAi ? <Check size={14} /> : <Bot size={14} />}
        {copiedAi ? 'Copied!' : 'Summarize'}
      </button>
    </nav>
  )
}
