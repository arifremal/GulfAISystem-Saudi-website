import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { CheckCircle2, ChevronDown, X, XCircle } from 'lucide-react'
import { CONTACT_PAGE_SERVICE_OPTIONS } from '../lib/contact-page-services'
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../lib/web3forms'
import { trackFormSubmission } from '../lib/analytics'
import { useLanguage } from '../i18n'

const inputClass =
  'w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[color:var(--brand)] focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand)_18%,transparent)]'

function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-neutral-900">
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
    </div>
  )
}

export function ConsultationModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { t } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const titleId = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) setStatus('idle')
  }, [open])

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
        trackFormSubmission('construction_ai_audit')
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[2px]"
        aria-label={t('audit.modal.closeForm')}
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-6 py-5">
          <div>
            <h2 id={titleId} className="text-xl font-bold tracking-tight text-neutral-950">
              {t('audit.modal.title')}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">{t('audit.modal.subtitle')}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
            aria-label={t('audit.modal.close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          ref={formRef}
          action={WEB3FORMS_ENDPOINT}
          method="POST"
          onSubmit={handleSubmit}
          className="flex max-h-[min(70vh,560px)] flex-col gap-4 overflow-y-auto px-6 py-5"
        >
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input
            type="hidden"
            name="subject"
            value="Free Consultation Inquiry, Gulf AI Systems"
          />
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

          <Field id="consult-name" label={t('audit.form.name')}>
            <input
              id="consult-name"
              name="name"
              required
              autoComplete="name"
              className={inputClass}
            />
          </Field>

          <Field id="consult-company" label={t('audit.form.company')}>
            <input
              id="consult-company"
              name="company"
              required
              autoComplete="organization"
              className={inputClass}
            />
          </Field>

          <Field id="consult-email" label={t('audit.form.email')}>
            <input
              id="consult-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
            />
          </Field>

          <Field id="consult-phone" label={t('audit.form.phone')}>
            <input
              id="consult-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={inputClass}
            />
          </Field>

          <Field id="consult-service" label={t('audit.form.service')}>
            <div className="relative">
              <select
                id="consult-service"
                name="service"
                required
                defaultValue="General Inquiry"
                className={`${inputClass} appearance-none pe-10`}
              >
                {CONTACT_PAGE_SERVICE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(option.labelKey)}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                aria-hidden="true"
              />
            </div>
          </Field>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-1 w-full rounded-xl bg-[color:var(--brand)] px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'sending' ? t('audit.form.sending') : t('audit.form.submit')}
          </button>

          {status === 'success' && (
            <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              {t('audit.form.success')}
            </p>
          )}
          {status === 'error' && (
            <p className="flex items-center gap-1.5 text-sm font-medium text-red-600">
              <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {t('audit.form.error')}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
