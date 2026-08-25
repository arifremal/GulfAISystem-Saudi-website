import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  Languages,
  MapPin,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import { whyUs } from '../data/content'
import { useLanguage } from '../i18n'
import { OptimizedImage } from './OptimizedImage'
import { Reveal } from './Reveal'

const SAUDI_GREEN = '#006C35'
const SAUDI_GOLD = '#C5A572'

const cardIcons: Record<(typeof whyUs)[number]['key'], LucideIcon> = {
  '1': MapPin,
  '2': Shield,
  '3': TrendingUp,
  '4': Users,
}

function SaudiFlagIcon({ className = 'h-3.5 w-5' }: { className?: string }) {
  return (
    <img
      src="/assets/saudi-flag-floating-CrAWKyho.webp"
      alt=""
      className={`object-contain ${className}`}
      width={20}
      height={14}
      loading="lazy"
      decoding="async"
      aria-hidden="true"
    />
  )
}

function FeatureCard({
  title,
  description,
  icon: Icon,
  delay,
  accent = false,
}: {
  title: string
  description: string
  icon: LucideIcon
  delay: number
  accent?: boolean
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className={`${accent ? 'card-oa-accent' : 'card-oa'} card-oa-center`}>
        <div className="card-oa-icon">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="card-oa-title">{title}</h3>
        <p className="card-oa-desc">{description}</p>
      </article>
    </Reveal>
  )
}

const STRIP = [
  { key: 'vision', icon: Sparkles, flag: false },
  { key: 'registered', icon: Building2, flag: true },
  { key: 'bilingual', icon: Languages, flag: false },
  { key: 'enterprise', icon: Shield, flag: false },
  { key: 'human', icon: Users, flag: false },
] as const

