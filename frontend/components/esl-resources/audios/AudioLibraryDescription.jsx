'use client'

const AudioLibraryDescription = () => {
  const description = "Do you want to practice your English by listening to real conversations and audios? Stop learning boring grammar rules and start hearing real English. Our audio library is packed with practical, engaging content including interviews, podcasts, short stories, life experiences and everyday conversations. This diverse resource is perfect for learners of all levels, providing the vocabulary and contextual understanding needed to use English naturally. Enhance your fluency on the go."

  const steps = [
    {
      title: "Start with a Warm-Up Exercise",
      description: "Get ready before watching."
    },
    {
      title: "Listen to the Audio",
      description: "Follow along at your own pace."
    },
    {
      title: "Complete the Post-Exercise",
      description: "Test your understanding after listening."
    },
    {
      title: "Check the Answers",
      description: " Review your results and improve your comprehension."
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-5xl">
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          {description}
        </p>

        {/* How to enjoy section */}
        <div className="bg-muted/20 rounded-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
            How to use the Audio Library
          </h2>
          
          <ul className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="text-base sm:text-lg font-semibold text-foreground">{step.title}</span>
                  <span className="text-base sm:text-lg text-muted-foreground"> – {step.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AudioLibraryDescription
