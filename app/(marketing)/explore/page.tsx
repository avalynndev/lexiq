"use client";

import { useState, useEffect } from "react";
import { PromptCard } from "@/components/prompt-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Star,
  Grid3X3,
  List,
  Sparkles,
  Zap,
  Users,
  BookOpen,
  X,
} from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { fetchAllPrompts, type PromptWithAuthor } from "@/lib/actions";

const models = ["All Models", "GPT-4", "Claude", "Gemini", "Llama"];
const categories = [
  "All Categories",
  "Writing",
  "Development",
  "Analytics",
  "Marketing",
  "Education",
  "E-commerce",
  "Legal",
  "Research",
];
const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const useCases = [
  "All Use Cases",
  "Content Creation",
  "Development",
  "Business Intelligence",
  "Marketing",
  "Education",
  "E-commerce",
  "Legal",
  "Social Media",
  "Academic",
];

const sortOptions = [
  { label: "Most Popular", value: "popular", icon: Star },
  { label: "Trending", value: "trending", icon: TrendingUp },
  { label: "Recently Updated", value: "recent", icon: Clock },
  { label: "Most Forked", value: "forks", icon: Users },
];

export default function ExplorePage() {
  const [selectedModel, setSelectedModel] = useState("All Models");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [selectedUseCase, setSelectedUseCase] = useState("All Use Cases");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
      selectedModel === "All Models" ||
      prompt.model === selectedModel ||
      (prompt.models && prompt.models.includes(selectedModel));
    const categoryMatch =
      selectedCategory === "All Categories" ||
      prompt.category === selectedCategory;
    const difficultyMatch =
      selectedDifficulty === "All Levels" ||
      ("difficulty" in prompt && prompt.difficulty === selectedDifficulty);
    const useCaseMatch =
      selectedUseCase === "All Use Cases" ||
      ("useCase" in prompt && prompt.useCase === selectedUseCase);
    const searchMatch =
      searchQuery === "" ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prompt.tags &&
        prompt.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    // Tab filtering
    if (activeTab === "trending") {
      return (
        modelMatch &&
        categoryMatch &&
        difficultyMatch &&
        useCaseMatch &&
        searchMatch &&
        "isTrending" in prompt &&
        prompt.isTrending
      );
    }
    if (activeTab === "recent") {
      return (
        modelMatch &&
        categoryMatch &&
        difficultyMatch &&
        useCaseMatch &&
        searchMatch &&
        "isRecent" in prompt &&
        prompt.isRecent
      );
    }

    return (
      modelMatch &&
      categoryMatch &&
      difficultyMatch &&
      useCaseMatch &&
      searchMatch
    );
  });

  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    switch (selectedSort) {
      case "popular":
        return b.stars - a.stars;
      case "trending":
        return (
          ("isTrending" in b && b.isTrending ? 1 : 0) -
          ("isTrending" in a && a.isTrending ? 1 : 0)
        );
      case "recent":
        return (
          new Date(b.lastUpdated as any).getTime() -
          new Date(a.lastUpdated as any).getTime()
        );
      case "forks":
        return b.forks - a.forks;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedModel("All Models");
    setSelectedCategory("All Categories");
    setSelectedDifficulty("All Levels");
    setSelectedUseCase("All Use Cases");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedModel !== "All Models" ||
    selectedCategory !== "All Categories" ||
    selectedDifficulty !== "All Levels" ||
    selectedUseCase !== "All Use Cases" ||
    searchQuery !== "";

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

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search prompts, tags, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-card/50 backdrop-blur-sm border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Main Controls */}
        <div className="mb-8">
          {/* Tabs and Filter Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:grid-cols-3">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  All Prompts
                </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-3">
              {/* Active Filters Indicator */}
              {hasActiveFilters && (
                <Badge variant="secondary" className="hidden sm:flex">
                  {
                    Object.values({
                      model: selectedModel !== "All Models",
                      category: selectedCategory !== "All Categories",
                      difficulty: selectedDifficulty !== "All Levels",
                      useCase: selectedUseCase !== "All Use Cases",
                      search: searchQuery !== "",
                    }).filter(Boolean).length
                  }{" "}
                  filters active
                </Badge>
              )}

              {/* Filter Sheet */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <Button
                        variant="secondary"
                        size="icon"
                        className="ml-1 h-4 w-4 rounded-md p-0 text-xs"
                      >
                        {
                          Object.values({
                            model: selectedModel !== "All Models",
                            category: selectedCategory !== "All Categories",
                            difficulty: selectedDifficulty !== "All Levels",
                            useCase: selectedUseCase !== "All Use Cases",
                            search: searchQuery !== "",
                          }).filter(Boolean).length
                        }
                      </Button>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Filter Prompts</SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    {/* AI Model Filter */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">
                        AI Model
                      </label>
                      <Select
                        value={selectedModel}
                        onValueChange={setSelectedModel}
                      >
                        <SelectTrigger className="w-full min-w-[220px]">
                          <SelectValue placeholder="Select AI Model" />
                        </SelectTrigger>
                        <SelectContent>
                          {models.map((model) => (
                            <SelectItem key={model} value={model}>
                              {model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">
                        Category
                      </label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-full min-w-[220px]">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">
                        Difficulty Level
                      </label>
                      <Select
                        value={selectedDifficulty}
                        onValueChange={setSelectedDifficulty}
                      >
                        <SelectTrigger className="w-full min-w-[220px]">
                          <SelectValue placeholder="Select Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          {difficulties.map((difficulty) => (
                            <SelectItem key={difficulty} value={difficulty}>
                              {difficulty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Use Case Filter */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">
                        Use Case
                      </label>
                      <Select
                        value={selectedUseCase}
                        onValueChange={setSelectedUseCase}
                      >
                        <SelectTrigger className="w-full min-w-[220px]">
                          <SelectValue placeholder="Select Use Case" />
                        </SelectTrigger>
                        <SelectContent>
                          {useCases.map((useCase) => (
                            <SelectItem key={useCase} value={useCase}>
                              {useCase}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">
                        Sort By
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {sortOptions.map((option) => {
                          const IconComponent = option.icon;
                          return (
                            <div
                              className={buttonVariants({
                                variant:
                                  selectedSort === option.value
                                    ? "default"
                                    : "outline",
                                className:
                                  "flex items-center gap-2 justify-start w-full cursor-pointer",
                              })}
                              onClick={() => setSelectedSort(option.value)}
                              tabIndex={0}
                              role="button"
                              key={option.value}
                            >
                              <IconComponent className="h-4 w-4" />
                              {option.label}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="w-full"
                      >
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {sortedPrompts.length} prompts found
            </span>

            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="mt-6">
            {sortedPrompts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No prompts found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {sortedPrompts.map((prompt) => (
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
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover:bg-accent"
                  >
                    Load More Prompts
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
