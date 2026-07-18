import { useEffect } from 'react'

const BANNER_STYLE_ID = 'hide-elevenagents-banner'
const observedWidgets = new WeakSet<Element>()

function hideBanner(root: ShadowRoot | null) {
  if (!root || root.getElementById(BANNER_STYLE_ID)) return

  const style = document.createElement('style')
  style.id = BANNER_STYLE_ID
  style.textContent = `
    p:has(a[href*="elevenlabs"]) {
      display: none !important;
    }
  `
  root.appendChild(style)
}

function observeWidget(widget: Element) {
  if (observedWidgets.has(widget)) return
  observedWidgets.add(widget)

  const attach = () => {
    const root = widget.shadowRoot
    if (!root) return false

    hideBanner(root)

    const observer = new MutationObserver(() => hideBanner(root))
    observer.observe(root, { childList: true, subtree: true })
    return true
  }

  if (attach()) return

  const observer = new MutationObserver(() => {
    if (attach()) observer.disconnect()
  })
  observer.observe(widget, { childList: true })
}

export function ChatWidget() {
  useEffect(() => {
    const scan = () => {
      document.querySelectorAll('elevenlabs-convai').forEach(observeWidget)
    }

    scan()

    const bodyObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue
          if (node.tagName.toLowerCase() === 'elevenlabs-convai') {
            observeWidget(node)
          }
          node.querySelectorAll('elevenlabs-convai').forEach(observeWidget)
        }
      }
    })

    bodyObserver.observe(document.body, { childList: true, subtree: true })

    return () => bodyObserver.disconnect()
  }, [])

  return null
}
