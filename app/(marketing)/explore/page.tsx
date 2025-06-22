"use client";

import { useState, useEffect } from "react";
import { PromptCard } from "@/components/prompt-card";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { fetchAllPrompts, type PromptWithAuthor } from "@/lib/actions";
import Link from "next/link";

export default function ExplorePage() {
  const [prompts, setPrompts] = useState<PromptWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const data = await fetchAllPrompts();
        // Sort by stars (highest to lowest) and limit to 15 prompts
        const sortedPrompts = data
          .sort((a, b) => (b.stars || 0) - (a.stars || 0))
          .slice(0, 15);
        setPrompts(sortedPrompts);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPrompts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-muted-foreground">
          Loading prompts...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Spotlight />
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Explore AI Prompts
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover thousands of AI prompts created by our community. Find
              the perfect prompt for your next project.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Results */}
        <div className="mt-6">
          <>
            <div
              className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}
            >
              {prompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={{
                    ...prompt,
                    author: {
                      username: prompt.author.username || "Anonymous",
                      avatar: prompt.author.image || undefined,
                    },
                    tags: prompt.tags || [],
                    models: prompt.models || [prompt.model],
                  }}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Link className="" href="/community">
                <Button variant="outline" size="lg" className="hover:bg-accent">
                  Load More Prompts
                </Button>
              </Link>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
