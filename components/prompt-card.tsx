"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  ClaudeLogo,
  OpenAILogo,
  GeminiLogo,
  MetaIconOutline,
  DefaultAIIcon,
} from "@/components/logos";
import { Star, GitFork } from "lucide-react";
import { useCheckStarred } from "@/hooks/use-check-starred";
import { useStarMutation } from "@/hooks/use-star-mutation";
import { usePromptStars } from "@/hooks/use-prompt-stars";
import { useCheckRemixed } from "@/hooks/use-check-remixed";
import { useRemixMutation } from "@/hooks/use-remix-mutation";
import { usePromptRemixes } from "@/hooks/use-prompt-remixes";
import { useRouter } from "next/navigation";

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
    remixes: number;
    lastUpdated: Date | string;
    createdOn: Date | string;
    tags?: string[];
    solves?: string | null;
    models?: string[];
  };
}

export function PromptCard({ prompt }: PromptCardProps) {
  const { data: session } = useSession();
  const router = useRouter();

  // SWR hooks for live data and mutations
  const { isStarred, isLoading: isStarredLoading } = useCheckStarred(
    prompt.id,
    session ?? undefined,
  );
  const { handleStar, isStaring } = useStarMutation(prompt.id);
  const { stars: liveStars, isLoading: isStarsLoading } = usePromptStars(
    prompt.id,
  );
  const { isRemixed, isLoading: isRemixedLoading } = useCheckRemixed(
    prompt.id,
    session ?? undefined,
  );
  const { handleRemix, isRemixing } = useRemixMutation(prompt.id);
  const { remixes: liveRemixes, isLoading: isRemixesLoading } =
    usePromptRemixes(prompt.id);

  const onStarClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      toast.error("Please sign in", {
        description: "You need to be signed in to star a prompt.",
      });
      return;
    }
    await handleStar();
  };

  const onRemixClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      toast.error("Please sign in", {
        description: "You need to be signed in to remix a prompt.",
      });
      return;
    }
    const newPromptId = await handleRemix();
    if (newPromptId) {
      router.push(`/prompt/${newPromptId}`);
    }
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
    <Card className="h-full overflow-hidden transition-all border shadow-lg p-0 group hover-glow card-glow border-gradient">
      <div className="flex h-full flex-col pt-6 relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-purple-blue opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg" />
        
        <div className="flex-1 px-6 relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold tracking-tight text-lg">
                {prompt.title}
              </h3>
            </div>
            {isNew() && (
              <div className="inline-flex items-center border px-2.5 py-0.5 font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground mr-1 rounded-full text-[10px] gradient-purple-pink text-white glow-effect">
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
                className="text-xs text-muted-foreground bg-muted/50 rounded-full px-2 py-1 shadow-xs border-gradient"
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

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-t-border/50 py-4 px-6 group-hover:bg-muted/50 relative z-10">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{prompt.author.username}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {/* AI Model Icons */}
            {supportedModels.slice(0, 4).map((model, index) => (
              <span
                key={index}
                className="text-muted-foreground transition-colors group-hover:text-foreground glow-effect"
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

        {/* Star and Fork Buttons */}
        <div className="flex items-center justify-between gap-2 border-t border-t-border/50 py-3 px-6 relative z-10">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs hover-glow"
              onClick={onStarClick}
              disabled={
                !session || isStaring || isStarredLoading || liveStars === null
              }
            >
              <Star
                className={`h-3 w-3 mr-1 ${isStarred ? "text-yellow-400 fill-yellow-400 glow-effect" : ""}`}
              />
              {isStarsLoading || liveStars === undefined || liveStars === null
                ? prompt.stars
                : liveStars}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs hover-glow"
              onClick={onRemixClick}
              disabled={
                !session ||
                isRemixing ||
                isRemixedLoading ||
                liveRemixes === null
              }
            >
              <GitFork
                className={`h-3 w-3 mr-1 ${isRemixed ? "text-blue-400 fill-blue-400 glow-effect" : ""}`}
              />
              {isRemixesLoading ||
              liveRemixes === undefined ||
              liveRemixes === null
                ? prompt.remixes
                : liveRemixes}
            </Button>
          </div>
          <a
            href={`/prompt/${prompt.id}`}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors text-gradient"
          >
            View Details →
          </a>
        </div>
      </div>
    </Card>
  );
}