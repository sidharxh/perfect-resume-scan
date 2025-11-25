import Link from 'next/link'
import Image from 'next/image'
import { blogs } from './data'
import { Metadata } from 'next'
import { ArrowRight, Clock, TrendingUp } from 'lucide-react'

const BLOG_URL = 'https://perfectresumescan.com/blog'
const DEFAULT_IMAGE = '/blog-og-image.jpg'

export const metadata: Metadata = {
  title: 'Resume Intelligence Blog | Expert ATS & Interview Strategies',
  description: 'Data-backed strategies to beat ATS scanners and get hired. Expert insights on keyword optimization, resume formatting, and modern interview strategies.',
  alternates: {
    canonical: BLOG_URL,
  },
  openGraph: {
    title: 'Resume Intelligence Blog | PerfectResumeScan',
    description: 'Data-backed strategies to beat ATS scanners and get hired.',
    url: BLOG_URL,
    siteName: 'PerfectResumeScan',
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Resume Intelligence Blog - PerfectResumeScan',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Intelligence Blog | PerfectResumeScan',
    description: 'Data-backed strategies to beat ATS scanners and get hired.',
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
    name: 'Resume Intelligence Blog',
    headline: 'Crack the Hiring Code: ATS & Resume Strategies',
    description: 'Data-backed strategies to beat ATS scanners and get hired.',
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
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* JSON-LD Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6 shadow-sm border border-blue-200/50">
            <TrendingUp size={16} />
            <span>Resume Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Crack the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Hiring Code</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Expert insights on ATS algorithms, keyword optimization, and modern interview strategies.
          </p>
        </div>

        {/* FEATURED HERO POST */}
        {featuredPost && (
          <div className="mb-20 group relative">
            <Link href={`/blog/${featuredPost.slug}`} className="block">
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 grid md:grid-cols-2 min-h-[400px]">

                {/* Image Side */}
                <div className="relative h-64 md:h-full overflow-hidden bg-slate-100">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
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
                <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-indigo-200">
                      Featured
                    </span>
                    <span className="text-slate-500 text-sm font-medium flex items-center gap-1">
                      <Clock size={14} /> 5 min read
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-slate-600 text-lg mb-8 leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 shrink-0">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{featuredPost.author}</span>
                      <span className="text-xs text-slate-500">{featuredPost.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* REGULAR GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post, idx) => {
            const displayImage = post.image || DEFAULT_IMAGE
            const colors = ['bg-blue-50 text-blue-700', 'bg-purple-50 text-purple-700', 'bg-emerald-50 text-emerald-700']
            const badgeColor = colors[idx % colors.length]

            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">

                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors z-10" />
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
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${badgeColor}`}>
                        {post.keywords?.[0] || 'Guide'}
                      </span>
                      <span className="text-slate-400 text-xs font-medium">
                        {post.date}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                      {post.description}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex items-center text-blue-600 font-semibold text-sm group/btn">
                      Read Article
                      <ArrowRight size={16} className="ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
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
