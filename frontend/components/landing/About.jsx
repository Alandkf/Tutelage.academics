'use client'

import { useState } from 'react'
import { BookOpen, Globe, Award, Target } from 'lucide-react'



export const AboutUsSection = () => {

  const timelineItems = [
    {
      year: "2022",
      title: "Foundation",
      description:
        "Tutelage was established with a vision to revolutionize English learning through innovative teaching methods.",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      year: "",
      title: "Innovation",
      description:
        "Tutelage is the first Language institute to implement a full scale AI tool for students.",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      year: "",
      title: "Expansion",
      description: "Tutelage hired many local talents and fresh graduates with a focus on creative female instructors.",
      icon: <Award className="w-6 h-6" />,
    },
    {
      year: "",
      title: "Building Reputation",
      description:
        "Tutelage is among the most reputable language institutes with a massive success rate.",
      icon: <Target className="w-6 h-6" />,
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-100 dark:bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6"
          >
            Pioneers of Excellence
          </h2>
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Join Tutelage and let your language skills become your super power
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`group bg-muted p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-50 hover:shadow-lg}`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div
                    className={`p-2 sm:p-3 rounded-full transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-black`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                      {item.year && <span className="text-xl sm:text-2xl font-bold text-yellow-600">{item.year}</span>}
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-black transition-all duration-300">{item.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          
        </div>
      </div>
    </section>
  )
}