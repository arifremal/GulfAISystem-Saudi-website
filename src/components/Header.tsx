import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { industries, servicePages, services } from '../data/content'
import { useLanguage } from '../i18n'
import { Icon } from './Icon'

const ConsultationModal = lazy(() =>
  import('./ConsultationModal').then((m) => ({ default: m.ConsultationModal })),
)

type NavChild = {
  label: string
  href: string
  external?: boolean
  disabled?: boolean
}

type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href: string; children: NavChild[] }

type HeaderProps = {
  overlay?: boolean
}

function LanguageSwitcher({ overlayLook }: { overlayLook: boolean }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      dir="ltr"
      className={`relative inline-grid grid-cols-2 rounded-full bg-white p-1 shadow-[0_4px_14px_rgba(8,25,56,0.12)] ${
        overlayLook ? 'ring-1 ring-white/40' : 'ring-1 ring-black/5'
      }`}
      role="group"
      aria-label={t('nav.lang.switch')}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-y-1 start-1 w-[calc(50%-4px)] rounded-full bg-[#1447E6] shadow-sm transition-transform duration-300 ease-out ${
          lang === 'ar' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
        }`}
      />
      <button
        type="button"
        className={`relative z-10 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300 sm:px-4 sm:text-sm ${
          lang === 'en' ? 'text-white' : 'text-[#1a2f4f]/75 hover:text-[#1a2f4f]'
        }`}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        English
      </button>
      <button
        type="button"
        className={`relative z-10 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300 sm:px-4 sm:text-sm ${
          lang === 'ar' ? 'text-white' : 'text-[#1a2f4f]/75 hover:text-[#1a2f4f]'
        }`}
        aria-pressed={lang === 'ar'}
        onClick={() => setLang('ar')}
      >
        العربية
      </button>
    </div>
  )
}

export function Header({ overlay = false }: HeaderProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [consultOpen, setConsultOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const navItems: NavItem[] = useMemo(
    () => [
      { label: t('nav.about'), href: '/about' },
      {
        label: t('nav.industries'),
        href: '/#industries',
        children: industries.map((industry) => ({
          label: t(`industries.${industry.id}.title`),
          href: industry.available && industry.href ? industry.href : '/#industries',
          external: Boolean(industry.available && industry.href),
          disabled: !industry.available,
        })),
      },
      {
        label: t('nav.services'),
        href: '/#services',
        children: services.map((service) => ({
          label: t(`services.${service.key}.title`),
          href: servicePages[service.key].path,
        })),
      },
      { label: t('nav.contact'), href: '/contact' },
    ],
    [t],
  )

  useEffect(() => {
    if (!overlay) return

    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [overlay])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setDesktopOpen(null)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDesktopOpen(null)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const isOverlayLook = overlay && !scrolled

  const linkClass = isOverlayLook
    ? 'text-white/90 transition hover:text-white'
    : 'text-brand-muted transition hover:text-brand-primary'

  const menuIconClass = isOverlayLook ? 'text-white' : 'text-brand-primary'

  const dropdownPanelClass = isOverlayLook
    ? 'border-white/15 bg-[#020b1d]/95 text-white/90 shadow-xl backdrop-blur'
    : 'border-brand-secondary bg-white text-brand-muted shadow-lg'

  const dropdownItemClass = isOverlayLook
    ? 'hover:bg-white/10 hover:text-white'
    : 'hover:bg-brand-secondary/40 hover:text-brand-primary'

  return (
    <header
      className={
        overlay
          ? `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
              scrolled
                ? 'border-b border-brand-secondary bg-white/90 shadow-sm backdrop-blur'
                : 'bg-transparent'
            }`
          : 'sticky top-0 z-50 border-b border-brand-secondary bg-white/85 backdrop-blur'
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <a href="/" className="flex items-center">
          <img
            src="/assets/logo.webp"
            alt={t('nav.logoAlt')}
            width={256}
            height={64}
            decoding="async"
            fetchPriority="high"
            className={`h-14 w-auto sm:h-16 ${isOverlayLook ? 'brightness-0 invert' : ''}`}
          />
        </a>

        <nav ref={navRef} className="hidden items-center gap-6 text-sm font-medium lg:flex xl:gap-8">
          {navItems.map((item) => {
            if (!item.children) {
              return (
                <a key={item.href} href={item.href} className={`whitespace-nowrap ${linkClass}`}>
                  {item.label}
                </a>
              )
            }

            const isOpen = desktopOpen === item.label

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDesktopOpen(item.label)}
                onMouseLeave={() => setDesktopOpen(null)}
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 whitespace-nowrap ${linkClass}`}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  onClick={() =>
                    setDesktopOpen((current) => (current === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`absolute start-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition rtl:translate-x-1/2 ${
                    isOpen
                      ? 'pointer-events-auto visible opacity-100'
                      : 'pointer-events-none invisible opacity-0'
                  }`}
                >
                  <div
                    role="menu"
                    className={`overflow-hidden rounded-xl border py-2 ${dropdownPanelClass}`}
                  >
                    <a
                      href={item.href}
                      role="menuitem"
                      className={`block border-b px-4 py-2.5 text-xs font-semibold uppercase tracking-wide opacity-70 ${
                        isOverlayLook ? 'border-white/10' : 'border-brand-secondary'
                      } ${dropdownItemClass}`}
                      onClick={() => setDesktopOpen(null)}
                    >
                      {t('nav.viewAll', { label: item.label })}
                    </a>
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        role="menuitem"
                        target={child.external ? '_blank' : undefined}
                        rel={child.external ? 'noreferrer' : undefined}
                        className={`block px-4 py-2.5 text-sm transition ${dropdownItemClass} ${
                          child.disabled ? 'opacity-70' : ''
                        }`}
                        onClick={() => setDesktopOpen(null)}
                      >
                        <span className="flex items-center justify-between gap-3">
                          {child.label}
                          {child.disabled && (
                            <span className="text-[10px] font-medium uppercase tracking-wide opacity-60">
                              {t('nav.soon')}
                            </span>
                          )}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher overlayLook={isOverlayLook} />
          <button
            type="button"
            onClick={() => setConsultOpen(true)}
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-[#38bdf8] via-[#1447E6] to-[#0065d2] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_-12px_rgba(20,71,230,0.65)] transition hover:brightness-110 sm:inline-flex"
          >
            {t('nav.cta.consult')}
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`inline-flex rounded-lg p-2 lg:hidden ${menuIconClass}`}
            aria-label={open ? t('nav.aria.closeMenu') : t('nav.aria.openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div
          className={`px-6 py-4 lg:hidden ${
            isOverlayLook
              ? 'border-t border-white/15 bg-[#020b1d]/95 backdrop-blur'
              : 'border-t border-brand-secondary bg-white'
          }`}
        >
          <nav
            className={`flex flex-col gap-1 text-sm font-medium ${
              isOverlayLook ? 'text-white/90' : 'text-brand-muted'
            }`}
          >
            {navItems.map((item) => {
              if (!item.children) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="py-2 transition hover:opacity-80"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              }

              const expanded = mobileExpanded === item.label

              return (
                <div key={item.label} className="border-b border-transparent py-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-2 transition hover:opacity-80"
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileExpanded((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expanded && (
                    <div className="mb-2 ms-3 flex flex-col gap-1 border-s border-current/15 ps-3">
                      <a
                        href={item.href}
                        className="py-1.5 text-xs font-semibold uppercase tracking-wide opacity-70 transition hover:opacity-100"
                        onClick={() => setOpen(false)}
                      >
                        {t('nav.viewAllShort')}
                      </a>
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          target={child.external ? '_blank' : undefined}
                          rel={child.external ? 'noreferrer' : undefined}
                          className="py-1.5 transition hover:opacity-80"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                          {child.disabled ? ` · ${t('nav.soon')}` : ''}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            <button
              type="button"
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-[#38bdf8] via-[#1447E6] to-[#0065d2] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-12px_rgba(20,71,230,0.65)] transition hover:brightness-110"
              onClick={() => {
                setOpen(false)
                setConsultOpen(true)
              }}
            >
              {t('nav.cta.consult')}
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
            </button>
          </nav>
        </div>
      )}

      {consultOpen ? (
        <Suspense fallback={null}>
          <ConsultationModal open={consultOpen} onClose={() => setConsultOpen(false)} />
        </Suspense>
      ) : null}
    </header>
  )
}
