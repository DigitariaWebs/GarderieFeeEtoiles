import FaqSection from "@/components/sections/FaqSection";
import HeroSection from "@/components/sections/HeroSection";
import RecentActivitySection from "@/components/sections/RecentActivitySection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <RecentActivitySection />
      <AdvantagesSection />
      <FaqSection />
    </div>
  );
}
