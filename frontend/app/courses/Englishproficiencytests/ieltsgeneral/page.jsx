'use client'

import SingleProficiencyTest from '@/components/courses/SingleProficiencyTest'

export default function IELTSGeneralPage() {
  return (
    <SingleProficiencyTest
      title="IELTS General Training"
      heroImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80"
      description="Master IELTS General Training with our targeted preparation program designed for migration and work visa applications. Our course focuses on practical English skills needed for everyday situations in English-speaking countries."
      
      firstSectionTitle="About IELTS General Training"
      firstSectionContent="IELTS General Training is designed for those who are going to English-speaking countries for secondary education, work experience or training programs. It is also a requirement for migration to Australia, Canada, New Zealand and the UK. The test focuses on basic survival skills in broad social and workplace contexts. Our preparation course helps you develop the practical English skills needed to succeed in everyday situations while achieving your required band score."
      
      showSecondSection={true}
      secondSectionTitle="Practical English for Real-Life Situations"
      secondSectionContent="Our IELTS General Training course emphasizes practical English usage for work and social situations. You'll practice with authentic materials that reflect real-life scenarios, from workplace communications to social interactions. Learn how to navigate the test successfully while building English skills that will serve you well in your new English-speaking environment."
      secondSectionImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
      
      showThirdSection={true}
      thirdSectionTitle="Your Path to Migration Success"
      thirdSectionContent="Whether you're planning to migrate, work abroad, or pursue vocational training, our IELTS General Training program provides the skills and confidence you need. With experienced instructors, proven strategies, and comprehensive practice materials, we'll help you achieve the band score required for your visa application or professional registration."
      thirdSectionImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
      
      showFourthSection={true}
      fourthSectionFeatures={[
        "Focus on practical English for everyday situations",
        "Targeted preparation for migration and work visa requirements",
        "Expert guidance on all four test components",
        "Practice with authentic General Training materials",
        "Strategies for workplace and social communication",
        "Regular progress assessments and feedback",
        "Flexible class schedules",
        "Tutelage certificate upon completion"
      ]}
    />
  )
}
