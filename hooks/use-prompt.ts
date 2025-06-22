import useSWR from "swr";
import { type PromptWithAuthor } from "@/lib/queries";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePrompt(promptId?: string) {
  const { data, error, isLoading } = useSWR<PromptWithAuthor>(
    promptId ? `/api/prompts/${promptId}` : null,
    fetcher
  );

  return {
    prompt: data,
    isLoading,
    error,
  };
}