export function WhyUs() {
  const { t } = useLanguage()
  const leftCards = whyUs.slice(0, 2)
  const rightCards = whyUs.slice(2, 4)

  return (
    <section id="why-us" className="why-us-section section-y relative overflow-hidden">
      {/* Soft Saudi-green atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(180deg, #f3faf6 0%, #eef8f2 38%, #e8f5ee 72%, #f4faf7 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(rgba(0,108,53,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 75% 70% at 50% 45%, black 20%, transparent 75%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -start-28 top-8 h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{ background: 'color-mix(in oklab, #006C35 22%, transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute start-1/2 top-0 h-56 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'color-mix(in oklab, #006C35 14%, transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-20 bottom-6 h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{ background: 'color-mix(in oklab, #0a8f4a 16%, transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute end-1/4 top-1/3 h-48 w-48 rounded-full blur-3xl"
        style={{ background: 'color-mix(in oklab, #C5A572 10%, transparent)' }}
      />
      <svg
        aria-hidden
        className="why-us-wave pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 w-full opacity-[0.22] max-md:hidden"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <path
          fill={SAUDI_GREEN}
          d="M0,96 C240,160 480,32 720,80 C960,128 1200,48 1440,96 L1440,160 L0,160 Z"
        />
        <path
          fill={SAUDI_GOLD}
          opacity="0.45"
          d="M0,120 C300,70 520,150 760,110 C1000,70 1240,130 1440,100 L1440,160 L0,160 Z"
        />
      </svg>

      <div className="section-shell relative z-10">
        <div
          className="relative overflow-hidden rounded-[1.75rem] border border-[#006C35]/18 shadow-[0_24px_60px_-32px_rgba(0,108,53,0.22)] md:rounded-[2rem]"
          style={{
            backgroundImage:
              'linear-gradient(145deg, #ffffff 0%, #f7fcf9 42%, color-mix(in oklab, #006C35 9%, white) 100%)',
          }}
        >
          {/* Fine gold accent line */}
          <div
            className="why-us-accent-line absolute inset-x-8 top-0 h-px max-sm:inset-x-5"
            aria-hidden
          />

          <div className="relative px-5 pb-6 pt-9 sm:px-8 sm:pt-11 lg:px-10 lg:pt-12">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em]"
                  style={{
                    borderColor: 'color-mix(in oklab, #006C35 22%, transparent)',
                    backgroundColor: 'color-mix(in oklab, #006C35 7%, white)',
                    color: SAUDI_GREEN,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: SAUDI_GREEN }}
                    aria-hidden
                  />
                  {t('whyUs.badge')}
                  <SaudiFlagIcon className="ms-0.5 h-3.5 w-5 opacity-95" />
                </span>
              </Reveal>

              <Reveal delay={80}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-[color:var(--navy-deep)] md:text-4xl lg:text-[2.65rem] lg:leading-tight">
                  {t('whyUs.title')}
                </h2>
              </Reveal>

              <Reveal delay={140}>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
                  {t('whyUs.subtitle')}
                </p>
              </Reveal>
            </div>

            <div className="mt-10 grid items-stretch gap-5 lg:mt-12 lg:grid-cols-[1fr_1.15fr_1fr] lg:gap-6 xl:gap-7">
              <div className="flex flex-col gap-5">
                {leftCards.map((item, index) => (
                  <FeatureCard
                    key={item.key}
                    icon={cardIcons[item.key]}
                    title={t(`whyUs.${item.key}.title`)}
                    description={t(`whyUs.${item.key}.description`)}
                    delay={180 + index * 90}
                    accent={index % 2 === 1}
                  />
                ))}
              </div>

              <Reveal delay={160} className="why-us-image group relative min-h-[300px] overflow-hidden rounded-[1.4rem] shadow-[0_20px_48px_-24px_rgba(8,25,56,0.35)] sm:min-h-[360px] lg:min-h-full">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 z-0 rounded-full blur-3xl"
                  style={{
                    background: 'color-mix(in oklab, #006C35 12%, transparent)',
                  }}
                />
                <OptimizedImage
                  src="/assets/why-us-saudi-enterprise.png"
                  alt={t('whyUs.imageAlt')}
                  kind="card"
                  width={1200}
                  height={900}
                  className="absolute inset-0 h-full w-full object-cover object-[55%_22%] transition duration-700 ease-out group-hover:scale-[1.02] sm:object-[52%_20%]"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#fbfaf7]/55 via-transparent to-white/25"
                />
                <div
                  aria-hidden
                  className="absolute inset-y-0 start-0 w-[18%] bg-gradient-to-r from-white/50 to-transparent max-lg:hidden"
                />
                <div
                  aria-hidden
                  className="absolute inset-y-0 end-0 w-[14%] bg-gradient-to-l from-white/35 to-transparent max-lg:hidden"
                />
              </Reveal>

              <div className="flex flex-col gap-5">
                {rightCards.map((item, index) => (
                  <FeatureCard
                    key={item.key}
                    icon={cardIcons[item.key]}
                    title={t(`whyUs.${item.key}.title`)}
                    description={t(`whyUs.${item.key}.description`)}
                    delay={220 + index * 90}
                    accent={index % 2 === 0}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="relative z-10 border-t border-[#006C35]/12"
            style={{
              backgroundColor: 'color-mix(in oklab, #006C35 6%, white)',
            }}
          >
            <Reveal delay={420} className="px-4 py-3.5 sm:px-8">
              <ul className="flex flex-wrap items-center justify-center gap-y-2">
                {STRIP.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <li key={item.key} className="flex items-center">
                      {i > 0 ? (
                        <span
                          aria-hidden
                          className="mx-2.5 hidden h-3 w-px sm:mx-3.5 sm:block"
                          style={{
                            backgroundColor:
                              'color-mix(in oklab, #C5A572 45%, transparent)',
                          }}
                        />
                      ) : null}
                      <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 text-[0.65rem] font-medium tracking-wide text-[color:var(--navy-deep)]/75 sm:text-[0.7rem]">
                        {item.flag ? (
                          <SaudiFlagIcon className="h-3.5 w-5 shrink-0" />
                        ) : (
                          <Icon
                            className="h-3 w-3 shrink-0"
                            style={{ color: SAUDI_GREEN }}
                            aria-hidden="true"
                          />
                        )}
                        {t(`whyUs.strip.${item.key}`)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
