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

export const services = [
  { key: 'training' as const, icon: 'training' as const },
  { key: 'agents' as const, icon: 'agents' as const },
  { key: 'ops' as const, icon: 'ops' as const },
]

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
