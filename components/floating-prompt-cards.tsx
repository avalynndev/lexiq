"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, GitFork } from "lucide-react";

const sampleCards = [
  {
    id: 1,
    title: "Creative Writing Assistant",
    description: "Generate compelling stories with structured character development and plot guidance.",
    category: "Writing",
    model: "GPT-4",
    stars: 1247,
    views: 3421,
    forks: 89,
    tags: ["creative", "storytelling", "characters"],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Code Review Expert",
    description: "Analyze code quality, suggest improvements, and identify potential bugs across languages.",
    category: "Development",
    model: "Claude",
    stars: 892,
    views: 2103,
    forks: 156,
    tags: ["review", "optimization", "debugging"],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Data Analysis Wizard",
    description: "Transform raw datasets into actionable business insights with visualizations.",
    category: "Analytics",
    model: "Gemini",
    stars: 567,
    views: 1876,
    forks: 43,
    tags: ["data-science", "visualization", "insights"],
    gradient: "from-green-500 to-emerald-500"
  }
];

const getModelIcon = (model: string) => {
  switch (model.toLowerCase()) {
    case 'gpt-4':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260" className="h-4 w-4">
          <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l-.87-51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333V61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 87.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" fill="currentColor"></path>
        </svg>
      );
    case 'claude':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="h-4 w-4">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    case 'gemini':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="h-4 w-4">
          <path fill="currentColor" d="M12 2l3.09 6.26L22 9l-5.91 1.74L12 17l-4.09-6.26L2 9l6.91-0.74L12 2z"/>
        </svg>
      );
    default:
      return null;
  }
};

export function FloatingPromptCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="hidden md:relative w-full h-[400px] lg:h-[500px] overflow-hidden">
      {sampleCards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute"
          initial={{ 
            opacity: 0, 
            y: 50,
            rotate: index === 0 ? -8 : index === 1 ? 0 : 8
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            rotate: index === 0 ? -6 : index === 1 ? 0 : 6
          }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.2,
            ease: "easeOut"
          }}
          style={{
            // For large screens: spread cards across the right side
            // For small screens: stack them more compactly
            left: index === 0 ? '10%' : index === 1 ? '50%' : '20%',
            top: index === 0 ? '5%' : index === 1 ? '15%' : '50%',
            transform: index === 1 ? 'translateX(-50%)' : 'translateX(0)',
            zIndex: index === 1 ? 30 : 20
          }}
          whileHover={{ 
            scale: 1.05,
            rotate: 0,
            y: -10,
            transition: { duration: 0.3 }
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
              ease: "easeInOut"
            }}
          >
            <Card className={`w-64 lg:w-72 h-52 lg:h-56 overflow-hidden transition-all duration-300 ${
              hoveredCard === card.id 
                ? 'shadow-2xl shadow-purple-500/20 border-purple-300/50' 
                : 'shadow-xl border-border/50'
            } backdrop-blur-sm bg-card/90`}>
              <CardContent className="p-4 lg:p-5 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${card.gradient}`} />
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
                <h3 className="font-semibold text-sm lg:text-base mb-2 line-clamp-1">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs lg:text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                  {card.description}
                </p>

                {/* Tags */}
                <div className="md:flex flex-wrap gap-1 mb-3 hidden">
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
                <div className="flex items-center justify-between text-xs text-muted-foreground">
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
                      <span>{card.forks}</span>
                    </div>
                  </div>
                  <motion.div
                    className={`text-xs font-medium bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
                    animate={{
                      opacity: hoveredCard === card.id ? 1 : 0.7
                    }}
                  >
                    View Prompt
                  </motion.div>
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