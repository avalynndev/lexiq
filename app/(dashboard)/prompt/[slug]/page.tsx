"use client";

import { useParams, useRouter, notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  GitFork,
  Copy,
  ArrowLeft,
  Book,
  Code,
  Puzzle,
  Calendar,
  Users,
  Info,
  Eye,
  Sparkles,
  Check,
  Cpu,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePrompt } from "@/hooks/use-prompt";
import { useCheckStarred } from "@/hooks/use-check-starred";
import { useStarMutation } from "@/hooks/use-star-mutation";
import { useState } from "react";
import { usePromptStars } from "@/hooks/use-prompt-stars";
import { useCheckRemixed } from "@/hooks/use-check-remixed";
import { useRemixMutation } from "@/hooks/use-remix-mutation";
import { usePromptRemixes } from "@/hooks/use-prompt-remixes";
import { CopyButton } from "@/components/docs/copy-button";

// Import model logos
import {
  OpenAILogo,
  ClaudeLogo,
  GeminiLogo,
  MetaIconOutline,
  OllamaLogo,
  MidjourneyLogo,
  MistralLogo,
  MicrosoftCopilotLogo,
  GemmaLogo,
  PerplexityLogo,
  DalleLogo,
  FluxLogo,
  GrokLogo,
  QwenLogo,
  DeepSeekLogo,
  NotebookLmlogo,
  GithubCopilotLogo,
} from "@/components/logos";

// Helper to get the icon component by model name
const getModelIconByName = (name: string) => {
  switch (name) {
    case "GPT-4":
      return OpenAILogo;
    case "Claude":
      return ClaudeLogo;
    case "Gemini":
      return GeminiLogo;
    case "Llama":
      return MetaIconOutline;
    case "Ollama":
      return OllamaLogo;
    case "Midjourney":
      return MidjourneyLogo;
    case "Mistral":
      return MistralLogo;
    case "Microsoft Copilot":
      return MicrosoftCopilotLogo;
    case "Gemma (Google)":
      return GemmaLogo;
    case "Perplexity":
      return PerplexityLogo;
    case "DALL·E (OpenAI)":
      return DalleLogo;
    case "Flux":
      return FluxLogo;
    case "Grok":
      return GrokLogo;
    case "Qwen":
      return QwenLogo;
    case "DeepSeek":
      return DeepSeekLogo;
    case "Notebook LM":
      return NotebookLmlogo;
    case "GitHub Copilot":
      return GithubCopilotLogo;
    default:
      return undefined;
  }
};

