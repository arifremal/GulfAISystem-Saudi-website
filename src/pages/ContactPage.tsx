import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowUpRight, CheckCircle2, ChevronDown, Clock, Mail, Phone, XCircle } from 'lucide-react'
import { CONTACT_PAGE_SERVICE_OPTIONS } from '../lib/contact-page-services'
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../lib/web3forms'
import { trackFormSubmission } from '../lib/analytics'
import {
  CALL_PHONE_DISPLAY,
  CALL_PHONE_E164,
  WHATSAPP_PHONE_DISPLAY,
  WHATSAPP_URL,
} from '../lib/site-meta'
import { Reveal } from '../components/Reveal'
import { useLanguage } from '../i18n'

const CONTACT_EMAIL = 'info@gulfaisystems.com.sa'
const CONTACT_IMAGE = '/assets/contact/contact-hero.png'

type FieldProps = {
  id: string
  label: string
  className?: string
  children: ReactNode
}

function Field({ id, label, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-neutral-900">
        {label}
      </label>
      {children}
    </div>
  )
}

export function ContactPage() {
  const { t } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

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

  return (
    <main className="overflow-x-hidden bg-white">
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 lg:px-10 lg:pb-24 lg:pt-32">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <Reveal immediate>
            <p className="text-sm font-medium text-neutral-500">{t('contact.eyebrow')}</p>
            <h1 className="mt-1 text-5xl font-bold tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
              {t('contact.title')}
            </h1>
          </Reveal>
          <Reveal
            immediate
            delay={120}
            className="max-w-sm text-sm leading-relaxed text-neutral-500 sm:pb-2 sm:text-right"
          >
            {t('contact.intro')}
          </Reveal>
        </header>

        {/* Form + image */}
        <div className="mt-12 grid items-start gap-10 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal delay={80} className="scroll-mt-28">
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
                  placeholder={t('contact.form.namePh')}
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
                  placeholder={t('contact.form.emailPh')}
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
                  placeholder={t('contact.form.phonePh')}
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
                    className="contact-soft-input appearance-none pr-10"
                  >
                    <option value="" disabled>
                      {t('contact.form.servicePh')}
                    </option>
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

              <Field id="contact-company" label={t('contact.form.company')}>
                <input
                  id="contact-company"
                  name="company"
                  required
                  autoComplete="organization"
                  placeholder={t('contact.form.companyPh')}
                  className="contact-soft-input"
                />
              </Field>

              <Field id="contact-date" label={t('contact.form.preferredDate')}>
                <input
                  id="contact-date"
                  name="preferred_date"
                  type="date"
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
                  placeholder={t('contact.form.messagePh')}
                  className="contact-soft-input min-h-[140px] resize-y"
                />
              </Field>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex items-center gap-1.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="rounded-full bg-neutral-950 px-7 py-3.5 text-sm font-semibold text-white transition group-hover:bg-neutral-800">
                    {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
                  </span>
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full bg-neutral-950 text-white transition group-hover:bg-neutral-800"
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

          <Reveal delay={160} className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] lg:aspect-auto lg:min-h-[560px] lg:h-full">
              <img
                src={CONTACT_IMAGE}
                alt={t('contact.imageAlt')}
                width={900}
                height={1200}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute end-4 top-4 rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-sm">
                {t('contact.imageBadge')}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Contact info row */}
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-neutral-100 pt-14 sm:grid-cols-3 sm:gap-6 lg:mt-20">
          <Reveal className="flex flex-col items-center text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-neutral-200 text-neutral-800">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-base font-bold text-neutral-950">
              {t('contact.info.callTitle')}
            </h2>
            <a
              href={`tel:${CALL_PHONE_E164}`}
              className="mt-2 text-sm text-neutral-500 transition hover:text-neutral-900"
            >
              {CALL_PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-sm text-neutral-500 transition hover:text-neutral-900"
            >
              {WHATSAPP_PHONE_DISPLAY}
            </a>
          </Reveal>

          <Reveal delay={80} className="flex flex-col items-center text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-neutral-200 text-neutral-800">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-base font-bold text-neutral-950">
              {t('contact.info.hoursTitle')}
            </h2>
            <p className="mt-2 text-sm text-neutral-500">{t('contact.info.hoursWeekday')}</p>
            <p className="mt-1 text-sm text-neutral-500">{t('contact.info.hoursFriday')}</p>
          </Reveal>

          <Reveal delay={160} className="flex flex-col items-center text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-neutral-200 text-neutral-800">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-base font-bold text-neutral-950">
              {t('contact.info.writeTitle')}
            </h2>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 break-all text-sm text-neutral-500 transition hover:text-neutral-900"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href="mailto:info@gulfaisystems.com.sa?subject=Book%20Demo"
              className="mt-1 text-sm text-neutral-500 transition hover:text-neutral-900"
            >
              {t('contact.info.bookDemo')}
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
