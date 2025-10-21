'use client'

import SingleProficiencyTest from '@/components/courses/SingleProficiencyTest'

export default function TOEFLPreparationPage() {
  return (
    <SingleProficiencyTest
      title="TOEFL Preparation Course"
      heroImage="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80"
      description="Excel in the TOEFL iBT with our comprehensive preparation program designed for students aiming to study at American universities. Master all four sections with proven strategies and extensive practice with authentic materials."
      
      firstSectionTitle="About TOEFL preparation Course"
      firstSectionContent="The TOEFL (Test of English as a Foreign Language) is a widely recognized English proficiency exam used to measure your ability to understand and use academic English. It evaluates reading, listening, speaking, and writing skills and is accepted by universities, colleges, and institutions worldwide for admissions and scholarships."
      
      showSecondSection={true}
      secondSectionTitle="Why Choose TOEFL?"
      secondSectionContent="Our TOEFL Preparation Course helps students achieve their aimed scores through structured lessons, practice tests, and personalized feedback. The course focuses on improving language skills, test strategies, and confidence for the real exam. The TOEFL is recognized worldwide as proof of English proficiency. It is accepted by universities for undergraduate and graduate admissions and scholarships, recognized by some countries for study or work visa applications, and used for professional registration where English competency is required."
      secondSectionImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
      
      showThirdSection={true}
      thirdSectionTitle="TOEFL Course Highlights"
      thirdSectionBulletPoints={[
        {
          title: "Flexible online program:",
          description: "15 interactive lessons across 5 weeks (total 30 hours)"
        },
        {
          title: "Class options:",
          description: "Join small groups of 3 students or take private one-on-one lessons"
        },
        {
          title: "Full skill development:",
          description: "Master reading, listening, speaking, and writing"
        },
        {
          title: "Smart learning techniques:",
          description: "Practical strategies to tackle every test section"
        },
        {
          title: "Ongoing feedback:",
          description: "Receive guidance to refine your speaking and writing skills"
        },
        {
          title: "Authentic practice materials:",
          description: "Experience realistic TOEFL test questions"
        },
        {
          title: "Experienced instructors:",
          description: "Learn from teachers who know the TOEFL inside out"
        }
      ]}
      thirdSectionImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
      
      showFourthSection={false}
    />
  )
}
