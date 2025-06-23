import useSWR from "swr";
import { useMemo } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePromptStars(promptId?: string) {
  const shouldFetch = !!promptId;

  const url = useMemo(
    () =>
      shouldFetch
        ? `/api/prompt-stars?promptId=${encodeURIComponent(promptId!)}`
        : null,
    [shouldFetch, promptId],
  );

  const { data, error, isLoading } = useSWR<{ stars: number }>(url, fetcher, {
    refreshInterval: 5000, // Poll every 5 seconds
    dedupingInterval: 4000, // Cache for 4 seconds before refetching
  });

  return {
    stars: data?.stars,
    isLoading: shouldFetch ? isLoading : false,
    error: shouldFetch ? error : null,
  };
}
