"use client";

import { Hero } from "@/components/hero";
import { TrendingSection } from "@/components/trending-section";
import { PromptGrid } from "@/components/prompt-grid";

export default function Home() {
  return (
    <div>
      <Hero />
      <TrendingSection />
      <PromptGrid />
    </div>
  );
}
