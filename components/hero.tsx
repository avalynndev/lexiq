import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FloatingPromptCards } from "./floating-prompt-cards";
import { Metrics } from "./metrics";
import { WordAnimation } from "./word-animation";

export function Hero() {
  return (
    <section className="mt-[60px] lg:mt-[180px] min-h-[530px] relative lg:h-[calc(100vh-300px)]">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
        {/* Left side - Text content */}
        <div className="flex flex-col lg:w-1/2 lg:max-w-[580px]">
          <Link href="/updates/latest">
            <Button
              variant="outline"
              className="rounded-full border-border flex space-x-2 items-center w-fit"
            >
              <span className="font-mono text-xs">Latest Updates</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={12}
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M8.783 6.667H.667V5.333h8.116L5.05 1.6 6 .667 11.333 6 6 11.333l-.95-.933 3.733-3.733Z"
                />
              </svg>
            </Button>
          </Link>

          <h2 className="mt-6 md:mt-10 text-[#878787] leading-tight text-[24px] md:text-[36px] font-medium">
            Discover, remix, and evolve the best AI prompts — with forks,
            versions, and your own personal prompt workspace built for{" "}
            <WordAnimation />
          </h2>

          <div className="mt-8 md:mt-10">
            <div className="flex items-center space-x-4">
              <Link href="/signup" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border-transparent h-11 px-6 dark:bg-[#1D1D1D] bg-[#F2F1EF]"
                >
                  Sign up
                </Button>
              </Link>

              <Link href="/explore">
                <Button className="h-11 px-5">Start exploring</Button>
              </Link>
            </div>
          </div>

          <p className="text-xs text-[#707070] mt-4 font-mono">
            Start exploring for free, no account required.
          </p>
        </div>

        {/* Right side - Floating cards (hidden on small screens) */}
        <div className="hidden lg:block lg:w-1/2 lg:relative">
          <FloatingPromptCards />
        </div>
      </div>

      <Metrics />
    </section>
  );
}