import Image from "next/image"
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const TutelageAi = () => {
  return (
    <>
      {/* Learn a New Language the Fun Way Section */}
      <div className="py-16 md:py-20 px-4">
        {/* Section Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Introducing Tutelage AI
            </h2>
          </div>
        </div>

        <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg lg:rounded-tr-[4rem] lg:rounded-bl-[4rem] max-lg:rounded-tl-[2rem] max-lg:rounded-br-[2rem]">
          <div className="flex flex-col-reverse lg:flex-row items-stretch gap-0">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:ml-10">
              <div className="w-full py-10 lg:py-0 lg:pr-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                    For the first time!!  Tutelage AI is here.
                </h2>
                
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                    Ace your English language skills with our specialized AI tool that is designed to meet your goals. Experience personalized learning powered by advanced artificial intelligence that adapts to your unique learning style and pace.
                </p>

                {/* Bullet Points */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">Immediate detailed feedback</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">24/7 available, practice nonstop!</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">Designed for core language purposes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">Tracks your learning progress</span>
                  </li>
                </ul>

                {/* Practice Now Button */}
                <Link href="https://tutelage.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg" 
                    className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    Practice Now
                  </Button>
                </Link>
              </div>
            </div>
    
            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                <Image
                  src="https://1051thebounce.com/uploads/2025/05/GettyImages-1515913422.jpg?format=auto&optimize=high&width=1920"
                  alt="Fun language learning for kids and teens"
                  fill
                  className="object-cover lg:rounded-tr-[4rem] max-lg:rounded-tl-[2rem]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TutelageAi