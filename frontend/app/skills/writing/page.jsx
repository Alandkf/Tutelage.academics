import SkillPageTemplate from '@/components/skills/SkillPageTemplate'

export default function WritingPage() {
  const writingData = {
    title: "Writing Skill",
    heroImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    description: "Our writing materials help learners practice writing independently, developing accuracy, clarity, and the ability to express ideas step by step from simple sentences to complex texts.",
    coursesButtonText: "Explore courses",
    whyUseSection: {
      title: "Why use these materials?",
      content: "These resources allow learners to practice independently and improve their writing skills at their own pace. Practicing writing develops vocabulary, grammar, structure, and the ability to communicate ideas effectively. Enroll in our courses to access expert guidance, interactive exercises, and feedback to strengthen your writing, reading, listening, and speaking skills — and achieve your English goals efficiently."
    },
    levels: [
      {
        code: "A1",
        title: "A1 – Beginner",
        href: "/skills/writing/a1",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
        description: "Writing practices to help learners write simple sentences about themselves, their family, and daily routines. Activities include filling in missing words, matching words to pictures, and completing short guided sentences."
      },
      {
        code: "A2",
        title: "A2 – Elementary",
        href: "/skills/writing/a2",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        description: "Writing practices for learners to write short messages and simple paragraphs about personal information, shopping, work, and daily life. Activities include completing forms, short emails, and guided paragraph writing."
      },
      {
        code: "B1",
        title: "B1 – Intermediate",
        href: "/skills/writing/b1",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
        description: "Writing practices to help learners write clear, connected texts on familiar topics such as travel, school, work, and leisure. Activities include describing experiences, giving opinions, and writing short essays or stories."
      },
      {
        code: "B2",
        title: "B2 – Upper Intermediate",
        href: "/skills/writing/b2",
        image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80",
        description: "Writing practices for learners to produce extended texts with logical structure and clear arguments. Activities include essays, reports, reviews, and formal letters, focusing on linking ideas, supporting arguments, and expressing opinions fluently."
      },
      {
        code: "C1",
        title: "C1 – Advanced",
        href: "/skills/writing/c1",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        description: "Writing practices to help learners write complex texts with nuance, style, and clarity. Activities include academic essays, professional reports, and opinion pieces, with a focus on tone, emphasis, coherence, and implied meaning."
      }
    ]
  }

  return <SkillPageTemplate skillData={writingData} />
}
