type GtagFn = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: GtagFn
  }
}

function isProductionHost(): boolean {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname
  return host !== 'localhost' && host !== '127.0.0.1'
}

export function trackFormSubmission(formName: string) {
  if (!isProductionHost() || typeof window.gtag !== 'function') return
  window.gtag('event', 'form_submit', { form_name: formName })
}
