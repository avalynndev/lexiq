import { useState } from "react";
import { useSWRConfig } from "swr";

interface PromptData {
  title: string;
  description: string;
  prompt: string;
  model?: string;
  category: string;
  tags?: string[];
  solves?: string;
  models?: string[];
  authorId: string;
}

export function useCreatePromptMutation() {
  const { mutate } = useSWRConfig();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePrompt = async (promptData: PromptData) => {
    setIsCreating(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/create-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create prompt");
      }

      // Revalidate the prompts list after a successful creation
      mutate("/api/prompts");

      return await res.json();
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    handleCreatePrompt,
    isCreating,
    error,
  };
}
