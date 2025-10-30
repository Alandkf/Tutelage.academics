import AboutUsContent from '@/components/aboutus/AboutUsContent';
import AboutUsHero from '@/components/aboutus/AboutUsHero';
import AchievementsSection from '@/components/aboutus/AchievementsSection';
import { Foundation } from '@/components/aboutus/Foundation';

const AboutUs = () => {
  return (
    <div>
      <AboutUsHero />
      <AboutUsContent />
      <Foundation />
      <AchievementsSection />
    </div>
  )
}

export default AboutUs