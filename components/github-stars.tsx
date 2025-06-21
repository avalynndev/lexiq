"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export function GithubStars() {
  const [stars, setStars] = useState(234);
  const [isStarred, setIsStarred] = useState(false);

  const handleStar = () => {
    setIsStarred(!isStarred);
    setStars((prev) => (isStarred ? prev - 1 : prev + 1));
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleStar}
      className="flex items-center gap-2 mr-4"
    >
      <Star
        className={`h-4 w-4 ${isStarred ? "fill-current text-yellow-400" : ""}`}
      />
      <span className="text-sm font-mono">{stars.toLocaleString()}</span>
      <span className="text-xs text-muted-foreground">stars</span>
    </Button>
  );
}
