import type { MetadataRoute } from 'next'
import { BACKEND_API_URL, type BlogPost } from '@/lib/blogApi'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-dynamic'

async function fetchAllPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = []
  let page = 1
  let totalPages = 1

  while (page <= totalPages && page <= 50) {
    const response = await fetch(`${BACKEND_API_URL}/posts?page=${page}&perPage=50`, {
      cache: 'no-store',
    })
    if (!response.ok) break
    const data = await response.json()
    posts.push(...(data.posts || []))
    totalPages = Number(data.totalPages) || 1
    page += 1
  }

  return posts
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  try {
    const posts = await fetchAllPosts()
    for (const post of posts) {
      entries.push({
        url: `${SITE_URL}/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  } catch {
    // Keep static entries even if the API is temporarily unavailable.
  }

  return entries
}
