import { useEffect } from 'react'

const WIDGET_SCRIPT_ID = 'saudia-aiagentichub-widget'
const WIDGET_SCRIPT_SRC = 'https://saudia.aiagentichub.io/widget.js'

export function ChatWidget() {
  useEffect(() => {
    if (document.getElementById(WIDGET_SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = WIDGET_SCRIPT_ID
    script.src = WIDGET_SCRIPT_SRC
    script.async = true
    document.body.appendChild(script)
  }, [])

  return null
}
