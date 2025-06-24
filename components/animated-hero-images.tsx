import Image from "next/image";

export function AnimatedHeroImages() {
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
                alt="Launch UI app screenshot"
                loading="lazy"
                width={1248}
                height={765}
                decoding="async"
                src="https://placehold.co/1248x765/png"
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
                alt="Launch UI app screenshot"
                loading="lazy"
                width={1248}
                height={765}
                decoding="async"
                src="https://placehold.co/1248x765/png"
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
                alt="Launch UI app screenshot"
                loading="lazy"
                width={1248}
                height={765}
                decoding="async"
                src="https://placehold.co/1248x765/png"
                style={{ color: "transparent" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
