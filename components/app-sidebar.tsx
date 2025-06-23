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
  IconPencil,
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
import { useUpdatePromptMutation } from "@/hooks/use-update-prompt-mutation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { usePrompt } from "@/hooks/use-prompt";

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

function EditPromptModal({
  open,
  onOpenChange,
  prompt,
  onUpdated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: PromptWithAuthor | null;
  onUpdated: (updatedPrompt: PromptWithAuthor) => void;
}) {
  const { handleUpdatePrompt, isUpdating, error } = useUpdatePromptMutation();
  const [formData, setFormData] = React.useState({
    title: prompt?.title || "",
    description: prompt?.description || "",
    prompt: prompt?.prompt || "",
    model: prompt?.model || "",
    models: prompt?.models || [],
    category: prompt?.category || "",
    tags: prompt?.tags || [],
    solves: prompt?.solves || "",
    isPublic: prompt?.isPublic ?? true,
  });
  const [tagInput, setTagInput] = React.useState("");
  React.useEffect(() => {
    if (prompt) {
      setFormData({
        title: prompt.title,
        description: prompt.description,
        prompt: prompt.prompt,
        model: prompt.model,
        models: prompt.models || [],
        category: prompt.category,
        tags: prompt.tags || [],
        solves: prompt.solves || "",
        isPublic: prompt.isPublic ?? true,
      });
      setTagInput("");
    }
  }, [prompt]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    if (
      !formData.title ||
      !formData.description ||
      !formData.prompt ||
      !formData.model ||
      !formData.category
    ) {
      toast.error("Missing required fields", {
        description: "Please fill in all required fields.",
      });
      return;
    }
    const updated = await handleUpdatePrompt(prompt.id, {
      ...formData,
      models: formData.models.filter((m) => m !== formData.model),
    });
    if (updated) {
      toast.success("Prompt updated successfully!");
      onUpdated(updated);
      onOpenChange(false);
    } else {
      toast.error("Error updating prompt", {
        description: error || "Something went wrong. Please try again.",
      });
    }
  };
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };
  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };
  // Use the same models/categories as CreatePromptModal
  const models = [
    "GPT-4",
    "Claude",
    "Gemini",
    "Llama",
    "Ollama",
    "Midjourney",
    "Mistral",
    "Microsoft Copilot",
    "Gemma (Google)",
    "Perplexity",
    "DALL·E (OpenAI)",
    "Flux",
    "Grok",
    "Qwen",
    "DeepSeek",
    "Notebook LM",
    "GitHub Copilot",
  ];
  const categories = [
    "Writing",
    "Development",
    "Analytics",
    "Marketing",
    "Education",
    "E-commerce",
    "Legal",
    "Research",
    "Design",
    "Business",
    "Social Media",
    "Academic",
  ];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Prompt</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt Content *</Label>
            <Textarea
              id="prompt"
              value={formData.prompt}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, prompt: e.target.value }))
              }
              rows={6}
              className="font-mono text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Primary Model *</Label>
            <Select
              value={formData.model}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  model: value,
                  models: prev.models.filter((m) => m !== value),
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a primary model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="models">Additional AI Models</Label>
            <div className="flex flex-wrap gap-2">
              {models
                .filter((model) => model !== formData.model)
                .map((model) => (
                  <Button
                    key={model}
                    type="button"
                    variant={
                      formData.models.includes(model) ? "default" : "outline"
                    }
                    onClick={() =>
                      setFormData((prev) =>
                        prev.models.includes(model)
                          ? {
                              ...prev,
                              models: prev.models.filter((m) => m !== model),
                            }
                          : { ...prev, models: [...prev.models, model] },
                      )
                    }
                  >
                    {model}
                  </Button>
                ))}
            </div>
            {formData.models.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.models.map((model) => (
                  <Badge key={model} variant="secondary" className="gap-1">
                    <span>{model}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          models: prev.models.filter((m) => m !== model),
                        }))
                      }
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add tags (press Enter to add)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                +
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="solves">What problem does this solve?</Label>
            <Textarea
              id="solves"
              value={formData.solves}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, solves: e.target.value }))
              }
              rows={2}
            />
          </div>
          <div className="flex justify-end gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Switch
                id="public-switch"
                checked={formData.isPublic}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    isPublic: checked === true,
                  }))
                }
              />
              <Label htmlFor="public-switch">Public</Label>
            </div>
            <Button type="submit" disabled={isUpdating} className="w-32">
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AppSidebar({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [userPrompts, setUserPrompts] = React.useState<PromptWithAuthor[]>([]);
  const [loading, setLoading] = React.useState(true);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const [deleting, setDeleting] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editingPrompt, setEditingPrompt] =
    React.useState<PromptWithAuthor | null>(null);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
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
      interval = setInterval(loadUserPrompts, 5000); // Poll every 5 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [session]);

  const filteredPrompts = userPrompts.filter(
    (prompt) => prompt.isPublic !== false,
  );

  const handlePromptUpdated = async (updatedPrompt: PromptWithAuthor) => {
    setEditModalOpen(false);
    setEditingPrompt(null);
    router.refresh();
    window.location.reload();
  };

  return (
    <Sidebar className={className}>
      <EditPromptModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        prompt={editingPrompt}
        onUpdated={handlePromptUpdated}
      />
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
                      {} as Record<string, PromptWithAuthor[]>,
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
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setEditingPrompt(prompt);
                                        setEditModalOpen(true);
                                      }}
                                    >
                                      <IconPencil />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={async () => {
                                        copyToClipboardWithMeta(
                                          `${window.location.origin}${promptUrl}`,
                                        );
                                        toast.message(
                                          "Prompt URL copied to clipboard.",
                                          {
                                            description:
                                              "You can now share this link.",
                                          },
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
                                                  },
                                                );
                                                if (res.ok) {
                                                  setUserPrompts((prev) =>
                                                    prev.filter(
                                                      (p) => p.id !== prompt.id,
                                                    ),
                                                  );
                                                  toast.success(
                                                    "Prompt deleted successfully",
                                                  );
                                                  router.refresh();
                                                } else {
                                                  const data = await res.json();
                                                  toast.error(
                                                    "Failed to delete prompt.",
                                                    {
                                                      description:
                                                        data.error || undefined,
                                                    },
                                                  );
                                                }
                                              } catch (err) {
                                                toast.error(
                                                  "Failed to delete prompt.",
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
