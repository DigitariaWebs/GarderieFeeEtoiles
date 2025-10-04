import FaqSection from "@/components/sections/FaqSection";
import HeroSection from "@/components/sections/HeroSection";
import RecentActivitySection from "@/components/sections/RecentActivitySection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import TarifsSections from "@/components/sections/TarifsSections";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <RecentActivitySection />
      <AdvantagesSection />
      <TarifsSections />
      <FaqSection />
    </div>
  );
}
