'use client'

import GlobalTestMastery from '@/components/landing/GlobalTestMastery '
import HeroSection from '@/components/landing/Hero'
import ImproveYourEnglishSkills from '@/components/landing/ImproveYourEnglishSkills'
import OnlineCourses from '@/components/landing/OnlineCourses'
import Practice from '@/components/landing/Practice'
import Resources from '@/components/landing/Resources '
import Tests from '@/components/landing/Tests'
import TutelageAi from '@/components/landing/TutelageAi'

const Home = () => {
  return (
   <>

  {/* HERO SECTION */}
  <HeroSection />
  <TutelageAi />
  <Resources />
  <OnlineCourses />
  <Tests />
  <GlobalTestMastery />
  <Practice />
  <ImproveYourEnglishSkills />
   </>
  )
}

export default Home