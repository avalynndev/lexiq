import useSWR from "swr";
import { useMemo } from "react";
import { type PromptWithAuthor } from "@/lib/queries";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePrompt(promptId?: string) {
  const shouldFetch = !!promptId;

  const url = useMemo(
    () => (shouldFetch ? `/api/prompts/${promptId}` : null),
    [shouldFetch, promptId],
  );

  const { data, error, isLoading } = useSWR<PromptWithAuthor>(url, fetcher);

  return {
    prompt: data,
    isLoading: shouldFetch ? isLoading : false,
    error: shouldFetch ? error : null,
  };
}
