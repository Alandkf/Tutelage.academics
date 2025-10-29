import SkillPageTemplate from '@/components/skills/SkillPageTemplate'

export default function SpeakingPage() {
  const speakingData = {
    title: "Speaking",
    heroImage: "/hero.jpg",
    description: "Build confidence in spoken English through interactive practice and targeted exercises. From basic pronunciation to fluent conversation, develop the speaking skills needed for academic, professional, and social contexts. Practice with real-life scenarios and receive feedback to improve your fluency and accuracy.",
    coursesButtonText: "Explore speaking courses",
    levels: [
      {
        code: "A1",
        href: "/skills/speaking/a1",
        image: "/hero.jpg",
        description: "Use basic phrases for personal information and simple everyday situations with slow, clear speech."
      },
      {
        code: "A2",
        href: "/skills/speaking/a2",
        image: "/hero.jpg",
        description: "Communicate in simple conversations about familiar topics and describe experiences briefly."
      },
      {
        code: "B1",
        href: "/skills/speaking/b1",
        image: "/hero.jpg",
        description: "Express opinions, describe experiences, and handle most travel situations with clear speech."
      },
      {
        code: "B2",
        href: "/skills/speaking/b2",
        image: "/hero.jpg",
        description: "Speak fluently on various topics, present arguments clearly, and interact naturally with native speakers."
      },
      {
        code: "C1",
        href: "/skills/speaking/c1",
        image: "/hero.jpg",
        description: "Express ideas fluently and spontaneously with precise language and appropriate style for different contexts."
      }
    ]
  }

  return <SkillPageTemplate skillData={speakingData} />
}
