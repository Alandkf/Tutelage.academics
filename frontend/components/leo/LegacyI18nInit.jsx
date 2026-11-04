'use client'

// The inherited Tutelage pages (now redirected to "/") call useTranslation() and
// need the old i18next instance to exist so `next build` can prerender them.
// The LEO UI does NOT use this. Delete this file once those routes are removed.
import '@/i18n'

export default function LegacyI18nInit() {
  return null
}
