"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Sparkles } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";

const models = ["GPT-4", "Claude", "Gemini", "Llama"];
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

interface CreatePromptModalProps {
  children: React.ReactNode;
}

export function CreatePromptModal({ children }: CreatePromptModalProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prompt: "",
    model: "",
    category: "",
    tags: [] as string[],
    solves: "",
    isPublic: true,
  });
  const [tagInput, setTagInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a prompt.",
        variant: "destructive",
      });
      return;
    }

    // Validate required fields
    if (
      !formData.title ||
      !formData.description ||
      !formData.prompt ||
      !formData.model ||
      !formData.category
    ) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/create-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          authorId: session.user.id,
          createdOn: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create prompt");
      }

      const newPrompt = await response.json();

      toast({
        title: "Prompt created successfully!",
        description: "Your prompt has been published.",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        prompt: "",
        model: "",
        category: "",
        tags: [],
        solves: "",
        isPublic: true,
      });
      setTagInput("");
      setOpen(false);

      // Refresh the page or update the prompts list
      window.location.reload();
    } catch (error) {
      console.error("Error creating prompt:", error);
      toast({
        title: "Error creating prompt",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Create New Prompt
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter a descriptive title for your prompt"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe what this prompt does and how it helps users"
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

          {/* Prompt Content */}
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt Content *</Label>
            <Textarea
              id="prompt"
              placeholder="Enter your AI prompt here. Be specific and detailed for best results."
              value={formData.prompt}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, prompt: e.target.value }))
              }
              rows={6}
              className="font-mono text-sm"
              required
            />
          </div>

          {/* Model and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model">Primary Model *</Label>
              <Select
                value={formData.model}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, model: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
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
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
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
          </div>

          {/* Tags */}
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
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Solves */}
          <div className="space-y-2">
            <Label htmlFor="solves">What problem does this solve?</Label>
            <Textarea
              id="solves"
              placeholder="Describe the specific problem or use case this prompt addresses"
              value={formData.solves}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, solves: e.target.value }))
              }
              rows={2}
            />
          </div>

          {/*- Visibility --*/}
          <div className="space-y-2 !mt-4 flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="is-public" className="text-base">
                Public
              </Label>
              <p className="text-sm text-muted-foreground">
                Anyone on the internet can see this prompt.
              </p>
            </div>
            <Switch
              id="is-public"
              checked={formData.isPublic}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isPublic: checked }))
              }
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="large" className="size-6 mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Create Prompt
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
