import { ClaudeLogo, GeminiLogo, OpenAILogo, PerplexityLogo } from "./logos";

export default function UserProvidedElement() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex">
        <div
          className="flex size-12 cursor-pointer items-center justify-center rounded-full"
          style={{
            opacity: 1,
            marginRight: "-17px",
            willChange: "transform, opacity",
            transform: "none",
          }}
        >
          <div className="bg-background flex size-full items-center justify-center rounded-full p-0.5 [transform-style:preserve-3d]">
            <div className="bg-background border-alpha-200 flex size-full items-center justify-center rounded-full border-[1.5px] [transform-style:preserve-3d]">
              <div className="absolute size-full [backface-visibility:hidden]">
                <div className="flex size-full items-center justify-center p-2 text-xl">
                  <GeminiLogo />
                </div>
              </div>
              <div className="absolute size-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="flex size-full items-center justify-center p-2 text-xl">
                  <GeminiLogo />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex size-12 cursor-pointer items-center justify-center rounded-full"
          style={{
            opacity: 1,
            marginRight: "-17px",
            willChange: "transform, opacity",
            transform: "none",
          }}
        >
          <div className="bg-background flex size-full items-center justify-center rounded-full p-0.5 [transform-style:preserve-3d]">
            <div className="bg-background border-alpha-200 flex size-full items-center justify-center rounded-full border-[1.5px] [transform-style:preserve-3d]">
              <div className="absolute size-full [backface-visibility:hidden]">
                <div className="flex size-full items-center justify-center p-2 text-xl">
                  <OpenAILogo />
                </div>
              </div>
              <div className="absolute size-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="flex size-full items-center justify-center p-2 text-xl">
                  <OpenAILogo />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex size-12 cursor-pointer items-center justify-center rounded-full"
          style={{
            opacity: 1,
            marginRight: "-17px",
            willChange: "transform, opacity",
            transform: "none",
          }}
        >
          <div className="bg-background flex size-full items-center justify-center rounded-full p-0.5 [transform-style:preserve-3d]">
            <div className="bg-background border-alpha-200 flex size-full items-center justify-center rounded-full border-[1.5px] [transform-style:preserve-3d]">
              <div className="absolute size-full [backface-visibility:hidden]">
                <div className="flex size-full items-center justify-center p-2 text-xl">
                  <ClaudeLogo />
                </div>
              </div>
              <div className="absolute size-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="flex size-full items-center justify-center p-2 text-xl">
                  <ClaudeLogo />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex size-12 cursor-pointer items-center justify-center rounded-full"
          style={{
            opacity: 1,
            marginRight: "0px",
            willChange: "transform, opacity",
            transform: "none",
          }}
        >
          <div className="bg-background flex size-full items-center justify-center rounded-full p-0.5 [transform-style:preserve-3d]">
            <div className="bg-background border-alpha-200 flex size-full items-center justify-center rounded-full border-[1.5px] [transform-style:preserve-3d]">
              <div className="absolute size-full [backface-visibility:hidden]">
                <div className="flex size-full items-center justify-center p-2 text-xl">
                  <PerplexityLogo />
                </div>
              </div>
              <div className="absolute size-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="flex size-full items-center justify-center p-2 text-xl">
                  <PerplexityLogo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
