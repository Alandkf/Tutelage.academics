'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const CoursesShowcase = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ku'

  const coursesData = t('courses.CoursesShowcase.courses', { returnObjects: true })
  
  const courseHrefs = [
    "/courses/englishforkids",
    "/courses/englishforadults",
    "/courses/academicenglish",
    "/courses/Englishproficiencytests",
    "/courses/businessenglish"
  ]

  // Relevant images for each course
  const courseImages = [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", // Kids learning - colorful, playful
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", // Adults studying together
    "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=800&q=80", // Academic/University setting - library
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", // Test preparation/studying
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"  // Business meeting/professional
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('courses.CoursesShowcase.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('courses.CoursesShowcase.description')}
          </p>
        </div>

        <div className="space-y-20">
          {coursesData.map((course, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isRTL 
                    ? (isEven ? 'lg:flex-row-reverse' : 'lg:flex-row')
                    : (isEven ? 'lg:flex-row' : 'lg:flex-row-reverse')
                } ${index === 0 && 'pt-0'} items-center gap-8 lg:gap-20 py-6`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative w-full h-72 sm:h-80 lg:h-[26rem] rounded-sm overflow-hidden shadow-lg">
                    <Image
                      src={courseImages[index]}
                      alt={`${course.title} course`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`w-full lg:w-1/2 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
                    {course.title}
                  </h3>
                  
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    {course.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-foreground">
                      {t('courses.CoursesShowcase.keyFeatures')}
                    </h4>
                    <ul className="space-y-1" dir="ltr">
                      {course.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-muted-foreground flex items-center w-full">
                          <div className={`w-2 h-2 bg-primary rounded-full flex-shrink-0 ${isRTL ? 'ml-3 order-2' : 'mr-3 order-1'}`}></div>
                          <span className={`flex-1 ${isRTL ? 'text-right order-1' : 'order-2'}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <Link href={courseHrefs[index]} className="inline-block">
                      <Button 
                        size="lg" 
                        className="px-10 cursor-pointer py-4 text-lg group hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {course.buttonText}
                        <ArrowRight className={`w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 ${isRTL ? 'mr-3 rotate-180 group-hover:-translate-x-2' : 'ml-3'}`} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CoursesShowcase
