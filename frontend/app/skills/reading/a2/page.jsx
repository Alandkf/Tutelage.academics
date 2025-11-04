

import CallToAction from "@/components/CallToAction"
import ReadingArticleGridA1 from "@/components/skills/reading/a1/ReadingArticleGridA1"
import ReadingArticleGridA2 from "@/components/skills/reading/a2/ReadingArticleGridA2"
import Image from "next/image"


const A2 = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4">
         {/* Header Section */}
              <div className="bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                        A2 Reading
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
        
              {/* Hero Image Section */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"}
                    alt={"A2 Reading"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
        
              {/* Description Section */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="max-w-5xl">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Reading practices for learners to understand short texts and messages about personal information, shopping, work, and family. Activities include finding the main idea, completing short passages, and answering simple comprehension questions."
                  </p>
                </div>
              </div>
              
              <ReadingArticleGridA2 />
              <CallToAction />
    </div>
  )
}

export default A2