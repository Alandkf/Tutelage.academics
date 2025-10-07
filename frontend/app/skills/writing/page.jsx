import SkillPageTemplate from '@/components/skills/SkillPageTemplate'

export default function WritingPage() {
  const writingData = {
    title: "Writing",
    heroImage: "/hero.jpg",
    description: "Develop your writing skills with structured exercises and expert guidance. From basic sentence construction to advanced essay writing, our comprehensive approach helps you express your ideas clearly and effectively in English. Practice different writing styles, improve your grammar, and build confidence in written communication.",
    coursesButtonText: "Explore writing courses",
    levels: [
      {
        code: "A1",
        href: "/A1level/writing",
        image: "/hero.jpg",
        description: "Learn basic writing skills including simple sentences, personal information, and short messages."
      },
      {
        code: "A2",
        href: "/A2level/writing", 
        image: "/hero.jpg",
        description: "Write short texts about familiar topics, basic emails, and simple descriptions."
      },
      {
        code: "B1",
        href: "/B1level/writing",
        image: "/hero.jpg", 
        description: "Express opinions, write informal letters, and create coherent texts on familiar subjects."
      },
      {
        code: "B2",
        href: "/B2level/writing",
        image: "/hero.jpg",
        description: "Write clear, detailed texts on various topics and express viewpoints with supporting arguments."
      },
      {
        code: "C1",
        href: "/C1level/writing",
        image: "/hero.jpg",
        description: "Produce clear, well-structured texts on complex subjects with appropriate style and tone."
      }
    ]
  }

  return <SkillPageTemplate skillData={writingData} />
}
