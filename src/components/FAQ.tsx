import { Monitor, Terminal, HelpCircle, MessageSquare } from 'lucide-react';

const faqs = [
  {
    q: 'How do I share my portfolio?',
    a: 'Every generated site comes with a unique URL and a dedicated QR Code. You can put this QR code on your physical business card or PDF resume for recruiters to scan instantly.',
  },
  {
    q: 'Can recruiters still download my PDF resume?',
    a: 'Yes. Your portfolio automatically includes a "Download Resume" button that serves the original file you uploaded, ensuring recruiters always have access to your standard document.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'Zero coding required. Our AI parses your existing resume PDF and automatically writes, designs, and deploys a professional personal website for you in seconds.',
  },
  {
    q: 'Is the generated website SEO friendly?',
    a: 'Yes. The system automatically adds meta tags, structured data, and OpenGraph images so your name ranks higher on Google when recruiters search for you.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#121212] border-t border-white/5 relative overflow-hidden">
      
      {/* --- NEW BACKGROUND --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      {/* --- END NEW BACKGROUND --- */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-4">
            SYSTEM_FAQ
          </h2>
          <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto">
            // Common queries regarding the resume-to-website compilation process.
          </p>
        </div>

        {/* Terminal Window Card */}
        <div className="rounded-lg border border-white/10 bg-[#1a1a1a] shadow-2xl overflow-hidden relative group">
          
          {/* Gradient Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>

          {/* Title Bar */}
          <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-[#252525] border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
              <Terminal size={12} />
              <span>Help_Center.sh</span>
            </div>
            <div className="w-12"></div> {/* Spacer for balance */}
          </div>

          {/* Content Area */}
          <div className="relative z-10 p-6 md:p-8 bg-[#1a1a1a]">
            
            {/* Intro Comment */}
            <div className="mb-6 text-xs font-mono text-gray-500">
              <span className="text-purple-400">root@system:~$</span> cat frequently_asked_questions.txt
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {faqs.map((item, idx) => (
                <div
                  key={idx}
                  className="group/item rounded border border-white/5 bg-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 px-5 py-4"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <MessageSquare size={16} className="mt-1 text-purple-400 shrink-0" />
                    <h3 className="font-mono font-bold text-white text-sm leading-snug group-hover/item:text-purple-300 transition-colors">
                      {item.q}
                    </h3>
                  </div>
                  <p className="text-gray-400 font-mono text-xs leading-relaxed pl-7 border-l border-white/10 group-hover/item:border-purple-500/30 group-hover/item:text-gray-300 transition-all">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Status */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              System Online • Ready for Queries
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
