"use client";

import { useState } from 'react';
import { PromptCard } from '@/components/prompt-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, TrendingUp, Clock, Star, Grid3X3, List, Sparkles, Zap, Users, BookOpen } from 'lucide-react';

// Extended sample data for the explore page
const allPrompts = [
  {
    id: '1',
    title: 'Creative Writing Assistant',
    description: 'A comprehensive prompt for generating creative stories, novels, and screenplay content with character development guidance.',
    author: { name: 'Sarah Chen', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100' },
    model: 'GPT-4',
    category: 'Writing',
    stars: 1247,
    forks: 89,
    views: 3421,
    lastUpdated: '2 days ago',
    isTrending: true,
    tags: ['gpt-4', 'writing', 'creative', 'storytelling'],
    solves: 'Generate compelling creative content with structured character development',
    models: ['GPT-4', 'Claude'],
    difficulty: 'Intermediate',
    useCase: 'Content Creation'
  },
  {
    id: '2',
    title: 'Code Review & Optimization',
    description: 'Detailed prompt for analyzing code quality, suggesting improvements, and identifying potential bugs across multiple languages.',
    author: { name: 'Alex Kumar', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100' },
    model: 'Claude',
    category: 'Development',
    stars: 892,
    forks: 156,
    views: 2103,
    lastUpdated: '1 hour ago',
    isRecent: true,
    tags: ['claude', 'development', 'code-review', 'optimization'],
    solves: 'Automated code analysis and improvement suggestions',
    models: ['Claude', 'GPT-4', 'Gemini'],
    difficulty: 'Advanced',
    useCase: 'Development'
  },
  {
    id: '3',
    title: 'Data Analysis Wizard',
    description: 'Advanced prompt for interpreting datasets, creating visualizations, and generating actionable business insights.',
    author: { name: 'Maria Rodriguez', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100' },
    model: 'Gemini',
    category: 'Analytics',
    stars: 567,
    forks: 43,
    views: 1876,
    lastUpdated: '3 days ago',
    tags: ['gemini', 'analytics', 'data-science', 'visualization'],
    solves: 'Transform raw data into actionable business insights',
    models: ['Gemini', 'GPT-4'],
    difficulty: 'Advanced',
    useCase: 'Business Intelligence'
  },
  {
    id: '4',
    title: 'SEO Content Generator',
    description: 'Optimize your content for search engines with this comprehensive SEO-focused writing prompt.',
    author: { name: 'David Park', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100' },
    model: 'GPT-4',
    category: 'Marketing',
    stars: 743,
    forks: 67,
    views: 2234,
    lastUpdated: '5 days ago',
    isTrending: true,
    tags: ['gpt-4', 'marketing', 'seo', 'content'],
    solves: 'Create search-optimized content that ranks and converts',
    models: ['GPT-4'],
    difficulty: 'Beginner',
    useCase: 'Marketing'
  },
  {
    id: '5',
    title: 'Educational Lesson Planner',
    description: 'Create engaging lesson plans and educational content tailored to different learning styles and age groups.',
    author: { name: 'Lisa Thompson', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100' },
    model: 'Claude',
    category: 'Education',
    stars: 423,
    forks: 28,
    views: 1432,
    lastUpdated: '1 week ago',
    tags: ['claude', 'education', 'lesson-planning', 'teaching'],
    solves: 'Design effective educational content for diverse learners',
    models: ['Claude', 'GPT-4'],
    difficulty: 'Intermediate',
    useCase: 'Education'
  },
  {
    id: '6',
    title: 'Product Description Master',
    description: 'Generate compelling product descriptions that convert visitors into customers with psychological triggers.',
    author: { name: 'James Wilson', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=100' },
    model: 'Llama',
    category: 'E-commerce',
    stars: 856,
    forks: 94,
    views: 2876,
    lastUpdated: '4 days ago',
    tags: ['llama', 'e-commerce', 'copywriting', 'conversion'],
    solves: 'Write product descriptions that drive sales and engagement',
    models: ['Llama', 'GPT-4', 'Claude'],
    difficulty: 'Beginner',
    useCase: 'E-commerce'
  },
  {
    id: '7',
    title: 'Legal Document Analyzer',
    description: 'Comprehensive prompt for reviewing contracts, identifying key clauses, and suggesting modifications.',
    author: { name: 'Jennifer Adams', avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?w=100' },
    model: 'Gemini',
    category: 'Legal',
    stars: 1234,
    forks: 89,
    views: 3876,
    lastUpdated: '6 hours ago',
    isTrending: true,
    tags: ['gemini', 'legal', 'document-analysis', 'contracts'],
    solves: 'Analyze legal documents and identify important clauses automatically',
    models: ['Gemini', 'Claude'],
    difficulty: 'Advanced',
    useCase: 'Legal'
  },
  {
    id: '8',
    title: 'Social Media Content Creator',
    description: 'Generate engaging social media posts, captions, and hashtags for multiple platforms.',
    author: { name: 'Emma Foster', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=100' },
    model: 'GPT-4',
    category: 'Marketing',
    stars: 654,
    forks: 45,
    views: 1987,
    lastUpdated: '2 days ago',
    tags: ['gpt-4', 'social-media', 'content', 'marketing'],
    solves: 'Create viral-worthy social media content across platforms',
    models: ['GPT-4', 'Claude'],
    difficulty: 'Beginner',
    useCase: 'Social Media'
  },
  {
    id: '9',
    title: 'Research Paper Assistant',
    description: 'Comprehensive prompt for academic research, citation formatting, and thesis development.',
    author: { name: 'Dr. Michael Brown', avatar: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?w=100' },
    model: 'Claude',
    category: 'Research',
    stars: 789,
    forks: 67,
    views: 2345,
    lastUpdated: '1 day ago',
    isRecent: true,
    tags: ['claude', 'research', 'academic', 'writing'],
    solves: 'Streamline academic research and paper writing process',
    models: ['Claude', 'GPT-4'],
    difficulty: 'Advanced',
    useCase: 'Academic'
  }
];

const models = ['All Models', 'GPT-4', 'Claude', 'Gemini', 'Llama'];
const categories = ['All Categories', 'Writing', 'Development', 'Analytics', 'Marketing', 'Education', 'E-commerce', 'Legal', 'Research'];
const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const useCases = ['All Use Cases', 'Content Creation', 'Development', 'Business Intelligence', 'Marketing', 'Education', 'E-commerce', 'Legal', 'Social Media', 'Academic'];

const sortOptions = [
  { label: 'Most Popular', value: 'popular', icon: Star },
  { label: 'Trending', value: 'trending', icon: TrendingUp },
  { label: 'Recently Updated', value: 'recent', icon: Clock },
  { label: 'Most Forked', value: 'forks', icon: Users },
];

const featuredCollections = [
  {
    title: 'Trending This Week',
    description: 'The hottest prompts gaining traction',
    icon: TrendingUp,
    count: 12,
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Editor\'s Choice',
    description: 'Hand-picked by our team',
    icon: Sparkles,
    count: 8,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Most Forked',
    description: 'Community favorites',
    icon: Users,
    count: 15,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'New & Notable',
    description: 'Fresh prompts worth exploring',
    icon: Zap,
    count: 6,
    color: 'from-green-500 to-emerald-500'
  }
];

export default function ExplorePage() {
  const [selectedModel, setSelectedModel] = useState('All Models');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [selectedUseCase, setSelectedUseCase] = useState('All Use Cases');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('all');

  const filteredPrompts = allPrompts.filter(prompt => {
    const modelMatch = selectedModel === 'All Models' || 
      prompt.model === selectedModel || 
      (prompt.models && prompt.models.includes(selectedModel));
    const categoryMatch = selectedCategory === 'All Categories' || prompt.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All Levels' || prompt.difficulty === selectedDifficulty;
    const useCaseMatch = selectedUseCase === 'All Use Cases' || prompt.useCase === selectedUseCase;
    const searchMatch = searchQuery === '' || 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Tab filtering
    if (activeTab === 'trending') {
      return modelMatch && categoryMatch && difficultyMatch && useCaseMatch && searchMatch && prompt.isTrending;
    }
    if (activeTab === 'recent') {
      return modelMatch && categoryMatch && difficultyMatch && useCaseMatch && searchMatch && prompt.isRecent;
    }
    
    return modelMatch && categoryMatch && difficultyMatch && useCaseMatch && searchMatch;
  });

  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    switch (selectedSort) {
      case 'popular':
        return b.stars - a.stars;
      case 'trending':
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      case 'recent':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'forks':
        return b.forks - a.forks;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedModel('All Models');
    setSelectedCategory('All Categories');
    setSelectedDifficulty('All Levels');
    setSelectedUseCase('All Use Cases');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Explore AI Prompts
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover thousands of AI prompts created by our community. Find the perfect prompt for your next project.
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

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15,200+</div>
                <div className="text-sm text-muted-foreground">Total Prompts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">AI Models</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">800+</div>
                <div className="text-sm text-muted-foreground">Contributors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">25+</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Featured Collections */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredCollections.map((collection, index) => {
              const IconComponent = collection.icon;
              return (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-all group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${collection.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-6 w-6 text-white rounded-lg" />
                    </div>
                    <h3 className="font-semibold mb-2">{collection.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{collection.description}</p>
                    <div className="text-xs text-muted-foreground">{collection.count} prompts</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Filters and Tabs */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                All Prompts
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent
              </TabsTrigger>
            </TabsList>

            {/* Advanced Filters */}
            <div className="flex flex-wrap gap-4 mb-6 mt-6">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="AI Model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedUseCase} onValueChange={setSelectedUseCase}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Use Case" />
                </SelectTrigger>
                <SelectContent>
                  {useCases.map((useCase) => (
                    <SelectItem key={useCase} value={useCase}>{useCase}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>

            {/* Sort and View Options */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {sortOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <Button
                        key={option.value}
                        variant={selectedSort === option.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSort(option.value)}
                        className="flex items-center gap-2"
                      >
                        <IconComponent className="h-4 w-4" />
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {sortedPrompts.length} prompts
                </span>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            <TabsContent value="all" className="mt-6">
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
                  <div className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                  }>
                    {sortedPrompts.map((prompt) => (
                      <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                  </div>

                  {/* Load More */}
                  <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="hover:bg-accent">
                      Load More Prompts
                    </Button>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="trending" className="mt-6">
              {sortedPrompts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔥</div>
                  <h3 className="text-xl font-semibold mb-2">No trending prompts found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </div>
              ) : (
                <>
                  <div className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                  }>
                    {sortedPrompts.map((prompt) => (
                      <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                  </div>

                  {/* Load More */}
                  <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="hover:bg-accent">
                      Load More Prompts
                    </Button>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="recent" className="mt-6">
              {sortedPrompts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">⏰</div>
                  <h3 className="text-xl font-semibold mb-2">No recent prompts found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </div>
              ) : (
                <>
                  <div className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                  }>
                    {sortedPrompts.map((prompt) => (
                      <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                  </div>

                  {/* Load More */}
                  <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="hover:bg-accent">
                      Load More Prompts
                    </Button>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}