import { Bot, MapPin, Sparkles, Workflow } from 'lucide-react'
import { useLanguage } from '../../i18n'
import { Reveal } from './Reveal'

const visionIcons = [Workflow, Bot, MapPin] as const

const cards = [
  { titleKey: 'about.vision.1.title', descKey: 'about.vision.1.desc' },
  { titleKey: 'about.vision.2.title', descKey: 'about.vision.2.desc' },
  { titleKey: 'about.vision.3.title', descKey: 'about.vision.3.desc' },
] as const

function VisionNetworkLines() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.14]"
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="vision-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--brand-light)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <circle cx="600" cy="200" r="3" fill="var(--brand)" opacity="0.5" />
      <circle cx="280" cy="120" r="2.5" fill="var(--brand)" opacity="0.4" />
      <circle cx="920" cy="140" r="2.5" fill="var(--brand)" opacity="0.4" />
      <line x1="600" y1="200" x2="280" y2="120" stroke="url(#vision-line)" strokeWidth="1" />
      <line x1="600" y1="200" x2="920" y2="140" stroke="url(#vision-line)" strokeWidth="1" />
      <line x1="280" y1="120" x2="920" y2="140" stroke="url(#vision-line)" strokeWidth="0.75" opacity="0.6" />
    </svg>
  )
}

export function AboutVisionSection() {
  const { t } = useLanguage()

  return (
    <section className="section-y relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(165deg, color-mix(in oklab, var(--brand-sky) 35%, white) 0%, white 45%, color-mix(in oklab, var(--brand-sky) 22%, white) 100%)',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <VisionNetworkLines />

      <div className="section-shell relative z-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)] shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t('about.vision.badge')}
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-[color:var(--navy-deep)] md:text-4xl lg:text-5xl">
              {t('about.vision.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t('about.vision.subtitle')}
            </p>
          </div>
        </Reveal>

        <div className="section-gap grid gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((card, i) => {
            const Icon = visionIcons[i % visionIcons.length]
            const accent = i % 2 === 1
            return (
              <Reveal key={card.titleKey} className="h-full">
                <article className={`${accent ? 'card-oa-accent' : 'card-oa'} card-oa-center`}>
                  <div className="card-oa-icon">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="card-oa-title">{t(card.titleKey)}</h3>
                  <p className="card-oa-desc">{t(card.descKey)}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
