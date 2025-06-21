"use client";

import { PromptCard } from './prompt-card';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowRight } from 'lucide-react';

const trendingPrompts = [
  {
    id: "trending-1",
    title: "AI Image Generation Mastery",
    description:
      "Advanced prompts for creating stunning visuals with DALL-E, Midjourney, and Stable Diffusion.",
    author: {
      username: "Emily Zhang",
      avatar:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=100",
    },
    model: "GPT-4",
    category: "Design",
    stars: 2341,
    forks: 234,
    views: 8765,
    lastUpdated: "3 hours ago",
    isTrending: true,
    tags: ["gpt-4", "design", "image-generation", "dall-e"],
    solves: "Create professional-quality AI-generated images and artwork",
    models: ["GPT-4", "Claude"],
  },
  {
    id: "trending-2",
    title: "Customer Support Automation",
    description:
      "Transform your customer service with AI-powered response templates and escalation protocols.",
    author: {
      username: "Ryan Miller",
      avatar:
        "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?w=100",
    },
    model: "Claude",
    category: "Business",
    stars: 1876,
    forks: 167,
    views: 5432,
    lastUpdated: "1 day ago",
    isTrending: true,
    tags: ["claude", "business", "customer-support", "automation"],
    solves: "Automate customer service with intelligent response systems",
    models: ["Claude", "GPT-4", "Gemini"],
  },
  {
    id: "trending-3",
    title: "Legal Document Analyzer",
    description:
      "Comprehensive prompt for reviewing contracts, identifying key clauses, and suggesting modifications.",
    author: {
      username: "Jennifer Adams",
      avatar:
        "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?w=100",
    },
    model: "Gemini",
    category: "Legal",
    stars: 1234,
    forks: 89,
    views: 3876,
    lastUpdated: "6 hours ago",
    isTrending: true,
    tags: ["gemini", "legal", "document-analysis", "contracts"],
    solves:
      "Analyze legal documents and identify important clauses automatically",
    models: ["Gemini", "Claude"],
  },
];

export function TrendingSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 to-red-500">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Trending This Week
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              The hottest prompts gaining traction in our community
            </p>
          </div>
          
          <Button variant="outline" className="hidden md:flex items-center gap-2 hover:bg-accent">
            View All Trending
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Trending Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {trendingPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center md:hidden">
          <Button variant="outline" className="flex items-center gap-2 mx-auto">
            View All Trending
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}