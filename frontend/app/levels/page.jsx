import React from 'react'
import { GraduationCap, Star, TrendingUp, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'

const LevelsMainPage = () => {
  const levels = [
    {
      code: "A1",
      name: "Beginner",
      description: "Start your English journey with basic vocabulary, simple phrases, and everyday conversations.",
      icon: Star,
      href: "/levels/A1level",
      image: "/hero.jpg",
      skills: ["Basic greetings", "Numbers and time", "Simple questions", "Present tense"],
      color: "bg-green-100 text-green-800"
    },
    {
      code: "A2",
      name: "Elementary", 
      description: "Build on basics with more complex sentences, past tense, and expanded vocabulary.",
      icon: TrendingUp,
      href: "/levels/A2level",
      image: "/hero.jpg",
      skills: ["Past and future tense", "Shopping and dining", "Travel vocabulary", "Describing people"],
      color: "bg-blue-100 text-blue-800"
    },
    {
      code: "B1",
      name: "Intermediate",
      description: "Develop fluency with complex grammar, longer conversations, and professional vocabulary.",
      icon: GraduationCap,
      href: "/levels/B1level",
      image: "/hero.jpg", 
      skills: ["Complex grammar", "Work and study", "Expressing opinions", "Conditional sentences"],
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      code: "B2",
      name: "Upper Intermediate",
      description: "Master advanced concepts, nuanced communication, and specialized vocabulary areas.",
      icon: Award,
      href: "/levels/B2level",
      image: "/hero.jpg",
      skills: ["Advanced grammar", "Abstract concepts", "Formal writing", "Presentations"],
      color: "bg-orange-100 text-orange-800"
    },
    {
      code: "C1", 
      name: "Advanced",
      description: "Achieve near-native proficiency with sophisticated language use and cultural understanding.",
      icon: Award,
      href: "/levels/C1level",
      image: "/hero.jpg",
      skills: ["Native-like fluency", "Academic writing", "Complex discussions", "Cultural nuances"],
      color: "bg-purple-100 text-purple-800"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            English Proficiency Levels
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Discover your current level and chart your path to English mastery. 
            Our structured approach follows the Common European Framework of Reference (CEFR).
          </p>
          
          <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg mb-16">
            <Image
              src="/hero.jpg"
              alt="English Proficiency Levels"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* Levels Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <div key={level.code} className="bg-card rounded-lg border border-border shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={level.image}
                    alt={`${level.code} level`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <level.icon className="h-8 w-8 mb-2" />
                    <Badge className={level.color}>
                      {level.code} Level
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{level.name}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {level.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-sm">Key Skills:</h4>
                    <ul className="space-y-1">
                      {level.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href={level.href} className="block">
                    <Button className="w-full">
                      Start {level.code} Level
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Test CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Not Sure Which Level to Start?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Take our comprehensive placement test to find your perfect starting point and get personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tutelagetests/languageplacement">
              <Button size="lg">
                Take Placement Test
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline">
                Browse All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LevelsMainPage
