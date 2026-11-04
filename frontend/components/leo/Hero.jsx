'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLeo } from './LanguageProvider'

export default function Hero() {
  const { t } = useLeo()
  const h = t.hero

  return (
    <section id="home" className="relative scroll-mt-20 overflow-hidden bg-leo-navy text-white">
      {/* decorative shapes */}
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -start-24 h-72 w-72 rotate-12 rounded-3xl bg-leo-red/90" />
      <div aria-hidden className="pointer-events-none absolute -top-20 end-1/3 h-56 w-56 rounded-full bg-white/5" />
      <div aria-hidden className="pointer-events-none absolute -end-16 top-10 h-80 w-80 rounded-full bg-leo-navy-dark/60" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-leo-yellow px-4 py-1.5 text-xs font-bold text-leo-navy-dark sm:text-sm">
            <Sparkles className="size-4" />
            {h.eyebrow}
          </span>
          <h1 className="mb-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{h.title}</h1>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{h.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 bg-leo-red px-7 text-base text-white hover:bg-leo-red/90">
              <Link href="/#ai">
                {h.ctaAi}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-white/40 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white">
              <Link href="/#courses">{h.ctaCourses}</Link>
            </Button>
          </div>
        </motion.div>

        {/* AI chat mock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="rounded-2xl bg-white p-5 text-foreground shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-full bg-leo-navy text-white">
                  <Bot className="size-5" />
                </span>
                <span className="font-bold text-leo-navy">{h.chat.header}</span>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-green-500" />
                {h.chat.online}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted">
                  <User className="size-4 text-muted-foreground" />
                </span>
                <p dir="ltr" className="rounded-2xl bg-muted px-4 py-2 text-start text-sm">{h.chat.user}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-leo-navy">
                  <Bot className="size-4 text-white" />
                </span>
                <div className="rounded-2xl bg-leo-navy px-4 py-2 text-sm text-white">
                  <p>{h.chat.ai}</p>
                  <span className="mt-2 inline-block rounded-full bg-leo-yellow px-2.5 py-0.5 text-xs font-bold text-leo-navy-dark">{h.chat.level}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
