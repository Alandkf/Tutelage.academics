'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, Phone, X, Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLeo } from './LanguageProvider'
import { PHONES } from '@/lib/leo/content'

export default function LeoNavbar() {
  const { t, lang, setLang } = useLeo()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/#home', label: t.nav.home },
    { href: '/#about', label: t.nav.about },
    { href: '/#courses', label: t.nav.courses },
    { href: '/#ai', label: t.nav.ai, badge: t.nav.newBadge },
    { href: '/#contact', label: t.nav.contact },
  ]

  const toggleLang = () => setLang(lang === 'ku' ? 'en' : 'ku')

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? 'shadow-md' : 'border-b border-border'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/leo/leo-logo.png" alt="LEO Institute logo" width={40} height={40} className="h-10 w-10 object-contain" priority />
          <span className="text-base font-bold text-leo-navy md:text-lg">{lang === 'ku' ? 'پەیمانگای لیۆ' : 'LEO Institute'}</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="relative text-sm font-semibold text-foreground transition-colors hover:text-leo-red">
              {l.label}
              {l.badge && (
                <span className="absolute -top-3 -end-6 rounded-full bg-leo-red px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                  {l.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleLang} aria-label="Switch language" className="gap-1.5 border-leo-navy/30 text-leo-navy">
            <Languages className="size-4" />
            {t.nav.switchLang}
          </Button>
          <Button asChild size="sm" className="hidden bg-leo-red text-white hover:bg-leo-red/90 sm:inline-flex">
            <a href={`tel:${PHONES[0].tel}`}>
              <Phone className="size-4" />
              {t.nav.call}
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label={t.nav.menu} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6" aria-label="Mobile">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex items-center gap-2 border-b border-border/60 py-3 text-sm font-semibold last:border-0">
                {l.label}
                {l.badge && <span className="rounded-full bg-leo-red px-1.5 py-0.5 text-[10px] font-bold text-white">{l.badge}</span>}
              </Link>
            ))}
            <a href={`tel:${PHONES[0].tel}`} className="flex items-center gap-2 py-3 text-sm font-semibold text-leo-red">
              <Phone className="size-4" />
              {t.nav.call}
              <span dir="ltr">{PHONES[0].display}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
