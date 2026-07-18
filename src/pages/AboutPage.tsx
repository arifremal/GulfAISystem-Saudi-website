import {
  ArrowUpRight,
  Globe2,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { AboutPeopleSections } from '../components/about/AboutPeopleSections'
import { AboutVisionSection } from '../components/about/AboutVisionSection'
import { AboutWhySection } from '../components/about/AboutWhySection'
import { Reveal } from '../components/about/Reveal'
import { useLanguage } from '../i18n'

const whoPoints = [
  { titleKey: 'about.who.1.title', descKey: 'about.who.1.desc' },
  { titleKey: 'about.who.2.title', descKey: 'about.who.2.desc' },
  { titleKey: 'about.who.3.title', descKey: 'about.who.3.desc' },
] as const
const whoWeAreIcons = [Globe2, MapPin, ShieldCheck] as const

export function AboutPage() {
  const { t } = useLanguage()

  return (
    <main className="overflow-x-hidden">
      <section className="relative min-h-[88vh] overflow-hidden">
        <div className="absolute inset-0">
          <picture>
            <source srcSet="/assets/about-hero-team.webp" type="image/webp" />
            <img
              src="/assets/about-hero-team-hq.png"
              alt=""
              className="about-hero-media h-full w-full object-cover object-[center_35%]"
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#020b1d]/90 via-[#020b1d]/62 to-[#020b1d]/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020b1d]/80 via-transparent to-[#020b1d]/45" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 sm:justify-center sm:pb-24 lg:px-8">
          <Reveal immediate className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              {t('about.hero.eyebrow')}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {t('about.hero.title')}
              <span
                className="ml-4 inline-block h-[3px] w-14 translate-y-[-0.15em] bg-[#1447E6] align-middle sm:w-20"
                aria-hidden
              />
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t('about.hero.subtitle')}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#1447E6] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0f38b8] sm:text-base"
              >
                {t('about.hero.ctaDemo')}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/15 sm:text-base"
              >
                {t('about.hero.ctaContact')}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <AboutVisionSection />

      <section className="section-y relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="section-shell section-split">
          <Reveal className="h-full min-h-0">
            <img
              src="/assets/executive.png"
              alt={t('about.who.imageAlt')}
              className="h-full w-full rounded-3xl border border-brand-secondary object-cover shadow-elegant"
            />
          </Reveal>
          <Reveal className="section-split-col min-h-0">
            <h2 className="text-3xl font-bold leading-tight text-[color:var(--navy-deep)] md:text-5xl">
              {t('about.who.title')}
            </h2>
            <p className="mt-5 mobile-prose text-muted-foreground">{t('about.who.body')}</p>
            <div className="mt-8 space-y-3">
              {whoPoints.map((item, i) => {
                const Icon = whoWeAreIcons[i % whoWeAreIcons.length]
                return (
                  <div
                    key={item.titleKey}
                    className="group flex items-start gap-3 rounded-2xl border border-[color:var(--brand)]/10 bg-white p-5 shadow-sm"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-light)] text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[color:var(--navy-deep)]">
                        {t(item.titleKey)}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {t(item.descKey)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <AboutWhySection />

      <AboutPeopleSections />
    </main>
  )
}
