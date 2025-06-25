"use client";

import { useState, useEffect, useRef } from "react";
import { PromptCard } from "@/components/prompt-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Star,
  Grid3X3,
  List,
  Users,
  BookOpen,
  X,
  ArrowUp,
} from "lucide-react";
import { fetchAllPrompts, type PromptWithAuthor } from "@/lib/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";
import UserProvidedElement from "@/components/user-provided-element";
import { Slider } from "@/components/ui/slider";

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

export default function ExplorePage() {
  const [selectedModel, setSelectedModel] = useState("All Models");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [selectedUseCase, setSelectedUseCase] = useState("All Use Cases");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [prompts, setPrompts] = useState<PromptWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [promptsPerPage, setPromptsPerPage] = useState(6);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const data = await fetchAllPrompts(session?.user?.id);
        setPrompts(data);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPrompts();
  }, [session]);

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

    let tabMatch = true;
    if (activeTab === "trending") {
      tabMatch = prompt.stars > 0;
    } else if (activeTab === "recent") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      tabMatch = new Date(prompt.lastUpdated) >= sevenDaysAgo;
    } else if (activeTab === "remixes") {
      tabMatch = prompt.remixes > 0;
    }

    const isPublic = prompt.isPublic !== false;
    const isOwner =
      session?.user?.username &&
      prompt.author?.username === session.user.username;
    return (
      modelMatch &&
      categoryMatch &&
      difficultyMatch &&
      useCaseMatch &&
      searchMatch &&
      tabMatch &&
      (isPublic || isOwner)
    );
  });

  const sortedPrompts = [...filteredPrompts].sort((a, b) => b.stars - a.stars);

  const totalPages = Math.ceil(sortedPrompts.length / promptsPerPage);
  const paginatedPrompts = sortedPrompts.slice(
    (currentPage - 1) * promptsPerPage,
    currentPage * promptsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setSelectedModel("All Models");
    setSelectedCategory("All Categories");
    setSelectedDifficulty("All Levels");
    setSelectedUseCase("All Use Cases");
    setSearchQuery("");
    setCurrentPage(1);
    setPromptsPerPage(6);
  };

  const hasActiveFilters =
    selectedModel !== "All Models" ||
    selectedCategory !== "All Categories" ||
    selectedDifficulty !== "All Levels" ||
    selectedUseCase !== "All Use Cases" ||
    searchQuery !== "" ||
    promptsPerPage !== 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedModel,
    selectedCategory,
    selectedDifficulty,
    selectedUseCase,
    searchQuery,
    activeTab,
    viewMode,
    promptsPerPage,
  ]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget;
    setShowScrollTop(scrollTop > 300);
  };

  const scrollToTop = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="flex h-(--header-height) bg-sidebar shrink-0 rounded-t-xl border-t border-x items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full pt-5 p-5">
          <div className="flex flex-col flex-1 border-alpha-200 border-t sm:border-t-0">
            <div className="flex items-center gap-3 pl-4 pr-3 sm:pl-3 sm:pr-2 h-12 border-b border-alpha-200 sm:mx-0 shrink-0">
              <SidebarTrigger className="-ml-1" />
              <h1 className="hidden truncate text-base font-medium sm:inline sm:tracking-tight">
                Community
              </h1>
              <div className="flex items-center ml-4">
                {/* Show tab buttons on sm+ screens, select menu on mobile */}
                <div className="hidden sm:flex items-center gap-2">
                  <Button
                    variant={activeTab === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("all")}
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    All Prompts
                  </Button>
                  <Button
                    variant={activeTab === "trending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("trending")}
                    className="flex items-center gap-2"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Trending
                  </Button>
                  <Button
                    variant={activeTab === "recent" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("recent")}
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Recent
                  </Button>
                  <Button
                    variant={activeTab === "remixes" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("remixes")}
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Most Remixed
                  </Button>
                </div>
                <div className="flex sm:hidden w-44">
                  <Select value={activeTab} onValueChange={setActiveTab}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <span className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          All Prompts
                        </span>
                      </SelectItem>
                      <SelectItem value="trending">
                        <span className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Trending
                        </span>
                      </SelectItem>
                      <SelectItem value="recent">
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Recent
                        </span>
                      </SelectItem>
                      <SelectItem value="remixes">
                        <span className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Most Remixed
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ScrollArea
        ref={scrollAreaRef}
        className="h-[calc(100vh-6.5rem)] px-4 py-2 rounded-b-xl border-b border-x"
        onScroll={handleScroll}
      >
        {loading ? (
          <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
            <Spinner size="large" />
          </div>
        ) : (
          <div className="min-h-screen">
            <section className="pt-24 pb-12">
              <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                  <UserProvidedElement />
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Explore AI Prompts
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Discover thousands of AI prompts created by our community.
                    Find the perfect prompt for your next project.
                  </p>

                  {/* Search Bar */}
                  <div className="relative max-w-2xl mx-auto mb-8">
                    <Search className="absolute left-4 top-1/2 z-10 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
                            promptsPerPage: promptsPerPage !== 6,
                          }).filter(Boolean).length
                        }{" "}
                        filters active
                      </Badge>
                    )}

                    {/* Filter Sheet */}
                    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                        >
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
                                  category:
                                    selectedCategory !== "All Categories",
                                  difficulty:
                                    selectedDifficulty !== "All Levels",
                                  useCase: selectedUseCase !== "All Use Cases",
                                  search: searchQuery !== "",
                                  promptsPerPage: promptsPerPage !== 6,
                                }).filter(Boolean).length
                              }
                            </Button>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-screen max-w-full sm:w-[540px]">
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
                                  <SelectItem
                                    key={difficulty}
                                    value={difficulty}
                                  >
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

                          {/* Prompts per page */}
                          <div>
                            <label className="text-sm font-medium mb-3 block">
                              Prompts per page: {promptsPerPage}
                            </label>
                            <Slider
                              value={[promptsPerPage]}
                              onValueChange={(value) =>
                                setPromptsPerPage(value[0])
                              }
                              min={3}
                              max={9}
                              step={1}
                            />
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

                <div className="mt-6">
                  {paginatedPrompts.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold mb-2">
                        No prompts found
                      </h3>
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
                        {paginatedPrompts.map((prompt) => {
                          return (
                            <PromptCard
                              key={prompt.id}
                              prompt={{
                                ...prompt,
                                author: {
                                  username:
                                    prompt.author.username || "Anonymous",
                                  avatar: prompt.author.image || undefined,
                                },
                                tags: prompt.tags || [],
                                models: prompt.models || [prompt.model],
                              }}
                            />
                          );
                        })}
                      </div>

                      <Pagination className="mt-12">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) {
                                  handlePageChange(currentPage - 1);
                                }
                              }}
                              className={
                                currentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : ""
                              }
                            />
                          </PaginationItem>
                          {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                              <PaginationLink
                                isActive={currentPage === i + 1}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(i + 1);
                                }}
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          <PaginationItem>
                            <PaginationNext
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) {
                                  handlePageChange(currentPage + 1);
                                }
                              }}
                              className={
                                currentPage === totalPages
                                  ? "pointer-events-none opacity-50"
                                  : ""
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {showScrollTop && (
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-8 right-8 z-50 rounded-full"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-4 w-4" />
            <span className="sr-only">Scroll to top</span>
          </Button>
        )}
      </ScrollArea>
    </>
  );
}
