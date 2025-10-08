import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight, HelpCircle } from 'lucide-react'

const CoursesCTA = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-card border border-border rounded-xl p-8 sm:p-12 shadow-lg">
          {/* Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Not Sure Which Course is Right for You?
          </h2>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Take our comprehensive assessment quiz to discover the perfect English course tailored to your current level, learning goals, and career aspirations. Get personalized recommendations in just a few minutes.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-3 h-3 bg-primary rounded-full mb-2"></div>
              <p className="text-sm font-medium text-foreground">5-Minute Assessment</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-3 h-3 bg-primary rounded-full mb-2"></div>
              <p className="text-sm font-medium text-foreground">Personalized Results</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-3 h-3 bg-primary rounded-full mb-2"></div>
              <p className="text-sm font-medium text-foreground">Expert Recommendations</p>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            size="lg" 
            className="px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            Take the Course Quiz
            <ChevronRight className="ml-3 w-6 h-6" />
          </Button>

          {/* Additional info */}
          <p className="text-sm text-muted-foreground mt-6">
            Free assessment • No registration required • Instant results
          </p>
        </div>
      </div>
    </section>
  )
}

export default CoursesCTA
