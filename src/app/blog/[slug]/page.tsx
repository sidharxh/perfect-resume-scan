import { blogs } from '../data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Activity, Clock, ChevronRight, Share2, Tag } from 'lucide-react'
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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        /* Base Typography */
        .tech-blog-content {
          color: #334155;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          line-height: 1.75;
          font-size: 1.125rem;
        }
        .tech-blog-content h2 {
          color: #0f172a;
          font-weight: 800;
          font-size: 2rem;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          line-height: 1.25;
          letter-spacing: -0.025em;
        }
        .tech-blog-content h3 {
          color: #1e293b;
          font-weight: 700;
          font-size: 1.5rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .tech-blog-content p { margin-bottom: 1.5rem; }
        .tech-blog-content ul, .tech-blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .tech-blog-content ul { list-style-type: disc; }
        .tech-blog-content ol { list-style-type: decimal; }
        .tech-blog-content li {
          margin-bottom: 0.5rem;
          padding-left: 0.5rem;
        }
        .tech-blog-content code {
          background-color: #f1f5f9;
          color: #0f172a;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.85em;
          font-weight: 600;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          border: 1px solid #e2e8f0;
        }
        .tech-blog-content pre {
          background-color: #0f172a;
          color: #e2e8f0;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 2rem 0;
          font-size: 0.875rem;
          line-height: 1.7;
          border: 1px solid #1e293b;
        }
        .tech-blog-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
          border: none;
          font-weight: 400;
        }
        .tech-blog-content blockquote {
          border-left: 4px solid #6366f1;
          background-color: #f8fafc;
          padding: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #475569;
        }
        .tech-blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2.5rem 0;
          font-size: 0.95rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .tech-blog-content th {
          background-color: #f8fafc;
          text-align: left;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e2e8f0;
          font-weight: 600;
          color: #0f172a;
        }
        .tech-blog-content td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: top;
        }
        .tech-blog-content .bg-slate-900 { background-color: #0f172a !important; color: #f8fafc !important; }
        .tech-blog-content .bg-slate-100 { background-color: #f1f5f9 !important; border-left: 4px solid #0f172a; }
        .tech-blog-content .text-green-400 { color: #4ade80 !important; }
        .tech-blog-content .text-purple-400 { color: #c084fc !important; }
        .tech-blog-content .text-yellow-300 { color: #fde047 !important; }
        .tech-blog-content .text-blue-400 { color: #60a5fa !important; }
      `}</style>

      <BlogNavbar title={post.title} content={cleanContent} />

      <div className="h-1 w-full bg-slate-100 fixed top-0 left-0 z-50">
        <div className="h-full bg-indigo-600 w-0" id="scroll-progress"></div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* ================= LEFT: CONTENT ================= */}
        <div className="lg:col-span-8 lg:col-start-2">

          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-slate-900">Engineering</span>
          </nav>

          <header className="mb-12">
            <div className="flex flex-wrap gap-3 mb-6">
              {(post.keywords || ['Engineering']).slice(0, 3).map(tag => (
                <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {post.description}
            </p>

            <div className="flex items-center gap-6 text-sm border-t border-b border-slate-100 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  {(post.author || 'A').charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{post.author || 'Editor'}</p>
                  <p className="text-slate-500">{formatDate(post.date)}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-slate-500 hidden sm:flex">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </header>

          <article
            className="tech-blog-content"
            dangerouslySetInnerHTML={{ __html: post.content || '<p>Content under review.</p>' }}
          />

          <div className="mt-20 bg-slate-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/30">
                <Activity className="w-3 h-3" /> Recommended Tool
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
                Is your resume engineered correctly?
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                Stop guessing. Check your ATS compatibility score instantly with our engineering-grade scanner.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-white text-slate-900 hover:bg-indigo-50 px-8 py-4 rounded-lg font-bold text-base transition-all hover:scale-105"
              >
                Run Free Scan →
              </Link>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: STICKY SIDEBAR ================= */}
        <aside className="hidden lg:block lg:col-span-3 relative">
          <div className="sticky top-24 space-y-8">

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Share2 className="w-3 h-3" /> Share Insight
              </p>
              <LinkedInCard
                config={liConfig}
                url={pageUrl}
              />
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">ATS Score Check</h4>
              <p className="text-sm text-slate-500 mb-4">
                See how your resume parses before you apply.
              </p>
              <Link
                href="/"
                className="block w-full text-center bg-slate-900 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
              >
                Check Now
              </Link>
            </div>

            {post.keywords && post.keywords.length > 0 && (
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Tag className="w-3 h-3" /> Related Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((keyword) => (
                    <span key={keyword} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-pointer">
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
