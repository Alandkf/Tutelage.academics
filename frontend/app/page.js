import GlobalTestMastery from '@/components/landing/GlobalTestMastery '
import HeroSection from '@/components/landing/Hero'
import ImproveYourEnglishSkills from '@/components/landing/ImproveYourEnglishSkills'
import OnlineCourses from '@/components/landing/OnlineCourses'
import Practice from '@/components/landing/Practice'
import Resources from '@/components/landing/Resources '
import Tests from '@/components/landing/Tests'
import TutelageAi from '@/components/landing/TutelageAi'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

async function getLatestLandingSection() {
  try {
    const res = await fetch(`${BASE_URL}/api/landing-sections/1`, { cache: 'no-store' })
    const data = await res.json()
    if (data?.success && data?.landingSection) {
      return data.landingSection
    }
    return null
  } catch {
    return null
  }
}

export default async function Home() {
  const landing = await getLatestLandingSection()
  return (
    <>
      {/* HERO SECTION */}
      <HeroSection
        title={landing?.title}
        subtitle={landing?.subtitle}
        imageUrl={landing?.imageUrl}
      />
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