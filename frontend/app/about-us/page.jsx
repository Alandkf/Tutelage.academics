import AboutUsContent from '@/components/aboutus/AboutUsContent';
import AboutUsHero from '@/components/aboutus/AboutUsHero';
import AchievementsSection from '@/components/aboutus/AchievementsSection';
import { Foundation } from '@/components/aboutus/Foundation';
import PartnershipsSection from '@/components/aboutus/PartnershipsSection';
import TutelageAiAbout from '@/components/aboutus/TutelageAiAbout';

const AboutUs = () => {
  return (
    <div>
      <AboutUsHero />
      <AboutUsContent />
      <Foundation />
      <TutelageAiAbout />
      <AchievementsSection />
      <PartnershipsSection /> 
    </div>
  )
}

export default AboutUs