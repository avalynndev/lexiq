import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCheckStarred(promptId?: string, session?: any) {
  if (!promptId || !session) {
    return { isStarred: false, isLoading: false, error: null };
  }
  const { data, error, isLoading } = useSWR<{ isStarred: boolean }>(
    `/api/check-starred?promptId=${promptId}`,
    fetcher
  );

  return {
    isStarred: data?.isStarred,
    isLoading,
    error,
  };
}
