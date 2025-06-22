import { useState } from "react";
import { useSWRConfig } from "swr";

export function useStarMutation(promptId?: string) {
  const { mutate } = useSWRConfig();
  const [isStaring, setIsStaring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStar = async () => {
    if (!promptId) {
      setError("Prompt ID is required");
      return;
    }

    setIsStaring(true);
    setError(null);

    try {
      const res = await fetch("/api/star", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ promptId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to star prompt");
      }

      // Revalidate the check-starred hook
      mutate(`/api/check-starred?promptId=${promptId}`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsStaring(false);
    }
  };

  return {
    handleStar,
    isStaring,
    error,
  };
}
