"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAllPrompts, type PromptWithAuthor } from "@/lib/actions";
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
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function PromptDetailPage() {
  const params = useParams<{ slug: string }>();
  const [prompt, setPrompt] = useState<PromptWithAuthor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrompt = async () => {
      setLoading(true);
      try {
        const prompts = await fetchAllPrompts();
        const foundPrompt = prompts.find((p) => p.id === params.slug);
        setPrompt(foundPrompt || null);
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
  }, [params.slug]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
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

  const detailRows = [
    {
      icon: Info,
      title: "Description",
      content: prompt.description,
      updated: prompt.lastUpdated,
    },
    {
      icon: Code,
      title: "Prompt",
      content: prompt.prompt,
      updated: prompt.createdOn,
    },
    {
      icon: Puzzle,
      title: "Solves",
      content: prompt.solves,
      updated: prompt.lastUpdated,
    },
  ];

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
                Public
              </Badge>
            </h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5"
              >
                <GitFork className="h-4 w-4" /> Fork{" "}
                <Badge variant="secondary">{prompt.forks}</Badge>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5"
              >
                <Star className="h-4 w-4" /> Star{" "}
                <Badge variant="secondary">{prompt.stars}</Badge>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-4">
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
              <Separator />
              <CardContent className="p-0">
                {detailRows.map(
                  (row, index) =>
                    row.content && (
                      <div key={index}>
                        <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <row.icon className="h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col">
                              <span className="font-medium">{row.title}</span>
                              {row.title === "Prompt" ? (
                                <div className="relative mt-2">
                                  <pre className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap break-words w-full">
                                    {row.content}
                                  </pre>
                                  <button
                                    onClick={() =>
                                      copyToClipboard(row.content as string)
                                    }
                                    className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:bg-background rounded-md transition-colors"
                                  >
                                    <Copy className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {row.content}
                                </p>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground text-right hidden md:block">
                            {formatDistanceToNow(new Date(row.updated), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <Separator />
                      </div>
                    )
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
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-5 w-28" />
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4 w-full">
                    <Skeleton className="h-5 w-5" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-5 w-1/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-24 hidden md:block" />
                </div>
                <Separator />
              </div>
            ))}
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
