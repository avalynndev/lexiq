import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MockupProps {
  children: ReactNode;
  type?: "responsive" | "desktop" | "mobile";
  className?: string;
}

interface MockupFrameProps {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function Mockup({
  children,
  type = "responsive",
  className,
}: MockupProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        {
          "aspect-video": type === "responsive",
          "aspect-4/3": type === "desktop",
          "aspect-9/16": type === "mobile",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}

export function MockupFrame({
  children,
  size = "medium",
  className,
}: MockupFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto",
        {
          "max-w-2xl": size === "small",
          "max-w-4xl": size === "medium",
          "max-w-6xl": size === "large",
        },
        className,
      )}
    >
      <div className="relative rounded-xl border border-border/50 bg-background/50 backdrop-blur-xs p-2">
        {children}
      </div>
    </div>
  );
}
