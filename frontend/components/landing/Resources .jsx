import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Resources = () => {
  return (
    <>
      {/* Resources Section */}
      <div className="py-16 md:py-20 px-4">
        {/* Section Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              English Learning Resources
            </h2>
          </div>
        </div>

        <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg lg:rounded-tl-[4rem] lg:rounded-br-[4rem] max-lg:rounded-tr-[2rem] max-lg:rounded-bl-[2rem]">
          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {/* Left Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                <Image
                  src="https://img.freepik.com/free-photo/man-working-laptop-while-standing_23-2148746283.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="English learning resources"
                  fill
                  className="object-cover lg:rounded-tl-[4rem] max-lg:rounded-tr-[2rem]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:mr-10">
              <div className="w-full py-10 lg:py-0 lg:pl-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                  Resources you need to practice your English.
                </h2>

                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                  Use our free selection of english resources designed and organized by our experienced team and creative followers
                </p>

                {/* Bullet Points */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">Story library</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">Blog library</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">Video library</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-foreground font-medium">Audio library</span>
                  </li>
                </ul>

                {/* Explore More Button */}
                <Link href="/esl-resources">
                  <Button
                    size="lg"
                    className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    Explore More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;