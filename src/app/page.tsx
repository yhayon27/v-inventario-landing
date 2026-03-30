import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PasSection from "@/components/PasSection";
import ModulesSection from "@/components/ModulesSection";
import WhatsappMockup from "@/components/WhatsappMockup";
import LossChart from "@/components/LossChart";
import FeaturesGrid from "@/components/FeaturesGrid";
import Results from "@/components/Results";
import Pricing from "@/components/Pricing";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <Hero />
      <PasSection />
      <ModulesSection />
      <WhatsappMockup />
      <LossChart />
      <FeaturesGrid />
      <Results />
      <Pricing />
      <FinalCta />
      <Footer />
    </main>
  );
}
