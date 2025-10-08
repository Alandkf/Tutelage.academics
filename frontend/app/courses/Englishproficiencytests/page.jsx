import React from 'react'
import SingleCoursePage from '@/components/courses/SingleCoursePage'

const EnglishProficiencyTestsPage = () => {
  const courseData = {
    title: "English Proficiency Tests",
    heroImage: "/hero.jpg",
    description: "Prepare for IELTS, TOEFL, PTE, and other international English proficiency tests with our comprehensive preparation programs. Master test-specific strategies and techniques to maximize your score in each section. Practice with actual test conditions and develop time management skills. Get detailed feedback and score analysis through regular mock tests. Learn from certified instructors with years of test preparation experience.",
    duration: "8-12 weeks",
    level: "Intermediate to Advanced (B1-C2)",
    maxStudents: "15",
    certificate: "Test Preparation Certificate",
    enrollButtonText: "Start Test Preparation",
    backLink: "/courses"
  }

  return <SingleCoursePage courseData={courseData} />
}

export default EnglishProficiencyTestsPage
             