export default function PromptDetailPage() {
  const params = useParams<{ slug: string }>();
  const { data: session } = useSession();
  const router = useRouter();

  // Data fetching hooks
  const { prompt, isLoading: isPromptLoading } = usePrompt(params.slug);
  const { isStarred, isLoading: isStarredLoading } = useCheckStarred(
    prompt?.id
  );
  const { handleStar, isStaring } = useStarMutation(prompt?.id);
  const { stars: liveStars, isLoading: isStarsLoading } = usePromptStars(
    prompt?.id
  );
  const { isRemixed, isLoading: isRemixedLoading } = useCheckRemixed(
    prompt?.id
  );
  const { handleRemix, isRemixing } = useRemixMutation(prompt?.id);
  const { remixes: liveRemixes, isLoading: isRemixesLoading } =
    usePromptRemixes(prompt?.id);

  const onStarClick = async () => {
    if (!session) {
      toast.error("Please sign in", {
        description: "You need to be signed in to star a prompt.",
      });
      return;
    }
    await handleStar();
  };
  const onRemixClick = async () => {
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

  if (isPromptLoading) {
    return <PromptPageSkeleton />;
  }

  if (!prompt) {
    return (
      <>
        <header className="flex h-(--header-height) bg-sidebar shrink-0 rounded-t-xl border-t border-x items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full pt-5 p-5">
            <div className="flex flex-col flex-1 border-alpha-200 border-t sm:border-t-0">
              <div className="flex items-center gap-3 pl-4 pr-3 sm:pl-3 sm:pr-2 h-12 border-b border-alpha-200 sm:mx-0 shrink-0">
                <SidebarTrigger className="-ml-1" />
              </div>
            </div>
          </div>
        </header>
        <ScrollArea className="h-[calc(100vh-6.5rem)] px-4 py-2 rounded-b-xl border-b border-x">
          <div className="flex flex-col items-center justify-center min-h-[60vh] w-full px-4">
            <div className="flex flex-col items-center gap-4">
              <span className="text-7xl">🔍</span>
              <h1 className="text-3xl font-bold mb-2">Prompt Not Found</h1>
              <p className="text-muted-foreground mb-4 text-center max-w-md">
                Sorry, the prompt you are looking for does not exist or has been
                deleted.
              </p>
              <Link href="/explore">
                <Button variant="default" size="lg">
                  Back to Explore
                </Button>
              </Link>
            </div>
          </div>
        </ScrollArea>
      </>
    );
  }

  // Defensive fallback for stats
  const safeStars =
    isStarsLoading || liveStars === undefined || liveStars === null
      ? (prompt?.stars ?? 0)
      : liveStars;
  const safeRemixes =
    isRemixesLoading || liveRemixes === undefined || liveRemixes === null
      ? (prompt?.remixes ?? 0)
      : liveRemixes;

  return (
    <>
      <header className="flex h-(--header-height) bg-sidebar shrink-0 rounded-t-xl border-t border-x items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full pt-5 p-5">
          <div className="flex flex-col flex-1 border-alpha-200 border-t sm:border-t-0">
            <div className="flex items-center gap-3 pl-4 pr-3 sm:pl-3 sm:pr-2 h-12 border-b border-alpha-200 sm:mx-0 shrink-0">
              <SidebarTrigger className="-ml-1" />
              <h1 className="hidden truncate text-base font-medium sm:inline sm:tracking-tight">
                <Link href={`/user/${prompt.author.username}`}>
                  <span className="text-primary hover:underline cursor-pointer">
                    {prompt.author.username || "Anonymous"}
                  </span>
                </Link>
                <span className="font-light text-muted-foreground"> / </span>
                <span>{prompt.title}</span>
              </h1>
            </div>
          </div>
        </div>
      </header>
      <ScrollArea className="h-[calc(100vh-6.5rem)] px-4 py-2 rounded-b-xl border-b border-x">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                  <Sparkles className="h-7 w-7 text-primary" />
                  {prompt.title}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {prompt.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {prompt.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Prompt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-md p-4 relative group">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {prompt.prompt}
                    </pre>
                    <CopyButton
                      value={prompt.prompt}
                      className="absolute top-2 right-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {prompt.solves && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Puzzle className="h-5 w-5" />
                      Solves
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {prompt.solves}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="flex gap-2">
                  <Button
                    onClick={onStarClick}
                    disabled={isStaring || isStarredLoading}
                    className="flex-1"
                  >
                    <Star
                      className={`mr-2 h-4 w-4 ${
                        isStarred ? "fill-yellow-400 text-yellow-400" : ""
                      }`}
                    />
                    {isStarred ? "Starred" : "Star"}
                  </Button>
                  <Button
                    onClick={onRemixClick}
                    disabled={isRemixing || isRemixedLoading}
                    variant="outline"
                    className="flex-1"
                  >
                    <GitFork
                      className={`mr-2 h-4 w-4 ${isRemixed ? "text-blue-400" : ""}`}
                    />
                    {isRemixed ? "Remixed" : "Remix"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    Supported Models
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold flex items-center gap-2">
                      {(() => {
                        const Icon = getModelIconByName(prompt.model);
                        return Icon ? <Icon className="h-5 w-5" /> : null;
                      })()}
                      {prompt.model}
                    </span>
                    <Badge>Primary</Badge>
                  </div>
                  {prompt.models && prompt.models.length > 0 && (
                    <>
                      <Separator />
                      <div className="grid grid-cols-2 gap-3">
                        {prompt.models.map((modelName) => {
                          const Icon = getModelIconByName(modelName);
                          return (
                            <div
                              key={modelName}
                              className="flex items-center gap-2 text-sm"
                            >
                              {Icon && <Icon className="h-4 w-4" />}
                              <span>{modelName}</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" /> Author
                    </span>
                    <Link
                      href={`/user/${prompt.author.username}`}
                      className="text-primary hover:underline font-medium flex items-center gap-2"
                    >
                      {prompt.author.displayUsername || "Anonymous"}
                      <Image
                        src={prompt.author.image || "/default-avatar.png"}
                        alt={prompt.author.displayUsername || "Anonymous"}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    </Link>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Book className="h-4 w-4" /> Category
                    </span>
                    <Badge variant="outline">{prompt.category}</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Star className="h-4 w-4" /> Stars
                    </span>
                    <span>{safeStars}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <GitFork className="h-4 w-4" /> Remixes
                    </span>
                    <span>{safeRemixes}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Eye className="h-4 w-4" /> Views
                    </span>
                    <span>{prompt.views}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Created
                    </span>
                    <time dateTime={prompt.createdOn.toString()}>
                      {formatDistanceToNow(new Date(prompt.createdOn), {
                        addSuffix: true,
                      })}
                    </time>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Updated
                    </span>
                    <time dateTime={prompt.lastUpdated.toString()}>
                      {format(new Date(prompt.lastUpdated), "MMM d, yyyy")}
                    </time>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}

const PromptPageSkeleton = () => (
  <>
    <header className="flex h-(--header-height) bg-sidebar shrink-0 rounded-t-xl border-t border-x items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full pt-5 p-5">
        <div className="flex flex-col flex-1 border-alpha-200 border-t sm:border-t-0">
          <div className="flex items-center gap-3 pl-4 pr-3 sm:pl-3 sm:pr-2 h-12 border-b border-alpha-200 sm:mx-0 shrink-0">
            <SidebarTrigger className="-ml-1" />
            <h1 className="hidden truncate text-base font-medium sm:inline sm:tracking-tight">
              <Skeleton className="h-5 w-48" />
            </h1>
          </div>
        </div>
      </div>
    </header>
    <ScrollArea className="h-[calc(100vh-6.5rem)] px-4 py-2 rounded-b-xl border-b border-x">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Skeleton className="h-9 w-3/4 mb-3" />
              <Skeleton className="h-5 w-full mb-1" />
              <Skeleton className="h-5 w-2/3" />
              <div className="mt-4 flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-24" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-40" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-5 w-1/4" />
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-24" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-5 w-1/2" />
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  </>
);
