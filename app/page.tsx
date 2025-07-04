import HeroSection from "@/components/hero-section";
import Features from "@/components/features-1";
import HowItWorks from "@/components/content-1";
import CallToAction from "@/components/call-to-action";
import FooterSection from "@/components/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <HowItWorks />
      <CallToAction />
      <FooterSection />
    </>
  );
}
