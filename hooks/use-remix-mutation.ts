import { useState } from "react";
import { useSWRConfig } from "swr";

export function useRemixMutation(promptId?: string) {
  const { mutate } = useSWRConfig();
  const [isRemixing, setIsRemixing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRemix = async (model?: string, models?: string[]) => {
    if (!promptId) {
      setError("Prompt ID is required");
      return;
    }

    setIsRemixing(true);
    setError(null);

    try {
      const res = await fetch("/api/remix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ promptId, model, models }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to remix prompt");
      }

      // Revalidate the check-remixed hook
      mutate(`/api/check-remixed?promptId=${promptId}`);

      // Return the new prompt id if available
      const data = await res.json();
      return data.newPromptId;
    } catch (e: any) {
      setError(e.message);
      return undefined;
    } finally {
      setIsRemixing(false);
    }
  };

  return {
    handleRemix,
    isRemixing,
    error,
  };
}
