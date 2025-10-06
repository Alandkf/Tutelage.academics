import React from 'react'

const SkillsTimeline = () => {
  const timelineSteps = [
    {
      title: "Assess Your Level",
      content: "Begin your journey by understanding your current English proficiency. Take our placement test to identify your strengths and areas for improvement across all four skills."
    },
    {
      title: "Choose Your Focus",
      content: "Select the specific skills you want to develop. Whether it's listening for better comprehension, speaking for confidence, reading for knowledge, or writing for expression."
    },
    {
      title: "Practice & Progress",
      content: "Engage with targeted exercises, interactive content, and real-world applications. Track your progress and build competency through consistent practice."
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your English Learning Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow a structured approach to master English skills effectively and efficiently
          </p>
        </div>

        <div className="relative">
          {/* Timeline line - hidden on mobile, visible on larger screens */}
          <div className="hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-0.5 bg-border"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {timelineSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="flex justify-center mb-6">
                  <div className="w-8 h-8 bg-primary rounded-full border-4 border-background shadow-lg flex items-center justify-center relative z-10">
                    <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsTimeline
