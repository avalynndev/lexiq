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
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, formatDistanceToNow } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { copyToClipboardWithMeta } from "@/components/docs/copy-button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

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
    title: "Community",
    url: "/community",
    icon: IconSearch,
  },
  {
    title: "Stared Prompts",
    url: "/stars",
    icon: IconStar,
  },
];

export function AppSidebar({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [userPrompts, setUserPrompts] = React.useState<PromptWithAuthor[]>([]);
  const [loading, setLoading] = React.useState(true);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const [deleting, setDeleting] = React.useState(false);

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

  const filteredPrompts = userPrompts.filter((prompt) => {
    const isPublic = prompt.isPublic !== false;
    const isOwner =
      session?.user?.username &&
      prompt.author.username === session.user.username;
    return isPublic || isOwner;
  });

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
                  <Link href="/community">
                    <IconSearch />
                    <span className="sr-only">Explore</span>
                  </Link>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              {data.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    asChild
                    isActive={pathname === item.url}
                    className={
                      pathname === item.url
                        ? "bg-neutral-200 dark:bg-neutral-800"
                        : undefined
                    }
                  >
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
            {loading ? (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    <IconClock className="animate-spin" />
                    <span>Loading...</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            ) : filteredPrompts.length > 0 ? (
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <SidebarMenu>
                  {(() => {
                    // Group prompts by date modified
                    const groupedPrompts = filteredPrompts.reduce(
                      (groups, prompt) => {
                        const date = new Date(prompt.lastUpdated);
                        const today = new Date();
                        const yesterday = new Date(today);
                        yesterday.setDate(yesterday.getDate() - 1);

                        let groupKey = "Older";
                        if (date.toDateString() === today.toDateString()) {
                          groupKey = "Today";
                        } else if (
                          date.toDateString() === yesterday.toDateString()
                        ) {
                          groupKey = "Yesterday";
                        } else if (
                          date.getTime() >
                          today.getTime() - 7 * 24 * 60 * 60 * 1000
                        ) {
                          groupKey = "This Week";
                        }

                        if (!groups[groupKey]) {
                          groups[groupKey] = [];
                        }
                        groups[groupKey].push(prompt);
                        return groups;
                      },
                      {} as Record<string, PromptWithAuthor[]>
                    );

                    // Sort groups in desired order
                    const groupOrder = [
                      "Today",
                      "Yesterday",
                      "This Week",
                      "Older",
                    ];

                    return groupOrder.map((groupKey) => {
                      const prompts = groupedPrompts[groupKey];
                      if (!prompts || prompts.length === 0) return null;

                      return (
                        <div key={groupKey}>
                          <SidebarGroupLabel className="text-xs text-muted-foreground px-2 py-1">
                            {groupKey}
                          </SidebarGroupLabel>
                          {prompts.map((prompt) => {
                            const promptUrl = `/prompt/${prompt.id}`;
                            return (
                              <SidebarMenuItem
                                key={prompt.id}
                                className="max-w-50"
                              >
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                      asChild
                                      isActive={pathname === promptUrl}
                                      className={
                                        pathname === promptUrl
                                          ? "bg-neutral-200 dark:bg-neutral-800"
                                          : undefined
                                      }
                                    >
                                      <Link href={promptUrl}>
                                        <IconFileDescription />
                                        <span className="truncate">
                                          {prompt.title}
                                        </span>
                                      </Link>
                                    </SidebarMenuButton>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    className="w-32 rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                  >
                                    <DropdownMenuItem asChild>
                                      <Link href={promptUrl}>
                                        <IconBook />
                                        <span>View</span>
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                      <Link href={`${promptUrl}/edit`}>
                                        <IconFileDescription />
                                        <span>Edit</span>
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={async () => {
                                        copyToClipboardWithMeta(
                                          `${window.location.origin}${promptUrl}`
                                        );
                                        toast.message(
                                          "Prompt URL copied to clipboard.",
                                          {
                                            description:
                                              "You can now share this link.",
                                          }
                                        );
                                      }}
                                    >
                                      <IconShare3 />
                                      <span>Share</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <DropdownMenuItem variant="destructive">
                                          <IconTrash />
                                          <span>Delete</span>
                                        </DropdownMenuItem>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Delete Prompt
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to delete this
                                            prompt? This action cannot be
                                            undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel
                                            disabled={deleting}
                                          >
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            disabled={deleting}
                                            onClick={async () => {
                                              setDeleting(true);
                                              try {
                                                const res = await fetch(
                                                  `/api/prompts/${prompt.id}`,
                                                  {
                                                    method: "DELETE",
                                                  }
                                                );
                                                if (res.ok) {
                                                  setUserPrompts((prev) =>
                                                    prev.filter(
                                                      (p) => p.id !== prompt.id
                                                    )
                                                  );
                                                  toast.success(
                                                    "Prompt deleted successfully"
                                                  );
                                                  router.refresh();
                                                } else {
                                                  const data = await res.json();
                                                  toast.error(
                                                    "Failed to delete prompt.",
                                                    {
                                                      description:
                                                        data.error || undefined,
                                                    }
                                                  );
                                                }
                                              } catch (err) {
                                                toast.error(
                                                  "Failed to delete prompt."
                                                );
                                              } finally {
                                                setDeleting(false);
                                              }
                                            }}
                                          >
                                            {deleting
                                              ? "Deleting..."
                                              : "Delete"}
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </SidebarMenuItem>
                            );
                          })}
                        </div>
                      );
                    });
                  })()}
                </SidebarMenu>
              </ScrollArea>
            ) : (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    disabled
                    className="text-sidebar-foreground/70"
                  >
                    <IconCirclePlusFilled className="text-sidebar-foreground/70" />
                    <span>Create your first prompt</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
