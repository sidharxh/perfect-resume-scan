import { MetadataRoute } from 'next'
import { blogs } from '@/app/blog/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://perfectresumescan.com'

  const staticRoutes = [
    {
      url: `${baseUrl}`, // Homepage
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`, // Blog Index
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  const blogRoutes = Object.values(blogs).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
