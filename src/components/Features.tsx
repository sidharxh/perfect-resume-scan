import { Check, AlertTriangle, ArrowDown, Terminal, Cpu, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    { 
      title: "Instant Parsing", 
      desc: "Our engine extracts your bio, experience, and projects from PDF/DOCX in milliseconds." 
    },
    { 
      title: "SEO Optimization", 
      desc: "Automatically generates meta tags and structured data so recruiters find you on Google." 
    },
    { 
      title: "Zero-Config Deployment", 
      desc: "No hosting, no domains, no code. Get a live URL instantly to share on LinkedIn." 
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#121212] relative overflow-hidden border-t border-white/5">
      
      {/* Tech Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 mb-6 opacity-70">
               <Cpu size={16} className="text-purple-400" />
               <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">System Architecture</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-6 leading-tight">
              Why standard resumes <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">are becoming obsolete.</span>
            </h2>
            
            <p className="text-gray-400 font-mono text-sm md:text-base mb-10 leading-relaxed">
              // Recruiters are flooded with static PDFs. <br />
              // Stand out by converting your profile into an interactive, accessible, and high-performance website that proves your technical literacy.
            </p>
            
            <div className="space-y-8">
              {features.map((feat, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all duration-300">
                    <Zap size={18} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-white text-lg mb-1 group-hover:text-purple-400 transition-colors">{feat.title}</h4>
                    <p className="text-gray-500 font-mono text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Visual Card */}
          <div className="relative">
            {/* Decorative blurred backdrop behind card */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 blur-2xl opacity-20 transform rotate-6 scale-90"></div>

            <div className="relative bg-[#1a1a1a] rounded-xl p-1 border border-white/10 shadow-2xl">
              {/* Header Bar */}
              <div className="bg-[#252525] rounded-t-lg px-4 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <Terminal size={12} />
                  <span>ANALYSIS_PREVIEW</span>
                </div>
                <span className="bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider">
                  Legacy_Mode_Detected
                </span>
              </div>
              
              <div className="p-6 space-y-5">
                
                {/* Stat 1 */}
                <div className="bg-black/40 p-4 rounded border border-white/5 flex justify-between items-center">
                  <span className="text-gray-400 font-mono text-xs">Visibility_Score</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-800 rounded-full h-1.5 relative overflow-hidden">
                      <div className="bg-red-500 h-full w-[30%] absolute top-0 left-0 animate-pulse"></div>
                    </div>
                    <span className="text-red-400 font-mono text-xs">CRITICAL</span>
                  </div>
                </div>
                
                {/* Stat 2 */}
                <div className="bg-black/40 p-4 rounded border border-white/5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400 font-mono text-xs">Missing_Integrations</span>
                    <span className="text-red-400 font-mono text-[10px] uppercase">3 Errors</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Live_Link', 'SEO_Tags', 'Analytics'].map(k => (
                      <span key={k} className="px-2 py-1 bg-red-500/10 text-red-400 text-[10px] font-mono border border-red-500/20 rounded">
                        [MISSING]: {k}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-black/40 p-4 rounded border border-white/5 flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 font-mono text-xs block mb-1">Mobile_Responsiveness</span>
                    <span className="text-[10px] text-gray-600 font-mono block">PDF format failed on mobile viewport</span>
                  </div>
                  <AlertTriangle className="text-yellow-500" size={16} />
                </div>
              </div>
              
              {/* Footer Action */}
              <div className="p-4 border-t border-white/5 bg-white/5 flex justify-center">
                <div className="flex flex-col items-center animate-bounce opacity-50">
                  <span className="text-[10px] font-mono text-gray-500 mb-1">SCROLL_TO_UPGRADE</span>
                  <ArrowDown className="text-white" size={14} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
