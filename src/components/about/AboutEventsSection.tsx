import { ArrowUpRight } from 'lucide-react'
import {
  BUSINESS_NETWORKING_EVENT_PATH,
  aboutEventTeaserImages,
} from '../../data/events'
import {
  EVENT_IMAGE_ASPECT,
  EVENT_IMAGE_CARD,
  EVENT_IMAGE_CARD_HOVER,
  EVENT_IMAGE_GAP,
  EVENT_IMAGE_IMG,
} from '../../data/eventImageStyles'
import { useLanguage } from '../../i18n'
import { Reveal } from './Reveal'

export function AboutEventsSection() {
  const { t } = useLanguage()

  return (
    <section
      className="section-y section-bg-soft relative overflow-hidden"
      aria-labelledby="about-events-heading"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="section-shell relative">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="section-eyebrow">{t('about.events.eyebrow')}</p>
          <h2
            id="about-events-heading"
            className="section-title mx-auto text-center"
          >
            {t('about.events.title')}
          </h2>
          <p className="section-subtitle mx-auto text-center">
            {t('about.events.subtitle')}
          </p>
        </Reveal>

        <Reveal>
          <div className="rounded-[1.75rem] border border-[#1447E6]/10 bg-white p-3 shadow-[0_24px_60px_-28px_rgba(8,25,56,0.35)] sm:p-4 md:rounded-[2rem] md:p-5">
            {/* Uniform 19:20 cards — same standard as Event Gallery */}
            <div
              className={`grid grid-cols-1 max-[380px]:grid-cols-1 min-[381px]:grid-cols-2 md:grid-cols-3 ${EVENT_IMAGE_GAP}`}
            >
              {aboutEventTeaserImages.map((item) => (
                <a
                  key={item.src}
                  href={BUSINESS_NETWORKING_EVENT_PATH}
                  className="group block w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1447E6]"
                  aria-label={t('about.events.cta')}
                >
                  <span
                    className={`${EVENT_IMAGE_CARD} ${EVENT_IMAGE_CARD_HOVER} ${EVENT_IMAGE_ASPECT}`}
                  >
                    <img
                      src={item.src}
                      alt={t(item.altKey)}
                      width={item.width}
                      height={item.height}
                      className={`${EVENT_IMAGE_IMG} ${item.objectPosition}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-5 flex justify-center sm:mt-6">
              <a
                href={BUSINESS_NETWORKING_EVENT_PATH}
                className="btn-cta sm:text-base"
              >
                {t('about.events.cta')}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
