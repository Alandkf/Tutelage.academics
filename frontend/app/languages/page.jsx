'use client'

import CoursesCTA from '@/components/courses/CoursesCTA'
import LanguagesHero from '@/components/Languages/LanguagesHero'
import LanguagesShowcase from '@/components/Languages/LanguagesShowcase'

export default function CoursesPage() {

  return (
    <>
      <LanguagesHero />
      <LanguagesShowcase />
      <CoursesCTA />
    </>
  )
}
