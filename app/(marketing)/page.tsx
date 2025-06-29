"use client";

import { Hero } from "@/components/hero";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTA } from "@/components/cta";
import { AnimatedHeroImages } from "@/components/animated-hero-images";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 animated-gradient opacity-5 -z-10" />
      
      <Hero />
      <AnimatedHeroImages />
      <FeaturesSection />
      <TestimonialsSection />
      <CTA />
    </div>
  );
}