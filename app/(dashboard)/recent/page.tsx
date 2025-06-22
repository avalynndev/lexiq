"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, Lock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const recentChats = [
  {
    id: "generate-text-aWoH56GmFNP",
    title: "Generate text",
    description: "generayte this",
    project: "Generate text",
    projectId: "rvUSFxW1Se4",
    updatedAt: "16 hours ago",
    isPrivate: true,
  },
  {
    id: "hover-sidebar-design-xCmCbQ3Bo8G",
    title: "Hover sidebar design",
    description:
      "make a hover open sidebar with black screen color and the screen in cetner where the main text and data goes some toehr color",
    project: "Hover sidebar design",
    projectId: "i8Ys6LG9Hoc",
    updatedAt: "20 hours ago",
    isPrivate: true,
  },
  {
    id: "clone-v0-community-homepage-QkX52F6v0Yf",
    title: "Clone v0 community homepage",
    description:
      "clone this homepage of v0.dev/community with the layout file and the sidebar absolutely similar to v0 please",
    project: "Clone v0 community homepage",
    projectId: "BoTJD6yoCTE",
    updatedAt: "21 hours ago",
    isPrivate: true,
  },
  {
    id: "clone-this-ui-DCzCKOdTjdi",
    title: "Clone this UI",
    description: "clone this ui",
    project: "Clone this UI",
    projectId: "PjXvCG4w5ou",
    updatedAt: "3 days ago",
    isPrivate: true,
  },
  {
    id: "vercel-clone-hkoHbFhiWl7",
    title: "Vercel clone",
    description:
      "create a clone of the sidebar and mainscreen of v0. most possible create a whole clone with placeholders of v0",
    project: "Vercel clone",
    projectId: "VPeuKPJu4rl",
    updatedAt: "3 days ago",
    isPrivate: true,
  },
  {
    id: "clone-of-this-website-rdGgUwuR5FK",
    title: "Clone of this website",
    description: "create a clone of this",
    project: "Clone of this website",
    projectId: "wCEjM1omwOp",
    updatedAt: "3 days ago",
    isPrivate: true,
  },
  {
    id: "navbar-clone-request-Cv0DI6zP7SX",
    title: "Navbar clone request",
    description:
      "Create a clone of the ui.shadcn.com page navbar like the one i sent",
    project: "Navbar clone request",
    projectId: "KYhp91euCcq",
    updatedAt: "3 days ago",
    isPrivate: true,
  },
  {
    id: "logo-particles-v0-aws-ra5cci7D1ja",
    title: "Logo particles (v0 + aws)",
    description: "Start a new chat from this template.",
    updatedAt: "May 8, 2025",
    isPrivate: false,
  },
  {
    id: "clone-website-iC596eL2jSq",
    title: "Clone website",
    description: "make a clone of this",
    updatedAt: "May 8, 2025",
    isPrivate: false,
  },
  {
    id: "beautiful-animation-code-tUYsXXia0ls",
    title: "Beautiful animation code",
    description:
      "make a clone of this and there should be animation int he world beautiful here is some exmaple code for beautiful i found",
    updatedAt: "May 1, 2025",
    isPrivate: false,
  },
  {
    id: "clone-this-website-i8o70mNpJRP",
    title: "Clone this website",
    description: "clone this",
    updatedAt: "May 1, 2025",
    isPrivate: false,
  },
  {
    id: "open-in-v0-VUgl2DaGEfB",
    title: "Open in v0",
    description: "Open in v0",
    updatedAt: "May 1, 2025",
    isPrivate: false,
  },
];

