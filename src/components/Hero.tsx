import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n'
import { OptimizedImage } from './OptimizedImage'
import { Reveal } from './Reveal'

const ConsultationModal = lazy(() =>
  import('./ConsultationModal').then((m) => ({ default: m.ConsultationModal })),
)

const AUTO_INTERVAL_MS = 3000

const slideMeta = [
  { id: '1' as const, image: '/assets/hero-slide-1.png' },
  { id: '2' as const, image: '/assets/hero-slide-2.png' },
  { id: '3' as const, image: '/assets/hero-slide-3.png' },
]

export function Hero() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [consultOpen, setConsultOpen] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const heroSlides = useMemo(
    () =>
      slideMeta.map((meta) => ({
        ...meta,
        tab: t(`hero.slide${meta.id}.tab`),
        headline: [t(`hero.slide${meta.id}.line1`), t(`hero.slide${meta.id}.line2`)],
      })),
    [t],
  )

  const slide = heroSlides[activeIndex]

  const goToSlide = useCallback((index: number) => {
    setVisible(false)
    window.setTimeout(() => {
      setActiveIndex(index)
      setVisible(true)
    }, 350)
  }, [])

  const advanceSlide = useCallback(() => {
    setVisible(false)
    window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slideMeta.length)
      setVisible(true)
    }, 350)
  }, [])

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(advanceSlide, AUTO_INTERVAL_MS)
  }, [advanceSlide])

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isPaused) startAutoPlay()
    else stopAutoPlay()
    return stopAutoPlay
  }, [isPaused, startAutoPlay, stopAutoPlay])

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return
    goToSlide(index)
    stopAutoPlay()
    startAutoPlay()
  }

  const openConsultation = () => setConsultOpen(true)

  return (
    <section
      className="relative min-h-[92vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === activeIndex && visible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={i !== activeIndex}
        >
          <OptimizedImage
            src={s.image}
            alt=""
            kind="hero"
            width={1920}
            height={1080}
            className="h-full w-full object-cover object-center"
            fetchPriority={i === 0 ? 'high' : 'low'}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-[#020b1d]/55 via-[#0a1f4d]/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020b1d]/50 via-transparent to-[#020b1d]/15" />
      {/* Blue light wash — keeps photo visible with a cool glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 70% 45%, rgba(20,71,230,0.28) 0%, rgba(56,189,248,0.10) 35%, transparent 70%), radial-gradient(ellipse 45% 40% at 15% 60%, rgba(20,71,230,0.18) 0%, transparent 65%)',
        }}
      />
      <div className="pointer-events-none absolute -end-16 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[#1447E6]/25 blur-3xl" />
      <div className="pointer-events-none absolute start-1/3 bottom-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[#38bdf8]/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 pb-28 pt-28 lg:px-8">
        <Reveal immediate className="max-w-3xl">
          <div
            className={`transition-all duration-500 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {slide.headline.map((line, i) => (
                <span key={`${slide.id}-${i}`} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <div className="mt-10 flex items-center gap-3">
              <button type="button" onClick={openConsultation} className="btn-cta sm:text-base">
                {t('hero.cta')}
              </button>
              <button
                type="button"
                onClick={openConsultation}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--cta)] text-white shadow-[0_8px_22px_-10px_rgba(20,71,230,0.55)] transition hover:bg-[color:var(--cta-hover)]"
                aria-label={t('hero.aria.book')}
              >
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="absolute end-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex">
          <div className="h-24 w-px bg-white/25" />
          <div
            className="w-px bg-[#1447E6] transition-all duration-500"
            style={{ height: `${((activeIndex + 1) / heroSlides.length) * 96}px` }}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-[#020b1d]/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl">
          {heroSlides.map((s, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleTabClick(index)}
                className={`flex-1 px-4 py-5 text-center text-xs font-semibold tracking-[0.18em] transition sm:px-6 sm:text-sm ${
                  isActive
                    ? 'bg-white text-[#020b1d]'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                } ${index === 0 && isActive ? 'rounded-te-2xl' : ''}`}
              >
                {s.tab}
              </button>
            )
          })}
        </div>
      </div>

      {consultOpen ? (
        <Suspense fallback={null}>
          <ConsultationModal open={consultOpen} onClose={() => setConsultOpen(false)} />
        </Suspense>
      ) : null}
    </section>
  )
}
