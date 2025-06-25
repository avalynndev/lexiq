"use client";

import { Badge } from "@/components/ui/badge";
import {
  GitFork,
  Globe,
  MoveRight,
  Palette,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Item, ItemDescription, ItemIcon, ItemTitle } from "./ui/item";
import { Section } from "./ui/section";

const features = [
  {
    icon: Search,
    title: "Smart Discovery",
    description:
      "Find the perfect AI prompts with advanced search and filtering. Browse by category, model, or use case.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: GitFork,
    title: "Remix",
    description:
      "Build upon existing prompts. Remix any prompt and customize it for your specific needs.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Star,
    title: "Star System",
    description:
      "Save your favorite prompts to your personal collection. Never lose track of useful prompts again.",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Join a global community of AI enthusiasts. Share, collaborate, and learn from others.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Multi-Model Support",
    description:
      "Works with GPT-4, Claude, Gemini, and more. Choose the AI model that fits your needs.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is protected with enterprise-grade security. Your prompts remain private by default.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Palette,
    title: "Beautiful UI",
    description:
      "Modern, intuitive interface designed for the best user experience. Dark mode support included.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Access your prompts from anywhere. Works seamlessly across all devices and browsers.",
    gradient: "from-teal-500 to-cyan-500",
  },
];

export function FeaturesSection() {
  return (
    <Section className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Built for creators, by creators
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to discover, create, and share AI prompts in one
            beautiful platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Item
                key={index}
                className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border rounded-lg"
              >
                <ItemTitle className="flex items-center gap-3">
                  <ItemIcon>
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${feature.gradient}`}
                    >
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                  </ItemIcon>
                  {feature.title}
                </ItemTitle>
                <ItemDescription>{feature.description}</ItemDescription>

                {/* Hover effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
              </Item>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
