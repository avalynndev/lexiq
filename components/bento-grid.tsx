"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Users,
  Zap,
  Star,
  GitFork,
  TrendingUp,
  BookOpen,
  Code,
  Globe,
  Shield,
  Palette,
  Rocket,
} from "lucide-react";
import Link from "next/link";

const bentoItems = [
  {
    title: "Trending Prompts",
    description: "Discover what's hot in the AI community",
    icon: TrendingUp,
    gradient: "from-pink-500 to-rose-500",
    href: "/community",
    stats: "2.5k+ trending",
    className: "col-span-2 row-span-2",
  },
  {
    title: "Community Hub",
    description: "Connect with AI enthusiasts worldwide",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    href: "/community",
    stats: "10k+ members",
    className: "col-span-1 row-span-1",
  },
  {
    title: "AI Models",
    description: "GPT-4, Claude, Gemini & more",
    icon: Zap,
    gradient: "from-purple-500 to-indigo-500",
    href: "/explore",
    stats: "5+ models",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Categories",
    description: "Writing, Development, Analytics & more",
    icon: BookOpen,
    gradient: "from-green-500 to-emerald-500",
    href: "/explore",
    stats: "8+ categories",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Remix",
    description: "Build upon existing prompts",
    icon: GitFork,
    gradient: "from-orange-500 to-red-500",
    href: "/explore",
    stats: "15k+ remixes",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Star System",
    description: "Save your favorite prompts",
    icon: Star,
    gradient: "from-yellow-500 to-amber-500",
    href: "/stars",
    stats: "50k+ stars",
    className: "col-span-2 row-span-1",
  },
];

export function BentoGrid() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Everything you need to build with AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From trending prompts to community features, discover the tools that
            make AI accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {bentoItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={index}
                className={`group relative overflow-hidden border-0 bg-gradient-to-br ${item.gradient} hover:scale-105 transition-all duration-300 cursor-pointer ${item.className}`}
              >
                <CardContent className="p-6 h-full flex flex-col justify-between text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-0"
                    >
                      {item.stats}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>

                  <div className="mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 border-white/20"
                      asChild
                    >
                      <Link href={item.href}>
                        Explore
                        <Sparkles className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>

                  {/* Animated background elements */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-foreground">50K+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">100K+</div>
            <div className="text-muted-foreground">Prompts Created</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">1M+</div>
            <div className="text-muted-foreground">Stars Given</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">25K+</div>
            <div className="text-muted-foreground">Remixes Made</div>
          </div>
        </div>
      </div>
    </section>
  );
}
