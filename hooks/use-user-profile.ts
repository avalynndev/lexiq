import useSWR from "swr";
import { useMemo } from "react";
import { type PromptWithAuthor } from "@/lib/queries";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type UserWithStats = {
  id: string;
  name: string;
  username: string | null;
  image?: string | null;
  stars: number;
  remixes: number;
};

interface UserProfileData {
  user: UserWithStats;
  prompts: PromptWithAuthor[];
}

export function useUserProfile(username?: string) {
  const shouldFetch = !!username;

  const url = useMemo(
    () => (shouldFetch ? `/api/users/${username}` : null),
    [shouldFetch, username],
  );

  const { data, error, isLoading } = useSWR<UserProfileData>(url, fetcher);

  return {
    data,
    isLoading: shouldFetch ? isLoading : false,
    error: shouldFetch ? error : null,
  };
}
