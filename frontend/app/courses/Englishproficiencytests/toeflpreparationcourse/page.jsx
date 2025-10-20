'use client'

import SingleProficiencyTest from '@/components/courses/SingleProficiencyTest'

export default function TOEFLPreparationPage() {
  return (
    <SingleProficiencyTest
      title="TOEFL Preparation Course"
      heroImage="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80"
      description="Excel in the TOEFL iBT with our comprehensive preparation program designed for students aiming to study at American universities. Master all four sections with proven strategies and extensive practice with authentic materials."
      
      firstSectionTitle="About TOEFL iBT"
      firstSectionContent="The TOEFL iBT (Internet-Based Test) is the most widely accepted English-language test in the world, recognized by more than 11,000 universities and institutions in over 150 countries. The test measures your ability to use and understand English at the university level, evaluating how well you combine listening, reading, speaking and writing skills to perform academic tasks. Our preparation course provides comprehensive training in all four sections, helping you achieve the scores needed for admission to your target universities."
      
      showSecondSection={true}
      secondSectionTitle="Master the TOEFL Format"
      secondSectionContent="Our TOEFL preparation course familiarizes you with the unique computer-based format of the test. You'll practice with simulated testing environments, learn effective note-taking strategies, and develop the integrated skills needed to excel. From reading academic passages to responding to spoken prompts, we cover every aspect of the TOEFL iBT comprehensively."
      secondSectionImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
      
      showThirdSection={true}
      thirdSectionTitle="Your Gateway to American Universities"
      thirdSectionContent="With expert instruction, targeted practice, and proven test-taking strategies, our TOEFL preparation course gives you the competitive edge needed for university admission. Our instructors are experienced in all aspects of the TOEFL iBT and provide personalized feedback to help you improve rapidly and achieve your target score."
      thirdSectionImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
      
      showFourthSection={false}
    />
  )
}
