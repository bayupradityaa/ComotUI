import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import ComponentsSection from "../components/ComponentsSection";
import CTASection from "../components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />

      <FeaturedSection />
      <ComponentsSection />
      <CTASection />
    </>
  );
}