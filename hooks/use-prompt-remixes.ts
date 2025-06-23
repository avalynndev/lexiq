import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePromptRemixes(promptId?: string) {
  const { data, error, isLoading } = useSWR<{ remixes: number }>(
    promptId ? `/api/prompt-remixes?promptId=${promptId}` : null,
    fetcher,
    {
      refreshInterval: 5000, // Poll every 5 seconds
      dedupingInterval: 4000, // Cache for 4 seconds before refetching
    }
  );

  return {
    remixes: data?.remixes,
    isLoading,
    error,
  };
}
