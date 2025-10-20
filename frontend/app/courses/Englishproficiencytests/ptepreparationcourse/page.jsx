'use client'

import SingleProficiencyTest from '@/components/courses/SingleProficiencyTest'

export default function PTEPreparationPage() {
  return (
    <SingleProficiencyTest
      title="PTE Preparation Course"
      heroImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80"
      description="Ace the PTE Academic with our specialized preparation program designed for the computer-based test format. Master all sections with expert strategies, automated scoring insights, and comprehensive practice materials."
      
      firstSectionTitle="About PTE Academic"
      firstSectionContent="PTE Academic is a computer-based English language test for study abroad and immigration. Trusted by universities, colleges and governments around the world, PTE Academic accurately measures your ability to use English in academic settings. The test uses automated scoring technology and assesses speaking, writing, reading and listening skills through a variety of question types. Our preparation course helps you understand the unique format, develop essential skills, and achieve the scores needed for your academic or migration goals."
      
      showSecondSection={true}
      secondSectionTitle="Master Computer-Based Testing"
      secondSectionContent="Unlike traditional tests, PTE Academic uses completely computer-based testing and automated scoring. Our course prepares you specifically for this format with extensive practice on PTE-style questions and familiarization with the testing interface. You'll learn how the scoring algorithm works and develop strategies to maximize your performance across all sections of the test."
      secondSectionImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
      
      showThirdSection={true}
      thirdSectionTitle="Fast Results, Global Recognition"
      thirdSectionContent="PTE Academic offers quick results (usually within 48 hours) and is accepted by thousands of institutions worldwide. Our expert instructors provide targeted training for each question type, helping you understand the specific skills assessed and techniques to excel. With personalized feedback and regular practice tests, we ensure you're fully prepared to achieve your target score."
      thirdSectionImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
      
      showFourthSection={false}
    />
  )
}
