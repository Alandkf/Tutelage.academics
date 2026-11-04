'use client'

import { Bot, PenLine, Sparkles, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LeoAiDemo from './LeoAiDemo'
import { useLeo } from './LanguageProvider'
import { LEO_AI_URL } from '@/lib/leo/content'

const STEPS = {
  en: {
    title: 'How LEO AI works',
    steps: [
      { title: 'Practice', text: 'Write a sentence, speak out loud or take a quick level test.' },
      { title: 'Get feedback', text: 'LEO AI corrects mistakes instantly and explains why, in Kurdish if you like.' },
      { title: 'Level up', text: 'Follow your progress and get course recommendations that fit your level.' },
    ],
  },
  ku: {
    title: 'LEO AI چۆن کار دەکات',
    steps: [
      { title: 'ڕاهێنان بکە', text: 'ڕستەیەک بنووسە، بە دەنگی بەرز قسە بکە، یان تاقیکردنەوەیەکی خێرای ئاست بکە.' },
      { title: 'ڕاستکردنەوە وەربگرە', text: 'LEO AI ڕاستەوخۆ هەڵەکان ڕاست دەکاتەوە و هۆکارەکەی ڕوون دەکاتەوە، بە کوردیش ئەگەر حەزت لێبێت.' },
      { title: 'ئاستت بەرز بکەرەوە', text: 'پێشکەوتنت بەدواداچوون بکە و خولی گونجاو لەگەڵ ئاستەکەت وەربگرە.' },
    ],
  },
}
const ICONS = [PenLine, Sparkles, Target]

export default function AiPage() {
  const { t, lang } = useLeo()
  const a = t.ai
  const how = STEPS[lang]

  return (
    <>
      <section className="bg-leo-navy text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-leo-red px-4 py-1.5 text-xs font-bold sm:text-sm">
            <Bot className="size-4" />
            {a.badge}
          </span>
          <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl">{a.title}</h1>
          <p className="text-base leading-relaxed text-white/85 sm:text-lg">{a.subtitle}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <LeoAiDemo />
        </div>
      </section>

      <section className="bg-leo-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-leo-navy">{how.title}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {how.steps.map((s, i) => {
              const Icon = ICONS[i]
              return (
                <div key={s.title} className="rounded-2xl border border-border bg-white p-7 text-center shadow-sm">
                  <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-leo-navy text-white">
                    <Icon className="size-7" />
                  </span>
                  <h3 className="mb-2 text-xl font-bold text-leo-navy">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="h-12 bg-leo-red px-7 text-base text-white hover:bg-leo-red/90">
              {LEO_AI_URL ? (
                <a href={LEO_AI_URL} target="_blank" rel="noopener noreferrer">{a.cta}</a>
              ) : (
                <a href="/#contact">{a.cta}</a>
              )}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
