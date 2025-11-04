
import CallToAction from "@/components/CallToAction"
import WritingArticleGridB2 from "@/components/skills/writing/b2/WritingArticleGridB2"
import Image from "next/image"


const B2 = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4">
         {/* Header Section */}
              <div className="bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                        B2 Writing
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
        
              {/* Hero Image Section */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={"https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80"}
                    alt={"B2 Writing"}
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
                     Writing practices for learners to produce extended texts with logical structure and clear arguments. Activities include essays, reports, reviews, and formal letters, focusing on linking ideas, supporting arguments, and expressing opinions fluently."
                  </p>
                </div>
              </div>

              <WritingArticleGridB2 />
              <CallToAction />
    </div>
  )
}

export default B2