'use client'

import { AboutUsSection } from '@/components/landing/About'
import HeroSection from '@/components/landing/Hero'
import Image from 'next/image'

const Home = () => {
  return (
   <>

  {/* HERO SECTION */}
  <HeroSection />

    {/* ABOUT SECTION */}
    <div className='mt-4 sm:mt-0'>
      <AboutUsSection />
    </div>
   </>
  )
}

export default Home