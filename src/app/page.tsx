import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhySection from "@/components/sections/WhySection";
import HowItWorksCarousel from "@/components/sections/HowItWorksCarousel";
import Results from "@/components/sections/Results";
import TransformSection from "@/components/sections/TransformSection";
import ModulesSection from "@/components/sections/ModulesSection";
import OrbitalModules from "@/components/sections/OrbitalModules";
import MetricsSection from "@/components/sections/MetricsSection";
import ScenariosSection from "@/components/sections/ScenariosSection";
import TrailerSection from "@/components/sections/TrailerSection";
import HighlightCards from "@/components/sections/HighlightCards";
import Pricing from "@/components/sections/Pricing";
import FinalCta from "@/components/sections/FinalCta";
import FaqSection from "@/components/sections/FaqSection";

const GeminiSection = dynamic(
  () => import("@/components/sections/GeminiSection"),
  { ssr: false, loading: () => <div className="h-[300vh] bg-vi-bg" /> }
);
const GlobalSection = dynamic(
  () => import("@/components/sections/GlobalSection"),
  { ssr: false, loading: () => <div className="section-pad bg-vi-bg" /> }
);

export default function Home() {
  return (
    <main className="bg-vi-bg min-h-screen">
      <Navbar />
      <Hero />
      <GeminiSection />
      <WhySection />
      <HowItWorksCarousel />
      <Results />
      <TransformSection />
      <ModulesSection />
      <OrbitalModules />
      <MetricsSection />
      <GlobalSection />
      <ScenariosSection />
      <TrailerSection />
      <HighlightCards />
      <Pricing />
      <FinalCta />
      <FaqSection />
      <Footer />
    </main>
  );
}
