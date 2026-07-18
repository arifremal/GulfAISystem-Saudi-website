import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n'
import { ConsultationModal } from './ConsultationModal'
import { Reveal } from './Reveal'

export function AuditCta() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <>
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-[#38bdf8] via-[#0065d2] to-[#0a1f4d] px-6 py-12 text-center shadow-[0_20px_50px_-20px_rgba(0,101,210,0.45)] sm:px-10 sm:py-14 md:rounded-[2rem] md:px-16">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {t('audit.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            {t('audit.body')}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-white/90 sm:text-base"
          >
            {t('audit.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </Reveal>
      </section>

      <ConsultationModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
