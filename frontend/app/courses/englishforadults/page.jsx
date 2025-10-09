import React from 'react'
import SingleCoursePage from '@/components/courses/SingleCoursePage'

const EnglishForAdultsPage = () => {
  const courseData = {
    title: "English for Adults",
    heroImage: "/hero.jpg",
    description: "Comprehensive English language program tailored for adult learners with busy schedules and specific goals. Whether you're looking to advance your career, travel with confidence, or simply improve your communication skills, our flexible adult education program adapts to your learning style and pace. Focus on practical English skills for real-world situations including workplace communication, social interactions, and personal development. Our experienced instructors understand the unique challenges adult learners face and provide personalized support throughout your learning journey.",
    duration: "12-16 weeks",
    level: "All Levels (A1-C2)",
    maxStudents: "15",
    certificate: "Adult English Proficiency Certificate",
    enrollButtonText: "Start Your Journey",
    backLink: "/courses"
  }

  return <SingleCoursePage courseData={courseData} />
}

export default EnglishForAdultsPage
