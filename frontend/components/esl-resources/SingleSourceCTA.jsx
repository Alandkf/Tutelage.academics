'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { BASE_URL_PROD } from '@/app/config/url'

const AICallToAction = () => {
  return (
    <section className="py-16 bg-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-foreground" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Take Your Learning Further with Tutelage AI
            </h2>
          </div>
          
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-8">
            Ready to practice with instant feedback? Tutelage AI is your personal English learning assistant, available 24/7 to help you improve your speaking, writing, and comprehension skills. Get personalized guidance, track your progress, and learn at your own pace with our advanced AI technology designed specifically for English learners.
          </p>
          
          <Link href={BASE_URL_PROD} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              Try Tutelage AI Now
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AICallToAction
