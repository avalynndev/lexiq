"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  ClaudeLogo,
  OpenAILogo,
  GeminiLogo,
  MetaIconOutline,
  DefaultAIIcon,
} from "@/components/logos";

interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    description: string;
    author: {
      username: string;
      avatar?: string;
    };
    model: string;
    category: string;
    stars: number;
    forks: number;
    lastUpdated: Date | string;
    createdOn: Date | string;
    tags?: string[];
    solves?: string | null;
    models?: string[];
  };
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(prompt.stars);

  const handleStar = () => {
    setIsStarred(!isStarred);
    setStarCount((prev) => (isStarred ? prev - 1 : prev + 1));
  };

  // Check if the prompt is new (created within the last 24 hours)
  const isNew = () => {
    const createdDate = new Date(prompt.createdOn);
    const now = new Date();
    const diffInHours =
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
    return diffInHours < 24;
  };

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
        return <DefaultAIIcon className="h-4 w-4" />;
    }
  };

  const getModelTitle = (model: string) => {
    switch (model.toLowerCase()) {
      case "gpt-4":
        return "GPT-4";
      case "claude":
        return "Claude";
      case "gemini":
        return "Gemini";
      case "llama":
      case "meta":
        return "Llama";
      default:
        return "AI";
    }
  };

  // Get all supported models, defaulting to the main model if models array not provided
  const supportedModels = prompt.models || [prompt.model];
  const tags = prompt.tags || [prompt.category.toLowerCase(), "ai"];

  return (
    <a href={`/prompt/${prompt.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all border shadow-lg p-0 group-hover:shadow-xl group-hover:shadow-purple-500/10">
        <div className="flex h-full flex-col pt-6">
          <div className="flex-1 px-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1">
                <h3 className="font-semibold tracking-tight text-lg">
                  {prompt.title}
                </h3>
              </div>
              {isNew() && (
                <div className="inline-flex items-center border px-2.5 py-0.5 font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground mr-1 rounded-full text-[10px]">
                  New
                </div>
              )}
            </div>

            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {prompt.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag, index) => (
                <div
                  key={index}
                  className="text-xs text-muted-foreground bg-muted/50 rounded-full px-2 py-1 shadow-xs"
                >
                  {tag}
                </div>
              ))}
            </div>

            {prompt.solves && (
              <div className="mt-3 text-xs text-muted-foreground">
                <strong>Solves: </strong>
                <span className="line-clamp-1">{prompt.solves}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-t-border/50 py-4 px-6 group-hover:bg-muted/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{prompt.author.username}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {/* AI Model Icons */}
              {supportedModels.slice(0, 4).map((model, index) => (
                <span
                  key={index}
                  className="text-muted-foreground transition-colors group-hover:text-foreground"
                  title={getModelTitle(model)}
                >
                  {getModelIcon(model)}
                </span>
              ))}
              {supportedModels.length > 4 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{supportedModels.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </a>
  );
}
