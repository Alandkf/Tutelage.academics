'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const LevelsCards = () => {
  const levels = [
    {
      id: 1,
      code: 'A1',
      title: 'A1 Level',
      slug: 'a1',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
      description: `A1 students communicate slowly with hesitation using a limited vocabulary. They can express basic simple everyday situations and understand very common phrases like greetings and instructions. They may be familiar with words related to themselves or their family. In reading, they can understand simple sentences. In writing, they can produce basic phrases such as their name, age, or nationality, though grammar and spelling may often be incorrect but still understandable.`
    },
    {
      id: 2,
      code: 'A2',
      title: 'A2 – Elementary',
      slug: 'a2',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      description: `A2 students can communicate in short conversations about familiar topics, though they may still pause while speaking. Their vocabulary is limited to everyday topics such as family, work, shopping, or hobbies. They can express basic opinions, describe simple experiences, and handle predictable situations in daily life. In reading, they can understand short, simple texts such as messages, personal letters, or brief articles on familiar topics. In writing, they can produce short paragraphs and simple connected sentences to describe events, people, or routines. Errors in grammar and spelling are still common, but the overall message is usually clear and understandable.`
    },
    {
      id: 3,
      code: 'B1',
      title: 'B1 – Intermediate',
      slug: 'b1',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
      description: `B1 students can communicate with some confidence on familiar topics and in everyday situations, even though they may occasionally search for words. They can express opinions, give reasons, and describe experiences, dreams, or ambitions using connected sentences. Their vocabulary allows them to discuss most daily subjects such as work, travel, education, and leisure. In reading, they can understand the main ideas of clear texts on familiar topics, including short articles, emails, or stories. In writing, they can produce simple connected texts such as personal letters, essays, or reports, linking ideas with basic connectors like because, but, or so.`
    },
    {
      id: 4,
      code: 'B2',
      title: 'B2 – Upper Intermediate',
      slug: 'b2',
      image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80',
      description: `B2 students can communicate clearly and effectively on a wide range of subjects, both familiar and less familiar. They can interact with native speakers with a good degree of fluency, though occasional hesitation or searching for precise words may occur. In reading, they can understand the main ideas and details of complex texts, including articles, reports, and literary works, especially when the topics are of personal or professional interest. In writing, they can produce clear, detailed texts such as essays, reviews, or formal letters, organizing their ideas logically and using a range of linking devices. Some grammatical or lexical mistakes may still occur, but they rarely hinder communication.`
    },
    {
      id: 5,
      code: 'C1',
      title: 'C1 – Advanced',
      slug: 'c1',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
      description: `C1 students can express themselves spontaneously without much obvious searching for words. They can use language flexibly and effectively for social, academic, and professional purposes. Their vocabulary range allows them to discuss complex subjects, express subtle shades of meaning, and adapt their tone to different contexts. In reading, they can understand a wide variety of demanding, longer texts and recognize implicit meaning, attitude, or opinion. In writing, they can produce well-structured, detailed texts on complex topics, showing controlled use of organizational patterns and cohesive devices. Although minor inaccuracies may appear, they are rare and do not affect clarity or precision.`
    }
  ]

  return (
    <div className="py-16 md:py-20 px-4">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            English Proficiency Levels
          </h2>
        </div>
      </div>

      {/* Level Cards */}
      <div className="max-w-7xl mx-auto space-y-16">
        {levels.map((level, index) => {
          const isEven = index % 2 === 0

          return (
            <div 
              key={level.id}
              className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg lg:rounded-tr-[4rem] lg:rounded-bl-[4rem] max-lg:rounded-tl-[2rem] max-lg:rounded-br-[2rem]"
            >
              <div className={`flex ${isEven ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'} items-stretch gap-0`}>
                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:ml-10">
                  <div className="w-full py-10 lg:py-0 lg:pr-12">                    
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                      {level.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                      {level.description}
                    </p>

                    {/* Explore Button */}
                    <Link href={`/levels/${level.slug}`}>
                      <Button 
                        size="lg" 
                        className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        Explore {level.code}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                    <Image
                      src={level.image}
                      alt={level.title}
                      fill
                      className={`object-cover ${
                        isEven 
                          ? 'lg:rounded-tr-[4rem] max-lg:rounded-tl-[2rem]' 
                          : 'lg:rounded-bl-[4rem] max-lg:rounded-tl-[2rem]'
                      }`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LevelsCards
