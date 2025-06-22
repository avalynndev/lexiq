"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  Sparkles,
  Users,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  GitFork,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { Globe } from "./ui/globe";

const benefits = [
  "Access to 100K+ curated prompts",
  "Fork and customize any prompt",
  "Join 50K+ creators worldwide",
  "Multi-model AI support",
  "Beautiful, intuitive interface",
  "24/7 community support",
];

const stats = [
  { icon: Users, value: "50K+", label: "Active Users" },
  { icon: Star, value: "1M+", label: "Stars Given" },
  { icon: GitFork, value: "25K+", label: "Forks Made" },
  { icon: Zap, value: "100K+", label: "Prompts Created" },
];

export function CTA() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            <Rocket className="h-3 w-3 mr-1" />
            Get Started Today
          </Badge>
          <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-40 pb-40 pt-8 md:pb-60 mx-auto">
            <Globe />
          </div>
          <h2 className="pt-2 text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Ready to transform your AI workflow?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of creators who are already building amazing things
            with AI. Start exploring, creating, and sharing prompts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center mb-12">
            <Button asChild>
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/explore">
                Explore Prompts
                <Sparkles className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-16">
            No credit card required • Free forever • Join in 30 seconds
          </p>
          {/* Benefits grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
              >
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <IconComponent className="h-6 w-6 text-primary mr-2" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Trust badges */}
          <Card className="border-dashed">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">
                    Trusted by creators worldwide
                  </h3>
                  <p className="text-muted-foreground">
                    Join a community of professionals, educators, and innovators
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
