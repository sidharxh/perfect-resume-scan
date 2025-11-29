import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { 
  Github, Linkedin, Mail, MapPin, ExternalLink, 
  Download, Briefcase, Code2, User, Globe, Cpu, FileText 
} from 'lucide-react';

// --- 1. Types ---
interface PortfolioData {
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
  meta: {
    originalResumeUrl: string;
    createdAt: string;
  };
}

// --- 2. Fetch Logic (RLS Protected) ---
async function getPortfolioData(slug: string): Promise<PortfolioData | null> {
  // Use the Standard Client to respect Row Level Security
  // If status is 'draft', RLS will return 0 rows, preserving security.
  const supabase = await createClient();

  const { data: record, error } = await supabase
    .from('users_perfectresumescan')
    .select('status, json_url')
    .eq('slug', slug)
    .maybeSingle();

  // If record is missing (RLS hidden or invalid slug) or URL is missing
  if (error || !record || !record.json_url) {
    if (error) console.error("Supabase Error:", error);
    return null;
  }

  // Fetch the JSON content
  try {
    const res = await fetch(record.json_url, { 
      cache: 'no-store',
      next: { tags: [`portfolio-${slug}`] } 
    });
    
    if (!res.ok) {
        console.error(`JSON Fetch Error: ${res.status}`);
        return null;
    }
    return await res.json();
  } catch (e) {
    console.error("JSON Parse Error:", e);
    return null;
  }
}

// --- 3. Metadata (SEO) ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPortfolioData(slug);

  if (!data || !data.personalInfo) {
    return { 
      title: 'Portfolio Not Found',
      description: 'The requested portfolio could not be found.' 
    };
  }

  // Safe strings to prevent "toString" errors
  const fullName = data.personalInfo.fullName || 'Portfolio';
  const title = data.personalInfo.title || 'Professional';
  const bio = data.personalInfo.bio || '';

  return {
    title: `${fullName} - ${title}`,
    description: bio.slice(0, 160),
    openGraph: {
      title: `${fullName} - ${title}`,
      description: bio.slice(0, 160),
      type: 'website',
    }
  };
}

// --- 4. Main Component ---
export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPortfolioData(slug);

  // If null, it means it doesn't exist OR it's not published (hidden by RLS)
  if (!data) {
    notFound(); 
  }

  // Defensive Destructuring (Prevents UI crashes if fields are missing)
  const { 
    personalInfo = { fullName: '', title: '', bio: '', location: '', email: '', socialLinks: [] }, 
    experience = [], 
    projects = [], 
    skills = [], 
    meta = { originalResumeUrl: '', createdAt: '' }
  } = data;

  // Ensure strings are not null before rendering
  const displayName = personalInfo.fullName || "User";
  const displayTitle = personalInfo.title || "";
  const displayBio = personalInfo.bio || "";

  // --- RENDER UI ---
  return (
    <div className="min-h-screen bg-[#0a0f1e] font-sans text-white selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
        
        {/* HEADER SECTION */}
        <header className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 mb-8">
             <div className="bg-[#0a0f1e] rounded-full p-4 w-24 h-24 flex items-center justify-center text-4xl font-bold overflow-hidden">
                {displayName.length > 0 ? displayName.charAt(0) : <User size={40} />}
             </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            {displayName}
          </h1>
          <p className="text-xl md:text-2xl text-blue-400 font-medium mb-8">{displayTitle}</p>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg mb-10">
            {displayBio}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
             {meta.originalResumeUrl && (
               <a 
                 href={meta.originalResumeUrl} 
                 target="_blank"
                 className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all"
               >
                 <FileText size={18} /> View Resume
               </a>
             )}
             <div className="flex gap-2">
               {Array.isArray(personalInfo.socialLinks) && personalInfo.socialLinks.map((link, i) => (
                 <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/5">
                   <Globe size={20} className="text-gray-300" />
                 </a>
               ))}
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* EXPERIENCE */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                  <Briefcase className="text-blue-500" /> Experience
                </h2>
                <div className="space-y-8">
                  {experience.map((job, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h3>
                        <span className="text-sm font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">{job.period}</span>
                      </div>
                      <p className="text-blue-500 font-medium mb-3">{job.company}</p>
                      <p className="text-gray-400 leading-relaxed">{job.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PROJECTS */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                  <Code2 className="text-purple-500" /> Projects
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {projects.map((project, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all hover:-translate-y-1">
                      <div className="flex justify-between items-start mb-3">
                         <h3 className="font-bold text-lg">{project.title}</h3>
                         {project.link && <ExternalLink size={16} className="text-gray-500" />}
                      </div>
                      <p className="text-gray-400 text-sm mb-4 h-20 overflow-hidden line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                         {Array.isArray(project.techStack) && project.techStack.slice(0, 3).map((t, k) => (
                           <span key={k} className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">{t}</span>
                         ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            
            {/* CONTACT */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
               <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                 <User size={18} className="text-green-400" /> Contact
               </h3>
               <div className="space-y-4 text-sm">
                 {personalInfo.email && (
                    <div className="flex items-center gap-3 text-gray-300">
                        <Mail size={16} />
                        <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">{personalInfo.email}</a>
                    </div>
                 )}
                 {personalInfo.location && (
                   <div className="flex items-center gap-3 text-gray-300">
                      <MapPin size={16} />
                      <span>{personalInfo.location}</span>
                   </div>
                 )}
               </div>
            </div>

            {/* SKILLS */}
            {skills.length > 0 && (
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/5 rounded-3xl p-8">
                 <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                   <Cpu size={18} className="text-blue-400" /> Skills
                 </h3>
                 <div className="flex flex-wrap gap-2">
                   {skills.map((skill, i) => (
                     <span key={i} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-medium transition-all cursor-default">
                       {skill}
                     </span>
                   ))}
                 </div>
              </div>
            )}

          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-24 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
           <p>© {new Date().getFullYear()} {displayName}. All rights reserved.</p>
           <p className="mt-2 text-xs">Built with PerfectResumeScan</p>
        </footer>

      </div>
    </div>
  );
}
