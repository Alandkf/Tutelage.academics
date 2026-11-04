'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AtSign, Facebook, Instagram, Phone, MapPin } from 'lucide-react'
import { useLeo } from './LanguageProvider'
import { PHONES, SOCIALS } from '@/lib/leo/content'

export default function LeoFooter() {
  const { t, lang } = useLeo()
  const year = new Date().getFullYear()
  const quick = [
    { href: '/#about', label: t.nav.about },
    { href: '/#courses', label: t.nav.courses },
    { href: '/#ai', label: t.nav.ai },
    { href: '/#contact', label: t.nav.contact },
  ]
  const socials = [
    { href: SOCIALS.instagram, label: 'Instagram', Icon: Instagram },
    { href: SOCIALS.facebook, label: 'Facebook', Icon: Facebook },
    { href: SOCIALS.threads, label: 'Threads', Icon: AtSign },
  ]

  return (
    <footer className="bg-leo-navy-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="mb-4 inline-flex items-center gap-3 rounded-xl bg-white p-2 pe-4">
            <Image src="/leo/leo-logo.png" alt="LEO Institute logo" width={44} height={44} className="h-11 w-11 object-contain" />
            <span className="font-bold text-leo-navy">{lang === 'ku' ? 'پەیمانگای لیۆ' : 'LEO Institute'}</span>
          </div>
          <p className="text-sm font-semibold text-leo-yellow">{t.footer.tagline}</p>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-bold">{t.footer.links}</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-bold">{t.footer.contact}</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {PHONES.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Phone className="size-4" />
                  <span dir="ltr">{p.display}</span>
                </a>
              </li>
            ))}
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              {t.contact.location}
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-full bg-white/10 p-2 transition-colors hover:bg-leo-red">
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:px-6 md:flex-row lg:px-8">
          <span>© {year} LEO Institute. {t.footer.rights}</span>
          <span>{t.footer.credit}</span>
        </div>
      </div>
    </footer>
  )
}
