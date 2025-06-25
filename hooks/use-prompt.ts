import useSWR from "swr";
import { useMemo } from "react";
import { type PromptWithAuthor } from "@/lib/queries";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePrompt(promptId?: string) {
  const shouldFetch = !!promptId;

  const url = useMemo(
    () => (shouldFetch ? `/api/prompts/${promptId}` : null),
    [shouldFetch, promptId]
  );

  const { data, error, isLoading } = useSWR<
    PromptWithAuthor | { error: string }
  >(url, fetcher);

  // If the API returns an error, treat as not found
  const isErrorObject = data && typeof data === "object" && "error" in data;

  return {
    prompt: isErrorObject ? null : data,
    isLoading: shouldFetch ? isLoading : false,
    error: shouldFetch ? error : null,
  };
}
