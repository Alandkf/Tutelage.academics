'use client'

import { Quote } from 'lucide-react'
import { useLeo } from './LanguageProvider'

export default function Testimonials() {
  const { t } = useLeo()
  const x = t.testimonials

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-bold text-leo-navy sm:text-4xl">{x.title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {x.items.map((item) => (
            <figure key={item.name} className="relative rounded-2xl border border-border bg-leo-surface p-6">
              <Quote className="mb-3 size-7 text-leo-red" />
              <blockquote className="mb-5 text-base leading-relaxed">{item.quote}</blockquote>
              <figcaption className="text-sm">
                <span className="font-bold text-leo-navy">{item.name}</span>
                <span className="text-muted-foreground"> · {item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
