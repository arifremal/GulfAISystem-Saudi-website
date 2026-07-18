import { proofStatKeys } from '../data/content'
import { useLanguage } from '../i18n'
import { Reveal } from './Reveal'

export function ProofStrip() {
  const { t } = useLanguage()

  return (
    <section className="border-y border-brand-secondary bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {proofStatKeys.map((key, index) => (
            <Reveal key={key} delay={index * 80}>
              <p className="text-3xl font-extrabold text-brand-accent md:text-4xl">
                {t(`proof.${key}.value`)}
              </p>
              <p className="mt-1 text-sm text-brand-muted">{t(`proof.${key}.label`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
