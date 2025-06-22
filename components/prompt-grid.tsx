"use client";

import { useState, useEffect } from "react";
import { PromptCard } from "./prompt-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, TrendingUp, Clock, Star } from "lucide-react";
import { fetchAllPrompts, type PromptWithAuthor } from "@/lib/actions";

const models = ["All", "GPT-4", "Claude", "Gemini", "Llama"];
const categories = [
  "All",
  "Writing",
  "Development",
  "Analytics",
  "Marketing",
  "Education",
  "E-commerce",
  "Design",
  "Business",
  "Legal",
];
const sortOptions = [
  { label: "Most Popular", value: "popular", icon: Star },
  { label: "Trending", value: "trending", icon: TrendingUp },
  { label: "Recently Updated", value: "recent", icon: Clock },
];

export function PromptGrid() {
  const [selectedModel, setSelectedModel] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [prompts, setPrompts] = useState<PromptWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const data = await fetchAllPrompts();
        setPrompts(data);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPrompts();
  }, []);

  const filteredPrompts = prompts.filter((prompt) => {
    const modelMatch =
      selectedModel === "All" ||
      prompt.model === selectedModel ||
      (prompt.models && prompt.models.includes(selectedModel));
    const categoryMatch =
      selectedCategory === "All" || prompt.category === selectedCategory;
    const searchMatch =
      searchQuery === "" ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const isPublic = prompt.isPublic !== false;
    return modelMatch && categoryMatch && searchMatch && isPublic;
  });

  // Sort prompts based on selected sort option
  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    switch (selectedSort) {
      case "popular":
        return b.stars - a.stars;
      case "trending":
        return b.stars + b.forks - (a.stars + a.forks);
      case "recent":
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <section className="py-16" id="explore">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Loading prompts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" id="explore">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Popular Prompts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover, fork, and remix the best AI prompts created by our
            community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 backdrop-blur-xs border-border/50"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* Model Filter */}
            <div className="flex flex-wrap gap-2">
              {models.map((model) => (
                <Badge
                  key={model}
                  variant={selectedModel === model ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedModel === model ? "" : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  {model}
                </Badge>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className={`cursor-pointer transition-all ${
                    selectedCategory === category ? "" : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex justify-center gap-2">
            {sortOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={
                    selectedSort === option.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedSort(option.value)}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {sortedPrompts.length} prompts
          </p>
        </div>

        {/* Prompt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedPrompts.map((prompt) => (
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

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="hover:bg-accent">
            Load More Prompts
          </Button>
        </div>
      </div>
    </section>
  );
}
