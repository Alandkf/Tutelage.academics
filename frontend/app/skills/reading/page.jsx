import SkillPageTemplate from '@/components/skills/SkillPageTemplate'

export default function ReadingPage() {
  const readingData = {
    title: "Reading Skill",
    heroImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    description: "Our reading materials help learners practice reading independently, improving comprehension and vocabulary step by step from simple sentences to understanding longer texts and complex ideas.",
    coursesButtonText: "Explore courses",
    whyUseSection: {
      title: "Why use these materials?",
      content: "These resources allow learners to practice independently and strengthen reading skills at their own pace. Practicing reading improves comprehension, vocabulary, and the ability to understand real-life, academic, and professional texts. Enroll in our courses to access structured guidance, interactive exercises, and expert support to improve your reading, listening, speaking, and writing skills — and reach your English goals faster."
    },
    levels: [
      {
        code: "A1",
        title: "A1 – Beginner",
        href: "/skills/reading/a1",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
        description: "Reading practices to help learners understand very simple sentences and familiar words about people, family, daily routines, and everyday life. Activities include matching words to pictures, filling in missing words, and answering simple questions."
      },
      {
        code: "A2",
        title: "A2 – Elementary",
        href: "/skills/reading/a2",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        description: "Reading practices for learners to understand short texts and messages about personal information, shopping, work, and family. Activities include finding the main idea, completing short passages, and answering simple comprehension questions."
      },
      {
        code: "B1",
        title: "B1 – Intermediate",
        href: "/skills/reading/b1",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
        description: "Reading practices to help learners understand clear, standard texts on familiar topics such as work, school, travel, leisure, and daily life. Activities include summarizing main points, identifying opinions, and following simple narratives or arguments."
      },
      {
        code: "B2",
        title: "B2 – Upper Intermediate",
        href: "/skills/reading/b2",
        image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80",
        description: "Reading practices for learners to understand extended texts on concrete or abstract topics. Activities include identifying arguments and supporting details, understanding cause–effect relationships, and analyzing opinions in articles, reports, or stories."
      },
      {
        code: "C1",
        title: "C1 – Advanced",
        href: "/skills/reading/c1",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        description: "Reading practices for learners to understand complex and implicit ideas in longer texts. Activities include recognizing subtle opinions, implied meanings, tone, humor, and culture-based references in essays, reports, debates, or literary texts."
      }
    ]
  }

  return <SkillPageTemplate skillData={readingData} />
}
