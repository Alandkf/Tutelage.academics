

import CallToAction from "@/components/CallToAction"
import ReadingArticleGridC1 from "@/components/skills/reading/c1/ReadingArticleGridC1"
import Image from "next/image"


const C1 = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4">
         {/* Header Section */}
              <div className="bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                        C1 Reading
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
        
              {/* Hero Image Section */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"}
                    alt={"C1 Reading"}
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
                    Reading practices for learners to understand complex and implicit ideas in longer texts. Activities include recognizing subtle opinions, implied meanings, tone, humor, and culture-based references in essays, reports, debates, or literary texts."
                  </p>
                </div>
              </div>
              
              <ReadingArticleGridC1 />
              <CallToAction />
    </div>
  )
}

export default C1