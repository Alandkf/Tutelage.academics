import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronRight } from 'lucide-react'

const SkillPageTemplate = ({ skillData }) => {
  const { title, heroImage, description, levels, coursesButtonText } = skillData

  return (
    <div className="relative min-h-screen bg-background pt-4">
      {/* Header Section */}
      <div className="bg-background ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {title}
              </h1>
            </div>
            
            {/* Levels Navigation */}
            <div className="flex-shrink-0">
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  {levels.map((level, index) => (
                    <React.Fragment key={level.code}>
                      <Link
                        href={level.href}
                        className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-black dark:text-white font-medium text-sm rounded-md transition-colors duration-200 border border-primary/20"
                      >
                        {level.code} Level
                      </Link>
                      {index < levels.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
                      )}
                    </React.Fragment>
                  ))}
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
            alt={`${title} practice`}
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

      {/* Choose Your Level Section */}
      <div className="bg-muted/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Choose your level to practise your {title.toLowerCase()}
            </h2>
          </div>

          <div className="space-y-20">
            {levels.map((level, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={level.code}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-20`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative w-full h-72 sm:h-80 lg:h-[26rem] rounded-sm overflow-hidden shadow-lg">
                      <Image
                        src={level.image}
                        alt={`${level.code} level`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      />
                      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" /> */}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 text-left space-y-4">
                    <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
                      {level.code} Level
                    </h3>
                    
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                      {level.description} Master essential communication skills through carefully designed exercises that build your confidence step by step. Our comprehensive approach ensures you develop both accuracy and fluency in real-world contexts.
                    </p>
                    
                    <div className="pt-4">
                      <Link href={level.href} className="inline-block">
                        <Button 
                          size="lg" 
                          className="px-10 cursor-pointer py-4 text-lg group hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Start {level.code} Level
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
      </div>

      {/* Learn Confidently Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Learn to {title.toLowerCase()} confidently
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
              Build your confidence with our comprehensive {title.toLowerCase()} courses. 
              Our structured approach helps you develop essential skills through 
              interactive exercises, real-world practice, and expert guidance that adapts to your learning pace.
            </p>
            
            <Button size="lg" className="px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
              {coursesButtonText}
              <ChevronRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillPageTemplate
