import SkillPageTemplate from '@/components/skills/SkillPageTemplate'

export default function ReadingPage() {
  const readingData = {
    title: "Reading",
    heroImage: "/hero.jpg",
    description: "Improve your reading comprehension with diverse texts and strategic approaches. From understanding simple texts to analyzing complex literature, develop the skills to read effectively in English. Practice skimming, scanning, and detailed reading techniques while expanding your vocabulary and cultural knowledge.",
    coursesButtonText: "Explore reading courses",
    levels: [
      {
        code: "A1",
        href: "/skills/reading/A1",
        image: "/hero.jpg",
        description: "Read simple texts, signs, and basic information with familiar vocabulary and short sentences."
      },
      {
        code: "A2",
        href: "/skills/reading/A2",
        image: "/hero.jpg",
        description: "Understand short texts about everyday topics and find specific information in simple materials."
      },
      {
        code: "B1",
        href: "/skills/reading/B1",
        image: "/hero.jpg",
        description: "Read straightforward texts on familiar subjects and understand main points of clear texts."
      },
      {
        code: "B2",
        href: "/skills/reading/B2",
        image: "/hero.jpg",
        description: "Read articles, reports, and literary texts, understanding different viewpoints and implicit meanings."
      },
      {
        code: "C1",
        href: "/skills/reading/C1",
        image: "/hero.jpg",
        description: "Understand long, complex texts and recognize subtle distinctions of style and implicit meaning."
      }
    ]
  }

  return <SkillPageTemplate skillData={readingData} />
}
