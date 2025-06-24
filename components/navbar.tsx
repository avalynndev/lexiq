"use client";

import { useState } from "react";
import { Menu, Github, Twitter, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import LexiqLogo from "@/components/logo";
import { UserButton } from "@daveyplate/better-auth-ui";
import { useSession } from "@/lib/auth-client";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Navbar({
  tree,
  items,
  className,
}: {
  tree: typeof source.pageTree;
  items: { href: string; label: string }[];
  className?: string;
}) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Explore", href: "/explore" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Learn", href: "/docs" },
    { label: "Privacy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-conditions" },
    { label: "Contact", href: "/contact" },
  ];

  const additionalLinks = session?.user?.username
    ? [
        {
          href: `/user/${session.user.username}`,
          label: "My Profile",
          icon: <User className="w-4 h-4" />,
        },
      ]
    : [];

  return (
    <header className="sticky top-0 z-50 -mb-4 pb-4">
      <nav className="fade-bottom bg-background/95 fixed top-0 z-50 h-16 w-full backdrop-blur-sm supports-backdrop-filter:bg-background/60">
        <div className="max-w-container-lg mx-auto flex h-full items-center justify-between px-4 md:gap-2">
          <div className="flex items-center gap-3">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
                    className
                  )}
                >
                  <div className="relative flex h-8 w-4 items-center justify-center">
                    <div className="relative size-4">
                      <span
                        className={cn(
                          "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                          open ? "top-[0.4rem] -rotate-45" : "top-1"
                        )}
                      />
                      <span
                        className={cn(
                          "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                          open ? "top-[0.4rem] rotate-45" : "top-2.5"
                        )}
                      />
                    </div>
                    <span className="sr-only">Toggle Menu</span>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
                align="start"
                side="bottom"
                alignOffset={-16}
                sideOffset={14}
              >
                <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
                  <div className="flex flex-col gap-4">
                    <div className="text-muted-foreground text-sm font-medium">
                      Menu
                    </div>
                    <div className="flex flex-col gap-3">
                      <MobileLink href="/" onOpenChange={setOpen}>
                        Home
                      </MobileLink>
                      {items.map((item, index) => (
                        <MobileLink
                          key={index}
                          href={item.href}
                          onOpenChange={setOpen}
                        >
                          {item.label}
                        </MobileLink>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-8">
                    {tree?.children?.map((group, index) => {
                      if (group.type === "folder") {
                        return (
                          <div key={index} className="flex flex-col gap-4">
                            <div className="text-muted-foreground text-sm font-medium">
                              {group.name}
                            </div>
                            <div className="flex flex-col gap-3">
                              {group.children.map((item) => {
                                if (item.type === "page") {
                                  return (
                                    <MobileLink
                                      key={`${item.url}-${index}`}
                                      href={item.url}
                                      onOpenChange={setOpen}
                                    >
                                      {item.name}
                                    </MobileLink>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Logo and Navigation */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Link
                  className="flex items-center gap-2.5 text-base font-bold"
                  href="/"
                >
                  <LexiqLogo className="h-6 w-6" />
                  <h2 className="text-md font-bold">Lexiq</h2>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="text-muted-foreground hidden items-center gap-6 text-base font-medium md:flex">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-base font-medium"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center ">
            {/* Social Buttons */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl"
                asChild
              >
                <a
                  href="https://github.com/avalynndev"
                  aria-label="GitHub"
                  className="hover:text-foreground focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>

            <div className="items-center justify-center pr-2">
              <ThemeToggle />
            </div>

            <div className="items-center">
              <UserButton size="icon" additionalLinks={additionalLinks} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
