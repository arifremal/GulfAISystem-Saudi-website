import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Cog,
  Factory,
  Flag,
  Gauge,
  GraduationCap,
  HeartPulse,
  Languages,
  Layers3,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { servicePages, type ServicePageKey } from '../data/content'
import { useLanguage } from '../i18n'
import { PageSeo } from '../components/PageSeo'
import { OptimizedImage } from '../components/OptimizedImage'
import { Reveal } from '../components/Reveal'
import { ConsultationModal } from '../components/ConsultationModal'
import { SITE_ORIGIN, breadcrumbSchema } from '../lib/seo'
const FAQ_COUNT = 9
const WHY_COUNT = 4
const HOW_COUNT = 4
const BENEFIT_COUNT = 4
const AUDIENCE_COUNT = 6
const OUTCOME_COUNT = 4
const IMPLEMENT_COUNT = 6
const CHOOSE_COUNT = 4

const whyIcons: LucideIcon[] = [Sparkles, ShieldCheck, Users, Layers3]
const howIcons: LucideIcon[] = [GraduationCap, Workflow, Bot, Cog]
const outcomeIcons: LucideIcon[] = [Zap, Gauge, Target, Rocket]
const implementIcons: LucideIcon[] = [Search, Layers3, Cog, GraduationCap, Flag, ShieldCheck]
const chooseIcons: LucideIcon[] = [Building2, Flag, Bot, Languages]
const audienceIcons: LucideIcon[] = [
  Building2,
  HeartPulse,
  Factory,
  Truck,
  Users,
  Cog,
]

function k(service: ServicePageKey, path: string) {
  return `servicePage.${service}.${path}`
}

