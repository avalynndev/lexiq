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
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { useCreatePromptMutation } from "@/hooks/use-create-prompt-mutation";
import {
  OpenAILogo,
  ClaudeLogo,
  GeminiLogo,
  MetaIconOutline,
  OllamaLogo,
  MidjourneyLogo,
  MistralLogo,
  MicrosoftCopilotLogo,
  GemmaLogo,
  PerplexityLogo,
  DalleLogo,
  FluxLogo,
  GrokLogo,
  QwenLogo,
  DeepSeekLogo,
  NotebookLmlogo,
  GithubCopilotLogo,
} from "@/components/logos";

const models = [
  { name: "GPT-4", icon: OpenAILogo },
  { name: "Claude", icon: ClaudeLogo },
  { name: "Gemini", icon: GeminiLogo },
  { name: "Llama", icon: MetaIconOutline },
  { name: "Ollama", icon: OllamaLogo },
  { name: "Midjourney", icon: MidjourneyLogo },
  { name: "Mistral", icon: MistralLogo },
  { name: "Microsoft Copilot", icon: MicrosoftCopilotLogo },
  { name: "Gemma (Google)", icon: GemmaLogo },
  { name: "Perplexity", icon: PerplexityLogo },
  { name: "DALL·E (OpenAI)", icon: DalleLogo },
  { name: "Flux", icon: FluxLogo },
  { name: "Grok", icon: GrokLogo },
  { name: "Qwen", icon: QwenLogo },
  { name: "DeepSeek", icon: DeepSeekLogo },
  { name: "Notebook LM", icon: NotebookLmlogo },
  { name: "GitHub Copilot", icon: GithubCopilotLogo },
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

interface CreatePromptModalProps {
  children: React.ReactNode;
}

export function CreatePromptModal({ children }: CreatePromptModalProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { handleCreatePrompt, isCreating, error } = useCreatePromptMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prompt: "",
    model: "",
    models: [] as string[],
    category: "",
    tags: [] as string[],
    solves: "",
    isPublic: true,
  });
  const [tagInput, setTagInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      toast.error("Authentication required", {
        description: "Please sign in to create a prompt.",
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
      toast.error("Missing required fields", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    const newPrompt = await handleCreatePrompt({
      ...formData,
      models: formData.models.filter((m) => m !== formData.model),
      authorId: session.user.id,
    });

    if (newPrompt) {
      toast.success("Prompt created successfully!", {
        description: "Your prompt has been published.",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        prompt: "",
        model: "",
        models: [],
        category: "",
        tags: [],
        solves: "",
        isPublic: true,
      });
      setTagInput("");
      setOpen(false);
    } else {
      toast.error("Error creating prompt", {
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const getModelIconByName = (name: string) => {
    const found = models.find((m) => m.name === name);
    return found ? found.icon : undefined;
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

          {/* Primary Model */}
          <div className="space-y-2">
            <Label htmlFor="model">Primary Model *</Label>
            <Select
              value={formData.model}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  model: value,
                  models: prev.models.filter((m) => m !== value),
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a primary model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => {
                  const Icon = getModelIconByName(model.name);
                  return (
                    <SelectItem key={model.name} value={model.name}>
                      <span className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4" />}
                        {model.name}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Additional AI Models */}
          <div className="space-y-2">
            <Label htmlFor="models">Additional AI Models</Label>
            <div className="flex flex-wrap gap-2">
              {models
                .filter((model) => model.name !== formData.model)
                .map((model) => {
                  const Icon = getModelIconByName(model.name);
                  return (
                    <Button
                      key={model.name}
                      type="button"
                      variant={
                        formData.models.includes(model.name)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => {
                        setFormData((prev) => {
                          if (prev.models.includes(model.name)) {
                            return {
                              ...prev,
                              models: prev.models.filter(
                                (m) => m !== model.name
                              ),
                            };
                          } else {
                            return {
                              ...prev,
                              models: [...prev.models, model.name],
                            };
                          }
                        });
                      }}
                    >
                      <span className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4" />}
                        {model.name}
                      </span>
                    </Button>
                  );
                })}
            </div>
            {formData.models.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.models.map((model) => {
                  const Icon = getModelIconByName(model);
                  return (
                    <Badge key={model} variant="secondary" className="gap-1">
                      <span className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4" />}
                        {model}
                      </span>
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
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Category */}
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
                    <span className="flex items-center gap-2">{tag}</span>
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

          {/* Submit Button */}
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
            <Button type="submit" disabled={isCreating} className="w-32">
              {isCreating ? <Spinner /> : "Create Prompt"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
