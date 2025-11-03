'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, FileText, Video, Headphones } from 'lucide-react'

const Resources = () => {
  const resources = [
    {
      title: "Story Library",
      description: "Enjoy reading! Discover a variety of free short stories for all levels. Stories help you learn new words, improve reading skills, and see English used naturally.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80", // Person reading a book
      href: "/esl-resources/storys",
      buttonText: "Explore Stories"
    },
    {
      title: "Blog Library",
      description: "Learn new things! Explore blogs on culture, study tips, and more. Blogs help you understand grammar, expand your vocabulary, and think critically about ideas.",
      image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80", // Person writing/reading
      href: "/esl-resources/blogs",
      buttonText: "Read Blogs"
    },
    {
      title: "Video Library",
      description: "Watch and learn! Enjoy fun videos on travel, science, lifestyle, and more. Videos are perfect for boosting listening skills, learning vocabulary, and hearing real English in action.",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80", // Person watching laptop/video
      href: "/esl-resources/videos",
      buttonText: "Watch Videos"
    },
    {
      title: "Audio Library",
      description: "Hear real English! Listen to interviews, podcasts, and everyday conversations. Audio helps you become fluent, understand natural speech, and use English confidently anywhere.",
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80", // Person with headphones
      href: "/esl-resources/audios",
      buttonText: "Listen Now"
    }
  ]

  return (
    <section className="pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Free Resources
          </h2>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {resources.map((resource, index) => {
            return (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {resource.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                    {resource.description}
                  </p>

                  {/* Button */}
                  <Link href={resource.href}>
                    <Button 
                      className="w-full group-hover:bg-primary/90 transition-colors duration-300 cursor-pointer"
                      size="sm"
                    >
                      {resource.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Resources
