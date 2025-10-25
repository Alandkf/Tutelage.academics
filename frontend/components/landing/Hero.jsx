'use client'

import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { SlidersHorizontal } from 'lucide-react'

export default function HeroSection({ title, subtitle, imageUrl }) {
  const safeTitle = title || 'Empowering students worldwide with innovative virtual learning solutions'
  const safeSubtitle = subtitle || 'Education is vital to everyone on this planet. With a passion for education, compassion for teachers, and advanced technology, we believe we can provide high-quality education for learners everywhere.'
  const imageSrc = imageUrl || '/hero.jpg'

  return (
    <>
      <div className="relative w-full aspect-[16/7] min-h-[300px] h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[100vh]">
        <Image
          src={imageSrc}
          alt="Landing Hero"
          fill
          priority
          quality={100}
          className="object-cover object-center w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center mt-40">
          <h1 className="text-2xl sm:text-4xl md:text-5xl max-w-4xl font-bold text-white drop-shadow mb-4">{safeTitle}</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 font-normal max-w-5xl mx-auto mb-7">{safeSubtitle}</p>
          <form className="hidden w-full max-w-2xl md:flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0 mx-auto">
            <Input
              type="text"
              placeholder="Search Tutelage..."
              className="rounded-l-sm rounded-r-none bg-background/90 py-6 text-foreground placeholder:text-muted-foreground focus:ring-0 focus:ring-transparent focus:border-transparent focus-visible:ring-transparent focus-visible:border-transparent flex-1 min-w-0"
            />
            <Select>
              <SelectTrigger className="sm:rounded-l-none rounded-sm py-6 bg-background/90 border border-border text-foreground focus:ring-0 focus:ring-transparent min-w-[40px]">
                <SelectValue placeholder={<SlidersHorizontal />} />
              </SelectTrigger>
              <SelectContent className="bg-background border-border text-foreground">
                <SelectItem value="tests">Tests</SelectItem>
                <SelectItem value="courses">Courses</SelectItem>
                <SelectItem value="blogs">Blogs</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="esl">ESL Resources</SelectItem>
              </SelectContent>
            </Select>
          </form>
        </div>
      </div>
    </>
  )
}
