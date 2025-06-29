import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AnimatedHeroImages() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <span className="animate-spin rounded-full border-4 border-t-transparent border-gray-300 h-12 w-12"></span>
      </div>
    );
  }

  return (
    <div className="group relative w-full overflow-x-hidden sm:px-24 md:py-10">
      <div className="transform scale-75">
        <div className="relative left-[-24%] z-10 h-[24px] rotate-[-24deg] skew-y-12 transition-all delay-200 duration-700 ease-in-out group-hover:left-[-32%] group-hover:rotate-[-12deg] group-hover:skew-y-6">
          <div
            data-slot="mockup-frame"
            className="bg-border/50 dark:bg-border/10 animate-appear shadow-mockup relative z-10 flex overflow-hidden rounded-2xl p-2 opacity-0 delay-500"
          >
            <div
              data-slot="mockup"
              className="border-border/70 dark:border-border/5 dark:border-t-border/15 relative z-10 flex overflow-hidden rounded-md border shadow-2xl"
            >
              <Image
                alt={`Floating hero image 1 ${isDark ? "dark" : "light"}`}
                loading="lazy"
                width={12002}
                height={7265}
                decoding="async"
                src={isDark ? "/1-dark.png" : "/1-light.png"}
                className="object-cover object-center"
                style={{ color: "transparent" }}
              />
            </div>
          </div>
        </div>
        <div className="relative z-10 h-[24px] rotate-[-24deg] skew-y-12 transition-all delay-200 duration-700 ease-in-out group-hover:rotate-[-12deg] group-hover:skew-y-6">
          <div
            data-slot="mockup-frame"
            className="bg-border/50 dark:bg-border/10 animate-appear shadow-mockup relative z-10 flex overflow-hidden rounded-2xl p-2 opacity-0 delay-1000"
          >
            <div
              data-slot="mockup"
              className="border-border/70 dark:border-border/5 dark:border-t-border/15 relative z-10 flex overflow-hidden rounded-md border shadow-2xl"
            >
              <Image
                alt={`Floating hero image 2 ${isDark ? "dark" : "light"}`}
                loading="lazy"
                width={12002}
                height={7265}
                decoding="async"
                src={isDark ? "/2-dark.png" : "/2-light.png"}
                className="object-cover object-center"
                style={{ color: "transparent" }}
              />
            </div>
          </div>
        </div>
        <div className="relative left-[32%] z-10 rotate-[-24deg] skew-y-12 transition-all delay-200 duration-700 ease-in-out group-hover:left-[48%] group-hover:rotate-[-12deg] group-hover:skew-y-6">
          <div
            data-slot="mockup-frame"
            className="bg-border/50 dark:bg-border/10 animate-appear shadow-mockup relative z-10 flex overflow-hidden rounded-2xl p-2 opacity-0 delay-1500"
          >
            <div
              data-slot="mockup"
              className="border-border/70 dark:border-border/5 dark:border-t-border/15 relative z-10 flex overflow-hidden rounded-md border shadow-2xl"
            >
              <Image
                alt={`Floating hero image 3 ${isDark ? "dark" : "light"}`}
                loading="lazy"
                width={12002}
                height={7265}
                decoding="async"
                src={isDark ? "/3-dark.png" : "/3-light.png"}
                className="object-cover object-center"
                style={{ color: "transparent" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
