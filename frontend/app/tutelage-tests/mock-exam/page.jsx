import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"


const MockExam = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4"> 
      <MockHero />
      <MoreAboutMock />
      {/* call other functions(components) here... */}
    </div>
  )
}

export default MockExam

const MockHero = () => {
  const title = "International / Mock Test"
  const heroImage = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1400"
  const description = "Simulated live speaking mock test to practice under exam conditions. 11–14 minutes focusing on fluency, pronunciation, grammar and vocabulary."
  return (
    <>
      {/* Header Section */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-6 py-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl flex items-center justify-between font-bold text-foreground mb-2">
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
const MoreAboutMock = () => {
  return (
    <div className="py-16 md:py-20 px-4">
      <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg">
        <div className="flex flex-col-reverse lg:flex-row items-stretch gap-0">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:ml-10">
            <div className="w-full py-10 lg:py-0 lg:pr-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                Language Placement Test
              </h2>
              
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
                Tutelage offers online English placement tests designed to give you a clear understanding of your language proficiency. The <span className="font-semibold text-foreground">Live Speaking & Comprehension Test</span> is conducted online with a live instructor and evaluates your ability to understand spoken English and communicate effectively in real-time. This test takes approximately 15–20 minutes and helps measure your practical speaking and listening skills.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
                In addition, the <span className="font-semibold text-foreground">Detailed Listening, Reading & Writing Test</span> is a self-paced online assessment focused on your reading comprehension and writing abilities. It includes interactive exercises and short writing tasks, taking 15 minutes to complete.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-8">
                Taking both tests provides a comprehensive evaluation of your English level, helping you choose the most suitable course to improve your skills efficiently. Registration is required, and a fee applies for each test. Book your placement tests today and take the first step toward advancing your English!
              </p>

              {/* Book Your Test Button */}
              <Link href="/contact">
                <Button
                  size="" 
                  className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  Book Your Test
                </Button>
              </Link>
            </div>
          </div>
  
          {/* Right Image - Increased height */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[32rem] sm:h-[36rem] md:h-[40rem] lg:h-[44rem] xl:h-[48rem]">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
                alt="Language placement test - professional assessment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


//other function(components) here...