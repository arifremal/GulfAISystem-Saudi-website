import type { ReactNode } from 'react'
import { useLanguage } from '../i18n'
import { Reveal } from './Reveal'

const PHONE = '+966535455063'
const PHONE_DISPLAY = '+966 53 545 5063'
const WHATSAPP_AU = '+61876494960'
const WHATSAPP_DISPLAY = '+61 8 7649 4960'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_AU.replace('+', '')}`
const EMAIL = 'info@gulfaisystems.com.sa'
const GLOBAL_AI_URL = 'https://globalaigroup.com.au/'

const navLinks = [
  { labelKey: 'footer.nav.home', href: '/' },
  { labelKey: 'footer.nav.about', href: '/about' },
  { labelKey: 'footer.nav.contact', href: '/contact' },
  { labelKey: 'footer.nav.reviews', href: '/#reviews' },
] as const

const quickLinks = [
  { labelKey: 'footer.quick.contact', href: '/contact' },
  { labelKey: 'footer.quick.faqs', href: '/contact' },
  { labelKey: 'footer.quick.services', href: '/#services' },
  { labelKey: 'footer.quick.about', href: '/about' },
] as const

const serviceLinks = [
  { labelKey: 'footer.service.rfq', href: '#services' },
  { labelKey: 'footer.service.erp', href: '#services' },
  { labelKey: 'footer.service.procurement', href: '#services' },
  { labelKey: 'footer.service.finance', href: '#services' },
  { labelKey: 'footer.service.agents', href: '#services' },
  { labelKey: 'footer.service.knowledge', href: '#services' },
] as const

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9S14.5 18.2 12 21c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z" />
    </svg>
  )
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z" />
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.96.52 3.82 1.44 5.45L2 22l4.9-1.55a9.9 9.9 0 0 0 5.14 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 14.17c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.16-4.93-4.35-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.57-.35.76-.35h.55c.17 0 .41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.28.75 1.23 1.61 2 .96 1 1.85 1.36 2.13 1.51.28.17.45.14.62-.07.17-.21.74-.86.94-1.15.2-.28.4-.24.67-.14.28.1 1.74.82 2.04.97.3.14.5.22.57.34.08.12.08.7-.16 1.37z" />
    </svg>
  )
}

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-[color:var(--brand)]">{title}</h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="text-sm text-[color:var(--navy-deep)]/70 transition-colors hover:text-[color:var(--brand)]"
      >
        {children}
      </a>
    </li>
  )
}

function FooterWaves() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 -translate-y-[calc(100%-1px)] overflow-hidden"
      aria-hidden
    >
      <div className="relative h-16 md:h-24">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="footer-wave-drift-slow absolute bottom-0 start-0 h-full w-[200%] max-w-none opacity-60"
        >
          <path
            d="M0,64 C320,110 520,20 720,52 C920,84 1120,28 1440,64 L1440,120 L0,120 Z"
            fill="color-mix(in oklab, var(--brand-light) 45%, white)"
          />
        </svg>
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="footer-wave-drift absolute bottom-0 start-0 h-[88%] w-[200%] max-w-none opacity-75"
        >
          <path
            d="M0,56 C280,8 480,96 720,64 C960,32 1160,104 1440,56 L1440,120 L0,120 Z"
            fill="color-mix(in oklab, var(--brand-sky) 40%, white)"
          />
        </svg>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="relative block h-12 w-full md:h-16"
        >
          <path
            d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,40 L1440,80 L0,80 Z"
            fill="color-mix(in oklab, var(--brand-sky) 32%, white)"
          />
        </svg>
      </div>
    </div>
  )
}

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-[color:var(--brand-sky)]/30 via-[color:var(--brand-light)]/20 to-white text-[color:var(--navy-deep)]"
    >
      <FooterWaves />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 end-0 h-80 w-80 rounded-full opacity-50 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--brand-sky), transparent 68%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 start-1/4 h-64 w-64 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--brand-light), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 lg:px-8">
        <Reveal>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="inline-block">
              <img
                src="/assets/logo.webp"
                alt={t('footer.logoAlt')}
                width={256}
                height={64}
                loading="lazy"
                decoding="async"
                className="h-14 w-auto sm:h-16"
              />
            </a>
            <p className="mt-3 text-lg font-bold text-[color:var(--brand)]">
              {t('footer.brandName')}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t('footer.tagline')}
            </p>
            <a
              href={GLOBAL_AI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand)] transition-colors hover:text-[color:var(--navy-deep)]"
            >
              <GlobeIcon className="h-4 w-4 shrink-0" />
              {t('footer.visitGlobal')}
            </a>
          </div>

          <FooterColumn title={t('footer.col.navigation')}>
            {navLinks.map((link) => (
              <FooterLink key={link.labelKey} href={link.href}>
                {t(link.labelKey)}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t('footer.col.quickLink')}>
            {quickLinks.map((link) => (
              <FooterLink key={link.labelKey} href={link.href}>
                {t(link.labelKey)}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t('footer.col.services')}>
            {serviceLinks.map((link) => (
              <FooterLink key={link.labelKey} href={link.href}>
                {t(link.labelKey)}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>
        </Reveal>

        <Reveal delay={100}>
        <div className="mt-12 flex flex-col gap-6 border-t border-[color:var(--brand)]/15 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
            <div className="inline-flex items-center gap-2.5 text-sm text-[color:var(--navy-deep)]/80">
              <MapPinIcon className="h-4 w-4 shrink-0 text-[color:var(--brand)]" />
              {t('footer.location')}
            </div>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2.5 text-sm text-[color:var(--navy-deep)]/80 transition-colors hover:text-[color:var(--brand)]"
            >
              <PhoneIcon className="h-4 w-4 shrink-0 text-[color:var(--brand)]" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex items-center gap-2.5 text-sm text-[color:var(--navy-deep)]/80 transition-colors hover:text-[color:var(--brand)]"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
              {WHATSAPP_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2.5 break-all text-sm text-[color:var(--navy-deep)]/80 transition-colors hover:text-[color:var(--brand)]"
            >
              <MailIcon className="h-4 w-4 shrink-0 text-[color:var(--brand)]" />
              {EMAIL}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--brand)]/20 bg-white/70 text-[#25D366] shadow-sm transition-colors hover:bg-[color:var(--brand)] hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <a
              href={`tel:${PHONE}`}
              aria-label="Phone"
              className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--brand)]/20 bg-white/70 text-[color:var(--brand)] shadow-sm transition-colors hover:bg-[color:var(--brand)] hover:text-white"
            >
              <PhoneIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--brand)]/20 bg-white/70 text-[color:var(--brand)] shadow-sm transition-colors hover:bg-[color:var(--brand)] hover:text-white"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        </Reveal>
      </div>

      <div className="relative overflow-hidden border-t border-[color:var(--brand)]/10 bg-[color:var(--brand-sky)]/15">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          aria-hidden
          className="footer-wave-drift-slow pointer-events-none absolute inset-x-0 -top-6 block h-6 w-[200%] max-w-none opacity-40 md:-top-8 md:h-8"
        >
          <path
            d="M0,24 C360,44 540,4 720,22 C900,40 1080,6 1440,24 L1440,48 L0,48 Z"
            fill="color-mix(in oklab, var(--brand-light) 35%, white)"
          />
        </svg>
        <div className="relative mx-auto max-w-7xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          {t('footer.copyright', { year })}
        </div>
      </div>
    </footer>
  )
}
