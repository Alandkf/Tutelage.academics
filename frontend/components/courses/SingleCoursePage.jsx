'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {  Clock, Users, Award, ChevronRight, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SingleCoursePage = ({ courseData }) => {
  const router = useRouter()
  
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

  const handleEnrollClick = () => {
    console.log('Enrolling for course:', title);
    console.log('Encoded course:', encodeURIComponent(title));
    router.push(`/courses/enroll?course=${encodeURIComponent(title)}`)
  }

  // All available courses data
  const allCourses = [
    {
      title: "English for Kids and Teens",
      description: "Engaging and interactive English learning program designed specifically for young learners.",
      image: "/hero.jpg",
      href: "/courses/englishforkids",
      level: "A1-B2",
      duration: "10-14 weeks"
    },
    {
      title: "English for Adults",
      description: "Comprehensive English language program tailored for adult learners with busy schedules.",
      image: "/hero.jpg",
      href: "/courses/englishforadults",
      level: "A1-C2",
      duration: "12-16 weeks"
    },
    {
      title: "Academic English",
      description: "Master academic English skills for university study and professional research.",
      image: "/hero.jpg", 
      href: "/courses/academicenglish",
      level: "B2-C2",
      duration: "16-20 weeks"
    },
    {
      title: "English Proficiency Tests",
      description: "Prepare for IELTS, TOEFL, PTE, and other international English proficiency tests.",
      image: "/hero.jpg",
      href: "/courses/Englishproficiencytests", 
      level: "B1-C2",
      duration: "8-12 weeks"
    },
    {
      title: "Business English",
      description: "Master professional English communication for the global business world.",
      image: "/hero.jpg",
      href: "/courses/businessenglish",
      level: "B1-C2", 
      duration: "12-16 weeks"
    }
  ]

  // Filter out the current course from similar courses
  const similarCourses = allCourses.filter(course => course.title !== title)

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
                    <Button 
                        onClick={handleEnrollClick}
                        size={"lg"} 
                        className=" md:px-12 py-4 flex items-center justify-center md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                        {enrollButtonText}
                        <ChevronRight className="md:ml-3 w-6 h-6" />
                    </Button>
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
              onClick={handleEnrollClick}
              size="lg" 
              className="px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {enrollButtonText}
              <ChevronRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Similar Courses Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Similar Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore other English courses that might interest you and complement your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarCourses.map((course, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                {/* Course Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={course.image}
                    alt={`${course.title} course`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {course.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Details */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    {/* <div className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {course.level}
                    </div> */}
                  </div>

                  {/* View Course Button */}
                  <Link href={course.href} className="block">
                    <Button 
                      className="w-full group-hover:bg-primary/90 transition-colors duration-200"
                      size="sm"
                    >
                      View Course
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Courses Button */}
          <div className="text-center mt-12">
            <Link href="/courses">
              <Button variant="outline" size="lg" className="px-8 py-3">
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCoursePage
