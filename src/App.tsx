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
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { ServicePage } from './pages/ServicePage'
import { getServiceKeyFromPath, resolveServicePathname } from './data/content'

export default function App() {
  const rawPathname = window.location.pathname.replace(/\/$/, '') || '/'
  const pathname = resolveServicePathname(rawPathname)
  if (pathname !== rawPathname) {
    window.history.replaceState(
      null,
      '',
      `${pathname}${window.location.search}${window.location.hash}`,
    )
  }
  const isAboutPage = pathname === '/about'
  const isContactPage = pathname === '/contact'
  const serviceKey = getServiceKeyFromPath(pathname)
  const isServicePage = Boolean(serviceKey)

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text antialiased">
      <Header overlay />
      {isAboutPage ? (
        <AboutPage />
      ) : isContactPage ? (
        <ContactPage />
      ) : isServicePage && serviceKey ? (
        <ServicePage service={serviceKey} />
      ) : (
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
      )}
      {!isContactPage && !isServicePage && <AuditCta />}
      <Footer />
    </div>
  )
}
