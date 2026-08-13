/** Shared event image presentation — used on About teaser + Event gallery. */

/** Portrait card ratio ≈ 19:20 */
export const EVENT_IMAGE_ASPECT = 'aspect-[19/20]' as const

/** Equal gap between cards (20–24px) */
export const EVENT_IMAGE_GAP = 'gap-5 sm:gap-6' as const

/** Shared card chrome: radius ~19px, thin border, soft shadow */
export const EVENT_IMAGE_CARD =
  'relative block overflow-hidden rounded-[1.2rem] border border-[#1447E6]/12 bg-[#eaf2fb] shadow-[0_14px_36px_-24px_rgba(8,25,56,0.32)]' as const

export const EVENT_IMAGE_CARD_HOVER =
  'transition duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_22px_48px_-22px_rgba(8,25,56,0.42)]' as const

export const EVENT_IMAGE_IMG =
  'h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-[1.03]' as const
