import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ar } from './ar'
import { en } from './en'
import { interpolate, type Lang } from './types'

const STORAGE_KEY = 'gulf-ai-lang'
const dictionaries = { en, ar } as const

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string, vars?: Record<string, string | number>) => string
  dir: 'ltr' | 'rtl'
  isRtl: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'ar' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    typeof window !== 'undefined' ? readStoredLang() : 'en',
  )

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
    root.classList.toggle('lang-ar', lang === 'ar')
  }, [lang])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = dictionaries[lang]
      const fallback = dictionaries.en
      const value = dict[key] ?? fallback[key] ?? key
      return interpolate(value, vars)
    },
    [lang],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      isRtl: lang === 'ar',
    }),
    [lang, setLang, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
