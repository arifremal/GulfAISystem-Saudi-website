import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, ChevronDown, X, XCircle } from 'lucide-react'
import { CONSULTATION_SERVICE_OPTIONS } from '../lib/consultation-services'
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../lib/web3forms'
import { trackFormSubmission } from '../lib/analytics'
import { useLanguage } from '../i18n'

const inputClass =
  'w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/45 focus:bg-white/[0.14] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.22)]'

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
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-white/90">
        {label} <span className="text-[#38bdf8]">*</span>
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
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!open) {
      setVisible(false)
      return
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = requestAnimationFrame(() => setVisible(true))
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(frame)
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
        trackFormSubmission('consultation_inquiry')
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

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-[#020b1d]/65 backdrop-blur-md transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label={t('audit.modal.closeForm')}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={`relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-[1.5rem] border border-white/25 bg-[linear-gradient(145deg,rgba(8,25,56,0.82)_0%,rgba(0,101,210,0.55)_48%,rgba(10,31,77,0.88)_100%)] shadow-[0_28px_80px_-24px_rgba(2,11,29,0.85),0_0_0_1px_rgba(255,255,255,0.08)_inset] backdrop-blur-2xl transition-all duration-300 ease-out sm:max-w-xl ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-[0.96] opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/15 px-5 py-5 sm:px-7 sm:py-6">
          <div className="min-w-0 pe-2">
            <h2 id={titleId} className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              {t('audit.modal.title')}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-white/75">{t('audit.modal.subtitle')}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:bg-white/18 hover:text-white"
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
          className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6"
        >
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input
            type="hidden"
            name="subject"
            value="Consultation Inquiry, Gulf AI Systems"
          />
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid gap-4 sm:grid-cols-2">
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
          </div>

          <Field id="consult-service" label={t('audit.form.service')}>
            <div className="relative">
              <select
                id="consult-service"
                name="service"
                required
                defaultValue=""
                className={`${inputClass} appearance-none pe-10`}
              >
                <option value="" disabled className="bg-[#0a1f4d] text-white">
                  {t('audit.form.servicePlaceholder')}
                </option>
                {CONSULTATION_SERVICE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#0a1f4d] text-white">
                    {t(option.labelKey)}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55"
                aria-hidden="true"
              />
            </div>
          </Field>

          <Field id="consult-message" label={t('audit.form.message')}>
            <textarea
              id="consult-message"
              name="message"
              required
              rows={3}
              className={`${inputClass} min-h-[96px] resize-y`}
            />
          </Field>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-1 w-full rounded-full bg-gradient-to-r from-[#38bdf8] via-[#1447E6] to-[#0065d2] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_-12px_rgba(20,71,230,0.7)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'sending' ? t('audit.form.sending') : t('audit.form.submit')}
          </button>

          {status === 'success' && (
            <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              {t('audit.form.success')}
            </p>
          )}
          {status === 'error' && (
            <p className="flex items-center gap-1.5 text-sm font-medium text-red-300">
              <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {t('audit.form.error')}
            </p>
          )}
        </form>
      </div>
    </div>,
    document.body,
  )
}
