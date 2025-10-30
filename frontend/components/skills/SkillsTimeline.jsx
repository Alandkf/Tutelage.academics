import React from 'react'

const SkillsTimeline = () => {
  const timelineSteps = [
    {
      title: "How to Get Better",
      content: "The secret to making progress is consistent practice and reviewing new words and phrases. By working through these activities regularly, you can quickly build your understanding and use of English. Set aside dedicated time each day, track your improvements, and celebrate small victories along the way to stay motivated and engaged."
    },
    {
      title: "Organized by Proficiency Levels",
      content: "All materials are organized by English level according to the CEFR framework, so you can be sure you're practicing at the right level. From A1 beginners to C1 advanced learners, our structured approach ensures you're always challenged appropriately. This systematic organization helps you progress smoothly through each stage of language acquisition."
    },
    {
      title: "Choose Your Skill",
      content: "Pick the skill you want to focus on today and learn at your own pace with our free resources! Whether you want to improve your listening comprehension, develop speaking confidence, enhance reading fluency, or refine writing skills, you'll find comprehensive exercises and activities. Each skill area offers diverse content designed to keep you engaged while building real-world language proficiency."
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your Path to English Mastery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow our proven approach to develop your English skills effectively
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
