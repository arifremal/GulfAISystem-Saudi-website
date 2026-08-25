import { ArrowUpRight } from 'lucide-react'
import { PageSeo } from '../components/PageSeo'
import { Reveal } from '../components/Reveal'
import { useLanguage } from '../i18n'
import { canonicalizePath } from '../lib/seo'

export function NotFoundPage() {
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const path = canonicalizePath(window.location.pathname) || '/404'

  const title = isAr
    ? 'الصفحة غير موجودة | جلف إيه آي سيستمز'
    : 'Page Not Found | Gulf AI Systems'
  const description = isAr
    ? 'الصفحة المطلوبة غير موجودة. عد إلى الصفحة الرئيسية أو تواصل مع جلف إيه آي سيستمز.'
    : 'The page you requested could not be found. Return home or contact Gulf AI Systems.'

  return (
    <main className="overflow-x-hidden">
      <PageSeo title={title} description={description} path={path} noindex />
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020b1d] via-[#0a1f3d] to-[#1447E6]/40" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-8">
          <Reveal immediate>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              {isAr ? 'خطأ 404' : 'Error 404'}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {isAr ? 'الصفحة غير موجودة' : 'Page not found'}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a href="/" className="btn-cta sm:text-base">
                {isAr ? 'العودة للرئيسية' : 'Back to Home'}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {isAr ? 'تواصل معنا' : 'Contact Us'}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
