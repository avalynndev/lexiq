import LexiqLogo from '@/components/logo';
import Link from "next/link";
import { GithubStars } from "./github-stars";
import { SocialLinks } from "./social-links";
import { StatusWidget } from "./status-widget";

export function Footer() {
  return (
    <footer className="border-t-[1px] border-border px-4 md:px-6 pt-10 md:pt-16 bg-[#fff] dark:bg-[#0C0C0C] overflow-hidden md:max-h-[820px]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center border-border border-b-[1px] pb-10 md:pb-16 mb-12">
          <Link href="/" className="scale-50 -ml-[52px] md:ml-0 md:scale-100">
            <div className="flex items-center gap-3">
              <LexiqLogo className="h-12 w-12" />
              <span className="text-2xl font-bold">Lexiq</span>
            </div>
            <span className="sr-only">Lexiq</span>
          </Link>

          <span className="font-normal md:text-2xl text-right">
            Discover. Fork. Remix AI prompts.
          </span>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:w-6/12 justify-between leading-8">
            <div>
              <span className="font-medium">Platform</span>
              <ul>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/explore">Explore</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/categories">Categories</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/trending">Trending</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/submit">Submit Prompt</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/collections">Collections</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/api">API</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/download">Download</Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-medium">Resources</span>
              <ul>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="https://github.com/lexiq">Github</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/docs">Documentation</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/support">Support</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/terms">Terms of Service</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/branding">Brand Kit</Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-medium">Company</span>
              <ul>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/about">About</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/blog">Blog</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/updates">Updates</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/open-source">Open Source</Link>
                </li>
                <li className="transition-colors text-[#878787] hover:text-foreground">
                  <Link href="/community">Community</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:w-6/12 flex mt-8 md:mt-0 md:justify-end">
            <div className="flex md:items-end flex-col">
              <div className="flex items-start md:items-center flex-col md:flex-row space-y-6 md:space-y-0 mb-8">
                <GithubStars />
                <SocialLinks />
              </div>

              <div className="md:mr-0 mt-auto mr-auto">
                <StatusWidget />
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 className="dark:text-[#161616] text-[#F4F4F3] text-[500px] leading-none text-center pointer-events-none">
        lexiq
      </h5>
    </footer>
  );
}