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
import { ChatWidget } from './components/ChatWidget'

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const isAboutPage = pathname === '/about'
  const isContactPage = pathname === '/contact'

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text antialiased">
      <Header overlay={!isContactPage} />
      {isAboutPage ? (
        <AboutPage />
      ) : isContactPage ? (
        <ContactPage />
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
      <AuditCta />
      <Footer />
      <ChatWidget />
    </div>
  )
}
