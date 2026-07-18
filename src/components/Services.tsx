import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { services } from '../data/content'
import { useLanguage } from '../i18n'
import { Icon } from './Icon'
import { Reveal } from './Reveal'

const AUTO_INTERVAL_MS = 3000

const serviceGalleries: Record<string, { top: string; bottom: string; tall: string }> = {
  training: {
    top: '/assets/services/service-copilot-1.png',
    bottom: '/assets/services/service-copilot-2.png',
    tall: '/assets/services/service-copilot-3.png',
  },
  agents: {
    top: '/assets/services/service-agents-1.png',
    bottom: '/assets/services/service-agents-2.png',
    tall: '/assets/services/service-agents-3.png',
  },
  ops: {
    top: '/assets/services/service-ops-1.png',
    bottom: '/assets/services/service-ops-2.png',
    tall: '/assets/services/service-ops-3.png',
  },
}

const pointKeys = ['p1', 'p2', 'p3', 'p4'] as const

export function Services() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [imageVisible, setImageVisible] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const active = services[activeIndex]
  const gallery = serviceGalleries[active.icon]
  const activeTitle = t(`services.${active.key}.title`)

  const goToSlide = useCallback((index: number) => {
    setImageVisible(false)
    window.setTimeout(() => {
      setActiveIndex(index)
      setImageVisible(true)
    }, 200)
  }, [])

  const advanceSlide = useCallback(() => {
    setImageVisible(false)
    window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % services.length)
      setImageVisible(true)
    }, 200)
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

  const handleSelect = (index: number) => {
    if (index === activeIndex) return
    goToSlide(index)
    stopAutoPlay()
    startAutoPlay()
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden border-y border-brand-secondary bg-white py-20 md:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsPaused(false)
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18]"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-brand-primary md:text-4xl">
            {t('services.title')}
          </h2>
          <p className="text-lg text-brand-muted">{t('services.subtitle')}</p>
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="space-y-2">
            {services.map((service, index) => {
              const isActive = index === activeIndex
              const title = t(`services.${service.key}.title`)
              return (
                <button
                  key={service.key}
                  type="button"
                  onClick={() => handleSelect(index)}
                  className="w-full text-left"
                  aria-expanded={isActive}
                >
                  <div
                    className={`flex items-center justify-between gap-4 border-b py-5 transition ${
                      isActive ? 'border-brand-secondary' : 'border-brand-secondary/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition duration-300 ${
                          isActive
                            ? 'bg-[#1447E6] text-white'
                            : 'bg-brand-secondary/50 text-brand-muted'
                        }`}
                      >
                        <Icon name={service.icon} className="h-4 w-4" />
                      </div>
                      <span
                        className={`text-xl font-semibold transition duration-300 md:text-2xl ${
                          isActive ? 'text-brand-primary' : 'text-brand-muted'
                        }`}
                      >
                        {title}
                      </span>
                    </div>
                    {isActive ? (
                      <ChevronDown className="h-5 w-5 shrink-0 text-brand-muted" />
                    ) : (
                      <ChevronRight className="h-5 w-5 shrink-0 text-brand-muted/60" />
                    )}
                  </div>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pt-2 pl-12">
                        <p className="mb-4 max-w-lg text-sm leading-relaxed text-brand-muted md:text-base">
                          {t(`services.${service.key}.description`)}
                        </p>
                        <ul className="space-y-2">
                          {pointKeys.map((pointKey) => (
                            <li
                              key={pointKey}
                              className="flex items-center gap-2 text-sm text-brand-text"
                            >
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1447E6]" />
                              {t(`services.${service.key}.${pointKey}`)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}

            <div className="flex items-center gap-2 pt-4 pl-1" role="tablist" aria-label={t('services.aria.slides')}>
              {services.map((service, index) => {
                const title = t(`services.${service.key}.title`)
                return (
                  <button
                    key={service.key}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    aria-label={t('services.aria.goTo', { title })}
                    onClick={() => handleSelect(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-8 bg-[#1447E6]'
                        : 'w-2 bg-brand-secondary hover:bg-brand-accent/40'
                    }`}
                  />
                )
              })}
            </div>
          </div>
          </Reveal>

          <Reveal delay={120}>
          <div
            className={`grid h-full min-h-[420px] grid-cols-2 grid-rows-2 gap-4 transition-opacity duration-300 ${
              imageVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={gallery.top}
              alt={activeTitle}
              className="col-start-1 row-start-1 h-full w-full rounded-2xl object-cover shadow-md"
              loading="lazy"
            />
            <img
              src={gallery.bottom}
              alt={activeTitle}
              className="col-start-1 row-start-2 h-full w-full rounded-2xl object-cover shadow-md"
              loading="lazy"
            />
            <img
              src={gallery.tall}
              alt={activeTitle}
              className="col-start-2 row-span-2 row-start-1 h-full w-full rounded-2xl object-cover shadow-md"
              loading="lazy"
            />
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
