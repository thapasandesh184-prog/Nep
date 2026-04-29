import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import ShowcaseSection from "@/components/sections/showcase-section";
import ProcessSection from "@/components/sections/process-section";
import PricingSection from "@/components/sections/pricing-section";
import SocialProofSection from "@/components/sections/social-proof-section";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ShowcaseSection />
      <ProcessSection />
      <PricingSection />
      <SocialProofSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
