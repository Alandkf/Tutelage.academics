'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ChevronRight, HelpCircle } from 'lucide-react'

const CoursesCTA = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ku'
  
  const features = t('courses.CoursesCTA.features', { returnObjects: true })

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <HelpCircle className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('courses.CoursesCTA.title')}
          </h2>
          
          <p className={`text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto ${isRTL ? 'text-center' : ''}`}>
            {t('courses.CoursesCTA.description')}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-3"></div>
              <p className="text-base font-semibold text-foreground">{feature}</p>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="text-center mb-8">
          <Button 
            size="lg" 
            className="px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {t('courses.CoursesCTA.buttonText')}
            <ChevronRight className={`w-6 h-6 ${isRTL ? 'mr-3 rotate-180' : 'ml-3'}`} />
          </Button>
        </div>

        {/* Additional info */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {t('courses.CoursesCTA.info')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default CoursesCTA
