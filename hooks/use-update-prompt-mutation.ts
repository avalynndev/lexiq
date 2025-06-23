import { useState } from "react";
import { useSWRConfig } from "swr";

interface UpdatePromptData {
  title?: string;
  description?: string;
  prompt?: string;
  model?: string;
  category?: string;
  tags?: string[];
  solves?: string;
  models?: string[];
  isPublic?: boolean;
}

export function useUpdatePromptMutation() {
  const { mutate } = useSWRConfig();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdatePrompt = async (
    promptId: string,
    updateData: UpdatePromptData,
  ) => {
    setIsUpdating(true);
    setError(null);
    try {
      const res = await fetch(`/api/prompts/${promptId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update prompt");
      }
      mutate("/api/prompts");
      return await res.json();
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    handleUpdatePrompt,
    isUpdating,
    error,
  };
}
