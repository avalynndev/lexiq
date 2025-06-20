"use client";

import { useState } from "react";
import { Menu, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LexiqLogo from "@/components/logo";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Explore", href: "/explore" },
    { label: "Trending", href: "/trending" },
    { label: "Docs", href: "/docs" },
    { label: "Categories", href: "/categories" },
    { label: "Pricing", href: "/pricing" },
  ];

  const mobileLinks = [
    { text: "Documentation", href: "/docs" },
    { text: "Explore Prompts", href: "/explore" },
    { text: "Categories", href: "/categories" },
    { text: "Trending", href: "/trending" },
    { text: "Pricing", href: "/pricing" },
    { text: "Submit Prompt", href: "/submit" },
    { text: "Collections", href: "/collections" },
    { text: "API", href: "/api" },
  ];

  return (
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      <nav className="fade-bottom bg-background/95 fixed top-0 z-50 h-16 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-container-lg mx-auto flex h-full items-center justify-between px-4 md:gap-2">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <LexiqLogo className="h-8 w-8" />
                    <span className="text-xl font-bold">
                      Lexiq
                    </span>
                  </div>
                  {mobileLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{link.text}</span>
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-start mb-2"
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

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
                  href="https://github.com/lexiq"
                  aria-label="GitHub"
                  className="hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl"
                asChild
              >
                <a
                  href="https://twitter.com/lexiq"
                  aria-label="Twitter"
                  className="hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Theme Toggle (Visible only on md+) */}
            <div className="hidden md:flex items-center justify-center">
              <ThemeToggle />
            </div>

            {/* Auth Buttons (Hidden on mobile) */}
            <div className="hidden md:flex items-center">
              <Button variant="ghost" size="sm" className="rounded-xl">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
