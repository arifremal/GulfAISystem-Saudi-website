import { lazy, Suspense } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProofStrip } from './components/ProofStrip'
import { AboutIntro } from './components/AboutIntro'
import { Industries } from './components/Industries'
import { Services } from './components/Services'
import { Approach } from './components/Approach'
import { Problem } from './components/Problem'
import { WhyUs } from './components/WhyUs'
import { AuditCta } from './components/AuditCta'
import { Footer } from './components/Footer'
import { PageSeo } from './components/PageSeo'
import { BUSINESS_NETWORKING_EVENT_PATH } from './data/events'
import { getServiceKeyFromPath, resolveServicePathname } from './data/content'
import { useLanguage } from './i18n'
import { canonicalizePath } from './lib/seo'

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const EventNetworkingPage = lazy(() =>
  import('./pages/EventNetworkingPage').then((m) => ({ default: m.EventNetworkingPage })),
)
const ServicePage = lazy(() =>
  import('./pages/ServicePage').then((m) => ({ default: m.ServicePage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

const KNOWN_PATHS = new Set([
  '/',
  '/about',
  '/contact',
  BUSINESS_NETWORKING_EVENT_PATH,
  '/ai-training',
  '/ai-capabilities/private-ai-agents',
  '/ai-capabilities/operations-automation',
])

function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      <PageSeo
        title={t('home.meta.title')}
        description={t('home.meta.description')}
        path="/"
      />
      <main>
        <Hero />
        <ProofStrip />
        <AboutIntro />
        <Industries />
        <Services />
        <Approach />
        <Problem />
        <WhyUs />
      </main>
    </>
  )
}

function RouteFallback() {
  return <div className="min-h-[50vh]" aria-hidden="true" />
}

export default function App() {
  const incoming = window.location.pathname
  const stripped = canonicalizePath(incoming)
  const pathname = resolveServicePathname(stripped)

  // Keep the address bar on the canonical path (no trailing slash / legacy aliases).
  // Server-side 301s handle crawlers; this keeps client navigations consistent.
  if (pathname !== incoming) {
    window.history.replaceState(
      null,
      '',
      `${pathname}${window.location.search}${window.location.hash}`,
    )
  }

  const isAboutPage = pathname === '/about'
  const isContactPage = pathname === '/contact'
  const isEventNetworkingPage = pathname === BUSINESS_NETWORKING_EVENT_PATH
  const serviceKey = getServiceKeyFromPath(pathname)
  const isServicePage = Boolean(serviceKey)
  const isNotFound = !KNOWN_PATHS.has(pathname) && !isServicePage

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text antialiased">
      <Header overlay />
      <Suspense fallback={<RouteFallback />}>
        {isAboutPage ? (
          <AboutPage />
        ) : isContactPage ? (
          <ContactPage />
        ) : isEventNetworkingPage ? (
          <EventNetworkingPage />
        ) : isServicePage && serviceKey ? (
          <ServicePage service={serviceKey} />
        ) : isNotFound ? (
          <NotFoundPage />
        ) : (
          <HomePage />
        )}
      </Suspense>
      {!isContactPage &&
        !isServicePage &&
        !isEventNetworkingPage &&
        !isNotFound && <AuditCta />}
      <Footer />
    </div>
  )
}
