"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconChevronDown,
  IconClock,
  IconLayoutGrid,
  IconMail,
  IconCirclePlusFilled,
  IconDotsVertical,
  IconUserCircle,
  IconCreditCard,
  IconNotification,
  IconLogout,
  IconDots,
  IconTrash,
  IconShare3,
  IconStar,
  IconTrendingUp,
  IconBook,
  IconSparkles,
  IconRocket,
  IconHeart,
  IconCode,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSession } from "@/lib/auth-client";
import { fetchUserPrompts, type PromptWithAuthor } from "@/lib/actions";
import Link from "next/link";
import { CreatePromptModal } from "@/components/create-prompt-modal";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

const data = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Explore",
    url: "/explore",
    icon: IconSearch,
  },
  {
    title: "Trending",
    url: "/trending",
    icon: IconTrendingUp,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: IconLayoutGrid,
  },
  {
    title: "Collections",
    url: "/collections",
    icon: IconFolder,
  },
];

export function AppSidebar({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [userPrompts, setUserPrompts] = React.useState<PromptWithAuthor[]>([]);
  const [loading, setLoading] = React.useState(true);
  const isMobile = useIsMobile();

  React.useEffect(() => {
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

  return (
    <Sidebar className={className}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">
                <CreatePromptModal>
                  <SidebarMenuButton
                    tooltip="Create Prompt"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                  >
                    <IconCirclePlusFilled />
                    <span>Create Prompt</span>
                  </SidebarMenuButton>
                </CreatePromptModal>
                <Button
                  size="icon"
                  className="size-8 group-data-[collapsible=icon]:opacity-0"
                  variant="outline"
                  asChild
                >
                  <Link href="/explore">
                    <IconSearch />
                    <span className="sr-only">Explore</span>
                  </Link>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              {data.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Your Prompts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {loading ? (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    <IconClock className="animate-spin" />
                    <span>Loading...</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : userPrompts.length > 0 ? (
                userPrompts.slice(0, 5).map((prompt) => (
                  <SidebarMenuItem key={prompt.id}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link href={`/prompt/${prompt.id}`}>
                            <IconFileDescription />
                            <span className="truncate">{prompt.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-24 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align={isMobile ? "end" : "start"}
                      >
                        <DropdownMenuItem asChild>
                          <Link href={`/prompt/${prompt.id}`}>
                            <IconBook />
                            <span>View</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/prompt/${prompt.id}/edit`}>
                            <IconFileDescription />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <IconShare3 />
                          <span>Share</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <IconTrash />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    disabled
                    className="text-sidebar-foreground/70"
                  >
                    <IconCirclePlusFilled className="text-sidebar-foreground/70" />
                    <span>Create your first prompt</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {userPrompts.length > 5 && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="text-sidebar-foreground/70"
                    asChild
                  >
                    <Link href="/dashboard">
                      <IconDots className="text-sidebar-foreground/70" />
                      <span>View all ({userPrompts.length})</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
