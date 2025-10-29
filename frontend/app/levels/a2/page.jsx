import LevelPageContent from '@/components/levels/LevelPageContent'

const A2Page = () => {
  const levelData = {
    title: 'A2 – Elementary',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    description: `At this level students can communicate in short conversations about familiar topics, though they may still pause while speaking. Their vocabulary is limited to everyday topics such as family, work, shopping, or hobbies. They can express basic opinions, describe simple experiences, and handle predictable situations in daily life. In reading, they can understand short, simple texts such as messages, personal letters, or brief articles on familiar topics. In writing, they can produce short paragraphs and simple connected sentences to describe events, people, or routines. Errors in grammar and spelling are still common, but the overall message is usually clear and understandable.`,
    resources: [
      {
        title: 'A2 Listening',
        description: 'Here you can find listening exercises that match your level, with a brief introduction to help you master each topic.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        link: '/levels/a2/listening'
      },
      {
        title: 'A2 Speaking',
        description: 'Here you can find speaking exercises that match your level, with a brief introduction to help you master each topic.',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
        link: '/levels/a2/speaking'
      },
      {
        title: 'A2 Reading',
        description: 'Here you can find reading exercises that match your level, with a brief introduction to help you master each topic.',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
        link: '/levels/a2/reading'
      },
      {
        title: 'A2 Writing',
        description: 'Here you can find writing exercises that match your level, with a brief introduction to help you master each topic.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
        link: '/levels/a2/writing'
      }
    ]
  }

  return <LevelPageContent levelData={levelData} />
}

export default A2Page
