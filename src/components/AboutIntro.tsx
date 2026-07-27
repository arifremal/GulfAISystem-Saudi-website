import { ArrowRight, Handshake, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../i18n'
import { Reveal } from './Reveal'

function BilingualIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="3.5"
        y="16.5"
        fill="currentColor"
        fontSize="11"
        fontWeight="700"
        fontFamily="Cairo, Poppins, sans-serif"
      >
        ع
      </text>
      <text
        x="13"
        y="16.5"
        fill="currentColor"
        fontSize="11"
        fontWeight="700"
        fontFamily="Poppins, sans-serif"
      >
        A
      </text>
      <path
        d="M11.5 7v10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  )
}

const valueTiles = [
  {
    titleKey: 'aboutIntro.value1.title',
    descKey: 'aboutIntro.value1.desc',
    icon: ShieldCheck,
  },
  {
    titleKey: 'aboutIntro.value2.title',
    descKey: 'aboutIntro.value2.desc',
    icon: BilingualIcon,
  },
  {
    titleKey: 'aboutIntro.value3.title',
    descKey: 'aboutIntro.value3.desc',
    icon: Handshake,
  },
] as const

export function AboutIntro() {
  const { t } = useLanguage()

  return (
    <section id="about-intro" className="section-bg-white section-y">
      <div className="section-shell">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: team image framed to keep left-side people in view */}
          <Reveal className="relative h-full min-h-0">
            <div className="media-frame h-full !rounded-[1.75rem]">
              <img
                src="/assets/about-hero-team.webp"
                alt={t('aboutIntro.imageAlt')}
                className="h-[360px] w-full object-cover object-[28%_center] md:h-[460px] lg:h-full lg:min-h-[460px]"
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* Right: content */}
          <Reveal delay={120} className="flex flex-col justify-center">
            <p className="section-eyebrow">{t('aboutIntro.eyebrow')}</p>
            <h2 className="section-title max-w-xl lg:text-[2.5rem]">
              {t('aboutIntro.title')}
            </h2>
            <p className="section-subtitle max-w-lg">{t('aboutIntro.body')}</p>

            <a href="/about" className="btn-cta group mt-8 w-fit">
              {t('aboutIntro.cta')}
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>

        {/* Full-width feature cards — wider, shorter enterprise proportions */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5">
          {valueTiles.map((tile, index) => {
            const Icon = tile.icon
            const accent = index % 2 === 1
            return (
              <Reveal key={tile.titleKey} delay={160 + index * 60} className="h-full min-w-0">
                <article
                  className={`${accent ? 'card-oa-accent' : 'card-oa'} card-oa-center`}
                >
                  <div className="card-oa-icon">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="card-oa-title">{t(tile.titleKey)}</h3>
                  <p className="card-oa-desc">{t(tile.descKey)}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
