'use client'

import StoryLibraryHero from '@/components/esl-resources/stories/StoryLibraryHero'
import StoryLibraryDescription from '@/components/esl-resources/stories/StoryLibraryDescription'
import StoryGrid from '@/components/esl-resources/stories/StoryGrid'
import CallToAction from '@/components/CallToAction'

const StoryLibraryPage = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4">
      <StoryLibraryHero />
      <StoryLibraryDescription />
      <StoryGrid />
      <CallToAction />
    </div>
  )
}

export default StoryLibraryPage