import React from 'react'
import SingleCoursePage from '@/components/courses/SingleCoursePage'

const GeneralEnglishPage = () => {
  const courseData = {
    title: "General English",
    heroImage: "/hero.jpg",
    description: "Build a strong foundation in English with our comprehensive General English program. Perfect for learners at any level looking to improve their everyday communication skills. Master essential conversations for daily situations like shopping, dining, travel, and social interactions. Build a solid foundation with essential grammar rules and expand your vocabulary for effective communication. Engage with interactive exercises, group discussions, and real-world practice scenarios that will boost your confidence and fluency.",
    duration: "12-16 weeks",
    level: "All Levels (A1-C2)",
    maxStudents: "15",
    certificate: "Upon completion",
    enrollButtonText: "Start Learning Today",
    backLink: "/courses"
  }

  return <SingleCoursePage courseData={courseData} />
}

export default GeneralEnglishPage
              