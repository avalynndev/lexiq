import LexiqLogo from "@/components/logo";
import Link from "next/link";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 md:px-6 pt-10 md:pt-16 bg-white dark:bg-[#0C0C0C] overflow-hidden md:max-h-[820px]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center border-border border-b pb-10 md:pb-16 mb-12">
          <Link href="/" className="scale-50 -ml-[px] md:ml-0 sm:scale-100">
            <div className="flex items-center gap-3">
              <LexiqLogo className="h-12 w-12" />
              <span className="text-2xl font-bold">Lexiq</span>
            </div>
            <span className="sr-only">Lexiq</span>
            <span className="font-normal  text-right">
              Discover. Fork. Remix AI prompts.
            </span>
          </Link>

          <div className="flex items-center">
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
