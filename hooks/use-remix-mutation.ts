import { useState } from "react";
import { useSWRConfig } from "swr";

export function useRemixMutation(promptId?: string) {
  const { mutate } = useSWRConfig();
  const [isRemixing, setIsRemixing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRemix = async () => {
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
        body: JSON.stringify({ promptId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to remix prompt");
      }

      // Revalidate the check-remixed hook
      mutate(`/api/check-remixed?promptId=${promptId}`);
    } catch (e: any) {
      setError(e.message);
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
