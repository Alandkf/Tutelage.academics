'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Loader2, Mic, RotateCcw, Sparkles, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLeo } from './LanguageProvider'
import { PLACEMENT_QUESTIONS, WRITING_SEGMENTS } from '@/lib/leo/content'

// Small helper: schedule timeouts that are cleared on unmount.
function useTimers() {
  const ids = useRef([])
  useEffect(() => () => ids.current.forEach(clearTimeout), [])
  return (fn, ms) => {
    const id = setTimeout(fn, ms)
    ids.current.push(id)
  }
}

function ScoreBar({ label, value, show }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm font-semibold">
        <span>{label}</span>
        <span dir="ltr">{value}%</span>
      </div>
      {/* dir=ltr so the bar always fills left to right */}
      <div dir="ltr" className="h-2.5 w-full overflow-hidden rounded-full bg-leo-navy/10">
        <div
          className="h-full rounded-full bg-leo-navy transition-all duration-1000 ease-out"
          style={{ width: show ? `${value}%` : '0%' }}
        />
      </div>
    </div>
  )
}

/* ───────────── Writing ───────────── */
function WritingDemo() {
  const { t } = useLeo()
  const w = t.ai.writing
  const later = useTimers()
  const [idx, setIdx] = useState(0)
  const [status, setStatus] = useState('idle') // idle | checking | done
  const sample = w.samples[idx]

  const pick = (i) => {
    setIdx(i)
    setStatus('idle')
  }
  const check = () => {
    setStatus('checking')
    later(() => setStatus('done'), 1100)
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">{w.hint}</p>
      <div className="flex flex-wrap gap-2">
        {w.samples.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => pick(i)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              i === idx ? 'border-leo-navy bg-leo-navy text-white' : 'border-border bg-white hover:border-leo-navy'
            }`}
          >
            #{i + 1}
          </button>
        ))}
      </div>

      <div>
        <div className="mb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">{w.yourSentence}</div>
        <p dir="ltr" className="rounded-xl border border-border bg-leo-surface p-4 text-start text-base">{sample.input}</p>
      </div>

      {status === 'idle' && (
        <Button onClick={check} className="bg-leo-red text-white hover:bg-leo-red/90">
          <Sparkles className="size-4" />
          {w.check}
        </Button>
      )}
      {status === 'checking' && (
        <Button disabled className="bg-leo-red text-white">
          <Loader2 className="size-4 animate-spin" />
          {w.checking}
        </Button>
      )}

      {status === 'done' && (
        <div className="space-y-4 rounded-xl border border-green-200 bg-green-50 p-4">
          <div>
            <div className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-green-700">
              <CheckCircle2 className="size-4" />
              {w.corrected}
            </div>
            <p dir="ltr" className="text-start text-base">
              {WRITING_SEGMENTS[sample.id].map((seg, i) =>
                seg.f ? (
                  <mark key={i} className="rounded bg-leo-yellow/70 px-1 font-semibold text-leo-navy-dark">{seg.t}</mark>
                ) : (
                  <span key={i}>{seg.t}</span>
                )
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{w.estimated}:</span>
            <span className="rounded-full bg-leo-navy px-3 py-0.5 text-xs font-bold text-white">{sample.level}</span>
          </div>
          <div>
            <div className="mb-1 text-sm font-semibold">{w.tips}</div>
            <ul className="list-disc space-y-1 ps-5 text-sm text-muted-foreground">
              {sample.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

/* ───────────── Speaking ───────────── */
function SpeakingDemo() {
  const { t } = useLeo()
  const s = t.ai.speaking
  const later = useTimers()
  const [status, setStatus] = useState('idle') // idle | listening | analyzing | done
  const [showBars, setShowBars] = useState(false)

  const record = () => {
    setShowBars(false)
    setStatus('listening')
    later(() => setStatus('analyzing'), 1800)
    later(() => {
      setStatus('done')
      later(() => setShowBars(true), 60)
    }, 2900)
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">{s.promptLabel}</div>
        <p dir="ltr" className="rounded-xl border border-border bg-leo-surface p-4 text-start text-base font-medium">{s.prompt}</p>
      </div>

      {status === 'idle' && (
        <Button onClick={record} className="bg-leo-red text-white hover:bg-leo-red/90">
          <Mic className="size-4" />
          {s.record}
        </Button>
      )}
      {(status === 'listening' || status === 'analyzing') && (
        <Button disabled className="bg-leo-red text-white">
          <Loader2 className="size-4 animate-spin" />
          {status === 'listening' ? s.listening : s.analyzing}
        </Button>
      )}

      {status === 'done' && (
        <div className="space-y-5 rounded-xl border border-border bg-white p-4 shadow-sm">
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">{s.heard}</div>
            <p dir="ltr" className="text-start text-base italic">“{s.transcript}”</p>
          </div>
          <div className="space-y-3">
            <ScoreBar label={s.scores.pronunciation} value={84} show={showBars} />
            <ScoreBar label={s.scores.fluency} value={76} show={showBars} />
            <ScoreBar label={s.scores.grammar} value={90} show={showBars} />
          </div>
          <div className="rounded-lg bg-leo-surface p-3 text-sm">
            <span className="font-bold text-leo-navy">{s.feedbackTitle}: </span>
            {s.feedback}
          </div>
          <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
            <RotateCcw className="size-4" />
            {s.again}
          </Button>
        </div>
      )}
    </div>
  )
}

/* ───────────── Placement ───────────── */
function PlacementDemo() {
  const { t } = useLeo()
  const p = t.ai.placement
  const [step, setStep] = useState(-1) // -1 intro, 0..n-1 questions, n result
  const [score, setScore] = useState(0)
  const [chosen, setChosen] = useState(null)
  const later = useTimers()
  const total = PLACEMENT_QUESTIONS.length

  const answer = (optIdx) => {
    if (chosen !== null) return
    setChosen(optIdx)
    const correct = optIdx === PLACEMENT_QUESTIONS[step].answer
    if (correct) setScore((s) => s + 1)
    later(() => {
      setChosen(null)
      setStep((s) => s + 1)
    }, 800)
  }
  const restart = () => {
    setStep(-1)
    setScore(0)
    setChosen(null)
  }

  if (step === -1) {
    return (
      <div className="space-y-5">
        <p className="text-base text-muted-foreground">{p.intro}</p>
        <Button onClick={() => setStep(0)} className="bg-leo-red text-white hover:bg-leo-red/90">
          {p.start}
        </Button>
      </div>
    )
  }

  if (step >= total) {
    const level = score >= 3 ? 'B1' : score === 2 ? 'A2' : 'A1'
    return (
      <div className="space-y-4 rounded-xl border border-border bg-white p-6 text-center shadow-sm">
        <div className="text-sm font-semibold text-muted-foreground">{p.resultTitle}</div>
        <div className="text-5xl font-extrabold text-leo-navy" dir="ltr">{level}</div>
        <div className="text-sm">
          <span className="font-semibold">{p.recommended}: </span>
          <span className="rounded-full bg-leo-yellow px-3 py-1 font-bold text-leo-navy-dark">{p.recs[level]}</span>
        </div>
        <Button variant="outline" size="sm" onClick={restart}>
          <RotateCcw className="size-4" />
          {p.restart}
        </Button>
      </div>
    )
  }

  const q = PLACEMENT_QUESTIONS[step]
  return (
    <div className="space-y-5">
      <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {p.question} <span dir="ltr">{step + 1}</span> {p.of} <span dir="ltr">{total}</span>
      </div>
      <p dir="ltr" className="text-start text-lg font-semibold">{q.q}</p>
      <div dir="ltr" className="grid gap-3 sm:grid-cols-3">
        {q.options.map((opt, i) => {
          const isChosen = chosen === i
          const isCorrect = chosen !== null && i === q.answer
          return (
            <button
              key={opt}
              type="button"
              onClick={() => answer(i)}
              disabled={chosen !== null}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-start text-sm font-medium transition-colors ${
                isCorrect
                  ? 'border-green-500 bg-green-50'
                  : isChosen
                    ? 'border-leo-red bg-red-50'
                    : 'border-border bg-white hover:border-leo-navy'
              }`}
            >
              {opt}
              {isCorrect && <CheckCircle2 className="size-4 text-green-600" />}
              {isChosen && !isCorrect && <XCircle className="size-4 text-leo-red" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function LeoAiDemo() {
  const { t } = useLeo()
  const tabs = t.ai.tabs
  const trigger =
    'flex-1 rounded-md px-3 py-2 text-sm font-semibold data-[state=active]:bg-leo-navy data-[state=active]:text-white'

  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-lg sm:p-6">
      <Tabs defaultValue="writing" className="gap-5">
        <TabsList className="h-auto w-full bg-leo-surface p-1">
          <TabsTrigger value="writing" className={trigger}>{tabs.writing}</TabsTrigger>
          <TabsTrigger value="speaking" className={trigger}>{tabs.speaking}</TabsTrigger>
          <TabsTrigger value="placement" className={trigger}>{tabs.placement}</TabsTrigger>
        </TabsList>
        <TabsContent value="writing"><WritingDemo /></TabsContent>
        <TabsContent value="speaking"><SpeakingDemo /></TabsContent>
        <TabsContent value="placement"><PlacementDemo /></TabsContent>
      </Tabs>
      <p className="mt-5 text-center text-xs text-muted-foreground">{t.ai.note}</p>
    </div>
  )
}
