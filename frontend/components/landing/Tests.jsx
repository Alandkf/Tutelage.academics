import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Target, BookOpen, Globe } from 'lucide-react'

const Tests = () => {
  const testCards = [
    {
      icon: Target,
      title: "Level Check",
      description: "Take our comprehensive language placement test to determine your current English level and get personalized recommendations.",
      href: "/tutelagetests/languageplacement",
      buttonText: "Discover My Level"
    },
    {
      icon: BookOpen,
      title: "Skill Building Courses", 
      description: "Access our free practice tests designed to help you improve your English skills across all language areas.",
      href: "/tutelagetests/practicetests",
      buttonText: "Start Practicing"
    },
    {
      icon: Globe,
      title: "Global Test Success",
      description: "Prepare for international English proficiency exams with our comprehensive mock tests and practice materials.",
      href: "/tutelagetests/mockexams",
      buttonText: "Ace My Exam"
    }
  ]

  return (
    <div className="py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Test Your English Skills
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover your English proficiency level and track your progress with our comprehensive testing platform
          </p>
        </div>

        {/* Test Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-8 sm:gap-x-0 justify-items-center">
          {testCards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <div 
                key={index}
                className="bg-card border border-border rounded-3xl p-8 text-center shadow-lg transition-all duration-300 flex flex-col w-5/6 h-full min-h-[350px]"
              >
                {/* Icon with Circle Background */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {card.description}
                </p>

                {/* Button */}
                <div className="mt-auto">
                  <Link href={card.href}>
                    <Button 
                      className="w-full cursor-pointer hover:shadow-md transition-all duration-300"
                      size="lg"
                    >
                      {card.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tests