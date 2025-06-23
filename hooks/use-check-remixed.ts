import useSWR from "swr";

interface CheckRemixedResponse {
  isRemixed: boolean;
}

// Safe fetcher with error handling
const fetcher = async (url: string): Promise<CheckRemixedResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch failed with status ${res.status}`);
  }
  return res.json();
};

export function useCheckRemixed(promptId?: string, session?: any) {
  const shouldFetch = !!promptId && !!session?.user;

  const key = shouldFetch
    ? `/api/check-remixed?promptId=${encodeURIComponent(promptId!)}`
    : null;

  const { data, error, isLoading } = useSWR<CheckRemixedResponse>(
    key,
    fetcher,
    {
      refreshInterval: 5 * 60 * 1000,
      revalidateOnFocus: true,
      dedupingInterval: 60 * 1000,
    }
  );

  return {
    isRemixed: data?.isRemixed ?? false,
    isLoading: shouldFetch ? isLoading : false,
    error: shouldFetch ? error : null,
  };
}
