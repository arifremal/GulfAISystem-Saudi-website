import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Cpu,
  Globe2,
  Languages,
  Layers3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  Sparkles,
  XCircle,
} from 'lucide-react'
import { CONTACT_PAGE_SERVICE_OPTIONS } from '../lib/contact-page-services'
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../lib/web3forms'
import { trackFormSubmission } from '../lib/analytics'
import {
  CALL_PHONE_DISPLAY,
  CALL_PHONE_E164,
  WHATSAPP_PHONE_DISPLAY,
  WHATSAPP_URL,
} from '../lib/site-meta'
import { ConsultationModal } from '../components/ConsultationModal'
import { OptimizedImage } from '../components/OptimizedImage'
import { PageSeo } from '../components/PageSeo'
import { Reveal } from '../components/Reveal'
import { useLanguage } from '../i18n'
import { ORGANIZATION, SITE_ORIGIN, breadcrumbSchema } from '../lib/seo'

const CONTACT_EMAIL = ORGANIZATION.email
const HERO_IMAGE = '/assets/contact/contact-hero-banner.png'
const FORM_IMAGE = '/assets/contact/contact-form.png'

const FAQ_LEFT = [1, 2, 3, 4, 5, 6, 7] as const
const FAQ_RIGHT = [8, 9, 10, 11, 12, 13, 14] as const
const FAQ_ALL = [...FAQ_LEFT, ...FAQ_RIGHT] as const

const WHY_ITEMS: { key: string; icon: LucideIcon; accent: string }[] = [
  { key: 'enterprise', icon: Cpu, accent: 'from-[#0065d2] to-[#38bdf8]' },
  { key: 'australia', icon: Globe2, accent: 'from-[#0ea5e9] to-[#0065d2]' },
  { key: 'specialists', icon: Layers3, accent: 'from-[#1a2f4f] to-[#0065d2]' },
  { key: 'bilingual', icon: Languages, accent: 'from-[#0065d2] to-[#081938]' },
]

const PROCESS_STEPS: { key: string; icon: LucideIcon; num: string }[] = [
  { key: 'contact', icon: MessageCircle, num: '01' },
  { key: 'discovery', icon: PhoneCall, num: '02' },
  { key: 'demo', icon: Sparkles, num: '03' },
  { key: 'proposal', icon: CheckCircle2, num: '04' },
]

type FieldProps = {
  id: string
  label: string
  className?: string
  children: ReactNode
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.96.52 3.82 1.44 5.45L2 22l4.9-1.55a9.9 9.9 0 0 0 5.14 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 14.17c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.16-4.93-4.35-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.57-.35.76-.35h.55c.17 0 .41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.28.75 1.23 1.61 2 .96 1 1.85 1.36 2.13 1.51.28.17.45.14.62-.07.17-.21.74-.86.94-1.15.2-.28.4-.24.67-.14.28.1 1.74.82 2.04.97.3.14.5.22.57.34.08.12.08.7-.16 1.37z" />
    </svg>
  )
}

