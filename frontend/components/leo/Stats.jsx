'use client'

import CountUp from 'react-countup'
import { useLeo } from './LanguageProvider'

export default function Stats() {
  const { t } = useLeo()

  return (
    <section aria-label="Highlights" className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {t.stats.map((s, i) => (
          <div key={i} className="rounded-xl border border-border bg-leo-surface p-5 text-center">
            <div className="mb-1 text-2xl font-extrabold text-leo-navy sm:text-3xl">
              {s.value != null ? (
                <span dir="ltr">
                  <CountUp end={s.value} duration={2} enableScrollSpy scrollSpyOnce />
                  {s.suffix}
                </span>
              ) : (
                s.text
              )}
            </div>
            <div className="text-xs font-medium text-muted-foreground sm:text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
