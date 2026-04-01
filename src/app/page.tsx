import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import GlobalSection from "@/components/sections/GlobalSection";
import TrailerSection from "@/components/sections/TrailerSection";
import ScenariosSection from "@/components/sections/ScenariosSection";
import WhySection from "@/components/sections/WhySection";
import ModulesSection from "@/components/sections/ModulesSection";
import OrbitalModules from "@/components/sections/OrbitalModules";
import HowItWorksCarousel from "@/components/sections/HowItWorksCarousel";
import Results from "@/components/sections/Results";
import HighlightCards from "@/components/sections/HighlightCards";
import MetricsSection from "@/components/sections/MetricsSection";
import Pricing from "@/components/sections/Pricing";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <main className="bg-vi-bg min-h-screen">
      <Navbar />
      <Hero />
      <GlobalSection />
      <TrailerSection />
      <ScenariosSection />
      <WhySection />
      <ModulesSection />
      <OrbitalModules />
      <HowItWorksCarousel />
      <Results />
      <HighlightCards />
      <MetricsSection />
      <Pricing />
      <FaqSection />
      <FinalCta />
      <Footer />
    </main>
  );
}
