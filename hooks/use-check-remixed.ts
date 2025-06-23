import useSWR from "swr";
import { useMemo } from "react";

interface CheckRemixedResponse {
  isRemixed: boolean;
}

// Safe fetcher with error handling
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCheckRemixed(promptId?: string, session?: { user?: any }) {
  const shouldFetch = !!promptId && !!session?.user;

  const url = useMemo(
    () =>
      shouldFetch
        ? `/api/check-remixed?promptId=${encodeURIComponent(promptId!)}`
        : null,
    [shouldFetch, promptId],
  );

  const { data, error, isLoading } = useSWR<CheckRemixedResponse>(
    url,
    fetcher,
    {
      refreshInterval: 5 * 60 * 1000,
      revalidateOnFocus: true,
      dedupingInterval: 60 * 1000,
    },
  );

  return {
    isRemixed: data?.isRemixed ?? false,
    isLoading: shouldFetch ? isLoading : false,
    error: shouldFetch ? error : null,
  };
}
