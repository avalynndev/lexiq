"use client";

import { Hero } from "@/components/hero";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
      <CTA />
    </div>
  );
}
