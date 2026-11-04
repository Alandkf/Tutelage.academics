'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { AtSign, Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLeo } from './LanguageProvider'
import { PHONES, SOCIALS } from '@/lib/leo/content'

export default function Contact() {
  const { t } = useLeo()
  const c = t.contact
  const f = c.form

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, f.errName),
        phone: z.string().trim().regex(/^[+\d][\d\s-]{6,}$/, f.errPhone),
        course: z.string().min(1, f.errCourse),
      }),
    [f]
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { name: '', phone: '', course: '' } })

  // DEMO ONLY: nothing is sent anywhere. We just show a thank-you toast.
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500))
    toast.success(f.success)
    reset()
  }

  const socials = [
    { href: SOCIALS.instagram, label: 'Instagram', Icon: Instagram },
    { href: SOCIALS.facebook, label: 'Facebook', Icon: Facebook },
    { href: SOCIALS.threads, label: 'Threads', Icon: AtSign },
  ]
  const fieldError = (msg) => msg && <p className="mt-1 text-xs text-leo-red">{msg}</p>

  return (
    <section id="contact" className="scroll-mt-20 bg-leo-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{c.title}</h2>
          <p className="mb-8 max-w-lg text-base leading-relaxed text-white/85">{c.text}</p>

          <div className="mb-8 space-y-3">
            {PHONES.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-4 rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/20">
                <span className="grid size-11 place-items-center rounded-full bg-leo-red"><Phone className="size-5" /></span>
                <div>
                  <div className="text-xs text-white/70">{c.call}</div>
                  <div dir="ltr" className="text-lg font-bold">{p.display}</div>
                </div>
              </a>
            ))}
            <div className="flex items-center gap-4 rounded-xl bg-white/10 p-4">
              <span className="grid size-11 place-items-center rounded-full bg-leo-red"><MapPin className="size-5" /></span>
              <div className="font-semibold">{c.location}</div>
            </div>
          </div>

          <div className="text-sm font-semibold">{c.follow}</div>
          <div className="mt-3 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-full bg-white/10 p-3 transition-colors hover:bg-leo-red">
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 rounded-2xl bg-white p-6 text-foreground shadow-xl sm:p-8">
          <div>
            <label htmlFor="leo-name" className="mb-1.5 block text-sm font-semibold">{f.name}</label>
            <Input id="leo-name" autoComplete="name" {...register('name')} />
            {fieldError(errors.name?.message)}
          </div>
          <div>
            <label htmlFor="leo-phone" className="mb-1.5 block text-sm font-semibold">{f.phone}</label>
            <Input id="leo-phone" type="tel" dir="ltr" className="text-start" autoComplete="tel" {...register('phone')} />
            {fieldError(errors.phone?.message)}
          </div>
          <div>
            <label htmlFor="leo-course" className="mb-1.5 block text-sm font-semibold">{f.course}</label>
            <select
              id="leo-course"
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              {...register('course')}
            >
              <option value="">{f.choose}</option>
              {t.courses.items.map((item) => (
                <option key={item.title} value={item.title}>{item.title}</option>
              ))}
            </select>
            {fieldError(errors.course?.message)}
          </div>
          <Button type="submit" disabled={isSubmitting} size="lg" className="h-11 w-full bg-leo-red text-base text-white hover:bg-leo-red/90">
            {f.submit}
          </Button>
          <p className="text-center text-xs text-muted-foreground">{f.demo}</p>
        </form>
      </div>
    </section>
  )
}
