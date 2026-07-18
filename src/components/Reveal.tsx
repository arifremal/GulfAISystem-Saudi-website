import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger delay in ms once the element becomes visible */
  delay?: number
  as?: ElementType
  /** Animate on mount (for above-the-fold content) */
  immediate?: boolean
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    if (immediate) {
      const id = window.requestAnimationFrame(() => setVisible(true))
      return () => window.cancelAnimationFrame(id)
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [immediate])

  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: visible ? `${delay}ms` : '0ms' } : undefined

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </Tag>
  )
}
