import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const SkillsShowcase = () => {
  const skills = [
    {
      title: "Listening Skill",
      description: "Our listening materials help learners practice listening independently to understand spoken English step by step from simple everyday expressions to complex conversations and ideas.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", 
      href: "/skills/listening",
      features: ["Simple Everyday Expressions", "Complex Conversations", "Understanding Ideas"]
    },
    {
      title: "Speaking Skill",
      description: "Our speaking materials help learners practice speaking independently and improve confidence step by step from simple sentences to fluent conversations.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
      href: "/skills/speaking",
      features: ["Simple Sentences", "Confidence Building", "Fluent Conversations"]
    },
    {
      title: "Reading Skill",
      description: "Our reading materials help learners practice reading independently, improving comprehension and vocabulary step by step from simple sentences to understanding longer texts and complex ideas.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
      href: "/skills/reading",
      features: ["Simple Sentences", "Vocabulary Building", "Complex Texts"]
    },
    {
      title: "Writing Skill",
      description: "Our writing materials help learners practice writing independently, developing accuracy, clarity, and the ability to express ideas step by step from simple sentences to complex texts.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
      href: "/skills/writing",
      features: ["Accuracy & Clarity", "Expressing Ideas", "Complex Texts"]
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
                  alt={`${skill.title} development`}
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
