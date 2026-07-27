import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Bot, Layers3, Route, Sparkles } from 'lucide-react'
import { approachSteps } from '../data/content'
import { useLanguage } from '../i18n'
import { Reveal } from './Reveal'

const stepMeta: Record<
  number,
  {
    icon: LucideIcon
    accent: string
    iconBg: string
    ring: string
    bar: string
    glow: string
  }
> = {
  1: {
    icon: Sparkles,
    accent: 'text-[#1447E6]',
    iconBg: 'bg-[#1447E6]/12 text-[#1447E6]',
    ring: 'ring-[#1447E6]/20',
    bar: 'from-[#1447E6] to-[#5b8cff]',
    glow: 'group-hover:shadow-[0_22px_48px_-24px_rgba(20,71,230,0.45)]',
  },
  2: {
    icon: Route,
    accent: 'text-[#0f38b8]',
    iconBg: 'bg-[#0f38b8]/12 text-[#0f38b8]',
    ring: 'ring-[#0f38b8]/20',
    bar: 'from-[#0f38b8] to-[#1447E6]',
    glow: 'group-hover:shadow-[0_22px_48px_-24px_rgba(15,56,184,0.4)]',
  },
  3: {
    icon: Bot,
    accent: 'text-brand-navy',
    iconBg: 'bg-brand-navy/10 text-brand-navy',
    ring: 'ring-brand-navy/15',
    bar: 'from-brand-navy to-[#1447E6]',
    glow: 'group-hover:shadow-[0_22px_48px_-24px_rgba(7,17,35,0.35)]',
  },
  4: {
    icon: Layers3,
    accent: 'text-brand-green',
    iconBg: 'bg-brand-green/12 text-brand-green',
    ring: 'ring-brand-green/20',
    bar: 'from-brand-green to-[#1447E6]',
    glow: 'group-hover:shadow-[0_22px_48px_-24px_rgba(22,163,74,0.35)]',
  },
}

const desktopOffsets = [
  'lg:mt-0',
  'lg:mt-8',
  'lg:mt-4',
  'lg:mt-12',
] as const

function ApproachCard({
  step,
  stepKey,
  isLast,
  offsetClass,
}: {
  step: number
  stepKey: (typeof approachSteps)[number]['key']
  isLast: boolean
  offsetClass: string
}) {
  const { t } = useLanguage()
  const meta = stepMeta[step]
  const Icon = meta.icon

  return (
    <article className={`group relative flex h-full flex-col ${offsetClass}`}>
      {/* Desktop connector node */}
      {!isLast ? (
        <div
          className="pointer-events-none absolute -end-4 top-[4.75rem] z-20 hidden lg:flex"
          aria-hidden="true"
        >
          <div className="approach-connector flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#1447E6] text-white shadow-[0_8px_20px_-8px_rgba(20,71,230,0.7)]">
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </div>
        </div>
      ) : null}

      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[rgba(15,23,42,0.06)] bg-white/95 p-6 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_16px_40px_-12px_rgba(20,71,230,0.18)] ${meta.glow} md:p-7`}
      >
        <div
          className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${meta.bar}`}
          aria-hidden="true"
        />

        {/* Watermark step number — premium background element */}
        <span
          className="approach-step-watermark pointer-events-none absolute bottom-0 end-0 z-0 select-none"
          aria-hidden="true"
        >
          {String(step).padStart(2, '0')}
        </span>

        <div className="relative z-10 mb-5 flex items-start justify-between gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 transition duration-300 group-hover:scale-105 ${meta.iconBg} ${meta.ring}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-brand-primary px-2.5 text-sm font-bold text-white shadow-md shadow-brand-primary/25">
            {String(step).padStart(2, '0')}
          </span>
        </div>

        <p
          className={`relative z-10 mb-2 text-xs font-bold uppercase tracking-[0.14em] ${meta.accent}`}
        >
          {t(`approach.${stepKey}.timing`)}
        </p>
        <h3 className="relative z-10 mb-3 text-lg font-bold text-brand-primary md:text-xl">
          {t(`approach.${stepKey}.title`)}
        </h3>
        <p className="relative z-10 text-sm leading-relaxed text-brand-muted">
          {t(`approach.${stepKey}.description`)}
        </p>
      </div>
    </article>
  )
}

export function Approach() {
  const { t } = useLanguage()

  return (
    <section id="approach" className="section-y relative overflow-hidden">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in oklab, #1447E6 14%, white), transparent 55%), linear-gradient(180deg, #f8fbff 0%, white 42%, #f3f7ff 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -start-24 top-24 h-72 w-72 rounded-full bg-[#1447E6]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-20 bottom-10 h-80 w-80 rounded-full bg-brand-sky/40 blur-3xl"
      />
      <div className="absolute inset-0 -z-10 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

      <div className="section-shell relative">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#1447E6]/15 bg-white/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#1447E6] shadow-sm backdrop-blur">
            <Route className="h-3.5 w-3.5" aria-hidden="true" />
            {t('approach.badge')}
          </span>
          <h2 className="section-title mx-auto text-center lg:text-5xl">
            {t('approach.title')}
          </h2>
          <p className="section-subtitle mx-auto text-center">
            {t('approach.subtitle')}
          </p>
        </Reveal>

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {approachSteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 100} className="h-full">
              <ApproachCard
                step={item.step}
                stepKey={item.key}
                isLast={index === approachSteps.length - 1}
                offsetClass={desktopOffsets[index]}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
