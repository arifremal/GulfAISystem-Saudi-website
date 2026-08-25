/** Preferred production origin (non-www HTTPS). */
export const SITE_ORIGIN = 'https://gulfaisystems.com.sa'
export const SITE_NAME = 'Gulf AI Systems'
export const OG_IMAGE_PATH = '/og-image.jpg'
export const OG_IMAGE_URL = `${SITE_ORIGIN}${OG_IMAGE_PATH}`

export const ORGANIZATION = {
  name: SITE_NAME,
  url: SITE_ORIGIN,
  email: 'info@gulfaisystems.com.sa',
  telephone: '+966535455063',
  logo: `${SITE_ORIGIN}/favicon.webp`,
  address: {
    streetAddress: "Level 26, King's Road Tower, King Abdul Aziz Road",
    addressLocality: 'Jeddah',
    postalCode: '21499',
    addressCountry: 'SA',
  },
} as const

/** Canonical URLs use HTTPS apex host with no trailing slash (except homepage `/`). */
export function canonicalizePath(path = '/'): string {
  if (!path || path === '/') return '/'
  const withSlash = path.startsWith('/') ? path : `/${path}`
  const stripped = withSlash.replace(/\/+$/, '')
  return stripped || '/'
}

export function absoluteUrl(path = '/'): string {
  const canonical = canonicalizePath(path)
  return canonical === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${canonical}`
}

export type PageMetaInput = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  imageUrl?: string
  noindex?: boolean
}

type MetaSnapshot = {
  title: string
  description: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogUrl: string
  ogImage: string
  ogType: string
  twitterCard: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  robots: string
}

function ensureMeta(attr: 'name' | 'property', key: string): HTMLMetaElement {
  const selector =
    attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`
  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  return el
}

function ensureLink(rel: string): HTMLLinkElement {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  return el
}

function readSnapshot(): MetaSnapshot {
  return {
    title: document.title,
    description: ensureMeta('name', 'description').getAttribute('content') ?? '',
    canonical: ensureLink('canonical').getAttribute('href') ?? '',
    ogTitle: ensureMeta('property', 'og:title').getAttribute('content') ?? '',
    ogDescription: ensureMeta('property', 'og:description').getAttribute('content') ?? '',
    ogUrl: ensureMeta('property', 'og:url').getAttribute('content') ?? '',
    ogImage: ensureMeta('property', 'og:image').getAttribute('content') ?? '',
    ogType: ensureMeta('property', 'og:type').getAttribute('content') ?? '',
    twitterCard: ensureMeta('name', 'twitter:card').getAttribute('content') ?? '',
    twitterTitle: ensureMeta('name', 'twitter:title').getAttribute('content') ?? '',
    twitterDescription: ensureMeta('name', 'twitter:description').getAttribute('content') ?? '',
    twitterImage: ensureMeta('name', 'twitter:image').getAttribute('content') ?? '',
    robots: ensureMeta('name', 'robots').getAttribute('content') ?? '',
  }
}

function writeSnapshot(snapshot: MetaSnapshot) {
  document.title = snapshot.title
  ensureMeta('name', 'description').setAttribute('content', snapshot.description)
  ensureLink('canonical').setAttribute('href', snapshot.canonical)
  ensureMeta('property', 'og:title').setAttribute('content', snapshot.ogTitle)
  ensureMeta('property', 'og:description').setAttribute('content', snapshot.ogDescription)
  ensureMeta('property', 'og:url').setAttribute('content', snapshot.ogUrl)
  ensureMeta('property', 'og:image').setAttribute('content', snapshot.ogImage)
  ensureMeta('property', 'og:type').setAttribute('content', snapshot.ogType)
  ensureMeta('name', 'twitter:card').setAttribute('content', snapshot.twitterCard)
  ensureMeta('name', 'twitter:title').setAttribute('content', snapshot.twitterTitle)
  ensureMeta('name', 'twitter:description').setAttribute('content', snapshot.twitterDescription)
  ensureMeta('name', 'twitter:image').setAttribute('content', snapshot.twitterImage)
  if (snapshot.robots) {
    ensureMeta('name', 'robots').setAttribute('content', snapshot.robots)
  } else {
    document.head.querySelector('meta[name="robots"]')?.remove()
  }
}

/** Apply unique page metadata. Returns a restore function for cleanup. */
export function applyPageMeta(input: PageMetaInput): () => void {
  const prev = readSnapshot()
  const url = absoluteUrl(input.path)
  const image = input.imageUrl ?? OG_IMAGE_URL

  writeSnapshot({
    title: input.title,
    description: input.description,
    canonical: url,
    ogTitle: input.title,
    ogDescription: input.description,
    ogUrl: url,
    ogImage: image,
    ogType: input.type ?? 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: input.title,
    twitterDescription: input.description,
    twitterImage: image,
    robots: input.noindex ? 'noindex, nofollow' : 'index, follow',
  })

  return () => writeSnapshot(prev)
}

export function upsertJsonLd(id: string, data: object): HTMLScriptElement {
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
  return el
}

export function removeJsonLd(id: string) {
  document.getElementById(id)?.remove()
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    logo: ORGANIZATION.logo,
    address: {
      '@type': 'PostalAddress',
      ...ORGANIZATION.address,
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
    },
    inLanguage: ['en', 'ar'],
  }
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
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
