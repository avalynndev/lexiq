"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { type PromptWithAuthor } from "@/lib/queries";
import { PromptCard } from "@/components/prompt-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TagsClientProps {
  allTags: string[];
  selectedTags: string[];
  initialPrompts: PromptWithAuthor[];
}

export default function TagsClient({
  allTags,
  selectedTags,
  initialPrompts,
}: TagsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTagToggle = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }

    const params = new URLSearchParams(searchParams);
    params.delete("tags");
    newTags.forEach((t) => params.append("tags", t));

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Explore by Tags</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Select tags to discover new prompts.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer text-sm"
            onClick={() => handleTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {selectedTags.length > 0 && (
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {initialPrompts.length} prompts for the selected tags.
          </p>
        </div>
      )}

      {initialPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {initialPrompts.map((prompt) => (
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
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold">No Prompts Found</h3>
          <p className="text-muted-foreground mt-2">
            {selectedTags.length > 0
              ? "Try removing some tags to find more prompts."
              : "Select some tags to start exploring."}
          </p>
        </div>
      )}
    </div>
  );
}
