"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PromptCard } from "@/components/prompt-card";
import { Separator } from "@/components/ui/separator";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileClient({ username }: { username: string }) {
  console.log(username);
  const { data, isLoading, error } = useUserProfile(username);

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (error || !data || !data.prompts || !data.user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen w-full px-4">
        <h2 className="text-2xl font-bold mb-6">User not found</h2>
        <p className="text-muted-foreground">
          Could not retrieve profile for @{username}.
        </p>
      </div>
    );
  }

  const { user, prompts } = data;

  const stats = [
    { name: "Prompts", value: prompts.length },
    { name: "Remixes", value: user.remixes },
    { name: "Stars", value: user.stars },
  ];

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4">
      <Card className="mb-8 overflow-hidden">
        <CardHeader className="px-6">
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
              <AvatarFallback>
                {user.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl md:text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 divide-x">
            {stats.map((stat, index) => (
              <div key={index} className="px-4 text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-bold mb-6">Public Prompts</h2>
        {prompts.filter((prompt) => prompt.isPublic !== false).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts
              .filter((prompt) => prompt.isPublic !== false)
              .map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={{
                    ...prompt,
                    author: {
                      ...prompt.author,
                      username: prompt.author.username ?? "Anonymous",
                    },
                    tags: prompt.tags ?? [],
                    models: prompt.models ?? [],
                  }}
                />
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              This user has not published any prompts yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const UserProfileSkeleton = () => (
  <div className="container mx-auto max-w-5xl py-8 px-4">
    <Card className="mb-8 overflow-hidden">
      <CardHeader className="px-6">
        <div className="flex items-center space-x-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 divide-x">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="px-4 text-center space-y-1">
              <Skeleton className="h-7 w-12 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    <Separator className="my-8" />
    <div>
      <Skeleton className="h-8 w-40 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);
