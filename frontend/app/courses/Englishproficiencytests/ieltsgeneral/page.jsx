'use client'

import SingleProficiencyTest from '@/components/courses/SingleProficiencyTest'

export default function IELTSGeneralPage() {
  return (
    <SingleProficiencyTest
      title="IELTS General Training"
      heroImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80"
      description="Master IELTS General Training with our targeted preparation program designed for migration and work visa applications. Our course focuses on practical English skills needed for everyday situations in English-speaking countries."
      
      firstSectionTitle="About IELTS General Training"
      firstSectionContent="The IELTS General Training test measures your English skills for work, migration, and daily communication. Unlike the Academic test, it's designed for practical, real-life English rather than university study. It's accepted by immigration authorities and employers in over 140 countries, including the UK, Canada, Australia, New Zealand, the USA, Ireland, and Singapore — some of the world's most popular destinations for migration and work."
      
      showSecondSection={true}
      secondSectionTitle="Who should take this course?"
      secondSectionBulletPoints={[
        "Adults applying for work or family visas in English-speaking countries.",
        "Job seekers and professionals needing workplace English.",
        "People preparing for vocational training or community integration.",
        "Learners who want focused practice in everyday English skills (listening, reading, writing, speaking)."
      ]}
      secondSectionImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
      
      showThirdSection={true}
      thirdSectionTitle="Why Your Goals Deserve Tutelage"
      thirdSectionBulletPoints={[
        {
          title: "Test Advice & Tips:",
          description: "Receive necessary test advice and tips prior to your test."
        },
        {
          title: "Live Expert Classes:",
          description: "Practice in an engaging live classroom with an expert IELTS instructor."
        },
        {
          title: "Detailed Feedback:",
          description: "Get detailed feedback on your performance throughout your class with Tutelage."
        },
        {
          title: "Extra Materials:",
          description: "Access extra free of charge studying materials beside your own course materials."
        },
        {
          title: "Fair Pricing:",
          description: "Fairly-priced compared to other language institutions."
        }
      ]}
      thirdSectionImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
      
      showFourthSection={true}
      fourthSectionFeatures={[
        "Flexible Online Course: 15 engaging lessons delivered over 5 weeks (30 hours total)",
        "Learning Options: Join a small group (3–5 students) or choose private one-on-one lessons",
        "Complete Skill Training: Improve your speaking, writing, reading, and listening skills",
        "Smart Study Techniques: Learn effective strategies for study and test success",
        "Ongoing Support: Receive personalized feedback to monitor progress and enhance results",
        "Authentic Exam Practice: Work with real IELTS General-style materials and mock tests",
        "Qualified Instructors: Get guidance from experienced and certified IELTS trainers"
      ]}
    />
  )
}
