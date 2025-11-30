import { FileText, Globe, Github, Linkedin, Twitter, ArrowRight, X } from 'lucide-react';

export default function SampleATSResume() {
  return (
    <section id="sample-resume" className="py-24 bg-[#121212] border-t border-white/5 relative overflow-hidden">
      
      {/* --- NEW BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      {/* --- END NEW BACKGROUND --- */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-6">
            STATIC TEXT vs. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">DIGITAL IDENTITY</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Recruiters spend 6 seconds on a resume. A portfolio website captures attention, showcases personality, and proves your skills instantly.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          
          {/* BEFORE: The Boring Resume */}
          <div className="relative group">
            {/* Label */}
            <div className="absolute -top-10 left-0 text-sm font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <FileText size={14} />
              <span>Standard_Resume.pdf</span>
            </div>

            {/* The "Paper" Card */}
            <div className="bg-white/90 h-full min-h-[400px] p-8 rounded-sm shadow-xl rotate-1 transition-transform duration-500 group-hover:rotate-0 relative overflow-hidden">
              
              {/* Watermark/Overlay to show it's boring */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-200/50 pointer-events-none"></div>

              {/* Dense Text Content */}
              <div className="space-y-6 opacity-80 font-serif text-black">
                <div className="border-b border-black pb-2">
                  <h3 className="text-2xl font-bold uppercase text-black tracking-tight">Johnathan Doe</h3>
                  <p className="text-xs text-gray-600">123 Street, City, Country | john@email.com | 555-0123</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-xs uppercase border-b border-gray-300 pb-1">Professional Summary</h4>
                  <p className="text-[10px] leading-tight text-justify text-gray-700">
                    Highly motivated and results-oriented professional with over 5 years of experience in software development. Proven track record of success in managing multiple projects simultaneously. seeking a challenging position in a reputable organization where I can utilize my skills and contribute to the growth of the company. Hardworking and dedicated team player.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-xs uppercase border-b border-gray-300 pb-1">Experience</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-bold text-[11px]">Senior Developer - Tech Corp</p>
                      <p className="text-[9px] italic mb-1">Jan 2020 - Present</p>
                      <ul className="list-disc pl-4 text-[10px] leading-tight space-y-0.5 text-gray-700">
                        <li>Responsible for developing web applications using various technologies.</li>
                        <li>Attended daily meetings and collaborated with the team.</li>
                        <li>Fixed bugs and improved system performance.</li>
                        <li>Managed database and server configurations.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[11px]">Junior Developer - StartUp Inc</p>
                      <p className="text-[9px] italic mb-1">2018 - 2020</p>
                      <ul className="list-disc pl-4 text-[10px] leading-tight space-y-0.5 text-gray-700">
                        <li>Assisted senior developers in coding tasks.</li>
                        <li>Wrote documentation for codebases.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* "Boring" Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500/90 text-white px-6 py-2 font-bold uppercase border-4 border-white rotate-[-15deg] shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Hard to Scan
              </div>
            </div>
          </div>


          {/* AFTER: The Portfolio Website */}
          <div className="relative group">
            {/* Label */}
            <div className="absolute -top-10 left-0 text-sm font-mono text-purple-400 uppercase tracking-widest flex items-center gap-2">
              <Globe size={14} />
              <span>Portfolio_Website.app</span>
            </div>

            {/* The "Browser" Card */}
            <div className="bg-[#1a1a1a] h-full min-h-[400px] rounded-xl shadow-2xl border border-white/10 overflow-hidden transform -rotate-1 transition-transform duration-500 group-hover:rotate-0 flex flex-col">
              
              {/* Fake Browser Header */}
              <div className="bg-[#252525] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                </div>
                <div className="ml-4 bg-[#121212] flex-1 rounded-md h-6 flex items-center px-3 text-[10px] text-gray-500 font-mono">
                  john-doe-portfolio.vercel.app
                </div>
              </div>

              {/* Website Content */}
              <div className="flex-1 p-8 flex flex-col justify-center relative">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                {/* Hero Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
                      <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center text-xl">
                        👨‍💻
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">Johnathan Doe</h3>
                      <p className="text-purple-400 text-sm font-mono">Full Stack Engineer</p>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                    I build accessible, pixel-perfect, and performant web experiences. Currently focused on building <span className="text-white font-medium">ScaleAI</span>.
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['React', 'Node.js', 'AWS', 'TypeScript'].map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Proof & Action */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex gap-4 text-gray-400">
                      <Github size={18} className="hover:text-white cursor-pointer transition-colors" />
                      <Linkedin size={18} className="hover:text-white cursor-pointer transition-colors" />
                      <Twitter size={18} className="hover:text-white cursor-pointer transition-colors" />
                    </div>
                    
                    <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:scale-105 transition-transform">
                      Let's Talk <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Call to Action */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-mono font-bold text-white mb-4">
            Don't Be Just Another PDF.
          </h3>
          <p className="text-gray-500 font-mono mb-8">
            Upload your resume and get your personal website link in &lt; 30 seconds.
          </p>
          <a
            href="#upload"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-500/20"
          >
            <span>GENERATE_MY_SITE</span>
            <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}
