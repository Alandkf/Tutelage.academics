'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const LanguagesShowcase = () => {
  const languagesData = [
    {
      title: "English Language",
      description: "Master the global language of business, technology, and international communication. Our comprehensive English courses cater to all levels from beginner to advanced.",
      features: [
        "Comprehensive curriculum covering grammar, vocabulary, and pronunciation",
        "Interactive speaking and listening practice",
        "Business English and academic writing skills",
        "Native speaker instructors with proven teaching methods"
      ],
      buttonText: "Explore English Courses"
    },
    {
      title: "Kurdish Language Classes",
      description: "Engaging Kurdish private classes available both in-person and online. Interactive lessons designed to immerse students in the language with qualified teachers and structured curriculum.",
      features: [
        "One-on-one Kurdish language instruction",
        "Personalized study plans based on your goals",
        "Flexible online and in-person scheduling",
        "Classes available for kids, teens, and adults",
        "Tutelage certificate upon completion"
      ],
      buttonText: "Explore Kurdish Courses"
    },
    {
      title: "Arabic Language Classes",
      description: "Engaging Arabic private classes available both in-person and online. Interactive lessons designed to immerse students in the language with skilled teachers and well-designed curriculum.",
      features: [
        "One-on-one Arabic language instruction",
        "Personalized study plans based on your goals",
        "Flexible online and in-person scheduling",
        "Classes available for kids, teens, and adults",
        "Tutelage certificate upon completion"
      ],
      buttonText: "Explore Arabic Courses"
    }
  ]

  const languageHrefs = [
    "/courses",
    "/languages/kurdish",
    "/languages/arabic"
  ]

  // Relevant images for each language
  const languageImages = [
    "https://images.pexels.com/photos/7054513/pexels-photo-7054513.jpeg", // English - books/studying
    "https://localization.saudisoft.com/wp-content/uploads/2022/11/Kurdish-blog.webp", // Kurdish - cultural/traditional
    "https://qantara.de/sites/default/files/import/2014-08/54884-arabic-calligraphy_picture-alliance-tone-koene.jpg"  // Arabic - calligraphy/script
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Language Learning Programs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive language courses designed to help you achieve fluency and cultural understanding in English, Kurdish, and Arabic.
          </p>
        </div>

        <div className="space-y-20">
          {languagesData.map((language, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } ${index === 0 && 'pt-0'} items-center gap-8 lg:gap-20 py-6`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative w-full h-72 sm:h-80 lg:h-[26rem] rounded-sm overflow-hidden shadow-lg">
                    <Image
                      src={languageImages[index]}
                      alt={`${language.title} course`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-4 text-left">
                  <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
                    {language.title}
                  </h3>

                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    {language.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-foreground">
                      Key Features
                    </h4>
                    <ul className="space-y-1">
                      {language.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-muted-foreground flex items-center w-full">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mr-3"></div>
                          <span className="flex-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link href={languageHrefs[index]} className="inline-block">
                      <Button
                        size="lg"
                        className="px-10 cursor-pointer py-4 text-lg group hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {language.buttonText}
                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
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

export default LanguagesShowcase