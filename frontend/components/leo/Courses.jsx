'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Award, BookOpen, Languages, Monitor, Plane, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLeo } from './LanguageProvider'

const ICONS = { book: BookOpen, monitor: Monitor, smile: Smile, languages: Languages, plane: Plane, award: Award }

export default function Courses() {
  const { t } = useLeo()
  const c = t.courses

  return (
    <section id="courses" className="scroll-mt-20 bg-leo-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-leo-navy sm:text-4xl">{c.title}</h2>
          <p className="text-base text-muted-foreground sm:text-lg">{c.subtitle}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.items.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-leo-navy text-white">
                    <Icon className="size-6" />
                  </span>
                  <span dir="auto" className="rounded-full bg-leo-yellow px-3 py-1 text-xs font-bold text-leo-navy-dark">{item.level}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-leo-navy">{item.title}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {item.online && <span className="rounded-full border border-leo-navy/20 px-3 py-0.5 text-xs font-medium text-leo-navy">{c.online}</span>}
                  {item.inPerson && <span className="rounded-full border border-leo-navy/20 px-3 py-0.5 text-xs font-medium text-leo-navy">{c.inPerson}</span>}
                </div>
                <Button asChild variant="outline" className="border-leo-red text-leo-red hover:bg-leo-red hover:text-white">
                  <Link href="/#contact">{c.cta}</Link>
                </Button>
              </motion.div>
            )
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">{c.note}</p>
      </div>
    </section>
  )
}
