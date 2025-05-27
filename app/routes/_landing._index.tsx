import { HeroSection } from "~/components/landing/hero-section";
import { FeaturesSection } from "~/components/landing/features-section";
import { AboutSection } from "~/components/landing/about-section";
import { ContactSection } from "~/components/landing/contact-section";
import { HelpSection } from "~/components/landing/help-section";
import { CtaSection } from "~/components/landing/cta-section";

export default function Index() {
  return (
    <div className="space-y-20">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
      <HelpSection />
      <CtaSection />
    </div>
  );
}
