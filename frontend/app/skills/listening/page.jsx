import SkillPageTemplate from '@/components/skills/SkillPageTemplate'

export default function ListeningPage() {
  const listeningData = {
    title: "Listening",
    heroImage: "/hero.jpg",
    description: "Enhance your listening comprehension with authentic audio materials and interactive exercises. From understanding basic conversations to following complex discussions, develop the skills needed to understand spoken English in various contexts. Practice with different accents, speeds, and topics to build your confidence.",
    coursesButtonText: "Explore listening courses",
    levels: [
      {
        code: "A1",
        href: "/A1level/listening",
        image: "/hero.jpg",
        description: "Understand basic phrases, personal information, and simple conversations spoken slowly and clearly."
      },
      {
        code: "A2",
        href: "/A2level/listening",
        image: "/hero.jpg",
        description: "Follow short conversations about familiar topics and understand simple announcements."
      },
      {
        code: "B1",
        href: "/B1level/listening",
        image: "/hero.jpg",
        description: "Understand main points of discussions on familiar topics and follow longer conversations."
      },
      {
        code: "B2",
        href: "/B2level/listening",
        image: "/hero.jpg",
        description: "Understand detailed information in various contexts and follow complex arguments."
      },
      {
        code: "C1",
        href: "/C1level/listening",
        image: "/hero.jpg",
        description: "Understand a wide range of demanding audio texts and recognize implicit meanings."
      }
    ]
  }

  return <SkillPageTemplate skillData={listeningData} />
}
