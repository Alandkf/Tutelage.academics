'use client'

const BlogLibraryDescription = () => {
  const description = "Are you looking for interesting blogs to practice your English? Explore our blog Library and get access to a wide range of blogs on topics like language tips, culture, Lifestyle, and learning strategies. Each blog helps you improve reading, vocabulary, and grammar, practice writing and expression, and develop critical thinking by reflecting on ideas and opinions."

  const steps = [
    {
      title: "Start with a Warm-Up Exercise",
      description: "– Prepare your skills before reading."
    },
    {
      title: "Read the Blog",
      description: "Explore the content at your own pace."
    },
    {
      title: "Test Your Understanding",
      description: "Complete a short activity after the blog."
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
            How to enjoy the Blog Library:
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

export default BlogLibraryDescription
