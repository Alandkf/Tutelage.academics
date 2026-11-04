'use client'

import { motion } from 'framer-motion'
import { Bot, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LeoAiDemo from './LeoAiDemo'
import { useLeo } from './LanguageProvider'
import { LEO_AI_URL } from '@/lib/leo/content'

export default function AiShowcase() {
  const { t } = useLeo()
  const a = t.ai

  return (
    <section id="ai" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-leo-red px-4 py-1.5 text-xs font-bold text-white sm:text-sm">
            <Bot className="size-4" />
            {a.badge}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-leo-navy sm:text-4xl lg:text-5xl">{a.title}</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{a.subtitle}</p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <ul className="mb-8 space-y-4">
              {a.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-leo-navy text-white">
                    <Check className="size-4" />
                  </span>
                  <span className="text-base font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="h-12 bg-leo-red px-7 text-base text-white hover:bg-leo-red/90">
              {LEO_AI_URL ? (
                <a href={LEO_AI_URL} target="_blank" rel="noopener noreferrer">{a.cta}</a>
              ) : (
                <a href="/#contact">{a.cta}</a>
              )}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <LeoAiDemo />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
