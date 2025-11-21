import { Check, AlertCircle, ArrowDown } from 'lucide-react';

export default function Features() {
  const features = [
    { 
      title: "Keyword Matching", 
      desc: "We identify the exact skills and keywords the job description demands." 
    },
    { 
      title: "Formatting Fixes", 
      desc: "Detect tables, columns, and graphics that confuse ATS parsers." 
    },
    { 
      title: "Action Verb Enhancer", 
      desc: "Replace weak words like 'helped' with power words like 'spearheaded'." 
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[100px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[100px] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why 75% of resumes are never seen by a human</h2>
            <p className="text-slate-300 text-lg mb-8">Applicant Tracking Systems (ATS) filter out candidates before a recruiter even logs in. Simple formatting errors or missing keywords can send your resume straight to the digital trash bin.</p>
            
            <div className="space-y-6">
              {features.map((feat, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={12} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{feat.title}</h4>
                    <p className="text-slate-400 text-sm">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Visual Comparison Card */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
              <h3 className="font-bold">Scan Analysis Preview</h3>
              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold">Before Optimization</span>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-700/50 p-4 rounded-lg flex justify-between items-center">
                <span className="text-slate-300">Formatting Score</span>
                <div className="w-32 bg-slate-600 rounded-full h-2 mr-4 relative">
                  <div className="bg-yellow-400 h-2 rounded-full w-[40%]"></div>
                </div>
                <span className="text-yellow-400 font-mono">Low</span>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Missing Keywords</span>
                  <span className="text-red-400 text-sm">Critical</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Project Management', 'Python', 'Agile'].map(k => (
                    <span key={k} className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded border border-red-500/30">{k}</span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <span className="text-slate-300 block">Contact Info Parsing</span>
                  <span className="text-xs text-slate-400">Phone number format invalid</span>
                </div>
                <AlertCircle className="text-red-400" size={20} />
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="inline-block animate-bounce mt-2">
                <ArrowDown className="text-blue-400" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
