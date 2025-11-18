'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TestsSection() {
  const cards = [
    {
      id: 'free',
      title: 'Free Practice Test',
      desc: `Our free 30-minutes English practice test helps you identify your current level of English proficiency. It assesses grammar, vocabulary, and comprehension to provide an accurate overview of your strengths and areas for development.`,
      bullets: [
        'The test includes 36 multiple-choice questions.',
        'It takes approximately 30 minutes to complete.',
        'No registration is required to begin.',
        'The test can be retaken at any time to monitor progress.'
      ],
      ReadMoreHref: '/tutelage-tests/free-practice-test',
      TakeHref: '/tutelage-tests/free-practice-test/start',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1400',
      btn: 'Read More',
      btn2: 'Take Free Test'
    },
    {
      id: 'placement',
      title: 'Language Placement Test',
      desc: `Online placement with a live instructor. A 15–30 minute speaking & comprehension session that measures practical speaking and listening skills in real time.`,
      bullets: [
        'Live speaking & comprehension with an instructor',
        '15–30 minutes, real-time evaluation',
        'Measures practical communication'
      ],
      ReadMoreHref: '/tutelage-tests/language-placement',
      TakeHref: '/tutelage-tests/languageplacement',
      image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1400',
      btn: 'Read More',
      btn2: 'Book Placement'
    },
    {
      id: 'mock',
      title: 'International / Mock Test',
      desc: `Simulated live speaking mock test to practice under exam conditions. 11–14 minutes focusing on fluency, pronunciation, grammar and vocabulary.`,
      bullets: [
        'Conducted online with a live instructor',
        '11–14 minutes following IELTS speaking format',
        'Focus: fluency, pronunciation & vocabulary'
      ],
      ReadMoreHref: '/tutelage-tests/mock-exam',
      TakeHref: '/tutelage-tests/mockexams',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1400',
      btn: 'Read More',
      btn2: 'Schedule Mock'
    }
  ]

  return (
    <section className="py-16 md:py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Choose a section</h2>
        </div>

        <div className="space-y-10">
          {cards.map((card, idx) => {
            const mirror = idx % 2 === 0 // mirror for first and third
            // container rounded corners mirror depending on side
            const containerRoundClass = mirror
              ? 'lg:rounded-tr-[4rem] lg:rounded-bl-[4rem] max-lg:rounded-tl-[1.25rem] max-lg:rounded-br-[1.25rem]'
              : 'lg:rounded-tl-[4rem] lg:rounded-br-[4rem] max-lg:rounded-tl-[1.25rem] max-lg:rounded-br-[1.25rem]'

            // image rounding matches the container curve on the image side.
            const imageRoundClass = mirror
              ? 'lg:rounded-tr-[4rem] max-lg:rounded-tl-[1.25rem] overflow-hidden'
              : 'lg:rounded-tl-[4rem] max-lg:rounded-tl-[1.25rem] overflow-hidden'

            // Ensure the image wrapper is overflow-hidden so rounding clips image cleanly
            return (
              <div key={card.id} className={`max-w-7xl mb-16 md:mb-30 h-full mx-auto border border-border rounded-sm shadow-lg overflow-hidden ${containerRoundClass}`}>
                <div className={`flex flex-col-reverse lg:flex-row items-stretch ${mirror ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Text Content */}
                  <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:ml-10">
                    <div className="w-full py-10 lg:py-0 lg:pr-12 ">
                      <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6 sm:mb-10">
                        {card.title}
                      </h3>

                      <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
                        {card.desc}
                      </p>

                      {card.bullets && (
                        <ul className="space-y-2 mb-10">
                          {card.bullets.map((b, i) => (
                            <li key={i} className="flex items-start">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span className="text-sm text-foreground">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex items-center gap-4 mt-4">
                        <Link href={card.ReadMoreHref}>
                          <Button size="lg" className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                            {card.btn}
                          </Button>
                        </Link>
                        { card.id === "free" &&
                          <Link href={card.TakeHref}>
                            <Button variant={"secondary"} size="lg" className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                              {card.btn2}
                            </Button>
                          </Link>
                        }
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className={`relative w-full h-72 sm:h-96 lg:h-[32rem] xl:h-[36rem] ${imageRoundClass}`}>
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}
