import useSWR from "swr";
import { useMemo } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCheckStarred(promptId?: string, session?: { user?: any }) {
  const shouldFetch = !!promptId && !!session?.user;

  const url = useMemo(
    () =>
      shouldFetch
        ? `/api/check-starred?promptId=${encodeURIComponent(promptId!)}`
        : null,
    [shouldFetch, promptId]
  );

  const { data, error, isLoading } = useSWR<
    { isStarred: boolean } | { error: string }
  >(url, fetcher, {
    refreshInterval: 3 * 60 * 1000,
    revalidateOnFocus: false,
    dedupingInterval: 60 * 1000,
  });

  const isErrorObject = data && typeof data === "object" && "error" in data;

  return {
    isStarred: isErrorObject ? false : (data?.isStarred ?? false),
    isLoading: shouldFetch ? isLoading : false,
    error: shouldFetch ? error : null,
  };
}
