import Link from 'next/link'
import Image from 'next/image'
import { blogs } from './data'
import { Metadata } from 'next'
import { ArrowRight, Clock, Terminal, User, Tag } from 'lucide-react'

const BLOG_URL = 'https://perfectresumescan.com/blog'
const DEFAULT_IMAGE = '/blog-og-image.jpg'

export const metadata: Metadata = {
  title: 'Portfolio & Resume Engineering Blog | PerfectResumeScan',
  description: 'Turn your resume into a high-performance personal website. Expert guides on portfolio engineering, personal branding, and modern career visibility.',
  alternates: {
    canonical: BLOG_URL,
  },
  openGraph: {
    title: 'Portfolio & Resume Engineering Blog | PerfectResumeScan',
    description: 'Turn your resume into a high-performance personal website. Expert guides on portfolio engineering.',
    url: BLOG_URL,
    siteName: 'PerfectResumeScan',
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Portfolio Engineering Blog - PerfectResumeScan',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Resume Engineering Blog | PerfectResumeScan',
    description: 'Turn your resume into a high-performance personal website. Expert guides on portfolio engineering.',
    images: [DEFAULT_IMAGE],
  },
}

export default function BlogIndex() {
  // Sort by date
  const allPosts = Object.values(blogs).sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Split into Featured (Newest) vs The Rest
  const featuredPost = allPosts[0]
  const regularPosts = allPosts.slice(1)

  // Improved JSON-LD for a Blog Collection Page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio Engineering Blog',
    headline: 'From Static PDF to Live Website: Engineering Your Career',
    description: 'Expert insights on converting resumes into personal portfolio websites and maximizing digital presence.',
    url: BLOG_URL,
    image: `https://perfectresumescan.com${DEFAULT_IMAGE}`,
    publisher: {
      '@type': 'Organization',
      name: 'Perfect Resume Scan',
      url: 'https://perfectresumescan.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://perfectresumescan.com/icon.svg'
      }
    },
    // Tells Google this page contains a list of blog posts
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://perfectresumescan.com/blog/${post.slug}`,
        name: post.title,
        description: post.description,
        image: post.image 
          ? `https://perfectresumescan.com${post.image}` 
          : `https://perfectresumescan.com${DEFAULT_IMAGE}`
      })),
    },
  }

  return (
    <div className="min-h-screen bg-[#121212] pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* JSON-LD Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-24 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono uppercase tracking-widest mb-8 border border-purple-500/20 backdrop-blur-sm">
            <Terminal size={14} />
            <span>System_Online</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Resume to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Website Protocol</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Engineering the transition from static PDFs to dynamic portfolios. <br className="hidden sm:block"/>
            Strategies to deploy your career identity to the web.
          </p>
        </div>

        {/* FEATURED HERO POST */}
        {featuredPost && (
          <div className="mb-24 group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[32px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            <Link href={`/blog/${featuredPost.slug}`} className="block relative">
              <div className="relative bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/10 grid md:grid-cols-2 min-h-[450px] hover:border-purple-500/30 transition-colors duration-500">

                {/* Image Side */}
                <div className="relative h-64 md:h-full overflow-hidden bg-[#121212]">
                  <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10" />
                  <Image
                    src={featuredPost.image || DEFAULT_IMAGE}
                    alt={featuredPost.title}
                    fill
                    priority 
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-[#1a1a1a] to-[#121212]">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-purple-500 text-white text-[10px] font-bold font-mono uppercase tracking-widest rounded shadow-lg shadow-purple-500/20">
                      Latest_Build
                    </span>
                    <span className="text-gray-500 text-xs font-mono flex items-center gap-1 uppercase tracking-wider">
                      <Clock size={12} /> 5 min read
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-purple-400 transition-colors font-mono tracking-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-gray-400 text-base mb-8 leading-relaxed line-clamp-3 font-light">
                    {featuredPost.description}
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-[1px]">
                       <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-300 font-bold">
                          {featuredPost.author.charAt(0)}
                       </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white font-mono uppercase tracking-wider">{featuredPost.author}</span>
                      <span className="text-xs text-gray-500 font-mono">{featuredPost.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* REGULAR GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post, idx) => {
            const displayImage = post.image || DEFAULT_IMAGE
            
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">

                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden relative bg-[#121212]">
                    <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay z-10" />
                    <Image
                      src={displayImage}
                      alt={post.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider">
                        <Tag size={12} />
                        <span>{post.keywords?.[0] || 'Deploy'}</span>
                      </div>
                      <span className="text-gray-600 text-xs font-mono">
                        {post.date}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-purple-400 transition-colors font-mono">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed font-light">
                      {post.description}
                    </p>

                    <div className="pt-4 border-t border-white/5 flex items-center text-white font-mono text-xs font-bold uppercase tracking-wider group/btn">
                      View_Source
                      <ArrowRight size={14} className="ml-2 text-purple-500 transform group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
