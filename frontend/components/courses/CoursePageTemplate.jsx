import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronRight, Clock, Users, BookOpen, Award } from 'lucide-react'

const CoursePageTemplate = ({ courseData }) => {
  const { title, heroImage, description, modules, duration, students, certificate, coursesButtonText } = courseData

  return (
    <div className="relative min-h-screen bg-background pt-4">
      {/* Header Section */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {title}
              </h1>
            </div>
            
            {/* Course Stats */}
            <div className="flex-shrink-0">
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{students}+ students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Certificate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={heroImage}
            alt={`${title} course`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Course Modules Section */}
      <div className="bg-muted/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What You'll Learn in {title}
            </h2>
          </div>

          <div className="space-y-20">
            {modules.map((module, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={module.title}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-20`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative w-full h-72 sm:h-80 lg:h-[26rem] rounded-sm overflow-hidden shadow-lg">
                      <Image
                        src={module.image}
                        alt={`${module.title} module`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 text-left space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-primary">Module {index + 1}</span>
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
                      {module.title}
                    </h3>
                    
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                      {module.description}
                    </p>

                    {/* Module Features */}
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-foreground">You'll Master:</h4>
                      <ul className="space-y-1">
                        {module.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Sign Up Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Ready to Master {title}?
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
              Join thousands of students who have already transformed their English skills with our {title.toLowerCase()} course. 
              Start your journey today with expert instruction and personalized feedback.
            </p>
            
            <Button size="lg" className="px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
              Sign Up for {title}
              <ChevronRight className="ml-3 w-6 h-6" />
            </Button>

            {/* Additional Course Info */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold text-foreground">Comprehensive Content</p>
                <p className="text-sm text-muted-foreground">In-depth lessons and materials</p>
              </div>
              <div className="text-center p-4">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold text-foreground">Expert Instructors</p>
                <p className="text-sm text-muted-foreground">Learn from qualified teachers</p>
              </div>
              <div className="text-center p-4">
                <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold text-foreground">Certificate</p>
                <p className="text-sm text-muted-foreground">Earn recognized certification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePageTemplate
