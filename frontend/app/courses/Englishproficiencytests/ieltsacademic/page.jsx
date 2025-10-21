'use client'

import SingleProficiencyTest from '@/components/courses/SingleProficiencyTest'

export default function IELTSAcademicPage() {
  return (
    <SingleProficiencyTest
      title="IELTS Academic"
      heroImage="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80"
      description="Prepare for IELTS Academic with our comprehensive training program designed for students planning to pursue higher education in English-speaking countries. Our expert instructors will guide you through all four test components with proven strategies and extensive practice materials."
      
      firstSectionTitle="About IELTS Academic"
      firstSectionContent="The IELTS Academic test is for test takers wishing to undertake academic study at the undergraduate or postgraduate level in an English-speaking country. The IELTS exam is recognized by over 12,500 organizations worldwide across more than 150 countries."
      firstSectionBulletPoints={[
        "University Admissions: Accepted by thousands of universities and colleges worldwide as proof of English ability.",
        "Visa Applications: Approved for study, work, and migration visas over 140 countries around the world.",
        "Professional Registration: Used by organizations and employers to assess English communication skills within your home country or abroad.",
        "Language Certification: Provides an official and reliable measure of English proficiency for global recognition valid for two years."
      ]}
      
      showSecondSection={false}
      
      showThirdSection={true}
      thirdSectionTitle="Why Choose Tutelage for IELTS?"
      thirdSectionBulletPoints={[
        {
          title: "Strategic Insights:",
          description: "Get critical test advice and insider tips from the start to approach every task effectively."
        },
        {
          title: "Expert Coaching:",
          description: "Learn in engaging live classes with certified IELTS instructors and real-time interaction."
        },
        {
          title: "Focused Improvement:",
          description: "Receive detailed feedback throughout the course for rapid correction and maximum gains."
        },
        {
          title: "Extra Resources:",
          description: "Access free supplementary materials for comprehensive support at no extra charge."
        },
        {
          title: "Affordable Quality:",
          description: "Competitively priced programs ensuring premium quality that fits your budget."
        }
      ]}
      thirdSectionImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
      
      showFourthSection={true}
      fourthSectionFeatures={[
        "Online course: 15 lessons over 5 weeks (30 hours total)",
        "Choose group of 3 to 5 students or individual private lessons",
        "Comprehensive skill coverage: Speaking, writing, reading, and listening",
        "Effective study strategies and test-taking techniques",
        "Continuous feedback to track progress and improve performance",
        "Real IELTS Academic-style practice tests and materials",
        "Expert guidance from qualified instructors"
      ]}
    />
  )
}
