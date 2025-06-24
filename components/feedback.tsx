"use client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function FeedbackBadge() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState({
    message: "",
    email: "",
  });

  const handleFeedbackSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        type: "general",
        ...feedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await res.json());
    setOpen(false);
    setLoading(false);
    toast("Feedback Submitted", {
      description: "Thanks for your feedback! We'll be in touch soon.",
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-8 gap-1.5 rounded-md px-3 text-xs has-[>svg]:px-2.5"
          >
            Feedback
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Feedback</DialogTitle>
          <div className="space-y-4">
            <Textarea
              placeholder="Your feedback, thoughts, or suggestions..."
              value={feedback.message}
              onChange={(e) =>
                setFeedback({ ...feedback, message: e.target.value })
              }
            />
            <Input
              placeholder="Optional email (for follow-up)"
              value={feedback.email}
              onChange={(e) =>
                setFeedback({ ...feedback, email: e.target.value })
              }
            />
            <Button onClick={handleFeedbackSubmit} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading..
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
