import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Users, Award, ChevronRight } from 'lucide-react'

const SingleCoursePage = ({ courseData }) => {
  const { 
    title, 
    heroImage, 
    description, 
    duration, 
    level, 
    maxStudents, 
    certificate,
    enrollButtonText = "Enroll Now",
    backLink = "/courses"
  } = courseData

  return (
    <div className="relative min-h-screen bg-background pt-4">
       {/* Header Section */}
      <div className="bg-background ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-6">
            {/* Title */}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {title}
              </h1>
            </div>

            <div className="flex-shrink-0">
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2 ">
                    <Link href={"#"} >
                        <Button 
                            size={"lg"} 
                            className=" md:px-12 py-4 flex items-center justify-center md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                            {enrollButtonText}
                            <ChevronRight className="md:ml-3 w-6 h-6" />
                        </Button>
                    </Link>
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
                  alt={`${title} Course`}
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
        <div className="max-w-5xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Course Information Cards */}
      <div className="bg-muted/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Course Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {duration && (
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm text-center">
                <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Duration</h3>
                <p className="text-muted-foreground">{duration}</p>
              </div>
            )}

            {maxStudents && (
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm text-center">
                <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Class Size</h3>
                <p className="text-muted-foreground">Max {maxStudents} students</p>
              </div>
            )}

            {certificate && (
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm text-center">
                <Award className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Certificate</h3>
                <p className="text-muted-foreground">{certificate}</p>
              </div>
            )}
          </div>

          {/* Level Badge */}
          {level && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-6 py-3 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-primary font-semibold text-lg">
                  {level} Level
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enrollment CTA Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Ready to Start Learning?
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
              Join our comprehensive {title.toLowerCase()} course and take your skills to the next level. 
              Get expert guidance, practical exercises, and hands-on experience that will help you succeed.
            </p>
            
            <Button 
              size="lg" 
              className="px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {enrollButtonText}
              <ChevronRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCoursePage
