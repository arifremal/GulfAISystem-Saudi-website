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
    <section className="section-y relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in oklab, var(--brand-sky) 18%, white) 0%, white 55%, color-mix(in oklab, var(--brand-sky) 12%, white) 100%)',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />

      <div className="section-shell relative z-10">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)]">
              {t('about.why.eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[color:var(--navy-deep)] md:text-5xl">
              {t('about.why.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t('about.why.subtitle')}
            </p>
          </div>
        </Reveal>

        <div className="section-gap grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
          {items.map((item, i) => (
            <Reveal key={item.titleKey} delay={i * 60} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--brand)]/10 bg-white/80 p-6 shadow-[0_10px_36px_rgba(8,25,56,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[color:var(--brand)]/25 hover:shadow-[0_18px_44px_rgba(0,101,210,0.12)] md:p-7">
                <div
                  aria-hidden
                  className={`absolute -end-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${item.accent} opacity-[0.08] blur-2xl transition duration-300 group-hover:opacity-20`}
                />
                <div
                  className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-[0_10px_24px_rgba(0,101,210,0.28)]`}
                >
                  {item.icon}
                </div>
                <h3 className="relative mt-5 text-base font-bold text-[color:var(--navy-deep)] md:text-lg">
                  {t(item.titleKey)}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(item.descKey)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
