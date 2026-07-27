import type { ReactNode } from 'react'
import { useLanguage } from '../../i18n'
import { Reveal } from './Reveal'

type WhyItem = {
  titleKey: string
  descKey: string
  accent: string
  icon: ReactNode
}

const items: WhyItem[] = [
  {
    titleKey: 'about.why.1.title',
    descKey: 'about.why.1.desc',
    accent: 'from-[#0065d2] to-[#38bdf8]',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-7 w-7">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.25" opacity="0.35" />
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.25" opacity="0.55" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    titleKey: 'about.why.2.title',
    descKey: 'about.why.2.desc',
    accent: 'from-[#0ea5e9] to-[#0065d2]',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-7 w-7">
        <rect x="10" y="14" width="28" height="22" rx="5" stroke="currentColor" strokeWidth="2.25" />
        <circle cx="19" cy="25" r="2.5" fill="currentColor" />
        <circle cx="29" cy="25" r="2.5" fill="currentColor" />
        <path d="M18 31c1.8 2 4 3 6 3s4.2-1 6-3" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
        <path d="M24 8v6M16 10l3 4M32 10l-3 4" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    titleKey: 'about.why.3.title',
    descKey: 'about.why.3.desc',
    accent: 'from-[#1a2f4f] to-[#0065d2]',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-7 w-7">
        <path d="M10 30h28" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" opacity="0.4" />
        <path d="M14 30V18l10-6 10 6v12" stroke="currentColor" strokeWidth="2.25" strokeLinejoin="round" />
        <path d="M20 30v-8h8v8" stroke="currentColor" strokeWidth="2.25" strokeLinejoin="round" />
        <path d="M24 12v6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
        <circle cx="36" cy="14" r="5" fill="currentColor" opacity="0.2" />
        <path d="M34 14h4M36 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    titleKey: 'about.why.4.title',
    descKey: 'about.why.4.desc',
    accent: 'from-[#0065d2] to-[#081938]',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-7 w-7">
        <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="2.25" />
        <ellipse cx="24" cy="24" rx="7" ry="15" stroke="currentColor" strokeWidth="2.25" />
        <path d="M9 24h30M12 16h24M12 32h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      </svg>
    ),
  },
  {
    titleKey: 'about.why.5.title',
    descKey: 'about.why.5.desc',
    accent: 'from-[#38bdf8] to-[#0065d2]',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M28 8 14 26h9l-3 14 14-18h-9l3-14Z"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.15"
        />
      </svg>
    ),
  },
  {
    titleKey: 'about.why.6.title',
    descKey: 'about.why.6.desc',
    accent: 'from-[#081938] to-[#0ea5e9]',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M24 8 12 13v11c0 8.5 5.2 14.8 12 17 6.8-2.2 12-8.5 12-17V13L24 8Z"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <path d="m19 24 3.5 3.5L29 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export function AboutWhySection() {
  const { t } = useLanguage()

  return (
    <section className="section-y section-bg-oa relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />

      <div className="section-shell relative z-10">
        <Reveal>
          <div className="max-w-3xl">
            <p className="section-eyebrow">{t('about.why.eyebrow')}</p>
            <h2 className="section-title md:text-5xl">{t('about.why.title')}</h2>
            <p className="section-subtitle">{t('about.why.subtitle')}</p>
          </div>
        </Reveal>

        <div className="section-gap grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {items.map((item, i) => {
            const accent = i % 2 === 1
            return (
              <Reveal key={item.titleKey} delay={i * 60} className="h-full">
                <article className={`${accent ? 'card-oa-accent' : 'card-oa'} card-oa-center`}>
                  <div className="card-oa-icon">{item.icon}</div>
                  <h3 className="card-oa-title">{t(item.titleKey)}</h3>
                  <p className="card-oa-desc">{t(item.descKey)}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
