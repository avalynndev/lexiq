import LexiqLogo from "@/components/logo";
import Link from "next/link";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 md:px-6 pt-10 md:pt-16 bg-white dark:bg-[#0C0C0C] overflow-hidden md:max-h-[820px]">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col items-center gap-8 border-b border-border pb-10 md:flex-row md:items-center md:justify-between md:pb-16">
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 md:items-start"
            >
              <div className="flex items-center gap-3">
                <LexiqLogo className="h-14 w-14" />
                <span className="text-3xl font-bold">Lexiq</span>
              </div>
              <span className="text-center font-normal text-muted-foreground md:text-left">
                Discover. Remix. Edit AI prompts.
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <SocialLinks />
          </div>
        </div>
      </div>
      <div className="container mx-auto pb-8">
        <div className="text-center text-sm text-muted-foreground">
          <div>
            Contact us:{" "}
            <a
              href="mailto:contact@lexiq.ai"
              className="underline hover:text-primary"
            >
              contact@lexiq.ai
            </a>
          </div>
          <div>
            For support or inquiries, visit our{" "}
            <a href="/contact" className="underline hover:text-primary">
              Contact Page
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}
