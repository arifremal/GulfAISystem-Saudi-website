/** Event detail routes and media assets for Gulf AI Systems events. */

export const BUSINESS_NETWORKING_EVENT_PATH =
  '/events/business-networking-saudi-arabia' as const

const EVENT_DIR = '/assets/about/gulf-event'

export type EventGalleryItem = {
  id: string
  src: string
  altKey: string
  width: number
  height: number
  /** Tailwind object-position — keep faces centred in 19:20 frame */
  objectPosition: string
}

function img(
  file: string,
  altKey: string,
  width: number,
  height: number,
  objectPosition = 'object-center',
): EventGalleryItem {
  return {
    id: file,
    src: `${EVENT_DIR}/${file}`,
    altKey,
    width,
    height,
    objectPosition,
  }
}

/** Teaser picks — same standard card treatment as the full gallery */
export const aboutEventTeaserImages = [
  {
    src: `${EVENT_DIR}/IMG-20260805-WA0115.jpg`,
    altKey: 'about.events.featuredAlt',
    objectPosition: 'object-center',
    width: 4160,
    height: 3120,
  },
  {
    src: `${EVENT_DIR}/IMG-20260805-WA0071.jpg`,
    altKey: 'about.events.secondaryAlt',
    objectPosition: 'object-[center_24%]',
    width: 3120,
    height: 4160,
  },
  {
    src: `${EVENT_DIR}/IMG-20260805-WA0036.jpg`,
    altKey: 'about.events.teaserAlt3',
    objectPosition: 'object-[center_32%]',
    width: 1200,
    height: 1600,
  },
] as const

export const businessNetworkingMedia = {
  aboutFeatured: `${EVENT_DIR}/IMG-20260805-WA0071.jpg`,
  dinner: `${EVENT_DIR}/IMG-20260805-WA0036.jpg`,
  secondary: `${EVENT_DIR}/IMG-20260805-WA0115.jpg`,
  conversation: `${EVENT_DIR}/IMG-20260805-WA0012.jpg`,
  message: `${EVENT_DIR}/IMG-20260805-WA0109.jpg`,

  /**
   * All 16 event images — identical 19:20 cards site-wide.
   * objectPosition fine-tuned to keep people centred.
   */
  gallery: [
    img('IMG-20260805-WA0115.jpg', 'event.networking.gallery.1.alt', 4160, 3120, 'object-center'),
    img('IMG-20260805-WA0071.jpg', 'event.networking.gallery.2.alt', 3120, 4160, 'object-[center_24%]'),
    img('IMG-20260805-WA0036.jpg', 'event.networking.gallery.3.alt', 1200, 1600, 'object-[center_32%]'),
    img('IMG-20260805-WA0119.jpg', 'event.networking.gallery.4.alt', 3120, 4160, 'object-[center_28%]'),
    img('IMG-20260805-WA0012.jpg', 'event.networking.gallery.5.alt', 1200, 1600, 'object-[center_30%]'),
    img('IMG-20260805-WA0109.jpg', 'event.networking.gallery.6.alt', 3120, 4160, 'object-[center_24%]'),
    img('IMG-20260805-WA0077.jpg', 'event.networking.gallery.7.alt', 4160, 4160, 'object-center'),
    img('IMG-20260805-WA0069.jpg', 'event.networking.gallery.8.alt', 3120, 4160, 'object-[center_24%]'),
    img('IMG-20260805-WA0111.jpg', 'event.networking.gallery.9.alt', 3120, 4160, 'object-[center_24%]'),
    img('IMG-20260805-WA0089.jpg', 'event.networking.gallery.10.alt', 3120, 4160, 'object-[center_22%]'),
    img('IMG-20260805-WA0095.jpg', 'event.networking.gallery.11.alt', 3120, 4160, 'object-[center_26%]'),
    img('IMG-20260805-WA0037.jpg', 'event.networking.gallery.12.alt', 1200, 1600, 'object-[center_32%]'),
    img('IMG-20260805-WA0087.jpg', 'event.networking.gallery.13.alt', 3120, 4160, 'object-[center_24%]'),
    img('IMG-20260805-WA0023.jpg', 'event.networking.gallery.14.alt', 1200, 1600, 'object-center'),
    img('IMG-20260805-WA0029.jpg', 'event.networking.gallery.15.alt', 1200, 1600, 'object-center'),
    img('IMG-20260805-WA0040.jpg', 'event.networking.gallery.16.alt', 1200, 1600, 'object-center'),
  ] satisfies EventGalleryItem[],
} as const
