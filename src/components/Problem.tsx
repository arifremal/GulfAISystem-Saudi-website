import { problemKeys } from '../data/content'
import { useLanguage } from '../i18n'
import { OptimizedImage } from './OptimizedImage'
import { Reveal } from './Reveal'

export function Problem() {
  const { t } = useLanguage()
  const [hoursLost, compliance, silos, competitors] = problemKeys

  return (
    <section className="section-y border-y border-brand-secondary bg-brand-bg">
      <div className="section-shell">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 className="section-title mx-auto text-center lg:text-5xl">
            {t('problem.title')}
          </h2>
          <p className="section-subtitle mx-auto text-center">
            {t('problem.subtitle')}
          </p>
        </Reveal>

        <div className="grid auto-rows-[minmax(240px,auto)] gap-4 md:gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
          {/* Wide image card — top left */}
          <Reveal className="group relative min-h-[280px] overflow-hidden rounded-[1.75rem] lg:col-span-2 lg:row-start-1" as="article">
            <OptimizedImage
              src="/assets/paperwork.webp"
              alt={t(`problem.${hoursLost}.title`)}
              kind="card"
              width={1200}
              height={800}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
              <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">
                {t(`problem.${hoursLost}.title`)}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                {t(`problem.${hoursLost}.description`)}
              </p>
            </div>
          </Reveal>

          {/* Light solid card — top right */}
          <Reveal
            delay={80}
            as="article"
            className="flex min-h-[240px] flex-col justify-center rounded-[1.75rem] bg-[#E4EBF3] p-7 md:p-9 lg:col-start-3 lg:row-start-1"
          >
            <h3 className="mb-3 text-xl font-bold text-brand-primary md:text-2xl">
              {t(`problem.${compliance}.title`)}
            </h3>
            <p className="text-sm leading-relaxed text-brand-muted md:text-base">
              {t(`problem.${compliance}.description`)}
            </p>
          </Reveal>

          {/* Mid solid card — bottom left */}
          <Reveal
            delay={120}
            as="article"
            className="flex min-h-[240px] flex-col justify-end rounded-[1.75rem] bg-brand-navy p-7 md:p-9 lg:col-start-1 lg:row-start-2"
          >
            <h3 className="mb-3 text-xl font-bold text-white md:text-2xl">
              {t(`problem.${silos}.title`)}
            </h3>
            <p className="text-sm leading-relaxed text-white/80 md:text-base">
              {t(`problem.${silos}.description`)}
            </p>
          </Reveal>

          {/* Wide dark card with person — bottom right */}
          <Reveal
            delay={160}
            as="article"
            className="relative min-h-[280px] overflow-hidden rounded-[1.75rem] bg-brand-deep lg:col-span-2 lg:col-start-2 lg:row-start-2"
          >
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%] opacity-40 sm:opacity-100 sm:w-[40%] md:w-[38%]">
              <OptimizedImage
                src="/assets/executive.png"
                alt={t(`problem.${competitors}.title`)}
                kind="card"
                width={800}
                height={1000}
                className="h-full w-full object-cover object-[center_18%]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/55 to-transparent" />
            </div>
            <div className="relative z-10 flex h-full min-h-[280px] max-w-[min(100%,28rem)] flex-col justify-end p-7 sm:max-w-[60%] md:p-9">
              <h3 className="mb-3 text-xl font-bold text-white md:text-2xl">
                {t(`problem.${competitors}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-white/80 md:text-base">
                {t(`problem.${competitors}.description`)}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
