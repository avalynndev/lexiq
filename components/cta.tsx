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
  "Remix and customize any prompt",
  "Join 50K+ creators worldwide",
  "Multi-model AI support",
  "Beautiful, intuitive interface",
  "24/7 community support",
];

export function CTA() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient opacity-5" />
      
      {/* Floating gradient orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 gradient-purple-blue rounded-full blur-3xl opacity-20 float-animation" />
      <div className="absolute bottom-10 right-10 w-80 h-80 gradient-purple-pink rounded-full blur-3xl opacity-15 float-animation" style={{ animationDelay: '3s' }} />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 border-gradient pulse-glow">
            <Rocket className="h-3 w-3 mr-1 text-gradient" />
            Get Started Today
          </Badge>
          <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-40 pb-40 pt-8 md:pb-60 mx-auto card-glow">
            <Globe />
          </div>
          <h2 className="pt-2 text-4xl md:text-6xl font-bold mb-6">
            Ready to transform your <span className="text-gradient">AI workflow</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of creators who are already building amazing things
            with AI. Start exploring, creating, and sharing prompts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center mb-12">
            <Button asChild className="gradient-purple-blue text-white font-semibold hover-glow glow-effect">
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>

            <Button variant="outline" asChild className="border-gradient hover-glow">
              <Link href="/explore">
                Explore Prompts
                <Sparkles className="h-5 w-5 ml-2 text-gradient" />
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
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover-glow border-gradient"
              >
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 glow-effect" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          <Card className="border-gradient card-glow">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">
                    Trusted by <span className="text-gradient">creators worldwide</span>
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