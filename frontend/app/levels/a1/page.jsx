import LevelPageContent from '@/components/levels/LevelPageContent'

const A1Page = () => {
  const levelData = {
    title: 'A1 Level',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    description: `At this level students can communicate slowly with hesitation using a limited vocabulary. They can express basic simple everyday situations and understand very common phrases like greetings and instructions. They may be familiar with words related to themselves or their family. In reading, they can understand simple sentences. In writing, they can produce basic phrases such as their name, age, or nationality, though grammar and spelling may often be incorrect but still understandable.`,
    resources: [
      {
        title: 'A1 Listening',
        description: 'Here you can find listening exercises that match your level, with a brief introduction to help you master each topic.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        link: '/levels/a1/listening'
      },
      {
        title: 'A1 Speaking',
        description: 'Here you can find speaking exercises that match your level, with a brief introduction to help you master each topic.',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
        // image: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800&q=80',
        link: '/levels/a1/speaking'
      },
      {
        title: 'A1 Reading',
        description: 'Here you can find reading exercises that match your level, with a brief introduction to help you master each topic.',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
        link: '/levels/a1/reading'
      },
      {
        title: 'A1 Writing',
        description: 'Here you can find writing exercises that match your level, with a brief introduction to help you master each topic.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
        link: '/levels/a1/writing'
      }
    ]
  }

  return <LevelPageContent levelData={levelData} />
}

export default A1Page
