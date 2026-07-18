import { industries } from '../data/content'
import { useLanguage } from '../i18n'
import { Icon } from './Icon'
import { Reveal } from './Reveal'

const industryImages: Record<string, string> = {
  construction: '/assets/industry-construction.webp',
  logistics: '/assets/industry-logistics.webp',
  healthcare: '/assets/industry-healthcare.webp',
  manufacturing: '/assets/industry-manufacturing.png',
  retail: '/assets/industry-retail.webp',
  professional: '/assets/industry-professional.png',
}

export function Industries() {
  const { t } = useLanguage()

  return (
    <section id="industries" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-brand-primary md:text-4xl">
            {t('industries.title')}
          </h2>
          <p className="text-lg text-brand-muted">{t('industries.subtitle')}</p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => {
            const imageSrc = industryImages[industry.id] ?? '/assets/hero.webp'
            const title = t(`industries.${industry.id}.title`)
            const description = t(`industries.${industry.id}.description`)
            const content = (
              <>
                <img
                  src={imageSrc}
                  alt={t('industries.imageAlt', { title })}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1dcc] via-[#020b1d99] to-[#020b1d40]" />
                <div className="relative z-10">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1447E6] text-white shadow-lg shadow-[#1447E6]/40">
                    <Icon name={industry.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold leading-tight text-white">
                    {title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-white/85">
                    {description}
                  </p>
                  <span
                    className={`inline-flex items-center text-base font-semibold ${
                      industry.available
                        ? 'text-white group-hover:underline'
                        : 'text-white/90'
                    }`}
                  >
                    {industry.available
                      ? t('industries.learnMore')
                      : t('industries.comingSoon')}
                    <span className="ml-1">→</span>
                  </span>
                </div>
              </>
            )

            const className =
              'group relative min-h-[260px] overflow-hidden rounded-3xl border border-brand-secondary/60 p-5 transition hover:border-brand-accent/40 hover:shadow-2xl'

            if (industry.available && industry.href) {
              return (
                <Reveal key={industry.id} delay={index * 70}>
                  <a
                    href={industry.href}
                    className={`${className} block h-full`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content}
                  </a>
                </Reveal>
              )
            }

            return (
              <Reveal key={industry.id} delay={index * 70}>
                <div className={className}>{content}</div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
