import useSWR from "swr";

const fetcher = async (url: string): Promise<{ remixes: number }> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch failed with status ${res.status}`);
  }
  return res.json();
};

export function usePromptRemixes(promptId?: string) {
  const shouldFetch = !!promptId;
  const key = shouldFetch
    ? `/api/prompt-remixes?promptId=${encodeURIComponent(promptId)}`
    : null;

  const { data, error, isLoading } = useSWR<{ remixes: number }>(key, fetcher, {
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
