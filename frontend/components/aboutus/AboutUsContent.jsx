'use client'

import { motion } from 'framer-motion'

const AboutUsContent = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-center">
          About Us
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
          Tutelage is a Kurdish innovative online language learning platform which provides online courses by offering cost-effective and efficient solutions for language learners from Kurdistan to the world. We deliver services for a wide variety of students from kids, teenagers to adults through a student-friendly environment and tailored curriculum. Tutelage also plays an essential role in Kurdistan’s entrepreneurial ecosystem by offering mentorship to younger entrepreneurs and collaborating with local and international startup incubators.
        </p>
      </motion.div>
    </div>
  </section>
)

export default AboutUsContent
