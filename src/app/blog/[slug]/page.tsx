import { blogs } from '../data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Activity, Clock, ChevronRight, Share2, Tag, Terminal, User, Globe } from 'lucide-react'
import Link from 'next/link'
import BlogNavbar from '@/components/BlogNavbar'
import LinkedInCard from '@/components/LinkedInCard'

const DEFAULT_OG_IMAGE = '/blog-og-image.jpg'

export async function generateStaticParams() {
  return Object.keys(blogs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogs[slug]

  if (!post) return {}

  const ogImage = post.image 
    ? `https://perfectresumescan.com${post.image}`
    : `https://perfectresumescan.com${DEFAULT_OG_IMAGE}`
    
  const canonicalUrl = `https://perfectresumescan.com/blog/${slug}`

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: canonicalUrl,
      siteName: 'PerfectResumeScan',
      authors: [post.author || 'Engineering Team'],
      publishedTime: post.date,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  }
}

function getReadTime(content: string) {
  if (!content) return 5;
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function formatDate(dateString?: string) {
  if (!dateString) return 'Recently Updated';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogs[slug]

  if (!post) {
    notFound()
  }

  const pageUrl = `https://perfectresumescan.com/blog/${slug}`
  const imageUrl = `https://perfectresumescan.com${post.image || DEFAULT_OG_IMAGE}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl
    },
    headline: post.title,
    description: post.description,
    image: [imageUrl],
    author: {
      '@type': 'Person',
      name: post.author || 'Sidharth',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Perfect Resume Scan',
      logo: {
        '@type': 'ImageObject',
        url: 'https://perfectresumescan.com/icon.svg',
      },
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.updatedAt || post.date).toISOString(),
  };

  const cleanContent = post.content?.replace(/<[^>]*>?/gm, '') || ''
  const readTime = getReadTime(post.content)

  const liConfig = post.linkedinPost || {
    text: `💡 Insight: ${post.description} \n\nRead more: ${pageUrl}`,
    visualQuote: post.description || post.title,
    badgeLabel: "Insight"
  }

  return (
    <div className="min-h-screen bg-[#121212] text-gray-300 font-sans selection:bg-purple-500/30 selection:text-purple-200">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        /* Base Typography - Dark Theme Overrides */
        .tech-blog-content {
          color: #d1d5db; /* gray-300 */
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.8;
          font-size: 1.125rem;
        }
        .tech-blog-content h2 {
          color: #f3f4f6; /* gray-100 */
          font-weight: 800;
          font-size: 2rem;
          margin-top: 3.5rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
          font-family: 'Space Mono', monospace;
        }
        .tech-blog-content h3 {
          color: #e5e7eb; /* gray-200 */
          font-weight: 700;
          font-size: 1.5rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .tech-blog-content p { margin-bottom: 1.75rem; }
        .tech-blog-content ul, .tech-blog-content ol {
          margin-bottom: 1.75rem;
          padding-left: 1.5rem;
          color: #9ca3af; /* gray-400 */
        }
        .tech-blog-content ul { list-style-type: disc; }
        .tech-blog-content ol { list-style-type: decimal; }
        .tech-blog-content li {
          margin-bottom: 0.75rem;
          padding-left: 0.5rem;
        }
        .tech-blog-content code {
          background-color: rgba(139, 92, 246, 0.1); /* purple-500/10 */
          color: #c084fc; /* purple-400 */
          font-family: 'Space Mono', monospace;
          font-size: 0.85em;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        .tech-blog-content pre {
          background-color: #1a1a1a;
          color: #e2e8f0;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 2.5rem 0;
          font-size: 0.875rem;
          line-height: 1.7;
          border: 1px solid #333;
          font-family: 'Space Mono', monospace;
        }
        .tech-blog-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
          border: none;
          font-weight: 400;
        }
        .tech-blog-content blockquote {
          border-left: 4px solid #a855f7; /* purple-500 */
          background-color: rgba(168, 85, 247, 0.05);
          padding: 1.5rem;
          margin: 2.5rem 0;
          font-style: italic;
          color: #d1d5db;
        }
        .tech-blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2.5rem 0;
          font-size: 0.95rem;
          border: 1px solid #333;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .tech-blog-content th {
          background-color: #1f1f1f;
          text-align: left;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #333;
          font-weight: 600;
          color: #fff;
          font-family: 'Space Mono', monospace;
        }
        .tech-blog-content td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #333;
          vertical-align: top;
          color: #9ca3af;
        }
        .tech-blog-content strong { color: #fff; font-weight: 700; }
        .tech-blog-content a { color: #c084fc; text-decoration: underline; text-underline-offset: 4px; }
        .tech-blog-content a:hover { color: #d8b4fe; }
      `}</style>

      <BlogNavbar title={post.title} content={cleanContent} />

      {/* Scroll Progress */}
      <div className="h-1 w-full bg-[#1a1a1a] fixed top-0 left-0 z-50">
        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-0" id="scroll-progress"></div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* ================= LEFT: CONTENT ================= */}
        <div className="lg:col-span-8 lg:col-start-2">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-mono">
            <Link href="/blog" className="hover:text-purple-400 transition-colors">~/blog</Link>
            <ChevronRight className="w-4 h-4 text-gray-700" />
            <span className="font-medium text-gray-300">post.md</span>
          </nav>

          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {(post.keywords || ['Career Engineering']).slice(0, 3).map(tag => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed mb-10 font-light">
              {post.description}
            </p>

            {/* Author / Meta Bar */}
            <div className="flex flex-wrap items-center gap-6 text-sm border-t border-b border-white/10 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-[1px]">
                   <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center text-gray-300 font-bold">
                      <User size={16} />
                   </div>
                </div>
                <div>
                  <p className="font-bold text-white font-mono text-xs uppercase tracking-wider">{post.author || 'SYSTEM_ADMIN'}</p>
                  <p className="text-gray-500 text-xs">{formatDate(post.date)}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-gray-500 hidden sm:flex">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-xs">{readTime} min read</span>
              </div>
            </div>
          </header>

          <article
            className="tech-blog-content"
            dangerouslySetInnerHTML={{ __html: post.content || '<p>System: Content retrieval pending.</p>' }}
          />

          {/* --- NEW MOBILE SHARE SECTION --- */}
          {/* This block is visible on mobile (lg:hidden) and hidden on desktop */}
          <div className="lg:hidden mt-12 mb-8 border-t border-white/10 pt-8">
            <p className="text-xs font-bold text-gray-500 font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
              <Share2 className="w-3 h-3" /> Share_Protocol
            </p>
            <LinkedInCard
              config={liConfig}
              url={pageUrl}
            />
          </div>
          {/* -------------------------------- */}

          {/* CTA Box */}
          <div className="mt-12 bg-[#1a1a1a] border border-white/10 rounded-xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/10 text-purple-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-6 border border-purple-500/20">
                <Globe className="w-3 h-3" /> Deployment_Ready
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight font-mono">
                Is your resume still a static PDF?
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                Convert your resume into a high-performance personal website in seconds. Deploy your career identity to the web.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold font-mono text-sm transition-all hover:scale-105"
              >
                BUILD_MY_SITE
              </Link>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: STICKY SIDEBAR (Desktop Only) ================= */}
        <aside className="hidden lg:block lg:col-span-3 relative">
          <div className="sticky top-24 space-y-8">

            <div>
              <p className="text-xs font-bold text-gray-500 font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                <Share2 className="w-3 h-3" /> Share_Protocol
              </p>
              <LinkedInCard
                config={liConfig}
                url={pageUrl}
              />
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10">
              <h4 className="font-bold text-white mb-2 font-mono text-sm">System Tools</h4>
              <p className="text-xs text-gray-500 mb-4 font-mono">
                Transform your CV into a live portfolio URL.
              </p>
              <Link
                href="/"
                className="block w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 rounded text-xs font-bold font-mono uppercase tracking-wider transition-colors"
              >
                Deploy_Portfolio
              </Link>
            </div>

            {post.keywords && post.keywords.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 font-mono uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Tag className="w-3 h-3" /> Related_Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((keyword) => (
                    <span key={keyword} className="px-2.5 py-1 bg-[#1a1a1a] border border-white/10 rounded text-[10px] font-medium text-gray-400 hover:border-purple-500/50 hover:text-purple-400 transition-colors cursor-pointer font-mono uppercase">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </aside>

      </main>
    </div>
  )
}