export default function RecentPage() {
  return (
    <>
      <header className="flex h-(--header-height) bg-sidebar shrink-0 rounded-t-xl border-t border-x items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full pt-20 p-5">
          <div className="flex flex-col flex-1 border-alpha-200 border-t sm:border-t-0">
            <div className="flex items-center gap-3 pl-4 pr-3 sm:pl-3 sm:pr-2 h-12 border-b border-alpha-200 sm:mx-0 shrink-0">
              <SidebarTrigger className="-ml-1" />
              <h1 className="hidden truncate text-base font-medium sm:inline sm:tracking-tight">
                Recents
              </h1>

              <div className="flex flex-1 items-center empty:hidden sm:ml-2 -ml-1.5">
                <Tabs defaultValue="chats" className="w-full">
                  <TabsList className="bg-background flex gap-0.5 h-11 items-center">
                    <TabsTrigger value="chats" asChild>
                      <Link
                        href="/chat/history"
                        className="h-11 items-center font-normal"
                      >
                        Chats
                      </Link>
                    </TabsTrigger>
                    <TabsTrigger value="blocks" asChild>
                      <Link
                        href="/chat/blocks"
                        className="h-11 items-center font-normal"
                      >
                        Blocks
                      </Link>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex h-[50px] w-full items-center gap-2 px-4 border-b border-b-alpha-200 shrink-0 empty:hidden">
              <form className="flex flex-1 items-center gap-2">
                <label
                  className="pointer-events-none flex items-center justify-center rounded-lg"
                  htmlFor="q"
                >
                  <Search className="size-4 !text-gray-500" />
                  <span className="sr-only">Search</span>
                </label>

                <div className="flex w-full">
                  <div className="flex w-full items-center bg-background-subtle border py-1 px-1 h-full rounded-lg shadow-none border-none focus-within:border-alpha-600 disabled:border-alpha-300">
                    <Input
                      id="q"
                      name="q"
                      type="search"
                      placeholder="Search for a chat…"
                      className="w-full bg-transparent outline-none placeholder:text-gray-400 text-label-14 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:text-gray-400"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
      <ScrollArea className="h-[calc(100vh-6.5rem)] pt-16 rounded-b-xl border-b border-x">
        <div className="flex-1">
          <div className="@container/page-layout relative flex size-full min-h-0 flex-col">
            <div className="z-0 size-full overflow-y-auto p-4 pb-8">
              <div className="mx-auto flex flex-col gap-4 has-[.chat-warning]:h-full has-[.ignore-max-width]:!max-w-none max-w-[1360px]">
                <div className="flex h-full w-full flex-col">
                  <div className="flex flex-col items-stretch gap-4">
                    {recentChats.map((chat) => (
                      <div
                        key={chat.id}
                        className="shadow-base bg-background-subtle rounded-lg group relative flex min-h-[116px] flex-col transition-all hover:shadow-md"
                      >
                        <Link
                          className="absolute inset-0 z-10 cursor-pointer overflow-hidden rounded-lg"
                          href={`/chat/${chat.id}`}
                        >
                          <span className="sr-only">View Chat</span>
                        </Link>

                        <div className="grid flex-1 auto-rows-min items-start gap-3 p-3 pt-3.5 text-sm">
                          <div className="grid auto-rows-min items-start gap-2">
                            <div className="flex max-w-[90%] items-center gap-1">
                              <h3 className="whitespace-nowrap font-medium leading-none tracking-tight truncate">
                                {chat.title}
                              </h3>
                              {chat.isPrivate && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="outline-blue-600 p-0 h-auto"
                                >
                                  <Lock className="size-4 !text-gray-500" />
                                </Button>
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm line-clamp-1">
                              {chat.description}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 h-[1px] bg-alpha-200 mx-3 w-auto" />

                        <div className="flex items-center p-6 h-11 gap-3 rounded-b-lg px-3 py-0">
                          <div className="flex min-w-0 items-center gap-1 text-sm leading-none text-gray-500">
                            <Avatar className="size-4 rounded-sm">
                              <AvatarImage
                                src="https://vercel.com/api/www/avatar/Cv61GNQBnIyPeX5ME4SCG3s8"
                                alt="Avatar"
                              />
                              <AvatarFallback className="text-[0.5rem]">
                                U
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-foreground font-medium">
                              avalynndev
                            </span>
                            <span className="hidden truncate text-nowrap sm:inline">
                              Updated {chat.updatedAt}
                            </span>
                            <span className="inline truncate text-nowrap sm:hidden">
                              Updated {chat.updatedAt}
                            </span>
                          </div>

                          <div className="ml-auto flex items-center gap-2">
                            {chat.project && (
                              <Link
                                className="border-gray-200 bg-gray-200 text-gray-900 hover:border-gray-100 hover:bg-gray-100 focus:border-gray-100 focus:bg-gray-100 focus-visible:border-gray-100 focus-visible:bg-gray-100 h-5 gap-1 px-[6px] text-[0.69rem] rounded-full border font-medium pointer-events-auto block truncate relative z-10 max-w-[20vw] sm:max-w-[120px]"
                                href={`/chat/projects/${chat.projectId}`}
                              >
                                {chat.project}
                              </Link>
                            )}

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="relative z-10 size-7 shrink-0 rounded-md p-0 transition-none"
                                >
                                  <MoreHorizontal className="size-4" />
                                  <span className="sr-only">
                                    Open chat actions
                                  </span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center py-6 sm:py-7" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
