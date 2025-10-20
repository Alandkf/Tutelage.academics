'use client'

import SingleProficiencyTest from '@/components/courses/SingleProficiencyTest'

export default function IELTSAcademicPage() {
  return (
    <SingleProficiencyTest
      title="IELTS Academic"
      heroImage="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80"
      description="Prepare for IELTS Academic with our comprehensive training program designed for students planning to pursue higher education in English-speaking countries. Our expert instructors will guide you through all four test components with proven strategies and extensive practice materials."
      
      firstSectionTitle="About IELTS Academic"
      firstSectionContent="The IELTS Academic test is designed to assess the English language proficiency of candidates who want to study at undergraduate or postgraduate levels, and for those seeking professional registration in an English-speaking environment. The test evaluates your ability to listen, read, write and speak in English through four papers: Listening, Reading, Writing and Speaking. Our comprehensive preparation course ensures you understand the test format, develop essential skills, and build confidence to achieve your target band score."
      
      showSecondSection={false}
      
      showThirdSection={true}
      thirdSectionTitle="Expert IELTS Coaching at Tutelage"
      thirdSectionContent="Our IELTS Academic preparation program combines expert instruction with proven test-taking strategies. You'll receive personalized feedback on your performance, practice with authentic materials, and learn time management techniques essential for test day success. Our experienced instructors have helped hundreds of students achieve their target scores and gain admission to top universities worldwide."
      thirdSectionImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
      
      showFourthSection={true}
      fourthSectionFeatures={[
        "Comprehensive coverage of all four IELTS sections",
        "Practice with authentic IELTS materials",
        "Personalized feedback from expert instructors",
        "Proven strategies for each test component",
        "Regular mock tests with detailed analysis",
        "Small class sizes for individual attention",
        "Flexible scheduling options",
        "Certificate of completion"
      ]}
    />
  )
}
