"use client";

import { useState, useEffect } from "react";
import { PromptCard } from "./prompt-card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight } from "lucide-react";
import { fetchTrendingPrompts, type PromptWithAuthor } from "@/lib/actions";

export function TrendingSection() {
  const [trendingPrompts, setTrendingPrompts] = useState<PromptWithAuthor[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingPrompts = async () => {
      try {
        const data = await fetchTrendingPrompts();
        setTrendingPrompts(data);
      } catch (error) {
        console.error("Error fetching trending prompts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingPrompts();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              Loading trending prompts...
            </p>
          </div>
        </div>
      </section>
    );
  }

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

          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2 hover:bg-accent"
          >
            View All Trending
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Trending Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {trendingPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={{
                ...prompt,
                author: {
                  username:
                    prompt.author.displayUsername ||
                    prompt.author.username ||
                    "Anonymous",
                  avatar: prompt.author.image || undefined,
                },
                tags: prompt.tags || [],
                models: prompt.models || [prompt.model],
              }}
            />
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
