export const CONTACT_EMAIL = 'info@gulfaisystems.com.sa'
export const WHATSAPP_URL = 'https://wa.me/966535455063'
export const WHATSAPP_DISPLAY = '+966 53 545 5063'
export const ASSESSMENT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('AI Readiness Assessment')}`

export const industries = [
  {
    id: 'construction',
    href: 'https://construction.gulfaisystems.com.sa',
    available: true,
    icon: 'construction' as const,
  },
  {
    id: 'logistics',
    href: 'https://logistics.gulfaisystems.com.sa',
    available: true,
    icon: 'logistics' as const,
  },
  {
    id: 'healthcare',
    href: 'https://healthcare.gulfaisystems.com.sa',
    available: true,
    icon: 'healthcare' as const,
  },
  {
    id: 'manufacturing',
    href: 'https://manufacturing.gulfaisystems.com.sa',
    available: true,
    icon: 'manufacturing' as const,
  },
  {
    id: 'retail',
    href: 'https://retail.gulfaisystems.com.sa',
    available: true,
    icon: 'retail' as const,
  },
  {
    id: 'professional',
    href: 'https://professionalservices.gulfaisystems.com.sa',
    available: true,
    icon: 'professional' as const,
  },
]

export const serviceKeys = ['training', 'agents', 'ops'] as const

export type ServicePageKey = (typeof serviceKeys)[number]

export const services = [
  { key: 'training' as const, icon: 'training' as const },
  { key: 'agents' as const, icon: 'agents' as const },
  { key: 'ops' as const, icon: 'ops' as const },
]

/** Dedicated AI capability landing pages */
export const servicePages: Record<
  ServicePageKey,
  {
    slug: string
    path: string
    heroImage: string
    howImage: string
    benefitsImage: string
    chooseImage: string
    ctaImage: string
  }
> = {
  training: {
    slug: 'ai-training',
    path: '/ai-training',
    heroImage: '/assets/services/service-copilot-1.png',
    howImage: '/assets/services/service-ai-training-how.png',
    benefitsImage: '/assets/services/service-copilot-2.png',
    chooseImage: '/assets/services/why-gulf-ai-systems.png',
    ctaImage: '/assets/services/service-copilot-3.png',
  },
  agents: {
    slug: 'private-ai-agents',
    path: '/ai-capabilities/private-ai-agents',
    heroImage: '/assets/services/service-agents-1.png',
    howImage: '/assets/services/service-agents-how.png',
    benefitsImage: '/assets/services/service-agents-benefits.png',
    chooseImage: '/assets/services/why-gulf-ai-systems.png',
    ctaImage: '/assets/services/service-agents-3.png',
  },
  ops: {
    slug: 'operations-automation',
    path: '/ai-capabilities/operations-automation',
    heroImage: '/assets/services/service-ops-1.png',
    howImage: '/assets/services/service-ops-how.png',
    benefitsImage: '/assets/services/service-ops-benefits.png',
    chooseImage: '/assets/services/why-gulf-ai-systems.png',
    ctaImage: '/assets/services/service-ops-3.png',
  },
}

/** Map legacy service URLs to current paths (SEO / bookmarks). */
export function resolveServicePathname(pathname: string): string {
  const normalized = pathname.replace(/\/$/, '') || '/'
  const legacyTrainingPaths = [
    '/ai-training',
    '/ai-capabilities/microsoft-copilot-training',
    '/ai-capabilities/ai-training',
    '/services/microsoft-copilot-training',
    '/services/ai-training',
  ]
  if (legacyTrainingPaths.includes(normalized) || normalized === servicePages.training.path) {
    return servicePages.training.path
  }
  for (const config of Object.values(servicePages)) {
    if (normalized === `/services/${config.slug}`) return config.path
    if (normalized === `/ai-capabilities/${config.slug}`) return config.path
  }
  return normalized
}

export function getServiceKeyFromPath(pathname: string): ServicePageKey | null {
  const normalized = resolveServicePathname(pathname)
  const entry = (Object.entries(servicePages) as [ServicePageKey, (typeof servicePages)[ServicePageKey]][]).find(
    ([, config]) => config.path === normalized,
  )
  return entry?.[0] ?? null
}

export const approachSteps = [
  { step: 1, key: '1' as const },
  { step: 2, key: '2' as const },
  { step: 3, key: '3' as const },
  { step: 4, key: '4' as const },
]

export const problemKeys = ['1', '2', '3', '4'] as const

export const whyUs = [
  { key: '1' as const, icon: 'saudi' as const },
  { key: '2' as const, icon: 'platform' as const },
  { key: '3' as const, icon: 'roi' as const },
  { key: '4' as const, icon: 'human' as const },
]

export const proofStatKeys = ['1', '2', '3', '4'] as const
