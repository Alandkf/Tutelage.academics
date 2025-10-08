import React from 'react'
import SingleCoursePage from '@/components/courses/SingleCoursePage'

const AcademicEnglishPage = () => {
  const courseData = {
    title: "Academic English",
    heroImage: "/hero.jpg",
    description: "Master academic English skills for university study and professional research. Develop critical thinking and advanced writing abilities. Learn to write research papers, essays, and academic reports with proper citation styles (APA, MLA, Harvard). Develop critical reading strategies and academic vocabulary. Master presentation skills for conferences and seminars. Build listening comprehension for lectures and academic discussions.",
    duration: "16-20 weeks",
    level: "Upper Intermediate to Advanced (B2-C2)",
    maxStudents: "12",
    certificate: "Academic English Certificate",
    enrollButtonText: "Enroll in Academic English",
    backLink: "/courses"
  }

  return <SingleCoursePage courseData={courseData} />
}

export default AcademicEnglishPage
             