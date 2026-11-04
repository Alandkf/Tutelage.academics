'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { content } from '@/lib/leo/content'

const STORAGE_KEY = 'leo-language'
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  // Server HTML is Kurdish (RTL); the saved choice is applied after mount to avoid hydration mismatch.
  const [lang, setLangState] = useState('ku')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'en' || saved === 'ku') setLangState(saved)
    } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'ku' ? 'ckb' : 'en'
    document.documentElement.dir = lang === 'ku' ? 'rtl' : 'ltr'
  }, [lang])

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, t: content[lang], dir: lang === 'ku' ? 'rtl' : 'ltr', isRTL: lang === 'ku' }),
    [lang, setLang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLeo() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLeo must be used inside LanguageProvider')
  return ctx
}
