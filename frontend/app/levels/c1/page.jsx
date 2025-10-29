import LevelPageContent from '@/components/levels/LevelPageContent'

const C1Page = () => {
  const levelData = {
    title: 'C1 – Advanced',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    description: `At this level students can express themselves spontaneously without much obvious searching for words. They can use language flexibly and effectively for social, academic, and professional purposes. Their vocabulary range allows them to discuss complex subjects, express subtle shades of meaning, and adapt their tone to different contexts. In reading, they can understand a wide variety of demanding, longer texts and recognize implicit meaning, attitude, or opinion. In writing, they can produce well-structured, detailed texts on complex topics, showing controlled use of organizational patterns and cohesive devices. Although minor inaccuracies may appear, they are rare and do not affect clarity or precision.`,
    resources: [
      {
        title: 'C1 Listening',
        description: 'Here you can find listening exercises that match your level, with a brief introduction to help you master each topic.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        link: '/levels/c1/listening'
      },
      {
        title: 'C1 Speaking',
        description: 'Here you can find speaking exercises that match your level, with a brief introduction to help you master each topic.',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
        link: '/levels/c1/speaking'
      },
      {
        title: 'C1 Reading',
        description: 'Here you can find reading exercises that match your level, with a brief introduction to help you master each topic.',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
        link: '/levels/c1/reading'
      },
      {
        title: 'C1 Writing',
        description: 'Here you can find writing exercises that match your level, with a brief introduction to help you master each topic.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
        link: '/levels/c1/writing'
      }
    ]
  }

  return <LevelPageContent levelData={levelData} />
}

export default C1Page
