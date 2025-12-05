import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const SkillPageTemplate = ({ skillData }) => {
  const { title, heroImage, description, levels, coursesButtonText, whyUseSection } = skillData

  return (
    <div className="relative min-h-screen bg-background pt-4">
      {/* Header Section */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={heroImage}
            alt={title}
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

      {/* Levels Section */}
      <div className="py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Choose Your Level
            </h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-16">
          {levels.map((level, index) => {
            const isEven = index % 2 === 0

            return (
              <div 
                key={index}
                className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg lg:rounded-tr-[4rem] lg:rounded-bl-[4rem] max-lg:rounded-tl-[2rem] max-lg:rounded-br-[2rem]"
              >
                <div className={`flex flex-col-reverse ${isEven ? 'lg:flex-row' : 'flex-col lg:flex-row-reverse'} items-stretch gap-0`}>
                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:ml-10">
                    <div className="w-full py-10 lg:py-0 lg:pr-12">                      
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                        {level.title || `${level.code} Level`}
                      </h3>
                      
                      <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                        {level.description}
                      </p>

                      <Link href={level.href}>
                        <Button 
                          size="lg" 
                          className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                          Explore {level.code}
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                      <Image
                        src={level.image}
                        alt={level.title || `${level.code} Level`}
                        fill
                        className={`object-cover ${
                          isEven 
                            ? 'lg:rounded-tr-[4rem] max-lg:rounded-tl-[2rem]' 
                            : 'lg:rounded-bl-[4rem] max-lg:rounded-tl-[2rem]'
                        }`}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Why Use These Materials Section */}
      {whyUseSection && (
        <div className="py-16 bg-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                {whyUseSection.title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                {whyUseSection.content}
              </p>
              <Link href="/courses">
                <Button 
                  size="lg" 
                  className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {coursesButtonText}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillPageTemplate
