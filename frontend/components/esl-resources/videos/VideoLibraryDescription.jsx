'use client'

const VideoLibraryDescription = () => {
  const description = "Do you want to learn English while watching videos? Dive into our Video Library, featuring a variety of fun and fascinating videos on topics like science, technology, psychology, culture, nature, sports, entertainment, travel, and everyday life. Perfect for learners of all levels, each video helps you improve listening skills, expand vocabulary, and understand real English in action."

  const steps = [
    {
      title: "Start with a Warm-Up Exercise",
      description: "Get ready before watching."
    },
    {
      title: "Watch the Video",
      description: "Enjoy and follow along at your own pace."
    },
    {
      title: "Complete the Post-Exercise",
      description: "Test your understanding afterward.."
    },
    {
      title: "Check the Answers",
      description: "Review your results and learn from any mistakes."
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
            How to use the Video Library:
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

export default VideoLibraryDescription
