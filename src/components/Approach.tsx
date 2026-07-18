import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Bot, Layers3, Route, Sparkles } from 'lucide-react'
import { approachSteps } from '../data/content'
import { useLanguage } from '../i18n'
import { Reveal } from './Reveal'

const stepMeta: Record<
  number,
  { icon: LucideIcon; accent: string; iconBg: string }
> = {
  1: {
    icon: Sparkles,
    accent: 'text-brand-accent',
    iconBg: 'bg-brand-accent/10 text-brand-accent',
  },
  2: {
    icon: Route,
    accent: 'text-[#1447E6]',
    iconBg: 'bg-[#1447E6]/10 text-[#1447E6]',
  },
  3: {
    icon: Bot,
    accent: 'text-brand-navy',
    iconBg: 'bg-brand-navy/10 text-brand-navy',
  },
  4: {
    icon: Layers3,
    accent: 'text-brand-green',
    iconBg: 'bg-brand-green/10 text-brand-green',
  },
}

function ApproachCard({
  step,
  stepKey,
  isLast,
}: {
  step: number
  stepKey: (typeof approachSteps)[number]['key']
  isLast: boolean
}) {
  const { t } = useLanguage()
  const meta = stepMeta[step]
  const Icon = meta.icon

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative flex h-full flex-col rounded-[1.35rem] border border-brand-secondary/80 bg-white p-6 shadow-[0_8px_30px_rgba(7,17,35,0.06)] transition duration-300 hover:-translate-y-1 hover:border-brand-accent/25 hover:shadow-[0_20px_50px_-20px_rgba(0,101,210,0.22)] md:p-7">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-105 ${meta.iconBg}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white shadow-sm">
            {step}
          </span>
        </div>

        <p
          className={`mb-2 text-xs font-bold uppercase tracking-[0.14em] ${meta.accent}`}
        >
          {t(`approach.${stepKey}.timing`)}
        </p>
        <h3 className="mb-3 text-lg font-bold text-brand-primary">
          {t(`approach.${stepKey}.title`)}
        </h3>
        <p className="text-sm leading-relaxed text-brand-muted">
          {t(`approach.${stepKey}.description`)}
        </p>
      </div>

      {!isLast ? (
        <div
          className="pointer-events-none absolute -right-3 top-[3.25rem] z-10 hidden lg:flex"
          aria-hidden="true"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-secondary bg-white text-brand-accent shadow-sm">
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      ) : null}
    </article>
  )
}

export function Approach() {
  const { t } = useLanguage()

  return (
    <section id="approach" className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, white 0%, color-mix(in oklab, var(--brand-sky) 18%, white) 50%, white 100%)',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-secondary bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-accent shadow-sm">
            <Route className="h-3.5 w-3.5" aria-hidden="true" />
            {t('approach.badge')}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-brand-primary md:text-4xl lg:text-5xl">
            {t('approach.title')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-muted md:text-lg">
            {t('approach.subtitle')}
          </p>
        </Reveal>

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent lg:block"
          />

          {approachSteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 90} className="h-full">
              <ApproachCard
                step={item.step}
                stepKey={item.key}
                isLast={index === approachSteps.length - 1}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
