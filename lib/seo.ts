import { SITE_URL } from '@/lib/site'

export const SITE_NAME = 'GBP-Guard'
export const SITE_TAGLINE = 'Google Review Removal for Local Business'
export const DEFAULT_DESCRIPTION =
  'GBP-Guard helps local businesses remove unfair Google reviews with policy-led case building and expert support.'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/gbp-guard-business-owner.png`
export const SUPPORT_EMAIL = 'support@gbp-guard.com'
export const SUPPORT_PHONE = '+13239680000'

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized === '/' ? '' : normalized}`
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/icon.svg'),
    email: SUPPORT_EMAIL,
    telephone: SUPPORT_PHONE,
    description: DEFAULT_DESCRIPTION,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_EMAIL,
        telephone: SUPPORT_PHONE,
        availableLanguage: ['English'],
      },
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    description: DEFAULT_DESCRIPTION,
    email: SUPPORT_EMAIL,
    telephone: SUPPORT_PHONE,
    areaServed: 'US',
    priceRange: '$$',
    serviceType: ['Google review removal', 'Reputation management'],
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function blogPostingSchema({
  title,
  description,
  slug,
  datePublished,
  image,
  keywords,
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  image?: string | null
  keywords?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    mainEntityOfPage: absoluteUrl(`/${slug}`),
    image: image ? [image] : [DEFAULT_OG_IMAGE],
    keywords: keywords || undefined,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon.svg'),
      },
    },
  }
}

export function blogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    url: absoluteUrl('/blog'),
    description: 'Practical guidance for protecting your Google Business Profile reputation.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}
