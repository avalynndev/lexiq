import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FloatingPromptCards } from "./floating-prompt-cards";
import { Metrics } from "./metrics";
import { WordAnimation } from "./word-animation";

export function Hero() {
  return (
    <section className="mt-[60px] lg:mt-[180px] min-h-[530px] relative lg:h-[calc(100vh-300px)] overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-10 -z-10" />
      
      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 gradient-purple-blue rounded-full blur-3xl opacity-20 float-animation" />
      <div className="absolute bottom-20 right-10 w-96 h-96 gradient-purple-pink rounded-full blur-3xl opacity-15 float-animation" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 gradient-blue-cyan rounded-full blur-3xl opacity-10 float-animation" style={{ animationDelay: '4s' }} />

      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 relative z-10">
        <div className="flex flex-col lg:w-1/2 lg:max-w-[580px]">
          <Link href="/docs">
            <Button
              variant="outline"
              className="rounded-full border-gradient flex space-x-2 items-center w-fit hover-glow"
            >
              <span className="font-mono text-xs">Learn Prompting</span>
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
            Discover, remix, and evolve powerful AI prompts — built for{" "}
            <span className="text-gradient font-bold">
              <WordAnimation />
            </span>
          </h2>

          <div className="mt-8 md:mt-10">
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-transparent h-11 px-6 dark:bg-[#1D1D1D] bg-[#F2F1EF] hover-glow"
                >
                  Sign up
                </Button>
              </Link>

              <Link href="/explore">
                <Button className="h-11 px-5 gradient-purple-blue text-white font-semibold hover-glow glow-effect">
                  Start exploring
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-xs text-[#707070] mt-4 font-mono">
            Start exploring for free, no account required.
          </p>

          <div className="mt-12 pr-40 lg:hidden justify-center items-center">
            <FloatingPromptCards />
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/2 lg:flex-1">
          <FloatingPromptCards />
        </div>
      </div>

      <Metrics />
    </section>
  );
}