'use client'

import StoryLibraryHero from '@/components/esl-resources/storys/StoryLibraryHero'
import StoryLibraryDescription from '@/components/esl-resources/storys/StoryLibraryDescription'
import StoryGrid from '@/components/esl-resources/storys/StoryGrid'

const StoryLibraryPage = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4">
      <StoryLibraryHero />
      <StoryLibraryDescription />
      <StoryGrid />
    </div>
  )
}

export default StoryLibraryPage