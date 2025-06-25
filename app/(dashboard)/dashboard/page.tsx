"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  TrendingUp,
  Star,
  GitFork,
  Eye,
  Plus,
  Calendar,
  Users,
  Activity,
  Sparkles,
  BookOpen,
  Clock,
  Shield,
  FileText,
} from "lucide-react";
import { fetchUserPrompts, type PromptWithAuthor } from "@/lib/actions";
import { useSession } from "@/lib/auth-client";
import { formatDistanceToNow } from "date-fns";
import { CreatePromptModal } from "@/components/create-prompt-modal";
import { Spinner } from "@/components/ui/spinner";
import { usePromptStars } from "@/hooks/use-prompt-stars";
import { usePromptRemixes } from "@/hooks/use-prompt-remixes";
import type { FC } from "react";
import Link from "next/link";

interface RecentPromptsActivityProps {
  prompt: PromptWithAuthor;
}

const RecentPromptsActivity: FC<RecentPromptsActivityProps> = ({ prompt }) => {
  const { stars: liveStars, isLoading: isStarsLoading } = usePromptStars(
    prompt.id,
  );
  const { remixes: liveRemixes, isLoading: isRemixesLoading } =
    usePromptRemixes(prompt.id);
  const safeStars =
    isStarsLoading || liveStars === undefined || liveStars === null
      ? prompt.stars
      : liveStars;
  const safeRemixes =
    isRemixesLoading || liveRemixes === undefined || liveRemixes === null
      ? prompt.remixes
      : liveRemixes;
  return (
    <Link href={`/prompt/${prompt.id}`}>
      <div className="flex items-center justify-between p-3 rounded-lg border mb-4">
        <div className="flex-1">
          <h4 className="font-medium">{prompt.title}</h4>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(prompt.createdOn), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            {safeStars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            {safeRemixes}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [userPrompts, setUserPrompts] = useState<PromptWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserPrompts = async () => {
      try {
        if (session?.user?.id) {
          const data = await fetchUserPrompts(session.user.id);
          setUserPrompts(data);
        }
      } catch (error) {
        console.error("Error fetching user prompts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      loadUserPrompts();
    }
  }, [session]);

  // Calculate stats
  const totalPrompts = userPrompts.length;
  const totalStars = userPrompts.reduce((sum, prompt) => sum + prompt.stars, 0);
  const totalForks = userPrompts.reduce(
    (sum, prompt) => sum + prompt.remixes,
    0,
  );
  const recentPrompts = userPrompts
    .sort(
      (a, b) =>
        new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime(),
    )
    .slice(0, 5);

  const stats = [
    {
      title: "Total Prompts",
      value: totalPrompts,
      icon: BookOpen,
      description: "Your created prompts",
      color: "text-blue-500",
    },
    {
      title: "Total Stars",
      value: totalStars,
      icon: Star,
      description: "Stars received",
      color: "text-yellow-500",
    },
    {
      title: "Total Remixes",
      value: totalForks,
      icon: GitFork,
      description: "Times Remixed",
      color: "text-green-500",
    },
  ];

  return (
    <>
      <header className="flex h-(--header-height) bg-sidebar shrink-0 rounded-t-xl border-t border-x items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full pt-5 p-5">
          <div className="flex flex-col flex-1 border-alpha-200 border-t sm:border-t-0">
            <div className="flex items-center gap-3 pl-4 pr-3 sm:pl-3 sm:pr-2 h-12 border-b border-alpha-200 sm:mx-0 shrink-0">
              <SidebarTrigger className="-ml-1" />
              <h1 className="hidden truncate text-base font-medium sm:inline sm:tracking-tight">
                Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-6.5rem)] px-4 py-2 rounded-b-xl border-b border-x">
        {loading ? (
          <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
            <Spinner size="large" />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {session?.user?.username || "User"}! 👋
              </h1>
              <p className="text-muted-foreground">
                Here&apos;s what&apos;s happening with your prompts today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <Card
                    key={stat.title}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <IconComponent className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {stat.value.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recentPrompts.length > 0 ? (
                    <div className="space-y-6">
                      {recentPrompts.map((prompt) => (
                        <RecentPromptsActivity
                          prompt={prompt}
                          key={prompt.id}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No prompts yet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Create your first prompt to get started
                      </p>
                      <CreatePromptModal>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Prompt
                        </Button>
                      </CreatePromptModal>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <CreatePromptModal>
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Prompt
                      </Button>
                    </CreatePromptModal>
                    <Link href="/learn">
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Learn
                      </Button>
                    </Link>
                    <Link href="/stars">
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        My Stars
                      </Button>
                    </Link>
                    <Link href="/community">
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Community
                      </Button>
                    </Link>
                    <Link href="/privacy-policy">
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Privacy Policy
                      </Button>
                    </Link>
                    <Link href="/terms-conditions">
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Terms & Conditions
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </ScrollArea>
    </>
  );
}
