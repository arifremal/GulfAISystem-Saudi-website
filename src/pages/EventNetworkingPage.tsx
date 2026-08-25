import { useCallback, useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Lightbulb,
  MapPinned,
  Users,
} from 'lucide-react'
import { ConsultationModal } from '../components/ConsultationModal'
import { EventLightbox } from '../components/events/EventLightbox'
import { EventStoryGallery } from '../components/events/EventStoryGallery'
import { OptimizedImage } from '../components/OptimizedImage'
import { PageSeo } from '../components/PageSeo'
import { Reveal } from '../components/about/Reveal'
import {
  BUSINESS_NETWORKING_EVENT_PATH,
  businessNetworkingMedia,
} from '../data/events'
import { useLanguage } from '../i18n'
import { absoluteUrl, breadcrumbSchema } from '../lib/seo'

const VALUE_CARDS = [
  { titleKey: 'event.networking.value.1.title', descKey: 'event.networking.value.1.desc', icon: Users },
  { titleKey: 'event.networking.value.2.title', descKey: 'event.networking.value.2.desc', icon: Lightbulb },
  { titleKey: 'event.networking.value.3.title', descKey: 'event.networking.value.3.desc', icon: MapPinned },
] as const

export function EventNetworkingPage() {
  const { t } = useLanguage()
  const [consultOpen, setConsultOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const galleryItems = useMemo(
    () =>
      businessNetworkingMedia.gallery.map((item) => ({
        src: item.src,
        alt: t(item.altKey),
      })),
    [t],
  )

  const schemas = useMemo(
    () => ({
      'event-networking-breadcrumb-schema': breadcrumbSchema([
        { name: t('servicePage.shared.home'), path: '/' },
        { name: t('nav.about'), path: '/about' },
        {
          name: t('event.networking.breadcrumb.current'),
          path: BUSINESS_NETWORKING_EVENT_PATH,
        },
      ]),
    }),
    [t],
  )

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const showPrev = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return current
      return (current - 1 + galleryItems.length) % galleryItems.length
    })
  }, [galleryItems.length])

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return current
      return (current + 1) % galleryItems.length
    })
  }, [galleryItems.length])

  return (
    <main className="overflow-x-hidden">
      <PageSeo
        title={t('event.networking.meta.title')}
        description={t('event.networking.meta.description')}
        path={BUSINESS_NETWORKING_EVENT_PATH}
        type="article"
        imageUrl={absoluteUrl(businessNetworkingMedia.dinner)}
        schemas={schemas}
      />

      {/* 1 — Hero */}
      <section className="relative min-h-[72vh] overflow-hidden md:min-h-[78vh]">
        <div className="absolute inset-0">
          {/* Event Featured Image */}
          <OptimizedImage
            src={businessNetworkingMedia.dinner}
            alt={t('event.networking.hero.imageAlt')}
            kind="banner"
            width={1200}
            height={1600}
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#020b1d]/78 via-[#0a1f4d]/45 to-[#020b1d]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020b1d]/55 via-transparent to-[#020b1d]/18" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 72% 48%, rgba(20,71,230,0.22) 0%, rgba(56,189,248,0.08) 40%, transparent 72%)',
          }}
        />

        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-6 pb-14 pt-28 sm:justify-center sm:pb-20 md:min-h-[78vh] lg:px-8">
          <Reveal immediate className="max-w-3xl">
            <nav
              aria-label={t('event.networking.breadcrumbAria')}
              className="mb-5"
            >
              <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/65">
                <li>
                  <a href="/" className="transition hover:text-white">
                    {t('servicePage.shared.home')}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a href="/about" className="transition hover:text-white">
                    {t('nav.about')}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <span className="text-white/75">
                    {t('event.networking.breadcrumb.events')}
                  </span>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/90">
                  {t('event.networking.breadcrumb.current')}
                </li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              {t('event.networking.hero.eyebrow')}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t('event.networking.hero.title')}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t('event.networking.hero.subtitle')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2 — Event overview */}
      <section className="section-y section-bg-oa relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid opacity-15 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        <div className="section-shell relative">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <h2 className="section-title mx-auto text-center">
              {t('event.networking.overview.heading')}
            </h2>
            <p className="section-subtitle mx-auto mt-4 text-center">
              {t('event.networking.overview.body')}
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_CARDS.map(({ titleKey, descKey, icon: Icon }, index) => (
              <Reveal key={titleKey} delay={index * 70}>
                <article className="card-oa card-oa-center h-full">
                  <div className="card-oa-icon mx-auto">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="card-oa-title mt-4">{t(titleKey)}</h3>
                  <p className="card-oa-desc mt-2">{t(descKey)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EventStoryGallery onOpen={openLightbox} />

      {/* Related internal links */}
      <section className="border-t border-brand-secondary/60 bg-white py-10">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-xl font-bold tracking-tight text-[color:var(--navy-deep)] sm:text-2xl">
              {t('event.networking.related.title')}
            </h2>
            <nav
              aria-label={t('event.networking.related.title')}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold"
            >
              <a
                href="/about"
                className="text-[#1447E6] transition hover:underline"
              >
                {t('event.networking.related.about')}
              </a>
              <a
                href="/#services"
                className="text-[#1447E6] transition hover:underline"
              >
                {t('event.networking.related.services')}
              </a>
              <a
                href="/contact"
                className="text-[#1447E6] transition hover:underline"
              >
                {t('event.networking.related.contact')}
              </a>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* 7 — Final CTA (shared site pattern) */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-[#38bdf8] via-[#0065d2] to-[#0a1f4d] px-6 py-12 text-center shadow-[0_20px_50px_-20px_rgba(0,101,210,0.45)] sm:px-10 sm:py-16 md:rounded-[2rem] md:px-16">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {t('event.networking.cta.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            {t('event.networking.cta.subtitle')}
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => setConsultOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-white/90 sm:w-auto sm:text-base"
            >
              {t('event.networking.cta.book')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </button>
            <a
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/55 hover:bg-white/15 sm:w-auto sm:text-base"
            >
              {t('event.networking.cta.contact')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </section>

      <ConsultationModal
        open={consultOpen}
        onClose={() => setConsultOpen(false)}
      />

      <EventLightbox
        items={galleryItems}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={showPrev}
        onNext={showNext}
      />
    </main>
  )
}
