'use client'

import { useTranslation } from 'react-i18next'
import CoursesHero from '@/components/courses/CoursesHero'
import CoursesShowcase from '@/components/courses/CoursesShowcase'
import CoursesCTA from '@/components/courses/CoursesCTA'

export default function CoursesPage() {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ku'

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <CoursesHero />
      <CoursesShowcase />
      <CoursesCTA />
    </div>
  )
}
