import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCheckForked(promptId?: string) {
  const { data, error, isLoading } = useSWR<{ isForked: boolean }>(
    promptId ? `/api/check-forked?promptId=${promptId}` : null,
    fetcher,
    {
      refreshInterval: 5000,
      dedupingInterval: 4000,
    }
  );

  return {
    isForked: data?.isForked,
    isLoading,
    error,
  };
}
