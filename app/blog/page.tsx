import type { Metadata } from 'next'
import { BlogFooter, BlogHeader } from '@/components/blog/BlogChrome'
import JsonLd from '@/components/seo/JsonLd'
import { blogSchema, breadcrumbSchema, DEFAULT_OG_IMAGE } from '@/lib/seo'
import { indexFollowRobots } from '@/lib/site'
import BlogList from './BlogList'

const title = 'GBP-Guard Blog | Reputation Defense Insights'
const description = 'Practical guidance for protecting your Google Business Profile reputation.'

export const metadata: Metadata = {
  title: 'Blog | Reputation Defense Insights',
  description,
  robots: indexFollowRobots,
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'website',
    title,
    description,
    url: '/blog',
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function BlogPage() {
  return (
    <div className="blog-page">
      <JsonLd
        data={[
          blogSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
        ]}
      />
      <BlogHeader />
      <main className="blog-main">
        <BlogList />
      </main>
      <BlogFooter />
    </div>
  )
}
