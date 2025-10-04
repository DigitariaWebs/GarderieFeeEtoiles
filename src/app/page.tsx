import HeroSection from "@/components/sections/HeroSection";
import RecentActivitySection from "@/components/sections/RecentActivitySection";
import ServiceSection from "@/components/sections/ServiceSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <RecentActivitySection />
      <ServiceSection />
    </div>
  );
}
