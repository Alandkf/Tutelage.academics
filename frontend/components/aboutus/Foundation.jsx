'use client'

import { motion } from 'framer-motion'
import { BookOpen, Sparkle, Search, Users } from 'lucide-react'

export const Foundation = () => {
  const timelineItems = [
    {
      year: "",
      title: "Foundation",
      description: "Established in 2022 with a vision to revolutionize language learning through innovative solutions.",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      year: "",
      title: "Innovation",
      description: "The first Language institute in the region to implement a full-scale AI tool specifically designed for ESL students.",
      icon: <Sparkle className="w-6 h-6" />,
    },
    {
      year: "",
      title: "Research",
      description: "Tutelage continuously conducts a variety of assessments and comprehensive, diagnostic researches, to adapt its teaching methodologies to the underlaying problems of language learners who are aiming to learn another language. Through research, Tutelage has piloted and scaled effective adaptations of its teaching philosophy to learners’ needs.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      year: "",
      title: "Expansion",
      description: "Driven by a strategic, multi-year expansion plan, we have systematically grown both our core services and our team of academic experts.",
      icon: <Users className="w-6 h-6" />,
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/20 dark:from-background dark:to-muted relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6"
          >
            Our Foundation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Discover the milestones that shaped Tutelage into a leader in innovative language education.
          </motion.p>
        </div>

        {/* Static Grid of Cards with simple pop-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12"
        >
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl border-2 bg-card border-border hover:border-primary shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-primary text-primary-foreground mr-4">
                  {item.icon}
                </div>
                <div>
                  {item.year && <span className="text-xl sm:text-2xl font-bold text-accent">{item.year}</span>}
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">{item.title}</h3>
                </div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}