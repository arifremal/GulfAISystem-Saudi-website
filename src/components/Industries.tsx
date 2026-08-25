import { useEffect, useRef, useState } from 'react'
import { industries } from '../data/content'
import { useLanguage } from '../i18n'
import { Icon } from './Icon'
import { OptimizedImage } from './OptimizedImage'
import { Reveal } from './Reveal'

const industryImages: Record<
  string,
  { src: string; position: string }
> = {
  construction: {
    src: '/assets/home-section/industry-construction.png',
    position: 'object-[70%_28%]',
  },
  logistics: {
    src: '/assets/home-section/industry-logistics.png',
    position: 'object-[72%_30%]',
  },
  healthcare: {
    src: '/assets/home-section/industry-healthcare.png',
    position: 'object-[center_22%]',
  },
  manufacturing: {
    src: '/assets/home-section/industry-manufacturing.png',
    position: 'object-[center_25%]',
  },
  retail: {
    src: '/assets/home-section/industry-retail.png',
    position: 'object-[68%_28%]',
  },
  professional: {
    src: '/assets/home-section/industry-professional.png',
    position: 'object-[center_20%]',
  },
}

const AUTOPLAY_MS = 4000
const AUTOPLAY_RESUME_MS = 6000

export function Industries() {
  const { t } = useLanguage()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const pausedRef = useRef(false)
  const inViewRef = useRef(false)
  const resumeTimerRef = useRef<number | null>(null)

  const isMobileSlider = () =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const el = scrollerRef.current
    const card = el?.children[index] as HTMLElement | undefined
    if (!el || !card) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const delta =
      card.getBoundingClientRect().left - el.getBoundingClientRect().left

    el.scrollBy({
      left: delta,
      behavior: prefersReduced ? 'auto' : behavior,
    })
    activeIndexRef.current = index
    setActiveIndex(index)
  }

  const pauseAutoplay = () => {
    pausedRef.current = true
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current)
    }
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false
      resumeTimerRef.current = null
    }, AUTOPLAY_RESUME_MS)
  }

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const updateActiveIndex = () => {
      if (!isMobileSlider()) return

      const cards = Array.from(el.children) as HTMLElement[]
      if (!cards.length) return

      const origin = el.getBoundingClientRect().left
      let best = 0
      let bestDist = Number.POSITIVE_INFINITY

      cards.forEach((card, index) => {
        const dist = Math.abs(card.getBoundingClientRect().left - origin)
        if (dist < bestDist) {
          bestDist = dist
          best = index
        }
      })

      activeIndexRef.current = best
      setActiveIndex((prev) => (prev === best ? prev : best))
    }

    const onUserInteract = () => {
      if (!isMobileSlider()) return
      pauseAutoplay()
    }

    updateActiveIndex()
    el.addEventListener('scroll', updateActiveIndex, { passive: true })
    el.addEventListener('pointerdown', onUserInteract, { passive: true })
    el.addEventListener('touchstart', onUserInteract, { passive: true })
    el.addEventListener('wheel', onUserInteract, { passive: true })
    window.addEventListener('resize', updateActiveIndex)

    const visibility = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
      },
      { threshold: 0.35 },
    )
    visibility.observe(el)

    return () => {
      el.removeEventListener('scroll', updateActiveIndex)
      el.removeEventListener('pointerdown', onUserInteract)
      el.removeEventListener('touchstart', onUserInteract)
      el.removeEventListener('wheel', onUserInteract)
      window.removeEventListener('resize', updateActiveIndex)
      visibility.disconnect()
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReduced.matches) return

    const timer = window.setInterval(() => {
      if (!isMobileSlider() || pausedRef.current || !inViewRef.current) return

      const next = (activeIndexRef.current + 1) % industries.length
      scrollToIndex(next)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="industries" className="section-bg-soft section-y relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.14] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />
      <div className="section-shell relative">
        <Reveal className="mb-8 max-w-3xl md:mb-12">
          <p className="section-eyebrow">{t('nav.industries')}</p>
          <h2 className="section-title">{t('industries.title')}</h2>
          <p className="section-subtitle">{t('industries.subtitle')}</p>
        </Reveal>

        <div
          ref={scrollerRef}
          className="industries-slider flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 touch-pan-x md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-3"
          role="region"
          aria-roledescription="carousel"
          aria-label={t('industries.title')}
        >
          {industries.map((industry, index) => {
            const image = industryImages[industry.id]
            const imageSrc = image?.src ?? '/assets/hero.webp'
            const position = image?.position ?? 'object-center'
            const title = t(`industries.${industry.id}.title`)
            const content = (
              <>
                <OptimizedImage
                  src={imageSrc}
                  alt={t('industries.imageAlt', { title })}
                  kind="card"
                  width={800}
                  height={600}
                  className={`absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105 ${position}`}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#020b1d]/82 via-[#020b1d]/48 to-[#020b1d]/22"
                  aria-hidden="true"
                />
                <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-between p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--cta)] text-white shadow-lg shadow-[color:var(--cta)]/40">
                    <Icon name={industry.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold leading-tight text-white">
                      {title}
                    </h3>
                    <span
                      className={`inline-flex items-center text-base font-semibold ${
                        industry.available
                          ? 'text-white group-hover:underline'
                          : 'text-white/90'
                      }`}
                    >
                      {industry.available
                        ? t('industries.learnMore')
                        : t('industries.comingSoon')}
                      <span className="ml-1 rtl:mr-1 rtl:ml-0">→</span>
                    </span>
                  </div>
                </div>
              </>
            )

            const className = 'card-image group'

            const card = industry.available && industry.href ? (
              <a
                href={industry.href}
                className={`${className} block`}
                target="_blank"
                rel="noreferrer"
                aria-label={title}
              >
                {content}
              </a>
            ) : (
              <div className={className}>{content}</div>
            )

            return (
              <Reveal
                key={industry.id}
                delay={index * 70}
                className="w-[85%] shrink-0 snap-start snap-always md:h-full md:w-auto md:min-w-0 md:shrink md:snap-align-none"
              >
                {card}
              </Reveal>
            )
          })}
        </div>

        <div
          className="mt-5 flex items-center justify-center gap-2 md:hidden"
          role="tablist"
          aria-label={t('industries.title')}
        >
          {industries.map((industry, index) => (
            <button
              key={industry.id}
              type="button"
              role="tab"
              aria-label={t(`industries.${industry.id}.title`)}
              aria-selected={activeIndex === index}
              onClick={() => {
                pauseAutoplay()
                scrollToIndex(index)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-5 bg-[color:var(--cta)]'
                  : 'w-2 bg-[color:var(--cta)]/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
