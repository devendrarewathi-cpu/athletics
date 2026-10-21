import { AthleteCategories } from '@/components/sections/AthleteCategories';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { ClientSuccessSection } from '@/components/sections/ClientSuccessSection';
import { DifferentiatorsSection } from '@/components/sections/DifferentiatorsSection';
import { FacilityContactSection } from '@/components/sections/FacilityContactSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FeaturePillars } from '@/components/sections/FeaturePillars';
import { GameChangerMethod } from '@/components/sections/GameChangerMethod';
import { HeroSection } from '@/components/sections/HeroSection';
import { PerformanceBanner } from '@/components/sections/PerformanceBanner';
import { ProgramsSection } from '@/components/sections/ProgramsSection';
import { SocialBanner } from '@/components/sections/SocialBanner';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <GameChangerMethod />
      <FeaturePillars />
      <AthleteCategories />
      <DifferentiatorsSection />
      <ClientSuccessSection />
      <ProgramsSection />
      <PerformanceBanner />
      <TestimonialsSection />
      <FAQSection />
      <FacilityContactSection />
      <SocialBanner />
    </>
  );
}
