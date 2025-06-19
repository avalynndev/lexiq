import { cn } from "@/lib/utils";

interface GlowProps {
  variant?: "top" | "bottom" | "center";
  className?: string;
}

export default function Glow({ variant = "center", className }: GlowProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10",
        {
          "bg-gradient-to-t from-purple-500/20 via-transparent to-transparent": variant === "top",
          "bg-gradient-to-b from-purple-500/20 via-transparent to-transparent": variant === "bottom",
          "bg-gradient-radial from-purple-500/20 via-transparent to-transparent": variant === "center",
        },
        className
      )}
    />
  );
}