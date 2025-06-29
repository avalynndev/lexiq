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
    gradient: "gradient-blue-cyan",
  },
  {
    icon: GitFork,
    title: "Remix",
    description:
      "Build upon existing prompts. Remix any prompt and customize it for your specific needs.",
    gradient: "gradient-purple-blue",
  },
  {
    icon: Star,
    title: "Star System",
    description:
      "Save your favorite prompts to your personal collection. Never lose track of useful prompts again.",
    gradient: "gradient-purple-pink",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Join a global community of AI enthusiasts. Share, collaborate, and learn from others.",
    gradient: "gradient-purple-blue",
  },
  {
    icon: Zap,
    title: "Multi-Model Support",
    description:
      "Works with GPT-4, Claude, Gemini, and more. Choose the AI model that fits your needs.",
    gradient: "gradient-blue-cyan",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is protected with enterprise-grade security. Your prompts remain private by default.",
    gradient: "gradient-purple-pink",
  },
  {
    icon: Palette,
    title: "Beautiful UI",
    description:
      "Modern, intuitive interface designed for the best user experience. Dark mode support included.",
    gradient: "gradient-purple-blue",
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Access your prompts from anywhere. Works seamlessly across all devices and browsers.",
    gradient: "gradient-blue-cyan",
  },
];

export function FeaturesSection() {
  return (
    <Section className="pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 gradient-purple-blue rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 gradient-purple-pink rounded-full blur-3xl opacity-10" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 border-gradient">
            <Sparkles className="h-3 w-3 mr-1 text-gradient" />
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built for creators, <span className="text-gradient">by creators</span>
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
                className="group relative overflow-hidden hover-glow transition-all duration-300 border rounded-lg card-glow"
              >
                <ItemTitle className="flex items-center gap-3">
                  <ItemIcon>
                    <div
                      className={`p-2 rounded-lg ${feature.gradient} glow-effect`}
                    >
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                  </ItemIcon>
                  {feature.title}
                </ItemTitle>
                <ItemDescription>{feature.description}</ItemDescription>

                {/* Hover effect */}
                <div
                  className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
              </Item>
            );
          })}
        </div>
      </div>
    </Section>
  );
}