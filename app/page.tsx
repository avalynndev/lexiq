"use client";

import Navbar from '@/components/navbar';
import { Hero } from '@/components/hero';
import { TrendingSection } from '@/components/trending-section';
import { PromptGrid } from '@/components/prompt-grid';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Navbar />
      <main className="">
        <Hero />
        <TrendingSection />
        <PromptGrid />
      </main>
      <Footer />
    </div>
  );
}