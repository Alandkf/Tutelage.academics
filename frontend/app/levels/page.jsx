'use client'

import LevelsHero from '@/components/levels/LevelsHero'
import LevelsDescription from '@/components/levels/LevelsDescription'
import LevelsCards from '@/components/levels/LevelsCards'

const LevelsMainPage = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4">
      <LevelsHero />
      <LevelsDescription />
      <LevelsCards />
    </div>
  )
}

export default LevelsMainPage
