'use client'

import { motion } from 'framer-motion'
import { Award, Users, BarChart } from 'lucide-react'

const achievements = [
  {
    title: "Enterprise Development Fund – Innovation 2024",
    description: "Recognized for outstanding innovation and impact in language education.",
    icon: Award,
  },
  {
    title: "+3000 Registered Local Students",
    description: "Empowering thousands of learners across Kurdistan with accessible language solutions.",
    icon: Users,
  },
  {
    title: "Top Success Rate",
    description: "Among the most reputable language institutes with a massive success rate backed by data.",
    icon: BarChart,
  }
]

const AchievementsSection = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Achievements
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-12">
        {achievements.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center px-4 py-2 md:py-6"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6 shadow-lg">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 text-center">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  </section>
)

export default AchievementsSection
