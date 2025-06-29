import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FloatingPromptCards } from "./floating-prompt-cards";
import { Metrics } from "./metrics";
import { WordAnimation } from "./word-animation";
import { RainbowButton } from "@/components/magicui/rainbow-button";

export function Hero() {
  return (
    <section className="mt-[60px] lg:mt-[180px] min-h-[530px] relative lg:h-[calc(100vh-300px)]">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
        <div className="flex flex-col lg:w-1/2 lg:max-w-[580px]">
          <div className="">
            <Link href="/docs">
              <Button
                variant="outline"
                className="rounded-full border-border flex space-x-2 items-center w-fit hover:scale-105 transition-transform duration-200 hover:shadow-lg"
              >
                <span className="font-mono text-xs">Learn Prompting</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={12}
                  height={12}
                  fill="none"
                  className="animate-pulse"
                >
                  <path
                    fill="currentColor"
                    d="M8.783 6.667H.667V5.333h8.116L5.05 1.6 6 .667 11.333 6 6 11.333l-.95-.933 3.733-3.733Z"
                  />
                </svg>
              </Button>
            </Link>
          </div>

          <div>
            <h2 className="mt-6 md:mt-10 text-[#878787] leading-tight text-[24px] md:text-[36px] font-medium">
              Discover, remix, and evolve powerful AI prompts — built for{" "}
              <WordAnimation />
            </h2>
          </div>

          <div className="mt-8 md:mt-10">
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-transparent h-11 px-6 dark:bg-[#1D1D1D] bg-[#F2F1EF] hover:shadow-lg"
                >
                  Sign up
                </Button>
              </Link>

              <Link href="/explore">
                <RainbowButton>
                  Start exploring
                </RainbowButton>
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs text-[#707070] mt-4 font-mono">
              Start exploring for free, no account required.
            </p>
          </div>

          <div className="mt-12 pr-40 lg:hidden justify-center items-center">
            <FloatingPromptCards />
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/2 lg:flex-1">
          <FloatingPromptCards />
        </div>
      </div>

      <div>
        <Metrics />
      </div>
    </section>
  );
}
