"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { fetchStarredPrompts, type PromptWithAuthor } from "@/lib/actions";
import { PromptCard } from "@/components/prompt-card";
import { Spinner } from "@/components/ui/spinner";
import { Star, Frown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function StarredPromptsPage() {
  const { data: session } = useSession();
  const [starredPrompts, setStarredPrompts] = useState<PromptWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchStarredPrompts(session.user.id)
        .then((prompts: PromptWithAuthor[]) => {
          setStarredPrompts(prompts);
        })
        .catch((err: any) =>
          console.error("Failed to fetch starred prompts:", err),
        )
        .finally(() => setLoading(false));
    } else if (session === null) {
      setLoading(false);
    }
  }, [session]);

  return (
    <>
      <header className="flex h-(--header-height) bg-sidebar shrink-0 rounded-t-xl border-t border-x items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full pt-5 p-5">
          <div className="flex flex-col flex-1 border-alpha-200 border-t sm:border-t-0">
            <div className="flex items-center gap-3 pl-4 pr-3 sm:pl-3 sm:pr-2 h-12 border-b border-alpha-200 sm:mx-0 shrink-0">
              <SidebarTrigger className="-ml-1" />
              <h1 className="hidden truncate text-base font-medium sm:inline sm:tracking-tight">
                My Stars
              </h1>
            </div>
          </div>
        </div>
      </header>
      <ScrollArea className="h-[calc(100vh-6.5rem)] px-4 py-2 rounded-b-xl border-b border-x">
        <div className="max-w-7xl mx-auto py-8">
          {loading ? (
            <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
              <Spinner size="large" />
            </div>
          ) : starredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {starredPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={{
                    ...prompt,
                    author: {
                      username:
                        prompt.author.displayUsername ||
                        prompt.author.username ||
                        "Anonymous",
                      avatar: prompt.author.image || undefined,
                    },
                    tags: prompt.tags || [],
                    models: prompt.models || [prompt.model],
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-12rem)]">
              <Frown className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                No starred prompts yet
              </h2>
              <p className="text-muted-foreground mb-4">
                You haven&apos;t starred any prompts. Find some you like to see
                them here.
              </p>
              <Button asChild>
                <Link href="/explore">Explore Prompts</Link>
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  );
}
