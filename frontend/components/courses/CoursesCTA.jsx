import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight, HelpCircle } from 'lucide-react'

const CoursesCTA = () => {
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
            Not Sure Which Course is Right for You?
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Take our comprehensive assessment quiz to discover the perfect English course tailored to your current level, learning goals, and career aspirations. Get personalized recommendations in just a few minutes.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-3"></div>
            <p className="text-base font-semibold text-foreground">5-Minute Assessment</p>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-3"></div>
            <p className="text-base font-semibold text-foreground">Personalized Results</p>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-3"></div>
            <p className="text-base font-semibold text-foreground">Expert Recommendations</p>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center mb-8">
          <Button 
            size="lg" 
            className="px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            Take the Course Quiz
            <ChevronRight className="ml-3 w-6 h-6" />
          </Button>
        </div>

        {/* Additional info */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Free assessment • No registration required • Instant results
          </p>
        </div>
      </div>
    </section>
  )
}

export default CoursesCTA
