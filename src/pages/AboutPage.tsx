import {
  ArrowUpRight,
  Globe2,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { AboutMomentsSection } from '../components/about/AboutMomentsSection'
import { AboutPeopleSections } from '../components/about/AboutPeopleSections'
import { AboutVision2030Section } from '../components/about/AboutVision2030Section'
import { AboutVisionSection } from '../components/about/AboutVisionSection'
import { AboutWhySection } from '../components/about/AboutWhySection'
import { Reveal } from '../components/about/Reveal'
import { useLanguage } from '../i18n'

const whoPoints = [
  { titleKey: 'about.who.1.title', descKey: 'about.who.1.desc', icon: Globe2 },
  { titleKey: 'about.who.2.title', descKey: 'about.who.2.desc', icon: MapPin },
  { titleKey: 'about.who.3.title', descKey: 'about.who.3.desc', icon: ShieldCheck },
] as const

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
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t('about.hero.subtitle')}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                className="btn-cta sm:text-base"
              >
                {t('about.hero.ctaDemo')}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <AboutMomentsSection />

      <AboutVisionSection />

      <section className="section-y relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="section-shell grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal className="h-full min-h-0">
            <div className="h-full min-h-[320px] overflow-hidden rounded-[1.5rem] border border-brand-secondary shadow-elegant sm:min-h-[420px] lg:min-h-full">
              <img
                src="/assets/executive.png"
                alt={t('about.who.imageAlt')}
                className="h-full w-full object-cover object-[center_18%]"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal className="flex h-full min-h-0 flex-col justify-between gap-6 lg:gap-8">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-[color:var(--navy-deep)] md:text-4xl lg:text-[2.5rem]">
                {t('about.who.title')}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t('about.who.body')}
              </p>
            </div>

            <div className="flex flex-1 flex-col justify-end gap-4">
              {whoPoints.map((item, index) => {
                const Icon = item.icon
                const accent = index % 2 === 1
                return (
                  <div
                    key={item.titleKey}
                    className={`${accent ? 'card-oa-accent' : 'card-oa'} card-oa-row flex-1`}
                  >
                    <div className="card-oa-icon">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="card-oa-title text-sm">{t(item.titleKey)}</h3>
                      <p className="card-oa-desc text-sm">{t(item.descKey)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <AboutVision2030Section />

      <AboutWhySection />

      <AboutPeopleSections />
    </main>
  )
}
