import { whyUs } from '../data/content'
import { useLanguage } from '../i18n'
import { Icon } from './Icon'
import { Reveal } from './Reveal'

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: (typeof whyUs)[number]['icon']
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition hover:bg-white/15 sm:p-7">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#1447E6] shadow-sm">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/80">{description}</p>
    </div>
  )
}

export function WhyUs() {
  const { t } = useLanguage()
  const leftCards = whyUs.slice(0, 2)
  const rightCards = whyUs.slice(2, 4)

  return (
    <section id="why-us" className="bg-[#1447E6] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {t('whyUs.title')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">
            {t('whyUs.subtitle')}
          </p>
        </Reveal>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-8">
          <div className="flex flex-col gap-6">
            {leftCards.map((item, index) => (
              <Reveal key={item.key} delay={index * 80}>
                <FeatureCard
                  icon={item.icon}
                  title={t(`whyUs.${item.key}.title`)}
                  description={t(`whyUs.${item.key}.description`)}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={100} className="overflow-hidden rounded-3xl shadow-2xl lg:min-h-[520px]">
            <img
              src="/assets/hero-slide-1.png"
              alt={t('whyUs.imageAlt')}
              className="h-full min-h-[320px] w-full object-cover object-center"
              loading="lazy"
            />
          </Reveal>

          <div className="flex flex-col gap-6">
            {rightCards.map((item, index) => (
              <Reveal key={item.key} delay={index * 80 + 40}>
                <FeatureCard
                  icon={item.icon}
                  title={t(`whyUs.${item.key}.title`)}
                  description={t(`whyUs.${item.key}.description`)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
