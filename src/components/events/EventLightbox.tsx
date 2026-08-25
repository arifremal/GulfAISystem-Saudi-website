import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent,
} from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { siblingWebp } from '../../lib/responsive-image'
import { useLanguage } from '../../i18n'

type GalleryItem = {
  src: string
  alt: string
}

type EventLightboxProps = {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

const FOCUSABLE =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function EventLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: EventLightboxProps) {
  const { t, dir } = useLanguage()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const titleId = useId()
  const [entered, setEntered] = useState(false)
  const [imageKey, setImageKey] = useState(0)
  const open = index !== null && Boolean(items[index])

  useEffect(() => {
    if (!open) {
      setEntered(false)
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const enterFrame = window.requestAnimationFrame(() => setEntered(true))
    closeRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        if (dir === 'rtl') onNext()
        else onPrev()
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        if (dir === 'rtl') onPrev()
        else onNext()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.cancelAnimationFrame(enterFrame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose, onPrev, onNext, dir])

  useEffect(() => {
    if (index === null) return
    setImageKey((key) => key + 1)
  }, [index])

  function trapFocus(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab' || !dialogRef.current) return
    const nodes = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((el) => !el.hasAttribute('disabled'))
    if (nodes.length === 0) return

    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (event.shiftKey && active === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }

  if (!open || index === null) return null

  const item = items[index]
  const label = `${index + 1} / ${items.length}`

  function handleTouchStart(event: TouchEvent) {
    const touch = event.touches[0]
    if (!touch) return
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  function handleTouchEnd(event: TouchEvent) {
    if (!touchStart.current) return
    const touch = event.changedTouches[0]
    if (!touch) return

    const dx = touch.clientX - touchStart.current.x
    const dy = touch.clientY - touchStart.current.y
    touchStart.current = null

    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy)) return

    if (dx < 0) {
      if (dir === 'rtl') onPrev()
      else onNext()
    } else if (dir === 'rtl') {
      onNext()
    } else {
      onPrev()
    }
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-[#020b1d]/92 p-4 backdrop-blur-sm transition-opacity duration-300 ease-out sm:p-6 ${
        entered ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
      onKeyDown={trapFocus}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <p id={titleId} className="sr-only">
        {item.alt}
      </p>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute end-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-[color:var(--navy-deep)] shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:end-6 sm:top-6"
        aria-label={t('event.networking.gallery.close')}
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onPrev()
        }}
        className="absolute start-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-[color:var(--navy-deep)] shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:start-6"
        aria-label={t('event.networking.gallery.prev')}
      >
        <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onNext()
        }}
        className="absolute end-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-[color:var(--navy-deep)] shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:end-6"
        aria-label={t('event.networking.gallery.next')}
      >
        <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
      </button>

      <figure
        className={`relative flex max-h-[min(88vh,900px)] w-full max-w-5xl flex-col items-center transition duration-300 ease-out ${
          entered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <picture key={imageKey}>
          <source type="image/webp" srcSet={siblingWebp(item.src)} />
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[min(78vh,800px)] w-auto max-w-full animate-[eventLightboxFade_280ms_ease-out] rounded-[1.25rem] object-contain shadow-2xl"
            decoding="async"
          />
        </picture>
        <figcaption className="mt-4 text-center text-sm text-white/80">
          <span className="block font-medium text-white/95">{item.alt}</span>
          <span className="mt-1 block text-xs tabular-nums text-white/55">
            {label}
          </span>
        </figcaption>
      </figure>
    </div>
  )
}
