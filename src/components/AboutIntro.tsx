import { ArrowRight, Building2, Clock3, Globe2, Languages } from 'lucide-react'
import { useLanguage } from '../i18n'
import { Reveal } from './Reveal'

const stats = [
  {
    valueKey: 'proof.1.value',
    labelKey: 'proof.1.label',
    icon: Globe2,
    featured: true,
  },
  {
    valueKey: 'proof.2.value',
    labelKey: 'proof.2.label',
    icon: Clock3,
    featured: false,
  },
  {
    valueKey: 'proof.4.value',
    labelKey: 'proof.4.label',
    icon: Languages,
    featured: false,
  },
] as const

export function AboutIntro() {
  const { t } = useLanguage()

  return (
    <section id="about-intro" className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-14">
        {/* Left: image + overlay card */}
        <Reveal className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-[0_20px_50px_-20px_rgba(20,71,230,0.35)]">
            <img
              src="/assets/about-hero-team.webp"
              alt={t('aboutIntro.imageAlt')}
              className="h-[420px] w-full object-cover object-center md:h-[520px]"
              loading="lazy"
            />
          </div>

          <div className="absolute bottom-5 start-5 max-w-[240px] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur sm:bottom-8 sm:start-8 sm:max-w-[260px] sm:p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1447E6]/10 text-[#1447E6]">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-brand-primary">
              {t('aboutIntro.cardTitle')}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-brand-muted sm:text-sm">
              {t('aboutIntro.cardDesc')}
            </p>
          </div>
        </Reveal>

        {/* Right: content + stats */}
        <Reveal delay={120}>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1447E6]">
            {t('aboutIntro.eyebrow')}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-primary md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {t('aboutIntro.title')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-muted md:text-lg">
            {t('aboutIntro.body')}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.labelKey}
                  className={`rounded-2xl p-4 text-center sm:p-5 ${
                    stat.featured
                      ? 'bg-[#1447E6] text-white shadow-lg shadow-[#1447E6]/30'
                      : 'border border-[#1447E6]/10 bg-[#eef3ff] text-[#1447E6]'
                  }`}
                >
                  <Icon
                    className={`mx-auto mb-3 h-6 w-6 ${
                      stat.featured ? 'text-white' : 'text-[#1447E6]'
                    }`}
                    aria-hidden="true"
                  />
                  <p
                    className={`text-2xl font-bold ${
                      stat.featured ? 'text-white' : 'text-brand-primary'
                    }`}
                  >
                    {t(stat.valueKey)}
                  </p>
                  <p
                    className={`mt-1 text-xs font-medium leading-snug ${
                      stat.featured ? 'text-white/85' : 'text-brand-muted'
                    }`}
                  >
                    {t(stat.labelKey)}
                  </p>
                </div>
              )
            })}
          </div>

          <a
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1447E6] px-7 py-3.5 text-sm font-semibold text-white shadow transition hover:bg-[#0f38b8]"
          >
            {t('aboutIntro.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
