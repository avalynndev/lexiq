import useSWR from "swr";
import { useMemo } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePromptRemixes(promptId?: string) {
  const shouldFetch = !!promptId;

  const url = useMemo(
    () =>
      shouldFetch
        ? `/api/prompt-remixes?promptId=${encodeURIComponent(promptId!)}`
        : null,
    [shouldFetch, promptId]
  );

  const { data, error, isLoading } = useSWR<{ remixes: number }>(url, fetcher, {
    refreshInterval: 50000,
    dedupingInterval: 40000,
    revalidateOnFocus: false,
  });

  return {
    remixes: data?.remixes ?? 0,
    isLoading: shouldFetch ? isLoading : false,
    error: shouldFetch ? error : null,
  };
}
