import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCheckRemixed(promptId?: string, session?: any) {
  if (!promptId || !session) {
    return { isRemixed: false, isLoading: false, error: null };
  }
  const { data, error, isLoading } = useSWR<{ isRemixed: boolean }>(
    `/api/check-remixed?promptId=${promptId}`,
    fetcher
  );

  return {
    isRemixed: data?.isRemixed,
    isLoading,
    error,
  };
}
