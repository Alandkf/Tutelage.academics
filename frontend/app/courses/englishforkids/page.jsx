import React from 'react'
import SingleCoursePage from '@/components/courses/SingleCoursePage'

const EnglishForKidsPage = () => {
  const courseData = {
    title: "English for Kids and Teens",
    heroImage: "/hero.jpg",
    description: "Engaging and interactive English learning program designed specifically for young learners aged 6-17. Our fun and educational approach helps children and teenagers develop strong English language skills through games, activities, stories, and age-appropriate content. Build confidence in speaking, listening, reading, and writing while enjoying the learning process. Our experienced teachers create a supportive environment where young learners can express themselves freely and develop their language skills naturally.",
    duration: "10-14 weeks",
    level: "All Levels (A1-B2)",
    maxStudents: "12",
    certificate: "Youth English Certificate",
    enrollButtonText: "Enroll for this course",
    backLink: "/courses"
  }

  return <SingleCoursePage courseData={courseData} />
}

export default EnglishForKidsPage
