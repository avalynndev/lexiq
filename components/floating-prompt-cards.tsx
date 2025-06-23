"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, GitFork } from "lucide-react";
import {
  OpenAILogo,
  ClaudeLogo,
  GeminiLogo,
  MetaIconOutline,
} from "@/components/logos";

const sampleCards = [
  {
    id: 1,
    title: "Creative Writing Assistant",
    description:
      "Generate compelling stories with structured character development and plot guidance.",
    category: "Writing",
    model: "GPT-4",
    stars: 1247,
    views: 3421,
    remixes: 89,
    tags: ["creative", "storytelling", "characters"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    title: "Code Review Expert",
    description:
      "Analyze code quality, suggest improvements, and identify potential bugs across languages.",
    category: "Development",
    model: "Claude",
    stars: 892,
    views: 2103,
    remixes: 156,
    tags: ["review", "optimization", "debugging"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Data Analysis Wizard",
    description:
      "Transform raw datasets into actionable business insights with visualizations.",
    category: "Analytics",
    model: "Gemini",
    stars: 567,
    views: 1876,
    remixes: 43,
    tags: ["data-science", "visualization", "insights"],
    gradient: "from-green-500 to-emerald-500",
  },
];

const getModelIcon = (model: string) => {
  switch (model.toLowerCase()) {
    case "gpt-4":
    case "openai":
      return <OpenAILogo className="h-4 w-4" />;
    case "claude":
      return <ClaudeLogo className="h-4 w-4" />;
    case "gemini":
      return <GeminiLogo className="h-4 w-4" />;
    case "llama":
    case "meta":
      return <MetaIconOutline className="h-4 w-4" />;
    default:
      return (
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          color="currentcolor"
          className="h-4 w-4"
        >
          <path
            d="M2.5.5V0h1v.5a2 2 0 002 2H6v1h-.5a2 2 0 00-2 2V6h-1v-.5a2 2 0 00-2-2H0v-1h.5a2 2 0 002-2zM14.5 4.5V5h-1v-.5a1 1 0 00-1-1H12v-1h.5a1 1 0 001-1V1h1v.5a1 1 0 001 1h.5v1h-.5a1 1 0 00-1 1zM8.407 4.93L8.5 4h1l.093.93a5 5 0 004.93 4.477L15 9.5v1l-.93.093a5 5 0 00-4.477 4.478L9.5 16h-1l-.093-.93a5 5 0 00-4.478-4.477L3 10.5v-1l.93-.093A5 5 0 008.406 4.93z"
            fill="currentColor"
          ></path>
        </svg>
      );
  }
};

export function FloatingPromptCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="relative w-full h-[450px] lg:h-[500px] md:overflow-hidden">
      {sampleCards.map((card, index) => (
        <motion.div
          key={card.id}
          className={`absolute ${
            index === 1 ? "block lg:hidden xl:block" : ""
          }`}
          initial={{
            opacity: 0,
            y: 50,
            rotate: index === 0 ? -8 : index === 1 ? 0 : 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: index === 0 ? -6 : index === 1 ? 0 : 6,
          }}
          transition={{
            duration: 0.8,
            delay: index * 0.2,
            ease: "easeOut",
          }}
          style={{
            left: index === 0 ? "10%" : index === 1 ? "50%" : "20%",
            top: index === 0 ? "5%" : index === 1 ? "15%" : "50%",
            transform: index === 1 ? "translateX(-55%)" : "translateX()",
            zIndex: index === 1 ? 30 : 20,
          }}
          whileHover={{
            scale: 1.05,
            rotate: 0,
            y: -10,
            transition: { duration: 0.3 },
          }}
          onHoverStart={() => setHoveredCard(card.id)}
          onHoverEnd={() => setHoveredCard(null)}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Card
              className={`w-64 lg:w-72 h-52 lg:h-56 overflow-hidden transition-all duration-300 p-0 flex flex-col justify-between ${
                hoveredCard === card.id
                  ? "shadow-2xl shadow-purple-500/20 border-purple-300/50"
                  : "shadow-xl border-border/50"
              } backdrop-blur-sm bg-card/90`}
            >
              <CardContent className="flex flex-col h-full p-4 lg:p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${card.gradient}`}
                    />
                    <Badge variant="outline" className="text-xs">
                      {card.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    {getModelIcon(card.model)}
                    <span className="text-xs">{card.model}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-sm lg:text-base mb-1 line-clamp-1">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs lg:text-sm text-muted-foreground mb-2 line-clamp-2 flex-1">
                  {card.description}
                </p>

                {/* Tags */}
                <div className="lg:flex flex-wrap gap-1 mb-2 hidden">
                  {card.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>{card.stars.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{card.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      <span>{card.remixes}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      ))}

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-green-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
