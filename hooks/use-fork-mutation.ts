import { useState } from "react";
import { useSWRConfig } from "swr";

export function useForkMutation(promptId?: string) {
  const { mutate } = useSWRConfig();
  const [isForking, setIsForking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFork = async () => {
    if (!promptId) {
      setError("Prompt ID is required");
      return;
    }

    setIsForking(true);
    setError(null);

    try {
      const res = await fetch("/api/fork", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ promptId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fork prompt");
      }

      // Revalidate the check-forked hook
      mutate(`/api/check-forked?promptId=${promptId}`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsForking(false);
    }
  };

  return {
    handleFork,
    isForking,
    error,
  };
}
