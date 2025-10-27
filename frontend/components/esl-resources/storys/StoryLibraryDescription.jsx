'use client'

const StoryLibraryDescription = () => {
  const description = "Do you want to discover stories that help you learn English? Step into our Story Library and enjoy a world of free short stories for every level — from beginner to advanced. Each story is designed to help you build your vocabulary, improve your reading skills, and experience real English through fun and inspiring tales."

  const steps = [
    {
      title: "Try a Warm-Up Exercise",
      description: "Prepare your skills before reading."
    },
    {
      title: "Dive into the Story",
      description: "Read and enjoy at your own pace."
    },
    {
      title: "Test Your Understanding",
      description: "Complete a short activity after the story."
    },
    {
      title: "Check the Answers",
      description: "See how well you did and learn from any mistakes."
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
            How to enjoy the Story Library:
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

export default StoryLibraryDescription
