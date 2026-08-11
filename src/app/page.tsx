import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import LifeCoaching from "@/components/home/LifeCoaching";
import CTASection from "@/components/home/CTASection";
import SiteLayout from "@/components/layout/SiteLayout";
import HomeServices from "@/components/home/HomeServices";

export default function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Mission />
      <LifeCoaching />
      <HomeServices />
      <CTASection />
    </SiteLayout>
  );
}
