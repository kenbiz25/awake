import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ROICalculator from "@/components/ROICalculator";
import CaseBento from "@/components/CaseBento";
import LiveDemos from "@/components/LiveDemos";
import EcosystemMap from "@/components/EcosystemMap";
import GrowthCarousel from "@/components/GrowthCarousel";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Awake Technologies | Websites, M-Pesa & GovTech in Kenya",
  description: site.description,
  path: "/",
});

// Cascade order follows spironet.com: proof → calculator → proof → product → network → growth → price → voices → capture
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ROICalculator />
      <CaseBento />
      <LiveDemos />
      <EcosystemMap />
      <GrowthCarousel />
      <Pricing />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
