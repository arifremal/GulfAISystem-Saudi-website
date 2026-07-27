import {
  ArrowUpRight,
  Bot,
  Brain,
  Cpu,
  GraduationCap,
  Lightbulb,
  Monitor,
  Network,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { useLanguage } from '../../i18n'
import { Reveal } from './Reveal'

const FEATURE_CARDS = [
  { key: 'ai', icon: Brain },
  { key: 'automation', icon: Workflow },
  { key: 'workforce', icon: GraduationCap },
] as const

const STRIP_ITEMS = [
  { key: 'digital', icon: Sparkles },
  { key: 'enterpriseAi', icon: Cpu },
  { key: 'automation', icon: Network },
  { key: 'copilot', icon: Monitor },
  { key: 'agents', icon: Bot },
  { key: 'innovation', icon: Lightbulb },
] as const

const VISION_IMAGE = '/assets/about/2030.png'

export function AboutVision2030Section() {
  const { t } = useLanguage()

  return (
    <section
      className="section-y relative overflow-hidden"
      aria-labelledby="about-vision2030-heading"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in oklab, var(--brand-sky) 10%, white) 0%, white 50%, color-mix(in oklab, var(--brand-sky) 8%, white) 100%)',
        }}
      />

      <div className="section-shell relative z-10">
        <div
          className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--brand)]/10 shadow-[0_20px_50px_-28px_rgba(0,101,210,0.25)] md:rounded-[2rem]"
          style={{
            backgroundImage:
              'linear-gradient(115deg, #ffffff 0%, #ffffff 38%, color-mix(in oklab, var(--brand-sky) 18%, white) 100%)',
          }}
        >
          <div className="relative grid lg:grid-cols-[45fr_55fr]">
            {/* Left — badge, heading, paragraph, CTA only */}
            <div className="relative z-20 order-2 flex flex-col justify-center px-6 py-9 sm:px-9 sm:py-11 lg:order-1 lg:max-w-none lg:px-10 lg:py-12 xl:px-12">
              <Reveal>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1447E6]/15 bg-[#1447E6]/8 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-[#1447E6]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1447E6]" aria-hidden />
                  {t('about.vision2030.eyebrow')}
                </span>
                <h2
                  id="about-vision2030-heading"
                  className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-[color:var(--navy-deep)] md:text-4xl"
                >
                  {t('about.vision2030.title')}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t('about.vision2030.subtitle')}
                </p>
                <a
                  href="/contact"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#1447E6] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#1447E6]/25 transition hover:bg-[#0f38b8]"
                >
                  {t('about.vision2030.cta')}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Reveal>
            </div>

            {/* Right — hero image + floating cards */}
            <div className="relative order-1 min-h-[340px] sm:min-h-[420px] lg:order-2 lg:min-h-[560px]">
              <Reveal delay={60} className="absolute inset-0 lg:-end-4 lg:start-[-12%]">
                <img
                  src={VISION_IMAGE}
                  alt={t('about.vision2030.imageAlt')}
                  className="h-full w-full object-cover object-[70%_18%] sm:object-[68%_20%]"
                  loading="lazy"
                  decoding="async"
                />
                {/* Soft left blend into content */}
                <div
                  aria-hidden
                  className="absolute inset-y-0 start-0 w-[42%] bg-gradient-to-r from-white from-15% via-white/65 to-transparent max-lg:hidden"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/50 to-transparent lg:hidden"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/55 via-white/20 to-transparent"
                />
              </Reveal>

              {/* Floating glass cards over lower image */}
              <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-5 pt-10 sm:px-5 sm:pb-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:px-3 lg:pb-8 xl:px-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3 lg:gap-3.5 xl:gap-4">
                  {FEATURE_CARDS.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <Reveal key={item.key} delay={140 + i * 90} className="h-full">
                        <article
                          className={`${i % 2 === 1 ? 'card-oa-accent' : 'card-oa'} card-oa-center !p-5`}
                        >
                          <div className="card-oa-icon !h-10 !w-10">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </div>
                          <h3 className="card-oa-title !mt-3 text-sm">
                            {t(`about.vision2030.${item.key}.title`)}
                          </h3>
                          <p className="card-oa-desc !mt-1 text-xs">
                            {t(`about.vision2030.${item.key}.desc`)}
                          </p>
                        </article>
                      </Reveal>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <Reveal
            delay={240}
            className="relative z-10 border-t border-[color:var(--brand)]/8 bg-white/50 px-4 py-3 backdrop-blur-sm sm:px-8 sm:py-3.5"
          >
            <ul className="flex flex-wrap items-center justify-center gap-y-2">
              {STRIP_ITEMS.map((item, i) => {
                const Icon = item.icon
                return (
                  <li key={item.key} className="flex items-center">
                    {i > 0 ? (
                      <span
                        aria-hidden
                        className="mx-2.5 hidden h-3 w-px bg-[color:var(--brand)]/15 sm:mx-4 sm:block"
                      />
                    ) : null}
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[0.65rem] font-medium tracking-wide text-[color:var(--navy-deep)]/70 sm:text-[0.7rem]">
                      <Icon className="h-3 w-3 shrink-0 text-[#1447E6]/80" aria-hidden="true" />
                      {t(`about.vision2030.strip.${item.key}`)}
                    </span>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
