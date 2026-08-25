import { Expand } from 'lucide-react'
import {
  businessNetworkingMedia,
  type EventGalleryItem,
} from '../../data/events'
import {
  EVENT_IMAGE_ASPECT,
  EVENT_IMAGE_CARD,
  EVENT_IMAGE_CARD_HOVER,
  EVENT_IMAGE_GAP,
  EVENT_IMAGE_IMG,
} from '../../data/eventImageStyles'
import { useLanguage } from '../../i18n'
import { OptimizedImage } from '../OptimizedImage'
import { Reveal } from '../about/Reveal'

type ResolvedItem = EventGalleryItem & { alt: string; index: number }

type EventStoryGalleryProps = {
  onOpen: (index: number) => void
}

function GalleryCard({
  item,
  priority,
  onOpen,
}: {
  item: ResolvedItem
  priority?: boolean
  onOpen: (index: number) => void
}) {
  const { t } = useLanguage()

  return (
    <button
      type="button"
      onClick={() => onOpen(item.index)}
      className="group relative block w-full cursor-pointer text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1447E6]"
      aria-label={`${t('event.networking.gallery.open')}: ${item.alt}`}
    >
      <span
        className={`${EVENT_IMAGE_CARD} ${EVENT_IMAGE_CARD_HOVER} ${EVENT_IMAGE_ASPECT}`}
      >
        <OptimizedImage
          src={item.src}
          alt={item.alt}
          kind="gallery"
          width={item.width}
          height={item.height}
          className={`${EVENT_IMAGE_IMG} ${item.objectPosition}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020b1d]/10 via-transparent to-transparent opacity-50" />
        <span className="pointer-events-none absolute bottom-3 end-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#1447E6] opacity-0 shadow-sm backdrop-blur-sm transition duration-400 group-hover:opacity-100 max-md:hidden">
          <Expand className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{t('event.networking.gallery.view')}</span>
        </span>
      </span>
    </button>
  )
}

export function EventStoryGallery({ onOpen }: EventStoryGalleryProps) {
  const { t } = useLanguage()

  const items: ResolvedItem[] = businessNetworkingMedia.gallery.map(
    (item, index) => ({
      ...item,
      alt: t(item.altKey),
      index,
    }),
  )

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      aria-labelledby="event-gallery-heading"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(180deg, #ffffff 0%, #f5f9ff 48%, #eef5fc 100%)',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.14] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -start-24 top-16 h-72 w-72 rounded-full bg-[#38bdf8]/14 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-20 top-[45%] h-80 w-80 rounded-full bg-[#1447E6]/10 blur-3xl"
      />

      <div className="section-shell relative">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="section-eyebrow">
            {t('event.networking.gallery.eyebrow')}
          </p>
          <h2
            id="event-gallery-heading"
            className="section-title mx-auto text-center"
          >
            {t('event.networking.gallery.heading')}
          </h2>
          <p className="section-subtitle mx-auto text-center">
            {t('event.networking.gallery.subtitle')}
          </p>
        </Reveal>

        <Reveal>
          <div
            className={`mx-auto grid max-w-6xl grid-cols-1 max-[380px]:grid-cols-1 min-[381px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${EVENT_IMAGE_GAP}`}
          >
            {items.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                priority={i < 2}
                onOpen={onOpen}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