function HowDeliverProcess({
  service,
  imageSrc,
  imageAlt,
  t,
}: {
  service: ServicePageKey
  imageSrc: string
  imageAlt: string
  t: (key: string, vars?: Record<string, string | number>) => string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDrawn(true)
      return
    }

    const el = trackRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const steps = Array.from({ length: HOW_COUNT }, (_, i) => i + 1)

  return (
    <div
      ref={trackRef}
      className={`contact-process grid grid-cols-1 items-start gap-8 overflow-x-hidden md:grid-cols-[0.46fr_0.54fr] md:items-stretch md:gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-[4.5rem] ${
        drawn ? 'is-drawn' : ''
      }`}
    >
      <div className="min-h-0 min-w-0 md:h-full">
        <div className="relative isolate aspect-[3/2] w-full overflow-hidden rounded-2xl md:aspect-auto md:h-full md:rounded-[1.35rem]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className={
              service === 'training'
                ? 'absolute inset-0 h-full w-full object-cover object-[center_15%]'
                : 'absolute inset-0 h-full w-full object-cover object-[center_20%]'
            }
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <ol className="relative min-w-0 w-full space-y-0">
        <div
          aria-hidden
          className="contact-process-line-vertical pointer-events-none absolute start-7 top-5 bottom-5 w-[2px] overflow-hidden rounded-full bg-[#1447E6]/20 sm:start-8"
        >
          <span className="contact-process-line-fill-vertical absolute inset-x-0 top-0 h-full rounded-full bg-gradient-to-b from-[#38bdf8] via-[#1447E6] to-[#0065d2]" />
        </div>

        {steps.map((n, index) => {
          const Icon = howIcons[index % howIcons.length]
          return (
            <li
              key={n}
              className="contact-process-step relative z-10 flex items-start gap-4 pb-7 last:pb-0 sm:gap-5 sm:pb-8"
              style={{ '--step-i': index } as CSSProperties}
            >
              <div className="contact-process-node group relative flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#1447E6]/15 opacity-70 blur-md"
                />
                <span className="contact-process-ring absolute inset-0 rounded-full border-2 border-[#1447E6]/25 bg-white shadow-[0_10px_28px_-14px_rgba(0,101,210,0.5)]" />
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1447E6] to-[#0065d2] text-white shadow-md shadow-[#1447E6]/35 sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <div className="min-w-0 flex-1 pt-1.5 sm:pt-2">
                <p className="contact-process-num text-[0.65rem] font-bold tracking-[0.16em] text-[#1447E6]">
                  0{n}
                </p>
                <h3 className="contact-process-label mt-1 text-base font-bold text-brand-primary sm:text-lg">
                  {t(k(service, `how.${n}.title`))}
                </h3>
                <p className="contact-process-desc mt-1 text-sm leading-relaxed text-brand-muted">
                  {t(k(service, `how.${n}.desc`))}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function FaqItem({
  id,
  open,
  onToggle,
  question,
  answer,
}: {
  id: string
  open: boolean
  onToggle: () => void
  question: string
  answer: string
}) {
  return (
    <div className="border-b border-brand-secondary">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-5 text-start transition"
      >
        <h3
          className={`text-sm font-semibold leading-snug md:text-base ${
            open ? 'text-brand-primary' : 'text-brand-muted'
          }`}
        >
          {question}
        </h3>
        {open ? (
          <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-[#1447E6]" aria-hidden="true" />
        ) : (
          <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-brand-muted/60" aria-hidden="true" />
        )}
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={`grid transition-all duration-500 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pe-8 text-sm leading-relaxed text-brand-muted md:text-base">{answer}</p>
        </div>
      </div>
    </div>
  )
}

function ImagePlaceholder({
  src,
  alt,
  comment,
  className = '',
  fill = false,
  priority = false,
}: {
  src: string
  alt: string
  comment: string
  className?: string
  fill?: boolean
  priority?: boolean
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        kind={priority ? 'banner' : 'card'}
        width={1600}
        height={900}
        className={
          fill
            ? 'absolute inset-0 h-full w-full object-cover'
            : 'h-full w-full object-cover'
        }
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
      <span className="sr-only">{comment}</span>
    </div>
  )
}

/** Equal-height content + media columns with vertical centering */
function SplitBalance({
  imageRight = false,
  media,
  children,
}: {
  imageRight?: boolean
  media: ReactNode
  children: ReactNode
}) {
  return (
    <div className="section-shell grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-14">
      <Reveal
        className={`flex h-full min-h-0 ${
          imageRight ? 'order-2' : 'order-2 lg:order-1'
        }`}
      >
        <div className="relative h-full w-full min-h-[18rem] overflow-hidden rounded-[1.5rem] border border-brand-secondary shadow-elegant sm:min-h-[22rem] lg:min-h-[26rem]">
          {media}
        </div>
      </Reveal>
      <Reveal
        delay={100}
        className={`flex h-full flex-col justify-center ${
          imageRight ? 'order-1' : 'order-1 lg:order-2'
        }`}
      >
        {children}
      </Reveal>
    </div>
  )
}

export function ServicePage({ service }: { service: ServicePageKey }) {
  const { t } = useLanguage()
  const config = servicePages[service]
  const [openFaq, setOpenFaq] = useState<number | null>(1)
  const [consultOpen, setConsultOpen] = useState(false)
  const pageUrl = `${SITE_ORIGIN}${config.path}`
  const title = t(k(service, 'meta.title'))
  const description = t(k(service, 'meta.description'))

  const schemas = useMemo(
    () => ({
      [`service-${service}-faq-schema`]: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: Array.from({ length: FAQ_COUNT }, (_, i) => i + 1).map((n) => ({
          '@type': 'Question',
          name: t(k(service, `faq.${n}.q`)),
          acceptedAnswer: {
            '@type': 'Answer',
            text: t(k(service, `faq.${n}.a`)),
          },
        })),
      },
      [`service-${service}-breadcrumb-schema`]: breadcrumbSchema([
        { name: t('servicePage.shared.home'), path: '/' },
        { name: t('servicePage.shared.services'), path: '/#services' },
        { name: t(k(service, 'breadcrumb')), path: config.path },
      ]),
      [`service-${service}-schema`]: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: t(k(service, 'hero.title')),
        description,
        url: pageUrl,
        provider: {
          '@type': 'Organization',
          name: 'Gulf AI Systems',
          url: SITE_ORIGIN,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Saudi Arabia',
        },
      },
    }),
    [service, t, config.path, description, pageUrl],
  )

  return (
    <main className="overflow-x-hidden bg-white">
      <PageSeo
        title={title}
        description={description}
        path={config.path}
        schemas={schemas}
      />
      {/* 1 — Hero */}
      <section className="relative min-h-[72vh] overflow-hidden md:min-h-[78vh]">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <ImagePlaceholder
            src={config.heroImage}
            alt={t(k(service, 'hero.imageAlt'))}
            comment="Hero Image"
            className="h-full w-full"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#020b1d]/50 via-[#0a1f4d]/22 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020b1d]/45 via-transparent to-[#020b1d]/12" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 72% 48%, rgba(20,71,230,0.22) 0%, rgba(56,189,248,0.08) 40%, transparent 72%)',
          }}
        />
        <div className="pointer-events-none absolute -end-20 top-1/4 h-[26rem] w-[26rem] rounded-full bg-[#1447E6]/20 blur-3xl" />
        <div className="pointer-events-none absolute start-1/4 bottom-0 h-56 w-[32rem] rounded-full bg-[#38bdf8]/12 blur-3xl" />

        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-6 pb-14 pt-28 sm:justify-center sm:pb-20 md:min-h-[78vh] lg:px-8">
          <Reveal immediate className="max-w-3xl">
            <nav aria-label={t('servicePage.shared.breadcrumbAria')} className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/65">
                <li>
                  <a href="/" className="transition hover:text-white">
                    {t('servicePage.shared.home')}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a href="/#services" className="transition hover:text-white">
                    {t('servicePage.shared.services')}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/90">{t(k(service, 'breadcrumb'))}</li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              {t(k(service, 'hero.eyebrow'))}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t(k(service, 'hero.title'))}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t(k(service, 'hero.subtitle'))}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => setConsultOpen(true)} className="btn-cta sm:text-base">
                {t(k(service, 'hero.ctaPrimary'))}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — Why this solution */}
      <section className="section-y section-bg-oa relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid opacity-15 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        <div className="section-shell relative">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="section-eyebrow">{t(k(service, 'why.eyebrow'))}</p>
            <h2 className="section-title mx-auto text-center">{t(k(service, 'why.title'))}</h2>
            <p className="section-subtitle mx-auto text-center">{t(k(service, 'why.subtitle'))}</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: WHY_COUNT }, (_, i) => i + 1).map((n, index) => {
              const Icon = whyIcons[index % whyIcons.length]
              const accent = index % 2 === 1
              return (
                <Reveal key={n} delay={index * 70} className="h-full">
                  <article className={`${accent ? 'card-oa-accent' : 'card-oa'} card-oa-center`}>
                    <div className="card-oa-icon">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="card-oa-title">{t(k(service, `why.${n}.title`))}</h3>
                    <p className="card-oa-desc">{t(k(service, `why.${n}.desc`))}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3 — Business Outcomes */}
      <section className="section-y relative overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(20,71,230,0.06),transparent_55%)]" />
        <div className="section-shell relative">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="section-eyebrow">{t(k(service, 'outcomes.eyebrow'))}</p>
            <h2 className="section-title mx-auto text-center">{t(k(service, 'outcomes.title'))}</h2>
            <p className="section-subtitle mx-auto text-center">{t(k(service, 'outcomes.subtitle'))}</p>
          </Reveal>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#1447E6]/10 bg-gradient-to-br from-[#f4f8ff] via-white to-[#eef5ff] px-5 py-8 sm:px-8 sm:py-10 lg:px-4 lg:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-10 top-0 hidden h-px bg-gradient-to-r from-transparent via-[#1447E6]/25 to-transparent lg:block"
            />
            <ul className="grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-0">
              {Array.from({ length: OUTCOME_COUNT }, (_, i) => i + 1).map((n, index) => {
                const Icon = outcomeIcons[index % outcomeIcons.length]
                return (
                  <Reveal key={n} delay={index * 90}>
                    <li
                      className={`relative flex h-full flex-col items-center px-4 text-center lg:px-8 ${
                        index < OUTCOME_COUNT - 1
                          ? 'lg:after:absolute lg:after:end-0 lg:after:top-[12%] lg:after:bottom-[12%] lg:after:w-px lg:after:bg-gradient-to-b lg:after:from-transparent lg:after:via-[#1447E6]/20 lg:after:to-transparent'
                          : ''
                      }`}
                    >
                      <span className="relative mb-5 inline-flex">
                        <span
                          aria-hidden
                          className="absolute inset-0 scale-125 rounded-2xl bg-[#1447E6]/10 blur-md"
                        />
                        <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#1447E6] to-[#0065d2] text-white shadow-[0_14px_32px_-14px_rgba(20,71,230,0.7)]">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                      </span>
                      <p className="text-[0.65rem] font-bold tracking-[0.16em] text-[#1447E6] uppercase">
                        0{n}
                      </p>
                      <h3 className="mt-2 text-lg font-bold tracking-tight text-brand-primary">
                        {t(k(service, `outcomes.${n}.title`))}
                      </h3>
                      <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-brand-muted">
                        {t(k(service, `outcomes.${n}.desc`))}
                      </p>
                    </li>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 — How it works */}
      <section id="how-it-works" className="section-y section-bg-soft relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        <div className="section-shell relative">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="section-eyebrow">{t(k(service, 'how.eyebrow'))}</p>
            <h2 className="section-title mx-auto text-center">{t(k(service, 'how.title'))}</h2>
            <p className="section-subtitle mx-auto text-center">{t(k(service, 'how.subtitle'))}</p>
          </Reveal>
          <HowDeliverProcess
            service={service}
            imageSrc={config.howImage}
            imageAlt={t(k(service, 'how.imageAlt'))}
            t={t}
          />
        </div>
      </section>

      {/* 5 — Benefits (image left / text right) */}
      <section className="section-y relative overflow-hidden bg-white">
        <SplitBalance
          media={
            <ImagePlaceholder
              src={config.benefitsImage}
              alt={t(k(service, 'benefits.imageAlt'))}
              comment="Benefits Image"
              fill
              className="absolute inset-0 h-full w-full"
            />
          }
        >
          <p className="section-eyebrow">{t(k(service, 'benefits.eyebrow'))}</p>
          <h2 className="section-title">{t(k(service, 'benefits.title'))}</h2>
          <p className="section-subtitle max-w-lg">{t(k(service, 'benefits.subtitle'))}</p>
          <ul className="mt-6 space-y-2.5">
            {Array.from({ length: BENEFIT_COUNT }, (_, i) => i + 1).map((n) => (
              <li
                key={n}
                className="flex items-start gap-3 text-sm leading-snug text-brand-muted md:text-[0.95rem]"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1447E6]" aria-hidden="true" />
                <span>{t(k(service, `benefits.${n}`))}</span>
              </li>
            ))}
          </ul>
        </SplitBalance>
      </section>

      {/* 6 — Implementation Process (NEW timeline) */}
      <section className="section-y section-bg-oa relative overflow-hidden">
        <div className="section-shell relative">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="section-eyebrow">{t(k(service, 'implement.eyebrow'))}</p>
            <h2 className="section-title mx-auto text-center">{t(k(service, 'implement.title'))}</h2>
            <p className="section-subtitle mx-auto text-center">{t(k(service, 'implement.subtitle'))}</p>
          </Reveal>

          {/* Desktop horizontal timeline */}
          <div className="relative hidden lg:block">
            <div
              aria-hidden
              className="absolute start-8 end-8 top-7 h-px bg-gradient-to-r from-[#1447E6]/20 via-[#1447E6]/45 to-[#1447E6]/20"
            />
            <div className="grid grid-cols-6 gap-4">
              {Array.from({ length: IMPLEMENT_COUNT }, (_, i) => i + 1).map((n, index) => {
                const Icon = implementIcons[index % implementIcons.length]
                return (
                  <Reveal key={n} delay={index * 80} className="text-center">
                    <div className="relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#1447E6]/25 bg-white text-[#1447E6] shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#1447E6] uppercase">
                      0{n}
                    </p>
                    <h3 className="mt-2 text-sm font-bold text-brand-primary">
                      {t(k(service, `implement.${n}.title`))}
                    </h3>
                    <p className="mt-1.5 text-xs leading-snug text-brand-muted">
                      {t(k(service, `implement.${n}.desc`))}
                    </p>
                  </Reveal>
                )
              })}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="relative space-y-0 lg:hidden">
            <div
              aria-hidden
              className="absolute start-[1.65rem] top-4 bottom-4 w-px bg-gradient-to-b from-[#1447E6]/40 via-[#1447E6]/25 to-transparent"
            />
            {Array.from({ length: IMPLEMENT_COUNT }, (_, i) => i + 1).map((n, index) => {
              const Icon = implementIcons[index % implementIcons.length]
              return (
                <Reveal key={n} delay={index * 60} className="relative flex gap-4 pb-8 last:pb-0">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#1447E6]/25 bg-white text-[#1447E6] shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="pt-2">
                    <p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#1447E6] uppercase">
                      0{n}
                    </p>
                    <h3 className="mt-1 text-base font-bold text-brand-primary">
                      {t(k(service, `implement.${n}.title`))}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-brand-muted">
                      {t(k(service, `implement.${n}.desc`))}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7 — Who it is for */}
      <section className="section-y relative overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10 bg-grid opacity-12 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="section-shell relative">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="section-eyebrow">{t(k(service, 'audience.eyebrow'))}</p>
            <h2 className="section-title mx-auto text-center">{t(k(service, 'audience.title'))}</h2>
            <p className="section-subtitle mx-auto text-center">{t(k(service, 'audience.subtitle'))}</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: AUDIENCE_COUNT }, (_, i) => i + 1).map((n, index) => {
              const Icon = audienceIcons[index % audienceIcons.length]
              const accent = index % 2 === 1
              return (
                <Reveal key={n} delay={index * 60} className="h-full">
                  <article className={`${accent ? 'card-oa-accent' : 'card-oa'} card-oa-row`}>
                    <div className="card-oa-icon">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="card-oa-title text-base">{t(k(service, `audience.${n}.title`))}</h3>
                      <p className="card-oa-desc">{t(k(service, `audience.${n}.desc`))}</p>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 8 — Why Choose Gulf AI Systems */}
      <section className="section-y section-bg-soft relative overflow-hidden">
        <SplitBalance
          imageRight
          media={
            <ImagePlaceholder
              src={config.chooseImage}
              alt={t(k(service, 'choose.imageAlt'))}
              comment="Why Choose / Department Image"
              fill
              className="absolute inset-0 h-full w-full"
            />
          }
        >
          <p className="section-eyebrow">{t(k(service, 'choose.eyebrow'))}</p>
          <h2 className="section-title">{t(k(service, 'choose.title'))}</h2>
          <p className="section-subtitle max-w-lg">{t(k(service, 'choose.subtitle'))}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: CHOOSE_COUNT }, (_, i) => i + 1).map((n, index) => {
              const Icon = chooseIcons[index % chooseIcons.length]
              return (
                <article key={n} className="card-oa card-oa-row !p-3.5">
                  <div className="card-oa-icon !h-10 !w-10">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="card-oa-title text-sm">{t(k(service, `choose.${n}.title`))}</h3>
                    <p className="card-oa-desc text-xs">{t(k(service, `choose.${n}.desc`))}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </SplitBalance>
      </section>

      {/* 9 — FAQ */}
      <section className="section-y section-bg-oa relative overflow-hidden">
        <div className="section-shell relative">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="section-eyebrow">{t(k(service, 'faq.eyebrow'))}</p>
            <h2 className="section-title mx-auto text-center">{t(k(service, 'faq.title'))}</h2>
            <p className="section-subtitle mx-auto text-center">{t(k(service, 'faq.subtitle'))}</p>
          </Reveal>
          <Reveal
            delay={80}
            className="mx-auto max-w-3xl rounded-[1.5rem] border border-brand-secondary/70 bg-white px-5 shadow-[var(--shadow-card)] sm:px-8"
          >
            {Array.from({ length: FAQ_COUNT }, (_, i) => i + 1).map((n) => (
              <FaqItem
                key={n}
                id={`service-${service}-faq-${n}`}
                open={openFaq === n}
                onToggle={() => setOpenFaq((prev) => (prev === n ? null : n))}
                question={t(k(service, `faq.${n}.q`))}
                answer={t(k(service, `faq.${n}.a`))}
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* Related internal links */}
      <section className="section-y border-t border-brand-secondary/60 bg-white">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="section-title mx-auto text-center text-2xl md:text-3xl">
              {t(k(service, 'related.title'))}
            </h2>
            <nav
              aria-label={t(k(service, 'related.title'))}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold"
            >
              {service !== 'training' && (
                <a href={servicePages.training.path} className="text-[#1447E6] transition hover:underline">
                  {t(k(service, 'related.training'))}
                </a>
              )}
              {service !== 'agents' && (
                <a href={servicePages.agents.path} className="text-[#1447E6] transition hover:underline">
                  {t(k(service, 'related.agents'))}
                </a>
              )}
              {service !== 'ops' && (
                <a href={servicePages.ops.path} className="text-[#1447E6] transition hover:underline">
                  {t(k(service, 'related.ops'))}
                </a>
              )}
              <a href="/about" className="text-[#1447E6] transition hover:underline">
                {t(k(service, 'related.about'))}
              </a>
              <a href="/contact" className="text-[#1447E6] transition hover:underline">
                {t(k(service, 'related.contact'))}
              </a>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* 10 — Final CTA */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-[#38bdf8] via-[#0065d2] to-[#0a1f4d] px-6 py-12 text-center shadow-[0_20px_50px_-20px_rgba(0,101,210,0.45)] sm:px-10 sm:py-16 md:rounded-[2rem] md:px-16">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {t(k(service, 'cta.title'))}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            {t(k(service, 'cta.body'))}
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => setConsultOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-white/90 sm:w-auto sm:text-base"
            >
              {t(k(service, 'cta.primary'))}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </section>

      <ConsultationModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </main>
  )
}
