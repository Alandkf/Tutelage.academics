import React from 'react'
import SingleCoursePage from '@/components/courses/SingleCoursePage'

const BusinessEnglishPage = () => {
  const courseData = {
    title: "Business English",
    heroImage: "/hero.jpg",
    description: "Master professional English communication for the global business world. Develop the language skills needed to excel in international business environments. Learn to write effective emails, reports, and proposals. Master presentation skills and meeting participation. Understand financial terminology and conduct successful negotiations. Build cross-cultural communication skills essential for international business success.",
    duration: "12-16 weeks",
    level: "Intermediate to Advanced (B1-C2)",
    maxStudents: "10",
    certificate: "Business English Certificate",
    enrollButtonText: "Enroll in Business English",
    backLink: "/courses"
  }

  return <SingleCoursePage courseData={courseData} />
}

export default BusinessEnglishPage
             
