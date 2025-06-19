import { cn } from "@/lib/utils";
import Image from "next/image";

interface ScreenshotProps {
  srcLight: string;
  srcDark: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function Screenshot({
  srcLight,
  srcDark,
  alt,
  width,
  height,
  className,
}: ScreenshotProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Light mode image */}
      <Image
        src={srcLight}
        alt={alt}
        width={width}
        height={height}
        className="block dark:hidden rounded-lg"
        priority
      />
      {/* Dark mode image */}
      <Image
        src={srcDark}
        alt={alt}
        width={width}
        height={height}
        className="hidden dark:block rounded-lg"
        priority
      />
    </div>
  );
}