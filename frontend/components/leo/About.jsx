'use client'

import { motion } from 'framer-motion'
import { BookOpen, Smile, Heart } from 'lucide-react'
import { useLeo } from './LanguageProvider'

const ICONS = [BookOpen, Smile, Heart]

export default function About() {
  const { t } = useLeo()
  const a = t.about

  return (
    <section id="about" className="scroll-mt-20 bg-leo-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-leo-navy sm:text-4xl">{a.title}</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{a.text}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {a.values.map((v, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-white p-7 text-center shadow-sm"
              >
                <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-leo-navy text-white">
                  <Icon className="size-7" />
                </span>
                <h3 className="mb-2 text-xl font-bold text-leo-navy">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
