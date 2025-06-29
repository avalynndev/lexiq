"use client";

import { Hero } from "@/components/hero";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTA } from "@/components/cta";
import { AnimatedHeroImages } from "@/components/animated-hero-images";
import { GlowingBackground } from "@/components/glowing-background";
import { FloatingElements } from "@/components/floating-elements";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Glowing gradient background */}
      <GlowingBackground />

      {/* Floating animated elements */}
      <FloatingElements />

      {/* Main content with enhanced animations */}
      <div className="relative z-10">
        <div className="animate-fade-in-up">
          <Hero />
        </div>

        <div className="animate-fade-in-up delay-300">
          <AnimatedHeroImages />
        </div>

        <div className="animate-fade-in-up delay-500">
          <FeaturesSection />
        </div>

        <div className="animate-fade-in-up delay-700">
          <TestimonialsSection />
        </div>

        <div className="animate-fade-in-up delay-900">
          <CTA />
        </div>
      </div>
    </div>
  );
}
