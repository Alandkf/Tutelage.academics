'use client'

import { FileText, BookOpen, CheckCircle, Key } from 'lucide-react'

const FourEasySteps = () => {
  const steps = [
    {
      icon: FileText,
      number: "1",
      title: "Start with a Preparation Exercise",
      description: "Warm up your skills before diving into the main material."
    },
    {
      icon: BookOpen,
      number: "2",
      title: "Explore the Main Material",
      description: "Read, watch, listen, or interact with content designed for your level."
    },
    {
      icon: CheckCircle,
      number: "3",
      title: "Complete the Post-Exercise",
      description: "Test your understanding of what you've learned."
    },
    {
      icon: Key,
      number: "4",
      title: "Check with the Answer Key",
      description: "Review your answers and see how well you did."
    }
  ]

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Practice and Learn in 4 Easy Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="text-center px-4 py-2 md:py-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FourEasySteps
