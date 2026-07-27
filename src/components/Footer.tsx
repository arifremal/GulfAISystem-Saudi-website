import type { ReactNode } from 'react'
import { industries, servicePages, services } from '../data/content'
import { useLanguage } from '../i18n'
import { Reveal } from './Reveal'

const PHONE = '+966535455063'
const PHONE_DISPLAY = '+966 53 545 5063'
const WHATSAPP_AU = '+61876494960'
const WHATSAPP_DISPLAY = '+61 8 7649 4960'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_AU.replace('+', '')}`
const EMAIL = 'info@gulfaisystems.com.sa'
const GLOBAL_AI_URL = 'https://globalaigroup.com.au/'

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  )
}

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

function FooterAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base multi-layer gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(145deg, #0E2348 0%, #123B7A 48%, #0E2348 100%),
            radial-gradient(ellipse 90% 70% at 0% 0%, rgba(37, 99, 235, 0.28), transparent 55%),
            radial-gradient(ellipse 80% 60% at 100% 100%, rgba(56, 189, 248, 0.16), transparent 50%)
          `,
          backgroundBlendMode: 'normal, soft-light, soft-light',
        }}
      />

      {/* Soft mesh light */}
      <div
        className="footer-mesh-shift absolute inset-0 opacity-[0.08]"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(96, 165, 250, 0.9), transparent 28%),
            radial-gradient(circle at 78% 20%, rgba(56, 189, 248, 0.7), transparent 26%),
            radial-gradient(circle at 55% 75%, rgba(37, 99, 235, 0.75), transparent 32%)
          `,
        }}
      />

      {/* Floating blurred orbs */}
      <div
        className="footer-orb-float absolute -top-28 -start-20 h-[26rem] w-[26rem] rounded-full opacity-[0.09] blur-3xl"
        style={{
          background: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)',
        }}
      />
      <div
        className="footer-orb-float-alt absolute -bottom-32 -end-16 h-[24rem] w-[24rem] rounded-full opacity-[0.08] blur-3xl"
        style={{
          background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)',
        }}
      />
      <div
        className="footer-glow-pulse absolute top-1/3 start-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-[0.06] blur-3xl"
        style={{
          background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
        }}
      />

      {/* Flowing wave layers */}
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="footer-wave-drift-slow absolute inset-x-0 bottom-0 h-40 w-[200%] max-w-none opacity-[0.07] md:h-52"
      >
        <path
          d="M0,120 C240,180 480,60 720,110 C960,160 1200,70 1440,120 L1440,220 L0,220 Z"
          fill="#60A5FA"
        />
      </svg>
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="footer-wave-drift absolute inset-x-0 bottom-0 h-32 w-[200%] max-w-none opacity-[0.06] md:h-44"
      >
        <path
          d="M0,90 C280,20 520,150 720,100 C920,50 1160,140 1440,80 L1440,180 L0,180 Z"
          fill="#38BDF8"
        />
      </svg>

      {/* Abstract curved accent */}
      <svg
        viewBox="0 0 800 600"
        className="absolute -top-10 end-0 h-[28rem] w-[28rem] opacity-[0.06]"
      >
        <ellipse cx="520" cy="180" rx="280" ry="160" fill="none" stroke="#93C5FD" strokeWidth="1.2" />
        <ellipse cx="540" cy="200" rx="220" ry="120" fill="none" stroke="#60A5FA" strokeWidth="1" />
        <path
          d="M180 420 C320 280, 480 500, 680 340"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.2"
        />
      </svg>

      {/* Subtle geometric pattern */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(30deg, transparent 48%, rgba(147, 197, 253, 0.55) 49%, rgba(147, 197, 253, 0.55) 51%, transparent 52%),
            linear-gradient(-30deg, transparent 48%, rgba(96, 165, 250, 0.4) 49%, rgba(96, 165, 250, 0.4) 51%, transparent 52%)
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at 70% 40%, black 10%, transparent 68%)',
        }}
      />

      {/* Soft top glow ribbon */}
      <div
        className="footer-glow-pulse absolute inset-x-0 top-0 h-28"
        style={{
          background:
            'linear-gradient(90deg, rgba(18, 59, 122, 0.15), rgba(37, 99, 235, 0.22), rgba(56, 189, 248, 0.18), rgba(18, 59, 122, 0.15))',
        }}
      />
    </div>
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
      <h3 className="text-[0.7rem] font-semibold tracking-[0.16em] text-white uppercase">
        {title}
      </h3>
      <ul className="mt-6 space-y-3.5">{children}</ul>
    </div>
  )
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string
  children: ReactNode
  external?: boolean
}) {
  return (
    <li>
      <a
        href={href}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className="group inline-flex items-center gap-1.5 text-sm text-[#C8D4E6] transition-colors duration-200 hover:text-white"
      >
        <span className="border-b border-transparent transition-[border-color] group-hover:border-white/35">
          {children}
        </span>
        {external ? (
          <ArrowUpRightIcon className="h-3 w-3 shrink-0 text-[#60A5FA] opacity-0 transition-opacity group-hover:opacity-80" />
        ) : null}
      </a>
    </li>
  )
}

function SocialIconButton({
  href,
  label,
  children,
  external,
}: {
  href: string
  label: string
  children: ReactNode
  external?: boolean
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.07] text-[#60A5FA] shadow-[0_4px_16px_-6px_rgba(37,99,235,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#60A5FA]/45 hover:bg-[#2563EB]/20 hover:shadow-[0_8px_24px_-8px_rgba(56,189,248,0.55)]"
    >
      {children}
    </a>
  )
}

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="relative overflow-hidden text-white">
      <FooterAtmosphere />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8 lg:pt-20">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
            <div className="sm:col-span-2 lg:col-span-4">
              <a href="/" className="inline-flex rounded-lg bg-white/95 px-3 py-2 shadow-sm">
                <img
                  src="/assets/logo.webp"
                  alt={t('footer.logoAlt')}
                  width={256}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-auto sm:h-12"
                />
              </a>
              <p className="mt-4 text-base font-semibold text-white">
                {t('footer.brandName')}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#C8D4E6]">
                {t('footer.tagline')}
              </p>
              <a
                href={GLOBAL_AI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-[#123B7A]/70 via-[#2563EB]/45 to-[#38BDF8]/30 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_-6px_rgba(56,189,248,0.55)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#60A5FA]/50 hover:shadow-[0_0_32px_-4px_rgba(96,165,250,0.7)]"
              >
                <GlobeIcon className="h-4 w-4 shrink-0 text-[#93C5FD]" />
                {t('footer.visitGlobal')}
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-[#93C5FD] opacity-80" />
              </a>
            </div>

            <div className="lg:col-span-2">
              <FooterColumn title={t('footer.col.services')}>
                {services.map((service) => (
                  <FooterLink key={service.key} href={servicePages[service.key].path}>
                    {t(`services.${service.key}.title`)}
                  </FooterLink>
                ))}
              </FooterColumn>
            </div>

            <div className="lg:col-span-3">
              <FooterColumn title={t('footer.col.industries')}>
                {industries.map((industry) => (
                  <FooterLink
                    key={industry.id}
                    href={
                      industry.available && industry.href
                        ? industry.href
                        : '/#industries'
                    }
                    external={Boolean(industry.available && industry.href)}
                  >
                    {t(`industries.${industry.id}.title`)}
                  </FooterLink>
                ))}
              </FooterColumn>
            </div>

            <div className="lg:col-span-3">
              <FooterColumn title={t('footer.col.contact')}>
                <li className="flex items-start gap-3 text-sm text-[#C8D4E6]">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#60A5FA]" />
                  <span>{t('footer.location')}</span>
                </li>
                <li>
                  <a
                    href={`tel:${PHONE}`}
                    className="inline-flex items-center gap-3 text-sm text-[#C8D4E6] transition-colors hover:text-white"
                  >
                    <PhoneIcon className="h-4 w-4 shrink-0 text-[#60A5FA]" />
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm text-[#C8D4E6] transition-colors hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                    {WHATSAPP_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-3 break-all text-sm text-[#C8D4E6] transition-colors hover:text-white"
                  >
                    <MailIcon className="h-4 w-4 shrink-0 text-[#60A5FA]" />
                    {EMAIL}
                  </a>
                </li>
              </FooterColumn>

              <div className="mt-8 flex items-center gap-2.5">
                <SocialIconButton href={WHATSAPP_URL} label="WhatsApp" external>
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                </SocialIconButton>
                <SocialIconButton href={`tel:${PHONE}`} label="Phone">
                  <PhoneIcon className="h-4 w-4" />
                </SocialIconButton>
                <SocialIconButton href={`mailto:${EMAIL}`} label="Email">
                  <MailIcon className="h-4 w-4" />
                </SocialIconButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Soft glowing divider */}
      <div
        aria-hidden
        className="relative h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.35), rgba(56, 189, 248, 0.5), rgba(96, 165, 250, 0.35), transparent)',
          boxShadow: '0 0 12px rgba(56, 189, 248, 0.25)',
        }}
      />

      <div
        className="relative"
        style={{
          background: 'linear-gradient(180deg, rgba(18, 59, 122, 0.35), rgba(14, 35, 72, 0.55))',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-[#A8B8CC] sm:flex-row sm:px-6 sm:text-start lg:px-8">
          <p>{t('footer.copyright', { year })}</p>
          <a
            href="/contact"
            className="font-medium text-[#C8D4E6] transition-colors hover:text-white"
          >
            {t('nav.cta.contact')}
          </a>
        </div>
      </div>
    </footer>
  )
}
