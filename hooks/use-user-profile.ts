import useSWR from "swr";
import { type PromptWithAuthor } from "@/lib/queries";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type UserWithStats = {
  id: string;
  name: string;
  username: string | null;
  image?: string | null;
  stars: number;
  forks: number;
};

interface UserProfileData {
  user: UserWithStats;
  prompts: PromptWithAuthor[];
}

export function useUserProfile(username?: string) {
  const { data, error, isLoading } = useSWR<UserProfileData>(
    username ? `/api/users/${username}` : null,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
}
