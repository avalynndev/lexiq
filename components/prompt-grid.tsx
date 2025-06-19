"use client";

import { useState } from 'react';
import { PromptCard } from './prompt-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, TrendingUp, Clock, Star } from 'lucide-react';

const samplePrompts = [
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
  },
];

const models = ['All', 'GPT-4', 'Claude', 'Gemini', 'Llama'];
const categories = ['All', 'Writing', 'Development', 'Analytics', 'Marketing', 'Education', 'E-commerce'];
const sortOptions = [
  { label: 'Most Popular', value: 'popular', icon: Star },
  { label: 'Trending', value: 'trending', icon: TrendingUp },
  { label: 'Recently Updated', value: 'recent', icon: Clock },
];

export function PromptGrid() {
  const [selectedModel, setSelectedModel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrompts = samplePrompts.filter(prompt => {
    const modelMatch = selectedModel === 'All' || 
      prompt.model === selectedModel || 
      (prompt.models && prompt.models.includes(selectedModel));
    const categoryMatch = selectedCategory === 'All' || prompt.category === selectedCategory;
    const searchMatch = searchQuery === '' || 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return modelMatch && categoryMatch && searchMatch;
  });

  return (
    <section className="py-16" id="explore">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Popular Prompts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover, fork, and remix the best AI prompts created by our community
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
              className="pl-10 bg-card/50 backdrop-blur-sm border-border/50"
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
                    selectedModel === model 
                      ? 'bg-purple-500 hover:bg-purple-600' 
                      : 'hover:bg-accent'
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
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedCategory === category 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'hover:bg-accent'
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
                  variant={selectedSort === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSort(option.value)}
                  className={selectedSort === option.value ? 'bg-gradient-to-r from-purple-500 to-blue-600' : ''}
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
            Showing {filteredPrompts.length} prompts
          </p>
        </div>

        {/* Prompt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
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