import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const OnlineCourses = () => {
  return (
    <>
      {/* Online Courses Section */}
      <div className="py-16 md:py-20 px-4">
        {/* Section Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Online Courses
            </h2>
          </div>
        </div>

        <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg lg:rounded-tr-[4rem] lg:rounded-bl-[4rem] max-lg:rounded-tl-[2rem] max-lg:rounded-br-[2rem]">
          <div className="flex flex-col-reverse lg:flex-row items-stretch gap-0">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:ml-10">
              <div className="w-full py-10 lg:py-0 lg:pr-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                  Learn quicker with our unique online courses.
                </h2>
                
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                  No matter where you are or how you want to study. At Tutelage, your course is designed the way it suits you!
                </p>

                {/* Bullet Points */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">Personalized learning tailored to your goals</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">Flexible options: group classes or one-on-one sessions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">Learn anywhere, anytime – always within reach</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">Simple, modern approach that's enjoyable and effective</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">Practice exercises after each lesson to boost your skills</span>
                  </li>
                </ul>

                {/* Enroll Now Button */}
                <Link href="/courses/enroll">
                  <Button 
                    size="lg" 
                    className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </div>
    
            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                <Image
                  src="https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/PublishingImages/working-adult-taking-online-course.jpg&w=1200&h=630"
                  alt="Online English courses"
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

export default OnlineCourses