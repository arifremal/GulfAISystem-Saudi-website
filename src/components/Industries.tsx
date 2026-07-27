import { industries } from '../data/content'
import { useLanguage } from '../i18n'
import { Icon } from './Icon'
import { Reveal } from './Reveal'

const industryImages: Record<
  string,
  { src: string; position: string }
> = {
  construction: {
    src: '/assets/home-section/industry-construction.png',
    position: 'object-[70%_28%]',
  },
  logistics: {
    src: '/assets/home-section/industry-logistics.png',
    position: 'object-[72%_30%]',
  },
  healthcare: {
    src: '/assets/home-section/industry-healthcare.png',
    position: 'object-[center_22%]',
  },
  manufacturing: {
    src: '/assets/home-section/industry-manufacturing.png',
    position: 'object-[center_25%]',
  },
  retail: {
    src: '/assets/home-section/industry-retail.png',
    position: 'object-[68%_28%]',
  },
  professional: {
    src: '/assets/home-section/industry-professional.png',
    position: 'object-[center_20%]',
  },
}

export function Industries() {
  const { t } = useLanguage()

  return (
    <section id="industries" className="section-bg-soft section-y relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.14] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />
      <div className="section-shell relative">
        <Reveal className="mb-12 max-w-3xl">
          <p className="section-eyebrow">{t('nav.industries')}</p>
          <h2 className="section-title">{t('industries.title')}</h2>
          <p className="section-subtitle">{t('industries.subtitle')}</p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => {
            const image = industryImages[industry.id]
            const imageSrc = image?.src ?? '/assets/hero.webp'
            const position = image?.position ?? 'object-center'
            const title = t(`industries.${industry.id}.title`)
            const content = (
              <>
                <img
                  src={imageSrc}
                  alt={t('industries.imageAlt', { title })}
                  className={`absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105 ${position}`}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#020b1d]/82 via-[#020b1d]/48 to-[#020b1d]/22"
                  aria-hidden="true"
                />
                <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-between p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--cta)] text-white shadow-lg shadow-[color:var(--cta)]/40">
                    <Icon name={industry.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold leading-tight text-white">
                      {title}
                    </h3>
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
                      <span className="ml-1 rtl:mr-1 rtl:ml-0">→</span>
                    </span>
                  </div>
                </div>
              </>
            )

            const className = 'card-image group'

            if (industry.available && industry.href) {
              return (
                <Reveal key={industry.id} delay={index * 70} className="h-full">
                  <a
                    href={industry.href}
                    className={`${className} block`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={title}
                  >
                    {content}
                  </a>
                </Reveal>
              )
            }

            return (
              <Reveal key={industry.id} delay={index * 70} className="h-full">
                <div className={className}>{content}</div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
