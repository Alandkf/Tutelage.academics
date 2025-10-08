import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const CoursesShowcase = () => {
  const courses = [
    {
      title: "General English",
      description: "Build a strong foundation in English with comprehensive lessons covering grammar, vocabulary, speaking, listening, reading, and writing skills for everyday communication.",
      image: "/hero.jpg",
      href: "/courses/generalenglish",
      features: ["Grammar Fundamentals", "Vocabulary Building", "Conversational Skills"]
    },
    {
      title: "Academic English",
      description: "Master the English skills needed for academic success, including essay writing, research techniques, presentation skills, and critical thinking in English.",
      image: "/hero.jpg",
      href: "/courses/academicenglish",
      features: ["Academic Writing", "Research Skills", "Presentation Techniques"]
    },
    {
      title: "English Proficiency Tests",
      description: "Prepare for international English proficiency exams like IELTS, TOEFL, and Cambridge with targeted practice and test-taking strategies.",
      image: "/hero.jpg",
      href: "/courses/Englishproficiencytests",
      features: ["IELTS Preparation", "TOEFL Training", "Cambridge Exams"]
    },
    {
      title: "Business English",
      description: "Develop professional English communication skills for the workplace, including business writing, presentations, negotiations, and meeting facilitation.",
      image: "/hero.jpg",
      href: "/courses/businessenglish",
      features: ["Business Communication", "Professional Writing", "Meeting Skills"]
    },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Choose Your Perfect English Course
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of English courses designed to meet your specific learning goals and career aspirations
          </p>
        </div>

        <div className="space-y-20">
          {courses.map((course, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} ${index === 0 && 'pt-0'} items-center gap-8 lg:gap-20 py-6`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative w-full h-72 sm:h-80 lg:h-[26rem] rounded-sm overflow-hidden shadow-lg">
                    <Image
                      src={course.image}
                      alt={`${course.title} course`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 text-left space-y-4">
                  <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
                    {course.title}
                  </h3>
                  
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    {course.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-foreground">Key Features:</h4>
                    <ul className="space-y-1">
                      {course.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <Link href={course.href} className="inline-block">
                      <Button 
                        size="lg" 
                        className="px-10 cursor-pointer py-4 text-lg group hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Explore {course.title}
                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
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
