"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  fetchAllPrompts,
  type PromptWithAuthor,
  checkUserStarredPrompt,
  checkUserForkedPrompt,
} from "@/lib/actions";
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
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { PromptCard } from "@/components/prompt-card";
import { useSession } from "@/lib/auth-client";
import { useToast } from "@/hooks/use-toast";

export default function PromptDetailPage() {
  const params = useParams<{ slug: string }>();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState<PromptWithAuthor | null>(null);
  const [allPrompts, setAllPrompts] = useState<PromptWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isForked, setIsForked] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [forkCount, setForkCount] = useState(0);

  useEffect(() => {
    const loadPrompt = async () => {
      setLoading(true);
      try {
        const prompts = await fetchAllPrompts();
        setAllPrompts(prompts);
        const foundPrompt = prompts.find((p) => p.id === params.slug);
        setPrompt(foundPrompt || null);
        if (foundPrompt) {
          setStarCount(foundPrompt.stars);
          setForkCount(foundPrompt.forks);

          // Check if user has starred or forked this prompt
          if (session?.user?.id) {
            const [starred, forked] = await Promise.all([
              checkUserStarredPrompt(session.user.id, foundPrompt.id),
              checkUserForkedPrompt(session.user.id, foundPrompt.id),
            ]);
            setIsStarred(starred);
            setIsForked(forked);
          }
        }
      } catch (error) {
        console.error("Error fetching prompt:", error);
        setPrompt(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      loadPrompt();
    }
  }, [params.slug, session?.user?.id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard.",
    });
  };

  const handleStar = async () => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to star a prompt.",
        variant: "destructive",
      });
      return;
    }

    const originalStarred = isStarred;
    const originalStarCount = starCount;

    // Optimistic update
    setIsStarred(!originalStarred);
    setStarCount(originalStarCount + (originalStarred ? -1 : 1));

    try {
      await fetch("/api/star", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: prompt?.id }),
      });
    } catch (error) {
      // Revert on error
      setIsStarred(originalStarred);
      setStarCount(originalStarCount);
      toast({
        title: "Something went wrong",
        description: "Could not update star status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFork = async () => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to fork a prompt.",
        variant: "destructive",
      });
      return;
    }

    const originalForked = isForked;
    const originalForkCount = forkCount;

    // Optimistic update
    setIsForked(!originalForked);
    setForkCount(originalForkCount + (originalForked ? -1 : 1));

    try {
      await fetch("/api/fork", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: prompt?.id }),
      });
    } catch (error) {
      // Revert on error
      setIsForked(originalForked);
      setForkCount(originalForkCount);
      toast({
        title: "Something went wrong",
        description: "Could not update fork status. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get similar prompts (same category or similar tags)
  const getSimilarPrompts = () => {
    if (!prompt) return [];

    return allPrompts
      .filter((p) => p.id !== prompt.id)
      .filter(
        (p) =>
          p.category === prompt.category ||
          (prompt.tags &&
            p.tags &&
            prompt.tags.some((tag) => p.tags?.includes(tag)))
      )
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 6);
  };

  if (loading) {
    return <PromptPageSkeleton />;
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Prompt Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The prompt you are looking for does not exist.
          </p>
          <Link href="/explore">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Explore
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const similarPrompts = getSimilarPrompts();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/explore"
            className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center mb-4"
          >
            <ArrowLeft className="h-3 w-3 mr-1" />
            Back to explore
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold text-muted-foreground">
              <span className="text-primary hover:underline cursor-pointer">
                {prompt.author.username || "Anonymous"}
              </span>
              <span className="mx-2">/</span>
              <span className="font-bold text-foreground">{prompt.title}</span>
              <Badge variant="outline" className="ml-4 text-xs font-mono">
                {prompt.isPublic ? "Public" : "Private"}
              </Badge>
            </h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5"
                onClick={handleFork}
                disabled={!session}
              >
                <GitFork
                  className={`h-4 w-4 ${isForked ? "text-yellow-400 fill-yellow-400" : ""}`}
                />{" "}
                Fork <Badge variant="secondary">{forkCount}</Badge>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5"
                onClick={handleStar}
                disabled={!session}
              >
                <Star
                  className={`h-4 w-4 ${isStarred ? "text-yellow-400 fill-yellow-400" : ""}`}
                />{" "}
                Star <Badge variant="secondary">{starCount}</Badge>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      prompt.author.image ||
                      `https://avatar.vercel.sh/${prompt.author.username}.png`
                    }
                    alt={prompt.author.username || "author"}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="font-semibold">
                    {prompt.author.username || "Anonymous"}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Last updated{" "}
                  {formatDistanceToNow(new Date(prompt.lastUpdated), {
                    addSuffix: true,
                  })}
                </span>
              </CardHeader>
              <CardContent className="p-0">
                {/* Prompt Content */}
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <Code className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Prompt</span>
                  </div>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap break-words w-full">
                      {prompt.prompt}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(prompt.prompt)}
                      className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:bg-background rounded-md transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Solves Section - only show if content exists */}
                {prompt.solves && (
                  <>
                    <Separator />
                    <div className="p-4">
                      <div className="flex items-center gap-4 mb-3">
                        <Puzzle className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Solves</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {prompt.solves}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {prompt.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Book className="h-4 w-4 text-muted-foreground" />{" "}
                    <span>{prompt.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />{" "}
                    <span>{prompt.stars} stars</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitFork className="h-4 w-4 text-muted-foreground" />{" "}
                    <span>{prompt.forks} forks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />{" "}
                    <span>
                      Created on{" "}
                      {format(new Date(prompt.createdOn), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      prompt.author.image ||
                      `https://avatar.vercel.sh/${prompt.author.username}.png`
                    }
                    alt={prompt.author.username || "author"}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="font-bold">
                      {prompt.author.username || "Anonymous"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      The author has not provided a bio.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Prompts Section */}
        {similarPrompts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Similar Prompts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarPrompts.map((similarPrompt) => (
                <PromptCard
                  key={similarPrompt.id}
                  prompt={{
                    ...similarPrompt,
                    author: {
                      username:
                        similarPrompt.author.displayUsername ||
                        similarPrompt.author.username ||
                        "Anonymous",
                      avatar: similarPrompt.author.image || undefined,
                    },
                    tags: similarPrompt.tags || [],
                    models: similarPrompt.models || [similarPrompt.model],
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const PromptPageSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="mb-6">
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Skeleton className="h-8 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-5 w-28" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 pb-4">
              <div className="flex items-center gap-4 mb-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-32 w-full" />
            </div>
            <Separator />
            <div className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="flex flex-wrap gap-2 mb-4">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Separator className="my-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-20" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);
