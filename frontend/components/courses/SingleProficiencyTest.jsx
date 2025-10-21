'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SingleProficiencyTest = ({
  title,
  heroImage,
  description,
  firstSectionTitle,
  firstSectionContent,
  firstSectionBulletPoints = [],
  showSecondSection = false,
  secondSectionTitle,
  secondSectionContent,
  secondSectionImage,
  secondSectionBulletPoints = [],
  showThirdSection = true,
  thirdSectionTitle,
  thirdSectionContent,
  thirdSectionImage,
  thirdSectionBulletPoints = [],
  showFourthSection = false,
  fourthSectionFeatures = []
}) => {
  const router = useRouter()

  const handleEnrollClick = () => {
    router.push(`/courses/enroll?course=${encodeURIComponent(title)}`)
  }

  const handleRequestPriceClick = () => {
    router.push('/courses/Englishproficiencytests#form-section')
  }

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
            <div className="flex-shrink-0">
              <div className="p-4">
                <Button
                  onClick={handleEnrollClick}
                  size="lg"
                  className="md:px-12 py-4 flex items-center justify-center md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  Enroll Now
                  <ChevronRight className="w-6 h-6 ml-3" />
                </Button>
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
            alt={`${title} preparation`}
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

      {/* First Section - Text Content with optional bullet points */}
      <div className="py-16 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
            {firstSectionTitle}
          </h2>
          
          {/* Paragraph content */}
          {firstSectionContent && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line mb-6">
              {firstSectionContent}
            </p>
          )}

          {/* Bullet points if provided */}
          {firstSectionBulletPoints.length > 0 && (
            <ul className="space-y-3">
              {firstSectionBulletPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-base sm:text-lg text-muted-foreground leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Second Section - Image + Text (Conditional) */}
      {showSecondSection && (
        <div className="py-10 p-4">
          <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg">
            <div className="flex flex-col-reverse lg:flex-row items-stretch gap-0">
              <div className="w-full lg:w-1/2">
                <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                  <Image
                    src={secondSectionImage}
                    alt={secondSectionTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:ml-10">
                <div className="w-full py-10 lg:py-8 lg:pr-12">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                    {secondSectionTitle}
                  </h2>
                  
                  {/* Paragraph content if provided */}
                  {secondSectionContent && (
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                      {secondSectionContent}
                    </p>
                  )}

                  {/* Bullet points if provided */}
                  {secondSectionBulletPoints && secondSectionBulletPoints.length > 0 && (
                    <ul className="space-y-3">
                      {secondSectionBulletPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Third Section - With Checkboxes (Conditional) */}
      {showThirdSection && (
        <div className="py-16 md:py-20 px-4">
          <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg lg:rounded-tl-[4rem] lg:rounded-br-[4rem] max-lg:rounded-tl-[2rem] max-lg:rounded-br-[2rem]">
            <div className="flex flex-col-reverse lg:flex-row items-stretch gap-0">
              {/* Image - Left Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                  <Image
                    src={thirdSectionImage}
                    alt={thirdSectionTitle}
                    fill
                    className="object-cover lg:rounded-tl-[4rem] max-lg:rounded-br-[2rem]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              
              {/* Content - Right Side */}
              <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:ml-10">
                <div className="w-full py-10 lg:py-0 lg:pr-12">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[40px] font-bold text-foreground mb-4 sm:mb-6">
                    {thirdSectionTitle}
                  </h2>
                  
                  {/* Description if provided */}
                  {thirdSectionContent && (
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                      {thirdSectionContent}
                    </p>
                  )}

                  {/* Checkbox Bullet Points */}
                  {thirdSectionBulletPoints.length > 0 && (
                    <ul className="space-y-4">
                      {thirdSectionBulletPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary/10 border-2 border-primary rounded flex items-center justify-center mt-0.5 mr-3">
                            <Check className="w-4 h-4 text-primary font-bold" strokeWidth={3} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                              <span className="font-semibold text-foreground">{point.title}</span> {point.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fourth Section - Features with CTA (Conditional) */}
      {showFourthSection && fourthSectionFeatures.length > 0 && (
        <div className="py-16 bg-primary/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-8 text-left">
              Key Features
            </h2>
            
            <ul className="space-y-3 mb-10">
              {fourthSectionFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-base text-foreground font-medium text-left">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 justify-start">
              <Button 
                onClick={handleRequestPriceClick}
                size="lg" 
                variant="outline"
                className="px-8 py-3 text-lg font-semibold cursor-pointer"
              >
                Request Price
              </Button>
              <Button 
                onClick={handleEnrollClick}
                size="lg" 
                className="px-8 py-3 text-lg font-semibold cursor-pointer"
              >
                Enroll Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleProficiencyTest