'use client'

import { motion } from 'framer-motion'
import { BookOpen, Sparkle, Search, Users } from 'lucide-react'

export const Foundation = () => {
  const timelineItems = [
    {
      year: "",
      title: "Foundation",
      description: "Established in 2022, Tutelage was founded with a vision to transform language learning through creativity, technology, and learner-centered solutions. Our goal is to make mastering a new language engaging, effective, and accessible for all.",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      year: "",
      title: "Innovation",
      description: "Tutelage’s innovative teaching style combines interactive lessons, real-life communication practice, and dynamic learning experiences that scale with each learner’s progress. This approach promotes confidence, fluency, and long-term language retention.",
      icon: <Sparkle className="w-6 h-6" />,
    },
    {
      year: "",
      title: "Research",
      description: "Tutelage continuously conducts detailed assessments and diagnostic research to refine its teaching approach. Our findings help us understand learners’ challenges and develop evidence-based methods that align with their goals and individual learning styles.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      year: "",
      title: "Expansion",
      description: "Following a strategic, multi-year plan, Tutelage has steadily expanded its academic services, digital platforms, and professional team. Our ongoing growth reflects our commitment to quality education and global standards in English language learning.",
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