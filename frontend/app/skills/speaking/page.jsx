import SkillPageTemplate from '@/components/skills/SkillPageTemplate'

export default function SpeakingPage() {
  const speakingData = {
    title: "Speaking Skill",
    heroImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    description: "Our speaking materials help learners practice speaking independently and improve confidence step by step from simple sentences to fluent conversations.",
    coursesButtonText: "Explore courses",
    whyUseSection: {
      title: "Why use these materials?",
      content: "These resources allow learners to practice independently and strengthen speaking skills at their own pace. Practicing speaking improves comprehension, vocabulary, and the ability to understand real-life, academic, and professional texts. Enroll in our courses to access structured guidance, interactive exercises, and expert support to improve your reading, listening, speaking, and writing skills — and reach your English goals faster."
    },
    levels: [
      {
        code: "A1",
        title: "A1 – Beginner",
        href: "/skills/speaking/a1",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
        description: "Speaking practices to help learners introduce themselves, talk about family, daily routines, and hobbies. Activities include using simple phrases, guided role-plays, and picture prompts."
      },
      {
        code: "A2",
        title: "A2 – Elementary",
        href: "/skills/speaking/a2",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        description: "Speaking practices for learners to ask and answer questions about personal information, shopping, work, and everyday life. Activities include short conversations, pair work, and using basic connectors like and, but, because."
      },
      {
        code: "B1",
        title: "B1 – Intermediate",
        href: "/skills/speaking/b1",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
        description: "Speaking practices to help learners describe experiences, events, and plans, and share opinions. Activities include storytelling prompts, discussion questions, and role-plays on familiar topics like travel, work, and leisure."
      },
      {
        code: "B2",
        title: "B2 – Upper Intermediate",
        href: "/skills/speaking/b2",
        image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80",
        description: "Speaking practices to help learners express opinions, take part in debates, and give short presentations. Activities include group discussions, problem-solving tasks, and using natural phrases for agreeing, disagreeing, or giving reasons."
      },
      {
        code: "C1",
        title: "C1 – Advanced",
        href: "/skills/speaking/c1",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        description: "Speaking practices for learners to participate confidently in debates, discussions, and presentations. Activities include abstract discussion prompts, using idioms and humor, responding to implied meanings, and practicing tone, style, and fluency."
      }
    ]
  }

  return <SkillPageTemplate skillData={speakingData} />
}
