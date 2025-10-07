import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const SkillsShowcase = () => {
  const skills = [
    {
      title: "Listening",
      description: "Enhance your ability to understand spoken English through interactive audio exercises, podcasts, and conversation practice.",
      image: "/hero.jpg", 
      href: "/skills/listening",
      features: ["Audio Comprehension", "Pronunciation Training", "Interactive Dialogues"]
    },
    {
      title: "Speaking",
      description: "Build confidence in verbal communication with speaking exercises, pronunciation guides, and conversation simulations.",
      image: "/hero.jpg",
      href: "/skills/speaking",
      features: ["Pronunciation Practice", "Conversation Skills", "Fluency Building"]
    },
    {
      title: "Reading",
      description: "Improve reading comprehension and vocabulary through diverse texts, articles, and interactive reading materials.",
      image: "/hero.jpg",
      href: "/skills/reading",
      features: ["Comprehension Exercises", "Vocabulary Building", "Speed Reading"]
    },
    {
      title: "Writing",
      description: "Develop strong writing skills through structured lessons, grammar practice, and creative writing exercises.",
      image: "/hero.jpg",
      href: "/skills/writing",
      features: ["Grammar Mastery", "Essay Writing", "Creative Expression"]
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Master the Four Essential Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive training in listening, speaking, reading, and writing to achieve complete English proficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={skill.image}
                  alt={`${skill.title} skill development`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {skill.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {skill.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <ul className="space-y-1">
                    {skill.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Explore Button */}
                <Link href={skill.href} className="block">
                  <Button 
                    className="w-full group-hover:bg-primary/90 transition-colors duration-200"
                    size="sm"
                  >
                    Explore {skill.title}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsShowcase
