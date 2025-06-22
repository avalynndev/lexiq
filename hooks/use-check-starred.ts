import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCheckStarred(promptId?: string) {
  const { data, error, isLoading } = useSWR<{ isStarred: boolean }>(
    promptId ? `/api/check-starred?promptId=${promptId}` : null,
    fetcher,
    {
      refreshInterval: 5000, // Poll every 5 seconds
      dedupingInterval: 4000, // Cache for 4 seconds before refetching
    }
  );

  return {
    isStarred: data?.isStarred,
    isLoading,
    error,
  };
}
