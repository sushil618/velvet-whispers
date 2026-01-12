import { HeroSection } from '@/components/sections/HeroSection';
import { WorldOpensSection } from '@/components/sections/WorldOpensSection';
import { ChemistrySection } from '@/components/sections/ChemistrySection';
import { ChatSection } from '@/components/sections/ChatSection';
import { ChooseSection } from '@/components/sections/ChooseSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';

const Index = () => {
  return (
    <main className="relative">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      <HeroSection />
      <WorldOpensSection />
      <ChemistrySection />
      <ChatSection />
      <ChooseSection />
      <TrustSection />
      <FinalCTASection />
    </main>
  );
};

export default Index;
