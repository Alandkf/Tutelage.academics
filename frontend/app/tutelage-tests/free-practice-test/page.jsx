"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"


const FreePracticeTest = () => {
  return (
  <div className="relative min-h-screen bg-background pt-4"> 
        <FreeTestHero />
        <DiscoverSection />
  </div>
    
     )
}

export default FreePracticeTest




const FreeTestHero = () => {
  const title = "Free Practice Test"
  const heroImage = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1400"
  const description = "Our free 24-minute English placement test helps you identify your current level of English proficiency. It assesses grammar, vocabulary, and comprehension to provide an accurate overview of your strengths and areas for development."
  return (
    <>
      {/* Header Section */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-6 py-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      {/* Description */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl">
          <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </>
  )
}

function DiscoverSection() {
  const title = 'Discover Your English Level Online – Free Test'
  const desc = `Our 24-minute free placement test provides an accurate assessment of your
                English proficiency. Analyze your grammar knowledge, highlight areas for
                improvement, and gain a clear understanding of your language level.`

  const images = [
    'https://www.fsp-law.com/wp-content/uploads/2022/05/Exam.jpg',
    'https://www.fsp-law.com/wp-content/uploads/2022/05/Exam.jpg',
    'https://www.fsp-law.com/wp-content/uploads/2022/05/Exam.jpg'
  ]

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* --- MOBILE IMAGE (single big image on top) --- */}
          <div className="block lg:hidden w-full mb-6">
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={images[2]}
                alt="English Level Test"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* --- TEXT SECTION --- */}
          <div className="order-2 lg:order-1 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line mb-6 max-w-2xl">
              {desc}
            </p>
            <div>
              <Link href="/tutelage-tests/practicetests">
                <Button size="lg" className="bg-primary text-primary-foreground px-6 py-3">
                  Start the test
                </Button>
              </Link>
            </div>
          </div>

          {/* --- DESKTOP IMAGE STACK --- */}
          <div className="hidden lg:flex items-center justify-center order-1">
            <div className="relative w-full max-w-[560px] h-[420px]">
              {/* Back image */}
              <div className="absolute -left-4 xl:-left-6 top-10 w-[50%] h-[50%] xl:w-[64%] xl:h-[64%] transform translate-x-6 overflow-hidden shadow-lg z-10">
                <Image src={images[0]} alt="image-1" fill className="object-cover" />
              </div>

              {/* Middle image */}
              <div className="absolute left-0 xl:left-2 top-6 w-[64%] h-[64%] xl:w-[78%] xl:h-[78%] transform translate-x-10 overflow-hidden shadow-2xl z-20">
                <Image src={images[1]} alt="image-2" fill className="object-cover" />
              </div>

              {/* Front image */}
              <div className="absolute max-xl:left-6 xl:right-0 top-0 w-[76%] h-[76%] xl:w-[90%] xl:h-[90%] transform translate-x-12 overflow-hidden shadow-2xl z-30">
                <Image src={images[2]} alt="image-3" fill className="object-cover" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}






