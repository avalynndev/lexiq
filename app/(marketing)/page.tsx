"use client";

import { Hero } from "@/components/hero";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTA } from "@/components/cta";
import { AnimatedHeroImages } from "@/components/animated-hero-images";
import Glow from "@/components/ui/hero-glow";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      <Hero />{" "}
      <Glow
        variant="top"
        className="animate-appear-zoom opacity-0 delay-1000"
      />
      <AnimatedHeroImages />
      <FeaturesSection />
      <TestimonialsSection />
      <CTA />
    </div>
  );
}