function ContactProcessTimeline({
  t,
}: {
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
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={trackRef}
      className={`contact-process ${drawn ? 'is-drawn' : ''}`}
    >
      {/* Desktop: horizontal timeline */}
      <ol className="relative hidden lg:grid lg:grid-cols-4 lg:gap-0">
        <div
          aria-hidden
          className="contact-process-line pointer-events-none absolute start-[12.5%] end-[12.5%] top-12 h-[2px] overflow-hidden rounded-full bg-brand-secondary/70"
        >
          <span className="contact-process-line-fill absolute inset-y-0 start-0 w-full rounded-full bg-gradient-to-r from-[#38bdf8] via-[#1447E6] to-[#0065d2]" />
        </div>

        {PROCESS_STEPS.map((step, index) => {
          const Icon = step.icon
          return (
            <li
              key={step.key}
              className="contact-process-step relative z-10 flex flex-col items-center text-center"
              style={{ '--step-i': index } as CSSProperties}
            >
              <div className="contact-process-node group relative flex h-24 w-24 cursor-default items-center justify-center">
                <span
                  aria-hidden
                  className="contact-process-glow absolute inset-0 rounded-full bg-[#1447E6]/15 opacity-0 blur-md transition duration-500 group-hover:opacity-100"
                />
                <span className="contact-process-ring absolute inset-0 rounded-full border-2 border-[#1447E6]/25 bg-white/70 shadow-[0_12px_40px_-16px_rgba(0,101,210,0.45)] backdrop-blur-md transition duration-500 group-hover:scale-105 group-hover:border-[#1447E6]/55 group-hover:shadow-[0_16px_48px_-12px_rgba(20,71,230,0.55)]" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1447E6] to-[#0065d2] text-white shadow-lg shadow-[#1447E6]/35 transition duration-500 group-hover:scale-110">
                  <Icon className="h-7 w-7 transition duration-500 group-hover:scale-110" aria-hidden="true" />
                </span>
              </div>
              <p className="contact-process-num mt-5 text-xs font-bold tracking-[0.18em] text-[#1447E6]">
                {step.num}
              </p>
              <h3 className="contact-process-label mt-2 text-base font-bold text-brand-primary md:text-lg">
                {t(`contact.process.${step.key}.title`)}
              </h3>
            </li>
          )
        })}
      </ol>

      {/* Tablet: 2x2 */}
      <ol className="relative hidden grid-cols-2 gap-x-10 gap-y-14 md:grid lg:hidden">
        <div
          aria-hidden
          className="contact-process-line pointer-events-none absolute start-[25%] end-[25%] top-12 h-[2px] overflow-hidden rounded-full bg-brand-secondary/70"
        >
          <span className="contact-process-line-fill absolute inset-y-0 start-0 w-full rounded-full bg-gradient-to-r from-[#38bdf8] via-[#1447E6] to-[#0065d2]" />
        </div>
        <div
          aria-hidden
          className="contact-process-line pointer-events-none absolute start-[25%] end-[25%] top-[calc(50%+1.5rem)] h-[2px] overflow-hidden rounded-full bg-brand-secondary/70"
        >
          <span className="contact-process-line-fill absolute inset-y-0 start-0 w-full rounded-full bg-gradient-to-r from-[#38bdf8] via-[#1447E6] to-[#0065d2]" />
        </div>

        {PROCESS_STEPS.map((step, index) => {
          const Icon = step.icon
          return (
            <li
              key={step.key}
              className="contact-process-step relative z-10 flex flex-col items-center text-center"
              style={{ '--step-i': index } as CSSProperties}
            >
              <div className="contact-process-node group relative flex h-24 w-24 cursor-default items-center justify-center">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#1447E6]/15 opacity-0 blur-md transition duration-500 group-hover:opacity-100"
                />
                <span className="absolute inset-0 rounded-full border-2 border-[#1447E6]/25 bg-white/70 shadow-[0_12px_40px_-16px_rgba(0,101,210,0.45)] backdrop-blur-md transition duration-500 group-hover:scale-105 group-hover:border-[#1447E6]/55" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1447E6] to-[#0065d2] text-white shadow-lg shadow-[#1447E6]/35 transition duration-500 group-hover:scale-110">
                  <Icon className="h-7 w-7 transition duration-500 group-hover:scale-110" aria-hidden="true" />
                </span>
              </div>
              <p className="contact-process-num mt-5 text-xs font-bold tracking-[0.18em] text-[#1447E6]">
                {step.num}
              </p>
              <h3 className="contact-process-label mt-2 text-base font-bold text-brand-primary">
                {t(`contact.process.${step.key}.title`)}
              </h3>
            </li>
          )
        })}
      </ol>

      {/* Mobile: vertical */}
      <ol className="relative flex flex-col gap-10 md:hidden">
        <div
          aria-hidden
          className="contact-process-line-vertical pointer-events-none absolute start-12 top-6 bottom-6 w-[2px] overflow-hidden rounded-full bg-brand-secondary/70"
        >
          <span className="contact-process-line-fill-vertical absolute inset-x-0 top-0 h-full rounded-full bg-gradient-to-b from-[#38bdf8] via-[#1447E6] to-[#0065d2]" />
        </div>

        {PROCESS_STEPS.map((step, index) => {
          const Icon = step.icon
          return (
            <li
              key={step.key}
              className="contact-process-step relative z-10 flex items-center gap-5"
              style={{ '--step-i': index } as CSSProperties}
            >
              <div className="contact-process-node group relative flex h-24 w-24 shrink-0 items-center justify-center">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#1447E6]/15 opacity-0 blur-md transition duration-500 group-hover:opacity-100"
                />
                <span className="absolute inset-0 rounded-full border-2 border-[#1447E6]/25 bg-white/80 shadow-[0_12px_40px_-16px_rgba(0,101,210,0.45)] backdrop-blur-md transition duration-500 group-hover:scale-105 group-hover:border-[#1447E6]/55" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1447E6] to-[#0065d2] text-white shadow-lg shadow-[#1447E6]/35 transition duration-500 group-hover:scale-110">
                  <Icon className="h-7 w-7 transition duration-500 group-hover:scale-110" aria-hidden="true" />
                </span>
              </div>
              <div>
                <p className="contact-process-num text-xs font-bold tracking-[0.18em] text-[#1447E6]">
                  {step.num}
                </p>
                <h3 className="contact-process-label mt-1 text-lg font-bold text-brand-primary">
                  {t(`contact.process.${step.key}.title`)}
                </h3>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Field({ id, label, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-brand-primary">
        {label}
      </label>
      {children}
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

export function ContactPage() {
  const { t } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [openFaq, setOpenFaq] = useState<number | null>(1)
  const [demoOpen, setDemoOpen] = useState(false)

  const title = t('contact.meta.title')
  const description = t('contact.meta.description')

  const schemas = useMemo(
    () => ({
      'contact-faq-schema': {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ALL.map((n) => ({
          '@type': 'Question',
          name: t(`contact.faq.${n}.q`),
          acceptedAnswer: {
            '@type': 'Answer',
            text: t(`contact.faq.${n}.a`),
          },
        })),
      },
      'contact-page-schema': {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: title,
        description,
        url: `${SITE_ORIGIN}/contact`,
        mainEntity: {
          '@type': 'Organization',
          name: ORGANIZATION.name,
          url: ORGANIZATION.url,
          email: CONTACT_EMAIL,
          telephone: CALL_PHONE_E164,
          address: {
            '@type': 'PostalAddress',
            ...ORGANIZATION.address,
          },
        },
      },
      'contact-breadcrumb-schema': breadcrumbSchema([
        { name: t('servicePage.shared.home'), path: '/' },
        { name: t('nav.contact'), path: '/contact' },
      ]),
    }),
    [t, title, description],
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = formRef.current
    if (!form) return

    setStatus('sending')
    try {
      const formData = new FormData(form)
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      const data = (await response.json()) as { success?: boolean }
      if (data.success) {
        trackFormSubmission('contact_page_inquiry')
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const contactChannels = [
    {
      key: 'phone',
      icon: Phone,
      label: t('contact.info.phoneTitle'),
      href: `tel:${CALL_PHONE_E164}`,
      value: CALL_PHONE_DISPLAY,
      external: false,
    },
    {
      key: 'whatsapp',
      icon: MessageCircle,
      label: t('contact.info.whatsappTitle'),
      href: WHATSAPP_URL,
      value: WHATSAPP_PHONE_DISPLAY,
      external: true,
    },
    {
      key: 'email',
      icon: Mail,
      label: t('contact.info.emailTitle'),
      href: `mailto:${CONTACT_EMAIL}`,
      value: CONTACT_EMAIL,
      external: false,
    },
  ] as const

  return (
    <main className="overflow-x-hidden bg-white">
      <PageSeo
        title={title}
        description={description}
        path="/contact"
        schemas={schemas}
      />
      {/* Hero */}
      <section className="relative min-h-[78vh] overflow-hidden sm:min-h-[84vh]">
        <div className="absolute inset-0">
          <OptimizedImage
            src={HERO_IMAGE}
            alt=""
            kind="banner"
            width={1920}
            height={1080}
            className="about-hero-media h-full w-full object-cover object-center"
            fetchPriority="high"
            loading="eager"
            decoding="async"
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

        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 sm:min-h-[84vh] sm:justify-center sm:pb-24 lg:px-8">
          <Reveal immediate className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              {t('contact.hero.eyebrow')}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t('contact.hero.title')}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg">
              {t('contact.hero.subtitle')}
            </p>
            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="btn-cta w-full sm:w-auto sm:text-base"
              >
                {t('contact.hero.ctaPrimary')}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form + image */}
      <section className="section-y relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="section-shell">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)]">
              {t('contact.formSection.eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-primary md:text-4xl">
              {t('contact.formSection.title')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
              {t('contact.formSection.subtitle')}
            </p>
          </Reveal>

          <div className="grid items-stretch gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <Reveal
              delay={80}
              className="scroll-mt-28 rounded-[1.5rem] border border-brand-secondary/80 bg-white p-6 shadow-[var(--shadow-card)] sm:p-8 md:p-10"
            >
              <form
                ref={formRef}
                id="contact-form"
                action={WEB3FORMS_ENDPOINT}
                method="POST"
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2"
              >
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <input
                  type="hidden"
                  name="subject"
                  value="New Contact Page Inquiry, Gulf AI Systems"
                />
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <Field id="contact-name" label={t('contact.form.name')}>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    className="contact-soft-input"
                  />
                </Field>

                <Field id="contact-email" label={t('contact.form.email')}>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="contact-soft-input"
                  />
                </Field>

                <Field id="contact-phone" label={t('contact.form.phone')}>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="contact-soft-input"
                  />
                </Field>

                <Field id="contact-service" label={t('contact.form.service')}>
                  <div className="relative">
                    <select
                      id="contact-service"
                      name="service"
                      required
                      defaultValue=""
                      className="contact-soft-input appearance-none pe-10"
                    >
                      <option value="" disabled />
                      {CONTACT_PAGE_SERVICE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {t(opt.labelKey)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                      aria-hidden="true"
                    />
                  </div>
                </Field>

                <Field
                  id="contact-company"
                  label={t('contact.form.company')}
                  className="sm:col-span-2"
                >
                  <input
                    id="contact-company"
                    name="company"
                    required
                    autoComplete="organization"
                    className="contact-soft-input"
                  />
                </Field>

                <Field
                  id="contact-message"
                  label={t('contact.form.message')}
                  className="sm:col-span-2"
                >
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className="contact-soft-input min-h-[140px] resize-y"
                  />
                </Field>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex items-center gap-1.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="rounded-full bg-[#1447E6] px-7 py-3.5 text-sm font-semibold text-white transition group-hover:bg-[#0f38b8]">
                      {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
                    </span>
                    <span
                      className="grid h-12 w-12 place-items-center rounded-full bg-[#1447E6] text-white transition group-hover:bg-[#0f38b8]"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </button>

                  {status === 'success' && (
                    <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />{' '}
                      {t('contact.form.success')}
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-red-600">
                      <XCircle className="h-4 w-4" aria-hidden="true" /> {t('contact.form.error')}
                    </p>
                  )}
                </div>
              </form>
            </Reveal>

            <Reveal delay={160} className="relative hidden min-h-[480px] lg:block">
              <div className="relative h-full overflow-hidden rounded-[1.75rem]">
                <OptimizedImage
                  src={FORM_IMAGE}
                  alt={t('contact.imageAlt')}
                  kind="card"
                  width={900}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1d]/50 via-transparent to-transparent" />
                <div className="absolute end-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-brand-primary shadow-sm backdrop-blur-sm">
                  {t('contact.imageBadge')}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="section-y relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-20"
          style={{
            background:
              'color-mix(in oklab, var(--brand-sky) 12%, white)',
          }}
        />
        <div className="absolute inset-0 -z-10 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="section-shell relative z-10">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="section-eyebrow">{t('contact.info.eyebrow')}</p>
            <h2 className="section-title mx-auto text-center">{t('contact.info.title')}</h2>
            <p className="section-subtitle mx-auto text-center">{t('contact.info.subtitle')}</p>
          </Reveal>

          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Visit Us */}
            <Reveal delay={0} className="h-full min-w-0 sm:col-span-1">
              <article className="card-oa card-oa-center !gap-4 !px-7 !py-8 sm:!px-8 sm:!py-9">
                <div className="card-oa-icon !h-12 !w-12">
                  <MapPin className="h-6 w-6" aria-hidden="true" strokeWidth={1.75} />
                </div>
                <h3 className="card-oa-title text-lg">{t('contact.info.visitTitle')}</h3>
                <div className="card-oa-desc w-full space-y-1.5 text-[0.95rem] leading-relaxed">
                  <p className="font-semibold text-brand-primary">{t('contact.info.officeTitle')}</p>
                  <p>{t('contact.info.officeLine1')}</p>
                  <p>{t('contact.info.officeLine2')}</p>
                  <p>{t('contact.info.officeLine3')}</p>
                  <p>{t('contact.info.officeLine4')}</p>
                </div>
              </article>
            </Reveal>

            {/* Contact Us — gradient */}
            <Reveal delay={80} className="h-full min-w-0 sm:col-span-1">
              <article className="card-oa-accent card-oa-center !gap-4 !px-7 !py-8 sm:!px-8 sm:!py-9">
                <div className="card-oa-icon !h-12 !w-12">
                  <PhoneCall className="h-6 w-6" aria-hidden="true" strokeWidth={1.75} />
                </div>
                <h3 className="card-oa-title text-lg">{t('contact.info.contactTitle')}</h3>
                <ul className="mt-1 flex w-full flex-col gap-4 text-start">
                  {contactChannels.map((channel) => {
                    const Icon = channel.icon
                    return (
                      <li key={channel.key}>
                        <a
                          href={channel.href}
                          {...(channel.external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="group flex items-start gap-3 rounded-xl transition hover:bg-white/10"
                        >
                          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/18 text-white">
                            {channel.key === 'whatsapp' ? (
                              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                            ) : (
                              <Icon className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold uppercase tracking-wider text-white/75">
                              {channel.label}
                            </span>
                            <span className="mt-0.5 block break-words text-sm font-medium text-white transition group-hover:text-white">
                              {channel.value}
                            </span>
                          </span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </article>
            </Reveal>

            {/* Business Hours */}
            <Reveal delay={160} className="h-full min-w-0 sm:col-span-2 lg:col-span-1">
              <article className="card-oa card-oa-center !gap-4 !px-7 !py-8 sm:!px-8 sm:!py-9">
                <div className="card-oa-icon !h-12 !w-12">
                  <Clock className="h-6 w-6" aria-hidden="true" strokeWidth={1.75} />
                </div>
                <h3 className="card-oa-title text-lg">{t('contact.info.hoursTitle')}</h3>
                <div className="card-oa-desc w-full space-y-3 text-[0.95rem] leading-relaxed">
                  <div>
                    <p className="font-semibold text-brand-primary">
                      {t('contact.info.hoursWeekdayLabel')}
                    </p>
                    <p className="mt-0.5">{t('contact.info.hoursWeekdayTime')}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-primary">
                      {t('contact.info.hoursFridayLabel')}
                    </p>
                    <p className="mt-0.5">{t('contact.info.hoursFridayValue')}</p>
                  </div>
                  <p className="border-t border-brand-secondary/80 pt-3 text-sm text-brand-muted">
                    {t('contact.info.hoursNote')}
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why contact */}
      <section className="section-y section-bg-oa relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <div className="section-shell relative z-10">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="section-eyebrow">{t('contact.why.eyebrow')}</p>
            <h2 className="section-title mx-auto text-center lg:text-5xl">
              {t('contact.why.title')}
            </h2>
            <p className="section-subtitle mx-auto text-center">
              {t('contact.why.subtitle')}
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_ITEMS.map((item, index) => {
              const Icon = item.icon
              return (
                <Reveal key={item.key} delay={index * 70} className="h-full">
                  <article className={`${index % 2 === 1 ? 'card-oa-accent' : 'card-oa'} card-oa-center`}>
                    <div className="card-oa-icon">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="card-oa-title">{t(`contact.why.${item.key}.title`)}</h3>
                    <p className="card-oa-desc">{t(`contact.why.${item.key}.desc`)}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-y relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(180deg, white 0%, color-mix(in oklab, var(--brand-sky) 18%, white) 50%, white 100%)',
          }}
        />
        <div className="absolute inset-0 -z-10 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        <div className="section-shell relative">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-secondary bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-accent shadow-sm">
              {t('contact.process.badge')}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-brand-primary md:text-4xl lg:text-5xl">
              {t('contact.process.title')}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-muted md:text-lg">
              {t('contact.process.subtitle')}
            </p>
          </Reveal>

          <ContactProcessTimeline t={t} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y relative overflow-hidden">
        <div className="section-shell">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)]">
              {t('contact.faq.eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-primary md:text-4xl lg:text-5xl">
              {t('contact.faq.title')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
              {t('contact.faq.subtitle')}
            </p>
          </Reveal>

          <div className="grid gap-x-12 gap-y-2 lg:grid-cols-2">
            <Reveal>
              <div>
                {FAQ_LEFT.map((n) => (
                  <FaqItem
                    key={n}
                    id={`contact-faq-${n}`}
                    open={openFaq === n}
                    onToggle={() => setOpenFaq((prev) => (prev === n ? null : n))}
                    question={t(`contact.faq.${n}.q`)}
                    answer={t(`contact.faq.${n}.a`)}
                  />
                ))}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                {FAQ_RIGHT.map((n) => (
                  <FaqItem
                    key={n}
                    id={`contact-faq-${n}`}
                    open={openFaq === n}
                    onToggle={() => setOpenFaq((prev) => (prev === n ? null : n))}
                    question={t(`contact.faq.${n}.q`)}
                    answer={t(`contact.faq.${n}.a`)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Strong CTA */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-[#38bdf8] via-[#0065d2] to-[#0a1f4d] px-6 py-12 text-center shadow-[0_20px_50px_-20px_rgba(0,101,210,0.45)] sm:px-10 sm:py-16 md:rounded-[2rem] md:px-16">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {t('contact.cta.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            {t('contact.cta.subtitle')}
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-white/90 sm:w-auto sm:text-base"
            >
              {t('contact.cta.bookDemo')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href="#contact-form"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/55 hover:bg-white/15 sm:w-auto sm:text-base"
            >
              {t('contact.cta.contactTeam')}
            </a>
          </div>
        </Reveal>
      </section>

      <ConsultationModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </main>
  )
}
